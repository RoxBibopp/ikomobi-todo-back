const { Board, User } = require('../models');

exports.getBoard = async (req, res, next) => {
  try {
    let board = await Board.findOne({ where: { ownerId: req.user.id } });
    if (!board) {
      board = await Board.create({ ownerId: req.user.id, name: 'Mes Tâches' });
    }
    res.json(board);
  } catch (err) {
    next(err);
  }
};

exports.inviteUser = async (req, res, next) => {
  try {
    const { boardId } = req.params;
    const { email } = req.body;
    const board = await Board.findOne({ where: { id: boardId, ownerId: req.user.id } });
    if (!board) return res.status(404).json({ error: 'Tableau non trouvé' });
    
    console.log('Méthodes disponibles sur board:', Object.keys(board.__proto__));

    const userToInvite = await User.findOne({ where: { email } });
    if (!userToInvite) return res.status(404).json({ error: 'Utilisateur non trouvé' });

    await board.addCollaborator(userToInvite);
    
    res.status(200).json({ message: 'Invitation envoyée' });
  } catch (error) {
    next(error);
  }
};

exports.getCollaborativeBoards = async (req, res, next) => {
  try {
    const userInstance = await User.findByPk(req.user.id);
    if (!userInstance) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    const boards = await userInstance.getCollaborations();
    res.json(boards);
  } catch (err) {
    next(err);
  }
};