var express = require('express');
var router = express.Router();

var taskCtrl = require('../controllers/taskCtrl');

router.get('/:id/tasks', taskCtrl.index);
router.post('/:id/tasks', taskCtrl.addTask);
router.get('/:id/tasks/:tid', taskCtrl.show);
router.delete('/:id/tasks/:tid', taskCtrl.destroy);
router.put('/:id/tasks/:tid', taskCtrl.update);

module.exports = router;