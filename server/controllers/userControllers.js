const jwt = require("jsonwebtoken");
const userUtilities = require("../utilities/userUtilities");

const userSignup = (req, res) => {
  const data = req.body;
  delete data.confirmPassword;
  userUtilities
    .doUserSignup(data)
    .then((response) => {
      if (response.emailFound) {
        res.json({
          status: "error",
          error: "This email or phone number already exists,try another one.",
        });
      } else {
        res.json({ status: "success" });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const userLogin = (req, res) => {
  const data = req.body;
  userUtilities.doUserLogin(data).then((response) => {
    if (response.status) {
      const token = jwt.sign(
        {
          userId: response.user._id,
          name: response.user.name,
        },
        process.env.JWT_SECRET_KEY
      );
      return res.json({ status: "ok", user: token });
    }
    return res.json({ status: "error", user: false });
  });
};

const addProduct = (req, res) => {
  const data = req.body;
  data.stock = parseInt(data.stock);

  userUtilities
    .addProduct(data)
    .then(() => {
      res.json({ status: "ok" });
    })
    .catch((err) => {
      console.log(err);
      res.json({ status: "error" });
    });
};

const getAllProducts = (req, res) => {
  userUtilities
    .getAllProducts()
    .then((details) => {
      res.json({ status: "ok", products: details });
    })
    .catch((err) => {
      console.log(err);
    });
};

const addToCart = (req, res) => {
  const proId = req.params.id;
  const userId = req.user._id;
  userUtilities
    .addToCart(proId, userId)
    .then((details) => {
      res.json({ status: "ok", products: details });
    })
    .catch((err) => {
      res.json({ status: "error", message: err });
    });
};

const removeCart = (req, res) => {
  const proId = req.params.id;
  const userId = req.user._id;
  userUtilities
    .removeCart(proId, userId)
    .then((details) => {
      res.json({ status: "ok", products: details });
    })
    .catch((err) => {
      res.json({ status: "error", message: err });
    });
};

const getCart = (req, res) => {
  const userId = req.user._id;
  userUtilities
    .getCart(userId)
    .then((details) => {
      res.json({ status: "ok", cartProducts: details });
    })
    .catch((err) => {
      console.log(err);
    });
};
const getCartProducts = (req, res) => {
  const userId = req.user._id;
  userUtilities
    .getCartProducts(userId)
    .then((details) => {
      res.json({ status: "ok", cartProducts: details });
    })
    .catch((err) => {
      console.log(err);
    });
};

const addCartCount = (req, res) => {
  const proId = req.params.id;
  const userId = req.user._id;
  userUtilities
    .addCartCount(proId, userId)
    .then((details) => {
      res.json({ status: "ok", cartProducts: details });
    })
    .catch((err) => {
      res.json({ status: "error", message: err });
    });
};

const decrementCartCount = (req, res) => {
  const proId = req.params.id;
  const userId = req.user._id;
  userUtilities
    .decrementCartCount(proId, userId)
    .then((details) => {
      res.json({ status: "ok", cartProducts: details });
    })
    .catch((err) => {
      res.json({ status: "error", message: err });
    });
};

const removeProduct = (req, res) => {
  const proId = req.params.id;
  const userId = req.user._id;
  userUtilities
    .removeProduct(proId, userId)
    .then((details) => {
      res.json({ status: "ok", cartProducts: details });
    })
    .catch((err) => {
      res.json({ status: "error", message: err });
    });
};
module.exports = {
  userSignup,
  userLogin,
  addProduct,
  getAllProducts,
  addToCart,
  getCart,
  removeCart,
  getCartProducts,
  addCartCount,
  decrementCartCount,
  removeProduct,
};
