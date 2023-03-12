import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addToCart,
  getCart,
  getProducts,
  removeFromCart,
} from "../../axios/services/userServices";
import "./HomeComponent.css";
import { cartCount } from "../../redux/userReducer";

function HomeComponent2() {
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProduct();
    fetchCart();
    async function fetchProduct() {
      const data = await getProducts();
      setProducts(data?.products);
    }
  }, []);

  async function fetchCart() {
    const token = localStorage.getItem("userToken");
    if (token) {
      const data = await getCart(token);
      setCartProducts(data?.cartProducts[0]?.products);
    }
  }
  const cartLength = cartProducts?.length;
  dispatch(cartCount(cartLength));

  const addCart = async (id) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      const data = await addToCart(token, id);
      fetchCart();
      setProducts(data?.products);
    } else {
      navigate("/login");
    }
  };
  const removeCart = async (id) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      const data = await removeFromCart(token, id);
      fetchCart();
      setProducts(data?.products);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="p-5">
      <h4>Best Deals</h4>
      <div className="container d-flex justify-content-center mt-50 mb-50">
        <div className="row">
          {products
            ? products.map((data, index) => {
                return (
                  <div key={index} className="col-md-4 mt-2">
                    <div className="card">
                      <div className="card-body">
                        <div className="card-img-actions">
                          <img
                            src={data?.imageUrl}
                            className="card-img img-fluid"
                            width={96}
                            height={350}
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="card-body bg-light text-center">
                        <div className="mb-2">
                          <h6 className="font-weight-semibold mb-2">
                            <p
                              href="#"
                              className="text-default mb-2"
                              data-abc="true"
                            >
                              {data?.name}
                            </p>
                          </h6>
                        </div>
                        <h3 className="mb-0 font-weight-semibold">
                          ₹{data?.price}
                        </h3>
                        <div>
                          <i className="fa fa-star star" />
                          <i className="fa fa-star star" />
                          <i className="fa fa-star star" />
                          <i className="fa fa-star star" />
                        </div>
                        <div className="text-muted mb-3">
                          Stock : {data?.stock}
                        </div>
                        {cartProducts?.some((p) => p.item === data._id) ? (
                          <button
                            type="button"
                            onClick={() => removeCart(data?._id)}
                            class="btn btn-danger"
                          >
                            Remove from cart
                          </button>
                        ) : (
                          <div>
                            {data?.stock < 1 ? (
                              <button
                                type="button"
                                class="btn btn-outline-danger"
                              >
                                Out of stock
                              </button>
                            ) : (
                              <button
                                onClick={() => addCart(data?._id)}
                                type="button"
                                className="btn bg-cart"
                              >
                                <i className="fa fa-cart-plus mr-2" /> Add to
                                cart
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            : "No Products Found"}
        </div>
      </div>
    </div>
  );
}

export default HomeComponent2;
