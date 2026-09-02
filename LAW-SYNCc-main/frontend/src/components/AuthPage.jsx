import React, { useState } from 'react';
import {
  Scale,
  Lock,
  Mail,
  User as UserIcon,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import api from '../services/api';

export default function AuthPage({ onLoginSuccess }) {
  // Mode: 'signin' | 'signup'
  const [authMode, setAuthMode] = useState('signin');

  // Sign In Form State
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [showSignInPassword, setShowSignInPassword] = useState(false);

  // Sign Up Form State
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpMobile, setSignUpMobile] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');
  const [showSignUpPassword, setShowSignUpPassword] = useState(false);
  const [showSignUpConfirmPassword, setShowSignUpConfirmPassword] = useState(false);

  // Status & Error States
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  // Reset form messages on mode switch
  const switchMode = (mode) => {
    setAuthMode(mode);
    setErrorMessage('');
    setSuccessMessage('');
    setFieldErrors({});
  };

  // Validate Sign In
  const validateSignIn = () => {
    const errors = {};
    if (!signInEmail.trim()) {
      errors.email = 'Email ID is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signInEmail.trim())) {
      errors.email = 'Please enter a valid email address';
    }

    if (!signInPassword) {
      errors.password = 'Password is required';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Validate Sign Up
  const validateSignUp = () => {
    const errors = {};

    // 1. User Name
    if (!signUpName.trim()) {
      errors.name = 'User Name cannot be empty';
    } else if (signUpName.trim().length < 2) {
      errors.name = 'User Name must be at least 2 characters';
    }

    // 2. Email ID
    if (!signUpEmail.trim()) {
      errors.email = 'Email ID cannot be empty';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(signUpEmail.trim())) {
      errors.email = 'Please enter a valid email address';
    }

    // 3. Mobile Number (10 digits or international phone format)
    const cleanPhone = signUpMobile.replace(/[\s\-()]/g, '');
    if (!signUpMobile.trim()) {
      errors.mobile = 'Mobile Number is required';
    } else if (!/^\+?[0-9]{10,14}$/.test(cleanPhone)) {
      errors.mobile = 'Please enter a valid 10-digit mobile number';
    }

    // 4. Password
    if (!signUpPassword) {
      errors.password = 'Password cannot be empty';
    } else if (signUpPassword.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    // 5. Confirm Password
    if (!signUpConfirmPassword) {
      errors.confirmPassword = 'Confirm Password cannot be empty';
    } else if (signUpPassword !== signUpConfirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle Sign In Submit
  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!validateSignIn()) return;

    try {
      setIsLoading(true);
      const res = await api.login({
        email: signInEmail.trim(),
        password: signInPassword,
      });

      if (res.success && res.token) {
        localStorage.setItem('lawsync_token', res.token);
        localStorage.setItem('lawsync_user', JSON.stringify(res.user));
        onLoginSuccess(res.user, res.token);
      } else {
        setErrorMessage(res.message || 'Authentication failed. Please check credentials.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Sign Up Submit
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!validateSignUp()) return;

    try {
      setIsLoading(true);
      const res = await api.register({
        name: signUpName.trim(),
        email: signUpEmail.trim(),
        mobileNumber: signUpMobile.trim(),
        password: signUpPassword,
      });

      if (res.success) {
        // Pre-fill email in signin form and switch to sign in view
        setSignInEmail(signUpEmail.trim());
        setSignInPassword('');
        setSuccessMessage('🎉 Account created successfully! Please sign in with your credentials.');
        setAuthMode('signin');
        // Reset registration fields
        setSignUpName('');
        setSignUpEmail('');
        setSignUpMobile('');
        setSignUpPassword('');
        setSignUpConfirmPassword('');
        setFieldErrors({});
      } else {
        setErrorMessage(res.message || 'Registration failed. Please check your information.');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Registration failed. Please check your information.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-container">
        {/* Brand Header */}
        <div className="auth-brand-header">
          <div className="auth-brand-logo">
            <Scale size={32} className="brand-icon" />
          </div>
          <h1 className="auth-brand-title">
            LAW<span className="brand-accent">-SYNC</span>
          </h1>
          <p className="auth-brand-tagline">
            Indian Jurisprudence & Smart Legal Dictionary Portal
          </p>
        </div>

        {/* Auth Mode Toggle Tabs */}
        <div className="auth-toggle-tabs">
          <button
            type="button"
            className={`auth-tab-btn ${authMode === 'signin' ? 'active' : ''}`}
            onClick={() => switchMode('signin')}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${authMode === 'signup' ? 'active' : ''}`}
            onClick={() => switchMode('signup')}
          >
            Sign Up / Register
          </button>
        </div>

        {/* Notifications / Alerts */}
        {errorMessage && (
          <div className="auth-alert auth-alert-error" role="alert">
            <AlertCircle size={18} className="alert-icon" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="auth-alert auth-alert-success" role="alert">
            <CheckCircle2 size={18} className="alert-icon" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SIGN IN VIEW */}
        {/* ========================================================================= */}
        {authMode === 'signin' && (
          <form className="auth-form" onSubmit={handleSignInSubmit} noValidate>
            <div className="form-header">
              <h2>Welcome Back</h2>
              <p>Sign in to access the comprehensive Indian Legal Dictionary</p>
            </div>

            {/* Email ID */}
            <div className={`form-group ${fieldErrors.email ? 'has-error' : ''}`}>
              <label htmlFor="signin-email">
                Email ID <span className="required-star">*</span>
              </label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  id="signin-email"
                  type="email"
                  placeholder="name@example.com"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  disabled={isLoading}
                  autoComplete="email"
                />
              </div>
              {fieldErrors.email && <span className="field-error-text">{fieldErrors.email}</span>}
            </div>

            {/* Password */}
            <div className={`form-group ${fieldErrors.password ? 'has-error' : ''}`}>
              <label htmlFor="signin-password">
                Password <span className="required-star">*</span>
              </label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  id="signin-password"
                  type={showSignInPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  disabled={isLoading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowSignInPassword(!showSignInPassword)}
                  tabIndex={-1}
                  aria-label="Toggle password visibility"
                >
                  {showSignInPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {fieldErrors.password && <span className="field-error-text">{fieldErrors.password}</span>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="auth-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="btn-loading-spinner">Signing In...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            {/* Footer switch to sign up */}
            <div className="auth-form-footer">
              <span>New to LAW-SYNC? </span>
              <button
                type="button"
                className="auth-link-btn"
                onClick={() => switchMode('signup')}
              >
                Create an Account / Sign Up
              </button>
            </div>
          </form>
        )}

        {/* ========================================================================= */}
        {/* SIGN UP / REGISTRATION VIEW */}
        {/* ========================================================================= */}
        {authMode === 'signup' && (
          <form className="auth-form" onSubmit={handleSignUpSubmit} noValidate>
            <div className="form-header">
              <h2>Create Account</h2>
              <p>Register as a legal practitioner, student, or researcher</p>
            </div>

            {/* 1. User Name */}
            <div className={`form-group ${fieldErrors.name ? 'has-error' : ''}`}>
              <label htmlFor="signup-name">
                User Name <span className="required-star">*</span>
              </label>
              <div className="input-wrapper">
                <UserIcon size={18} className="input-icon" />
                <input
                  id="signup-name"
                  type="text"
                  placeholder="e.g. Advocate Rajesh Sharma"
                  value={signUpName}
                  onChange={(e) => setSignUpName(e.target.value)}
                  disabled={isLoading}
                  autoComplete="name"
                />
              </div>
              {fieldErrors.name && <span className="field-error-text">{fieldErrors.name}</span>}
            </div>

            {/* 2. Email ID */}
            <div className={`form-group ${fieldErrors.email ? 'has-error' : ''}`}>
              <label htmlFor="signup-email">
                Email ID <span className="required-star">*</span>
              </label>
              <div className="input-wrapper">
                <Mail size={18} className="input-icon" />
                <input
                  id="signup-email"
                  type="email"
                  placeholder="e.g. rajesh.sharma@example.com"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  disabled={isLoading}
                  autoComplete="email"
                />
              </div>
              {fieldErrors.email && <span className="field-error-text">{fieldErrors.email}</span>}
            </div>

            {/* 3. Mobile Number */}
            <div className={`form-group ${fieldErrors.mobile ? 'has-error' : ''}`}>
              <label htmlFor="signup-mobile">
                Mobile Number <span className="required-star">*</span>
              </label>
              <div className="input-wrapper">
                <Phone size={18} className="input-icon" />
                <input
                  id="signup-mobile"
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={signUpMobile}
                  onChange={(e) => setSignUpMobile(e.target.value)}
                  disabled={isLoading}
                  autoComplete="tel"
                />
              </div>
              {fieldErrors.mobile && <span className="field-error-text">{fieldErrors.mobile}</span>}
            </div>

            {/* 4. Password */}
            <div className={`form-group ${fieldErrors.password ? 'has-error' : ''}`}>
              <label htmlFor="signup-password">
                Password <span className="required-star">*</span>
              </label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  id="signup-password"
                  type={showSignUpPassword ? 'text' : 'password'}
                  placeholder="At least 6 characters"
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  disabled={isLoading}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowSignUpPassword(!showSignUpPassword)}
                  tabIndex={-1}
                  aria-label="Toggle password visibility"
                >
                  {showSignUpPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {fieldErrors.password && <span className="field-error-text">{fieldErrors.password}</span>}
            </div>

            {/* 5. Confirm Password */}
            <div className={`form-group ${fieldErrors.confirmPassword ? 'has-error' : ''}`}>
              <label htmlFor="signup-confirm-password">
                Confirm Password <span className="required-star">*</span>
              </label>
              <div className="input-wrapper">
                <ShieldCheck size={18} className="input-icon" />
                <input
                  id="signup-confirm-password"
                  type={showSignUpConfirmPassword ? 'text' : 'password'}
                  placeholder="Re-enter password"
                  value={signUpConfirmPassword}
                  onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                  disabled={isLoading}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowSignUpConfirmPassword(!showSignUpConfirmPassword)}
                  tabIndex={-1}
                  aria-label="Toggle password visibility"
                >
                  {showSignUpConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {fieldErrors.confirmPassword && (
                <span className="field-error-text">{fieldErrors.confirmPassword}</span>
              )}
            </div>

            {/* 6. Create Account Button */}
            <button
              type="submit"
              className="auth-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="btn-loading-spinner">Creating Account...</span>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            {/* Switch to sign in */}
            <div className="auth-form-footer">
              <span>Already have an account? </span>
              <button
                type="button"
                className="auth-link-btn"
                onClick={() => switchMode('signin')}
              >
                Sign In
              </button>
            </div>
          </form>
        )}

        {/* Security / System Footer */}
        <div className="auth-security-notice">
          <ShieldCheck size={14} />
          <span>Secure AES-256 JWT Authentication & PostgreSQL Storage</span>
        </div>
      </div>
    </div>
  );
}
