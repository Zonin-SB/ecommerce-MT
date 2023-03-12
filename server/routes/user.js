const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers");
const auth = require("../middlewares/tokenAuth");

router.post("/signup", userController.userSignup);
router.post("/login", userController.userLogin);
router.post("/addProduct", userController.addProduct);
router.get("/getProducts", userController.getAllProducts);
router.get("/addToCart/:id", auth.userAuth, userController.addToCart);
router.get("/removeCart/:id", auth.userAuth, userController.removeCart);
router.get("/getCart", auth.userAuth, userController.getCart);
router.get("/getCartProducts", auth.userAuth, userController.getCartProducts);
router.get("/addCartCount/:id", auth.userAuth, userController.addCartCount);
router.get(
  "/decrementCartCount/:id",
  auth.userAuth,
  userController.decrementCartCount
);
router.get("/removeProduct/:id", auth.userAuth, userController.removeProduct);

module.exports = router;
