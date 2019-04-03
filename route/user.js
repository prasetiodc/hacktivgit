const router = require('express').Router()
const userController = require('../controllers/user')

router.get('/star', userController.getRepoStar)
router.get('/star/:nameRepo', userController.searchRepoStar)
router.post('/', userController.createRepo) 
router.delete('/deleteStar/:owner/:repo', userController.deleteStar)
router.get('/searchUserRepo/:user', userController.searchRepo) 

module.exports= router