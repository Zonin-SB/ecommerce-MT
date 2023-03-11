const bcrypt = require("bcrypt");
const collection = require("../config/collection");
const db = require("../config/connection");
const { ObjectId } = require("mongodb");

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

  findUserById: (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await db
          .get()
          .collection(collection.USER_COLLECTION)
          .findOne({ _id: ObjectId(userId) });

        resolve(user);
      } catch (error) {
        reject();
      }
    });
  },

  addToCart: (proId, userId) => {
    let proObj = {
      item: ObjectId(proId),
      quantity: 1,
    };

    return new Promise(async (resolve, reject) => {
      try {
        let userCart = await db
          .get()
          .collection(collection.CART_COLLECTION)
          .findOne({ user: userId });

        if (userCart) {
          db.get()
            .collection(collection.CART_COLLECTION)
            .updateOne(
              { user: userId },
              {
                $push: { products: proObj },
              }
            )
            .then(async () => {
              await db
                .get()
                .collection(collection.PRODUCT_COLLECTION)
                .updateOne({ _id: ObjectId(proId) }, { $inc: { stock: -1 } })
                .then(async () => {
                  const products = await db
                    .get()
                    .collection(collection.PRODUCT_COLLECTION)
                    .find()
                    .toArray();

                  resolve(products);
                });
            });

          // resolve();
        } else {
          let cartObj = {
            user: userId,
            products: [proObj],
          };
          db.get()
            .collection(collection.CART_COLLECTION)
            .insertOne(cartObj)
            .then(async (response) => {
              await db
                .get()
                .collection(collection.PRODUCT_COLLECTION)
                .updateOne({ _id: ObjectId(proId) }, { $inc: { stock: -1 } })
                .then(async () => {
                  const products = await db
                    .get()
                    .collection(collection.PRODUCT_COLLECTION)
                    .find()
                    .toArray();

                  resolve(products);
                });
            });
        }
      } catch (error) {
        reject(error);
      }
    });
  },

  getCart: (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const cartProducts = await db
          .get()
          .collection(collection.CART_COLLECTION)
          .find({ user: userId })
          .toArray();
        resolve(cartProducts);
      } catch (error) {
        console.log(error);
      }
    });
  },

  removeCart: (proId, userId) => {
    return new Promise(async (resolve, reject) => {
      const product = await db
        .get()
        .collection(collection.CART_COLLECTION)
        .aggregate([
          {
            $match: {
              user: userId,
            },
          },
          {
            $unwind: "$products",
          },

          {
            $match: {
              "products.item": ObjectId(proId),
            },
          },
          {
            $project: {
              products: 1,
            },
          },
        ])
        .toArray();
      const quantity = product[0].products.quantity;

      db.get()
        .collection(collection.CART_COLLECTION)
        .updateOne(
          { user: userId },
          {
            $pull: { products: { item: ObjectId(proId) } },
          }
        )
        .then(async () => {
          await db
            .get()
            .collection(collection.PRODUCT_COLLECTION)
            .updateOne({ _id: ObjectId(proId) }, { $inc: { stock: quantity } });
        })
        .then(async () => {
          const data = await db
            .get()
            .collection(collection.PRODUCT_COLLECTION)
            .find()
            .toArray();

          resolve(data);
        });
    });
  },

  getCartProducts: (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        let cartItems = await db
          .get()
          .collection(collection.CART_COLLECTION)
          .aggregate([
            {
              $match: { user: userId },
            },
            {
              $unwind: "$products",
            },
            {
              $project: {
                item: "$products.item",
                quantity: "$products.quantity",
              },
            },
            {
              $lookup: {
                from: collection.PRODUCT_COLLECTION,
                localField: "item",
                foreignField: "_id",
                as: "products",
              },
            },
            {
              $project: {
                item: 1,
                quantity: 1,
                product: { $arrayElemAt: ["$products", 0] },
              },
            },
          ])
          .toArray();
        resolve(cartItems);
      } catch (error) {
        console.log(error);
      }
    });
  },

  addCartCount: (proId, userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { stock } = await db
          .get()
          .collection(collection.PRODUCT_COLLECTION)
          .findOne({ _id: ObjectId(proId) });
        if (stock < 1) {
          const err = "This product is out of stock...";
          reject(err);
        } else {
          db.get()
            .collection(collection.CART_COLLECTION)
            .updateOne(
              { user: userId, "products.item": ObjectId(proId) },
              {
                $inc: { "products.$.quantity": 1 },
              }
            )
            .then(async () => {
              await db
                .get()
                .collection(collection.PRODUCT_COLLECTION)
                .updateOne({ _id: ObjectId(proId) }, { $inc: { stock: -1 } })
                .then(async () => {
                  const cartItems = await db
                    .get()
                    .collection(collection.CART_COLLECTION)
                    .aggregate([
                      {
                        $match: { user: userId },
                      },
                      {
                        $unwind: "$products",
                      },
                      {
                        $project: {
                          item: "$products.item",
                          quantity: "$products.quantity",
                        },
                      },
                      {
                        $lookup: {
                          from: collection.PRODUCT_COLLECTION,
                          localField: "item",
                          foreignField: "_id",
                          as: "products",
                        },
                      },
                      {
                        $project: {
                          item: 1,
                          quantity: 1,
                          product: { $arrayElemAt: ["$products", 0] },
                        },
                      },
                    ])
                    .toArray();
                  resolve(cartItems);
                });
            });
        }
      } catch (error) {
        reject(error);
      }
    });
  },

  decrementCartCount: (proId, userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const product = await db
          .get()
          .collection(collection.CART_COLLECTION)
          .aggregate([
            {
              $match: {
                user: userId,
              },
            },
            {
              $unwind: "$products",
            },

            {
              $match: {
                "products.item": ObjectId(proId),
              },
            },
            {
              $project: {
                products: 1,
              },
            },
          ])
          .toArray();
        const quantity = product[0].products.quantity;

        if (quantity > 1) {
          db.get()
            .collection(collection.CART_COLLECTION)
            .updateOne(
              { user: userId, "products.item": ObjectId(proId) },
              {
                $inc: { "products.$.quantity": -1 },
              }
            )
            .then(async () => {
              await db
                .get()
                .collection(collection.PRODUCT_COLLECTION)
                .updateOne({ _id: ObjectId(proId) }, { $inc: { stock: 1 } });
            })
            .then(async () => {
              const cartItems = await db
                .get()
                .collection(collection.CART_COLLECTION)
                .aggregate([
                  {
                    $match: { user: userId },
                  },
                  {
                    $unwind: "$products",
                  },
                  {
                    $project: {
                      item: "$products.item",
                      quantity: "$products.quantity",
                    },
                  },
                  {
                    $lookup: {
                      from: collection.PRODUCT_COLLECTION,
                      localField: "item",
                      foreignField: "_id",
                      as: "products",
                    },
                  },
                  {
                    $project: {
                      item: 1,
                      quantity: 1,
                      product: { $arrayElemAt: ["$products", 0] },
                    },
                  },
                ])
                .toArray();
              resolve(cartItems);
            });
        } else {
          db.get()
            .collection(collection.CART_COLLECTION)
            .updateOne(
              { user: userId },
              {
                $pull: { products: { item: ObjectId(proId) } },
              }
            )
            .then(async () => {
              await db
                .get()
                .collection(collection.PRODUCT_COLLECTION)
                .updateOne({ _id: ObjectId(proId) }, { $inc: { stock: 1 } });
            })
            .then(async () => {
              const cartItems = await db
                .get()
                .collection(collection.CART_COLLECTION)
                .aggregate([
                  {
                    $match: { user: userId },
                  },
                  {
                    $unwind: "$products",
                  },
                  {
                    $project: {
                      item: "$products.item",
                      quantity: "$products.quantity",
                    },
                  },
                  {
                    $lookup: {
                      from: collection.PRODUCT_COLLECTION,
                      localField: "item",
                      foreignField: "_id",
                      as: "products",
                    },
                  },
                  {
                    $project: {
                      item: 1,
                      quantity: 1,
                      product: { $arrayElemAt: ["$products", 0] },
                    },
                  },
                ])
                .toArray();
              resolve(cartItems);
            });
        }
      } catch (error) {
        reject(error);
      }
    });
  },

  removeProduct: (proId, userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const product = await db
          .get()
          .collection(collection.CART_COLLECTION)
          .aggregate([
            {
              $match: {
                user: userId,
              },
            },
            {
              $unwind: "$products",
            },

            {
              $match: {
                "products.item": ObjectId(proId),
              },
            },
            {
              $project: {
                products: 1,
              },
            },
          ])
          .toArray();
        const quantity = product[0].products.quantity;

        await db
          .get()
          .collection(collection.CART_COLLECTION)
          .updateOne(
            { user: userId },
            {
              $pull: { products: { item: ObjectId(proId) } },
            }
          )
          .then(async () => {
            await db
              .get()
              .collection(collection.PRODUCT_COLLECTION)
              .updateOne(
                { _id: ObjectId(proId) },
                { $inc: { stock: quantity } }
              );
          })
          .then(async () => {
            const cartItems = await db
              .get()
              .collection(collection.CART_COLLECTION)
              .aggregate([
                {
                  $match: { user: userId },
                },
                {
                  $unwind: "$products",
                },
                {
                  $project: {
                    item: "$products.item",
                    quantity: "$products.quantity",
                  },
                },
                {
                  $lookup: {
                    from: collection.PRODUCT_COLLECTION,
                    localField: "item",
                    foreignField: "_id",
                    as: "products",
                  },
                },
                {
                  $project: {
                    item: 1,
                    quantity: 1,
                    product: { $arrayElemAt: ["$products", 0] },
                  },
                },
              ])
              .toArray();
            resolve(cartItems);
          });
      } catch (error) {
        reject(error);
      }
    });
  },
};
