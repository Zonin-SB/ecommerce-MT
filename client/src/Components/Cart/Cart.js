import React, { useEffect, useState } from "react";
import "./Cart.css";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import {
  addCartCount,
  decrementCartCount,
  getCartProducts,
  removeProduct,
} from "../../axios/services/userServices";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { cartCount } from "../../redux/userReducer";

function Cart() {
  const [cart, setCart] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData();

    async function fetchData() {
      const token = localStorage.getItem("userToken");
      const data = await getCartProducts(token);

      setCart(data.cartProducts);
    }
  }, []);
  //   console.log(cart,'cart');
  const addQuantity = async (id) => {
    const token = localStorage.getItem("userToken");
    const data = await addCartCount(token, id);
    if (data.status === "error") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "This product is out of stock.!",
      });
    } else if (data.status === "ok") {
      setCart(data.cartProducts);
    }
  };

  const removeQuantity = async (id) => {
    const token = localStorage.getItem("userToken");
    const data = await decrementCartCount(token, id);
    setCart(data.cartProducts);
  };

  const remove=(id)=>{
    Swal.fire({
        title: "Are you sure?",
        text: "You want to remove this product!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes!",
      }).then(async(result) => {
        if (result.isConfirmed) {
            const token = localStorage.getItem("userToken");
            const data=await removeProduct(token,id)
            setCart(data.cartProducts);
        }
      });
    
  }


  const cartLength = cart?.length;
  dispatch(cartCount(cartLength));

  return (
    <>
      <link
        href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
        rel="stylesheet"
      />
      <div className="container padding-bottom-3x mb-1">
        {/* Alert*/}
        <div
          className="fade show text-center"
          style={{ marginBottom: 30 }}
        ></div>
        {/* Shopping Cart*/}
        <div className="table-responsive shopping-cart">
          <table className="table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th className="text-center">Quantity</th>
                <th className="text-center">Subtotal</th>
                <th className="text-center">
                  <p className="btn btn-sm btn-outline-danger">Clear Cart</p>
                </th>
              </tr>
            </thead>
            <tbody>
              {cart
                ? cart.map((data, index) => {
                    return (
                      <tr key={index}>
                        <td>
                          <div className="product-item">
                            <p className="product-thumb">
                              <img
                                src={data?.product?.imageUrl}
                                alt="Product"
                              />
                            </p>
                            <div className="product-info">
                              <h4 className="product-title">
                                <p>{data?.product?.name}</p>
                              </h4>
                            </div>
                          </div>
                        </td>
                        <td className="text-center">
                          <div className="d-flex flex-row justify-content-between align-items-center p-2 bg-white mt-4 px-3 rounded">
                            <div className="d-flex flex-row align-items-center qty">
                              <Link>
                                {" "}
                                <div style={{ padding: "10px" }}>
                                  <AiOutlineMinus
                                    size={20}
                                    onClick={() =>
                                      removeQuantity(data?.product?._id)
                                    }
                                  />
                                </div>
                              </Link>
                              <h5 className="text-grey mt-1 mr-1 ml-1 text-center">
                                {data?.quantity}
                              </h5>
                              <Link>
                                <div style={{ padding: "10px" }}>
                                  <AiOutlinePlus
                                    size={20}
                                    onClick={() =>
                                      addQuantity(data?.product?._id)
                                    }
                                  />
                                </div>
                              </Link>
                            </div>
                          </div>
                        </td>
                        <td className="text-center text-lg text-medium">
                          ₹{data?.quantity * data?.product?.price}
                        </td>
                        <td className="text-center">
                          <p
                            className="remove-from-cart "
                            data-toggle="tooltip"
                            title=""
                            data-original-title="Remove item"
                          >
                            <i
                              className="fa fa-trash"
                              onClick={() => remove(data?.product?._id)}
                            />
                          </p>
                        </td>
                      </tr>
                    );
                  })
                : ""}
            </tbody>
          </table>
        </div>
        <div className="shopping-cart-footer">
          <div className="column"></div>
        </div>
      </div>
    </>
  );
}

export default Cart;
