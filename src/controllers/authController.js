const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }
    
    const token = jwt.sign(
      { id: user.id, email: user.email, pseudo: user.pseudo },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );
    
    return res.json({ token });
  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    const { email, password, pseudo } = req.body;

    const existingUser = await User.findOne({ where: { email } });


    if (existingUser) {
      return res.status(400).json({ error: 'Utilisateur déja existant' });
    }
    const user = await User.create({ email, password, pseudo });
    const token = jwt.sign(
      { id: user.id, email: user.email, pseudo: user.pseudo },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ message: 'Utilisateur créé', token });
  } catch (err) {
    next(err);
  }
};