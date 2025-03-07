const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'Token manquant' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userInstance = await User.findByPk(decoded.id);
    if (!userInstance) {
      return res.status(401).json({ error: 'Utilisateur non trouvé' });
    }
    req.user = decoded; 
    next();
  } catch (error) {
    res.status(401).json({ error: 'Token invalide' });
  }
};
