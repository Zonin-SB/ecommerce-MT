const jwt = require('jsonwebtoken');
const userUtilities = require('../utilities/userUtilities');

const userSignup = (req, res) => {
    const data = req.body;
    delete data.confirmPassword;
    userUtilities
      .doUserSignup(data)
      .then((response) => {
        if (response.emailFound) {
          res.json({
            status: 'error',
            error: 'This email or phone number already exists,try another one.',
          });
        } else {
          res.json({ status: 'success' });
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
            return res.json({ status: 'ok', user: token });
          }
          return res.json({ status: 'error', user: false });
    });
  };

  const addProduct = (req, res) => {
    userUtilities
      .addProduct(req.body)
      .then(() => {
        res.json({ status: 'ok' });
      })
      .catch((err) => {
        console.log(err);
        res.json({ status: 'error' });
      });
  };

  const getAllProducts = (req, res) => {
    userUtilities
      .getAllProducts()
      .then((details) => {
        res.json({ status: 'ok', products: details });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  module.exports={
    userSignup,
    userLogin,
    addProduct,
    getAllProducts,
  }