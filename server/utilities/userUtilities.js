const bcrypt = require("bcrypt");
const collection = require("../config/collection");
const db = require("../config/connection");

module.exports = {
  doUserSignup: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        let email = await db
          .get()
          .collection(collection.USER_COLLECTION)
          .findOne({ email: data.email });

        if (email == null) {
          data.password = await bcrypt.hash(data.password, 10);

          db.get()
            .collection(collection.USER_COLLECTION)
            .insertOne(data)
            .then((data) => {
              resolve(data);
            })
            .catch((error) => {
              reject(error);
            });
        } else {
          resolve({ emailFound: true });
        }
      } catch (error) {
        reject(error);
      }
    });
  },
  doUserLogin: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = {};
        let user = await db
          .get()
          .collection(collection.USER_COLLECTION)
          .findOne({ email: data.email });
        if (user) {
          bcrypt.compare(data.password, user.password).then((status) => {
            if (status) {
              response.user = user;
              response.status = true;
              resolve(response);
            } else {
              resolve({ status: false });
            }
          });
        } else {
          resolve({ status: false });
        }
      } catch (error) {
        reject(error);
      }
    });
  },

  addProduct: (productData) => {
    return new Promise(async (resolve, reject) => {
      try {
        await db
          .get()
          .collection(collection.PRODUCT_COLLECTION)
          .insertOne(productData)
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        console.log(error);
      }
    });
  },

  getAllProducts: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const products = await db
          .get()
          .collection(collection.PRODUCT_COLLECTION)
          .find()
          .toArray();
        resolve(products);
      } catch (error) {
        console.log(error);
      }
    });
  },
};
