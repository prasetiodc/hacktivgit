const router = require('express').Router()
const userController = require('../controllers/user')

router.get('/star', userController.getRepoStar)//list repo star
router.post('/', userController.createRepo) //create repo ok
router.delete('/deleteStar/:owner/:repo', userController.deleteStar)//delete star ok
router.get('/searchUserRepo/:user', userController.searchRepo) //search repo by username

//release 2
router.get('/star/:nameRepo', userController.searchRepoStar)



module.exports= router