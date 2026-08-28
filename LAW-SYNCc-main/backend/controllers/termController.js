const Term = require('../models/Term');
const Bookmark = require('../models/Bookmark');
const History = require('../models/History');

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

    const query = {};

    // Filter by category
    if (category && category !== 'all') {
      // Matches categoryId or category name case-insensitively
      query.$or = [
        { categoryId: category.toLowerCase() },
        { category: new RegExp(`^${category}$`, 'i') }
      ];
    }

    // Filter by starts with letter
    if (letter) {
      query.word = new RegExp(`^${letter}`, 'i');
    }

    // Filter by popular
    if (popular === 'true') {
      query.isPopular = true;
    }

    // Filter by term of the day
    if (termOfDay === 'true') {
      query.isTermOfDay = true;
    }

    // Search query across word, definition, simpleMeaning, category, and relatedLaws
    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$and = query.$and || [];
      query.$and.push({
        $or: [
          { word: searchRegex },
          { simpleMeaning: searchRegex },
          { definition: searchRegex },
          { category: searchRegex },
          { relatedLaws: searchRegex },
          { relatedTerms: searchRegex }
        ]
      });
    }

    // Pagination calculations
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 20;
    const skip = (pageNum - 1) * limitNum;

    // Sorting
    let sortOption = { word: 1 };
    if (sort === '-createdAt') {
      sortOption = { createdAt: -1 };
    } else if (sort === 'popular') {
      sortOption = { isPopular: -1, word: 1 };
    }

    const total = await Term.countDocuments(query);
    const terms = await Term.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      success: true,
      count: terms.length,
      total,
      totalPages: Math.ceil(total / limitNum),
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

    // Check if parameter is a valid MongoDB ObjectId
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      term = await Term.findById(id);
    } else {
      // Otherwise match case-insensitively by word
      term = await Term.findOne({ word: new RegExp(`^${id}$`, 'i') });
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
        user: req.user._id,
        term: term._id,
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
    let term = await Term.findOne({ isTermOfDay: true });

    // Fallback to a popular term or any random term if none marked
    if (!term) {
      term = await Term.findOne({ isPopular: true }) || await Term.findOne();
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
    const categoriesAggregation = await Term.aggregate([
      {
        $group: {
          _id: {
            category: '$category',
            categoryId: '$categoryId'
          },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          name: '$_id.category',
          id: '$_id.categoryId',
          count: '$count'
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    const totalCount = await Term.countDocuments();

    res.status(200).json({
      success: true,
      totalTerms: totalCount,
      data: [
        { id: 'all', name: 'All Categories', count: totalCount },
        ...categoriesAggregation
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
      if (identifier.match(/^[0-9a-fA-F]{24}$/)) {
        return await Term.findById(identifier);
      }
      return await Term.findOne({ word: new RegExp(`^${identifier.trim()}$`, 'i') });
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
    const existing = await Term.findOne({ word: new RegExp(`^${word.trim()}$`, 'i') });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: `The term '${word}' already exists in the legal dictionary`
      });
    }

    // If marked as isTermOfDay, unset any existing term of day
    if (isTermOfDay) {
      await Term.updateMany({ isTermOfDay: true }, { isTermOfDay: false });
    }

    const term = await Term.create({
      word,
      pronunciation,
      category,
      categoryId,
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
    let term = await Term.findById(req.params.id);

    if (!term) {
      return res.status(404).json({
        success: false,
        message: `Legal term with ID ${req.params.id} not found`
      });
    }

    // If updating to isTermOfDay, unset existing
    if (req.body.isTermOfDay) {
      await Term.updateMany({ _id: { $ne: term._id }, isTermOfDay: true }, { isTermOfDay: false });
    }

    term = await Term.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

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
    const term = await Term.findById(req.params.id);

    if (!term) {
      return res.status(404).json({
        success: false,
        message: `Legal term with ID ${req.params.id} not found`
      });
    }

    await term.deleteOne();

    // Clean up related bookmarks and history entries
    await Promise.all([
      Bookmark.deleteMany({ term: term._id }),
      History.deleteMany({ term: term._id })
    ]);

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
