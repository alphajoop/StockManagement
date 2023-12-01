const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // Extract the token from the Authorization header
    const token = req.headers.authorization.split(' ')[1];

    // Verify the token
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');

    // Attach the decoded user information to the request object
    req.auth = {
      userId: decodedToken.userId,
      role: decodedToken.role,
    };

    // Move to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error during token verification:', error);
    res.status(401).json({ message: 'Unauthorized: Invalid token', error });
  }
};
