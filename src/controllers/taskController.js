const { Task, User, Board } = require('../models');
const { Op } = require('sequelize');

exports.getTasks = async (req, res, next) => {
  try {
    const { status } = req.query;
    const query = { where: { userId: req.user.id } };
    if (status) {
      query.where.status = status;
    }
    const tasks = await Task.findAll(query);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};

exports.createTask = async (req, res, next) => {
  try {
    const { title, description, status, boardId } = req.body;
    let finalBoardId = boardId;
    if (!finalBoardId) {
      let board = await Board.findOne({ where: { ownerId: req.user.id } });
      if (!board) {
        board = await Board.create({ ownerId: req.user.id, name: 'Mes Tâches' });
      }
      finalBoardId = board.id;
    } else {
      const board = await Board.findByPk(finalBoardId);
      if (!board) {
        return res.status(400).json({ error: "Erreur" });
      }
    }

    const task = await Task.create({
      title,
      description,
      status: status || 'a faire',
      boardId: finalBoardId,
      userId: req.user.id
    });

    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, status } = req.body;
    
    const task = await Task.findOne({ where: { id, userId: req.user.id } });
    if (!task) return res.status(404).json({ error: 'Tâche non trouvée' });
    
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    await task.save();
    
    res.json(task);
  } catch (err) {
    next(err);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const task = await Task.findOne({ where: { id, userId: req.user.id } });
    if (!task) return res.status(404).json({ error: 'Tâche non trouvée' });
    
    await task.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
exports.getCollaborativeTasks = async (req, res, next) => {
  try {
    const updatedUser = await User.findByPk(req.user.id, { include: ['collaborations'] });
    if (!updatedUser) {
      return res.status(404).json({ error: 'Utilisateur non trouvé' });
    }
    const boards = updatedUser.collaborations;
    const boardIds = boards.map(board => board.id);
    
    if (!boardIds.length) {
      return res.json([]);
    }
    
    const whereClause = {
      boardId: { [Op.in]: boardIds }
    };
    
    if (req.query.status) {
      whereClause.status = req.query.status;
    }

    const tasks = await Task.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['pseudo', 'email']
        }
      ]
    });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
};