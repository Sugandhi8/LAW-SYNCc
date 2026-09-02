const { Op } = require('sequelize');
const { Term, History } = require('../models');
const { sequelize } = require('../config/db');

// @desc    Get all legal terms with optional search, category, letter, and pagination filters
// @route   GET /api/terms
// @access  Public
const getTerms = async (req, res, next) => {
  try {
    const {
      search,
      category,
      letter,
      popular,
      termOfDay,
      page = 1,
      limit = 20,
      sort = 'word'
    } = req.query;

    const whereConditions = [];

    // Filter by category
    if (category && category !== 'all') {
      whereConditions.push({
        [Op.or]: [
          { categoryId: category.toLowerCase().trim() },
          { category: { [Op.iLike]: category.trim() } }
        ]
      });
    }

    // Filter by starts with letter
    if (letter) {
      whereConditions.push({
        word: { [Op.iLike]: `${letter.trim()}%` }
      });
    }

    // Filter by popular
    if (popular === 'true') {
      whereConditions.push({ isPopular: true });
    }

    // Filter by term of the day
    if (termOfDay === 'true') {
      whereConditions.push({ isTermOfDay: true });
    }

    // Search query across word, definition, simpleMeaning, category, and relatedLaws
    if (search && search.trim()) {
      const searchTerm = `%${search.trim()}%`;
      whereConditions.push({
        [Op.or]: [
          { word: { [Op.iLike]: searchTerm } },
          { simpleMeaning: { [Op.iLike]: searchTerm } },
          { definition: { [Op.iLike]: searchTerm } },
          { category: { [Op.iLike]: searchTerm } },
          { relatedLaws: { [Op.iLike]: searchTerm } }
        ]
      });
    }

    const where = whereConditions.length > 0 ? { [Op.and]: whereConditions } : {};

    // Pagination calculations
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 20;
    const offset = (pageNum - 1) * limitNum;

    // Sorting options
    let order = [['word', 'ASC']];
    if (sort === '-createdAt') {
      order = [['createdAt', 'DESC']];
    } else if (sort === 'popular') {
      order = [['isPopular', 'DESC'], ['word', 'ASC']];
    }

    const { count, rows: terms } = await Term.findAndCountAll({
      where,
      limit: limitNum,
      offset,
      order
    });

    res.status(200).json({
      success: true,
      count: terms.length,
      total: count,
      totalPages: Math.ceil(count / limitNum),
      currentPage: pageNum,
      data: terms
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single legal term by ID or exact word
// @route   GET /api/terms/:id
// @access  Public
const getTermById = async (req, res, next) => {
  try {
    const { id } = req.params;
    let term;

    // If param is a number, search by primary key
    if (!isNaN(id)) {
      term = await Term.findByPk(parseInt(id, 10));
    } else {
      // Otherwise match case-insensitively by word
      term = await Term.findOne({
        where: { word: { [Op.iLike]: id.trim() } }
      });
    }

    if (!term) {
      return res.status(404).json({
        success: false,
        message: `Legal term '${id}' not found`
      });
    }

    // Automatically record search/view history if user is authenticated
    if (req.user) {
      await History.create({
        userId: req.user.id,
        termId: term.id,
        searchedAt: new Date()
      }).catch(() => {});
    }

    res.status(200).json({
      success: true,
      data: term
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Term of the Day
// @route   GET /api/terms/term-of-day
// @access  Public
const getTermOfTheDay = async (req, res, next) => {
  try {
    let term = await Term.findOne({ where: { isTermOfDay: true } });

    // Fallback to a popular term or first available term
    if (!term) {
      term = await Term.findOne({ where: { isPopular: true } }) || await Term.findOne();
    }

    if (!term) {
      return res.status(404).json({
        success: false,
        message: 'No terms available'
      });
    }

    res.status(200).json({
      success: true,
      data: term
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all distinct categories with term counts
// @route   GET /api/terms/categories
// @access  Public
const getCategories = async (req, res, next) => {
  try {
    const categoriesAggregation = await Term.findAll({
      attributes: [
        'category',
        'categoryId',
        [sequelize.fn('COUNT', sequelize.col('id')), 'count']
      ],
      group: ['category', 'categoryId'],
      order: [[sequelize.fn('COUNT', sequelize.col('id')), 'DESC']],
      raw: true
    });

    const totalCount = await Term.count();

    const formattedCategories = categoriesAggregation.map((c) => ({
      id: c.categoryId,
      name: c.category,
      count: parseInt(c.count, 10)
    }));

    res.status(200).json({
      success: true,
      totalTerms: totalCount,
      data: [
        { id: 'all', name: 'All Categories', count: totalCount },
        ...formattedCategories
      ]
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Compare two legal terms side-by-side
// @route   GET /api/terms/compare
// @access  Public
const compareTerms = async (req, res, next) => {
  try {
    const { term1, term2 } = req.query;

    if (!term1 || !term2) {
      return res.status(400).json({
        success: false,
        message: 'Please provide both term1 and term2 parameters for comparison'
      });
    }

    const findTerm = async (identifier) => {
      if (!isNaN(identifier)) {
        return await Term.findByPk(parseInt(identifier, 10));
      }
      return await Term.findOne({
        where: { word: { [Op.iLike]: identifier.trim() } }
      });
    };

    const [termOneData, termTwoData] = await Promise.all([
      findTerm(term1),
      findTerm(term2)
    ]);

    if (!termOneData || !termTwoData) {
      return res.status(404).json({
        success: false,
        message: `One or both comparison terms were not found. Found term1: ${!!termOneData}, Found term2: ${!!termTwoData}`
      });
    }

    res.status(200).json({
      success: true,
      data: {
        term1: termOneData,
        term2: termTwoData
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new legal term
// @route   POST /api/terms
// @access  Private/Admin
const createTerm = async (req, res, next) => {
  try {
    const {
      word,
      pronunciation,
      category,
      categoryId,
      definition,
      simpleMeaning,
      example,
      relatedLaws,
      relatedTerms,
      keyElements,
      isPopular,
      isTermOfDay
    } = req.body;

    // Check if term already exists
    const existing = await Term.findOne({
      where: { word: { [Op.iLike]: word.trim() } }
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: `The term '${word}' already exists in the legal dictionary`
      });
    }

    // If marked as isTermOfDay, unset any existing term of day
    if (isTermOfDay) {
      await Term.update({ isTermOfDay: false }, { where: { isTermOfDay: true } });
    }

    const term = await Term.create({
      word: word.trim(),
      pronunciation,
      category,
      categoryId: categoryId || category.toLowerCase().replace(/[^a-z0-9]/g, ''),
      definition,
      simpleMeaning,
      example,
      relatedLaws,
      relatedTerms: Array.isArray(relatedTerms) ? relatedTerms : [],
      keyElements: Array.isArray(keyElements) ? keyElements : [],
      isPopular: !!isPopular,
      isTermOfDay: !!isTermOfDay
    });

    res.status(201).json({
      success: true,
      message: 'Legal term created successfully',
      data: term
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update an existing legal term
// @route   PUT /api/terms/:id
// @access  Private/Admin
const updateTerm = async (req, res, next) => {
  try {
    const term = await Term.findByPk(req.params.id);

    if (!term) {
      return res.status(404).json({
        success: false,
        message: `Legal term with ID ${req.params.id} not found`
      });
    }

    // If updating to isTermOfDay, unset existing
    if (req.body.isTermOfDay) {
      await Term.update(
        { isTermOfDay: false },
        { where: { id: { [Op.ne]: term.id }, isTermOfDay: true } }
      );
    }

    await term.update(req.body);

    res.status(200).json({
      success: true,
      message: 'Legal term updated successfully',
      data: term
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a legal term
// @route   DELETE /api/terms/:id
// @access  Private/Admin
const deleteTerm = async (req, res, next) => {
  try {
    const term = await Term.findByPk(req.params.id);

    if (!term) {
      return res.status(404).json({
        success: false,
        message: `Legal term with ID ${req.params.id} not found`
      });
    }

    await term.destroy();

    res.status(200).json({
      success: true,
      message: `Legal term '${term.word}' was successfully removed`
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTerms,
  getTermById,
  getTermOfTheDay,
  getCategories,
  compareTerms,
  createTerm,
  updateTerm,
  deleteTerm
};
