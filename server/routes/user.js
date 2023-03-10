const express = require('express');
const router = express.Router();
const userController=require('../controllers/userControllers')


router.post('/signup',userController.userSignup)
router.post('/login',userController.userLogin)
router.post('/addProduct',userController.addProduct)
router.get('/getProducts',userController.getAllProducts)



module.exports = router;