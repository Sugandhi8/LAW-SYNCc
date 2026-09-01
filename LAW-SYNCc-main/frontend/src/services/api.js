/**
 * LAW-SYNC API Service
 * Centralized API helper module to communicate with the Express + PostgreSQL backend.
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Helper to handle fetch responses and standardize errors
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMsg = data.message || `Request failed with status ${response.status}`;
      throw new Error(errorMsg);
    }

    return data;
  } catch (error) {
    console.error(`[API Error] ${endpoint}:`, error.message);
    throw error;
  }
}

export const api = {
  /**
   * Check backend and database connectivity status
   */
  async checkHealth() {
    return request('/health');
  },

  /**
   * Fetch legal terms with optional search, category, letter, sorting, and pagination
   * @param {Object} params - { search, category, letter, popular, termOfDay, page, limit, sort }
   */
  async getTerms(params = {}) {
    const query = new URLSearchParams();
    if (params.search && params.search.trim()) query.append('search', params.search.trim());
    if (params.category && params.category !== 'all') query.append('category', params.category);
    if (params.letter) query.append('letter', params.letter);
    if (params.popular) query.append('popular', 'true');
    if (params.termOfDay) query.append('termOfDay', 'true');
    if (params.page) query.append('page', params.page);
    if (params.limit) query.append('limit', params.limit);
    if (params.sort) query.append('sort', params.sort);

    const queryString = query.toString();
    const endpoint = `/terms${queryString ? `?${queryString}` : ''}`;
    return request(endpoint);
  },

  /**
   * Fetch a single term by its numeric ID or word string
   * @param {string|number} id - Term ID or word
   */
  async getTermById(id) {
    return request(`/terms/${encodeURIComponent(id)}`);
  },

  /**
   * Fetch the featured Legal Term of the Day
   */
  async getTermOfTheDay() {
    return request('/terms/term-of-day');
  },

  /**
   * Fetch all distinct categories with term counts
   */
  async getCategories() {
    return request('/terms/categories');
  },

  /**
   * Compare two legal terms side-by-side
   * @param {string} term1 - First term word or ID
   * @param {string} term2 - Second term word or ID
   */
  async compareTerms(term1, term2) {
    return request(`/terms/compare?term1=${encodeURIComponent(term1)}&term2=${encodeURIComponent(term2)}`);
  },

  /**
   * Fetch quiz questions
   */
  async getQuizzes() {
    return request('/quizzes');
  },

  /**
   * Submit quiz answer attempts
   * @param {Array} answers - [{ quizId, selectedAnswer }]
   */
  async submitQuizAttempt(answers) {
    return request('/quiz/attempt', {
      method: 'POST',
      body: JSON.stringify({ answers }),
    });
  },
};

export default api;
