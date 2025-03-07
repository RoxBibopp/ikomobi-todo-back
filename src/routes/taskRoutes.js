const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const taskController = require('../controllers/taskController');

router.use(auth); 

router.get('/', taskController.getTasks);
router.post('/', taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
router.get('/collaborations', taskController.getCollaborativeTasks);
module.exports = router;
