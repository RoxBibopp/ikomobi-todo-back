const express = require('express');
const router = express.Router();
const boardController = require('../controllers/boardController');
const auth = require('../middlewares/auth');

router.use(auth);

router.get('/', boardController.getBoard);
router.get('/collaborations', boardController.getCollaborativeBoards);
router.post('/:boardId/invite', boardController.inviteUser);

module.exports = router;
