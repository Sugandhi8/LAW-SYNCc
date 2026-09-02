// Restrict access based on user role
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated. Please log in first.'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `User role '${req.user.role}' is not authorized to access this resource.`
      });
    }

    next();
  };
};

const adminOnly = authorizeRoles('admin');

module.exports = {
  authorizeRoles,
  adminOnly
};
