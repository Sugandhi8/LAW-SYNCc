/**
 * LAW-SYNC API Service
 * Centralized API helper module to communicate with the Express + PostgreSQL backend.
 */

const API_BASE = import.meta.env.VITE_API_URL || '/api';

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
    if (error.name === 'TypeError' && (error.message.includes('fetch') || error.message.includes('Failed to fetch'))) {
      throw new Error('Unable to connect to the backend server. Please ensure the Express server is running on port 5000.');
    }
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
   * User Authentication: Login with email & password
   */
  async login(credentials) {
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  /**
   * User Authentication: Register new account
   * @param {Object} userData - { name, email, mobileNumber, password }
   */
  async register(userData) {
    return request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  /**
   * User Authentication: Get current user profile
   */
  async getMe(token) {
    return request('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default api;
