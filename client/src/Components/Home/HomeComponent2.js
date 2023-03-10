import React, { useEffect, useState } from "react";
import { getProducts } from "../../axios/services/userServices";
import img1 from "../../images/ecomBanner.png";
import S22 from "../../images/S22Img.jpg";
import "./HomeComponent.css";

function HomeComponent2() {
  const [products,setProducts]=useState([])
  useEffect(() => {
   fetchProduct()

   async function fetchProduct(){
    const data=await getProducts()
    setProducts(data.products)
   }
  }, [])
  console.log(products,'pr');
  
  return (
    <div className="p-5">
      <h4>Best Deals</h4>
      <div className="container d-flex justify-content-center mt-50 mb-50">
        <div className="row">

          {products?products.map((data,index)=>{
            return(

          
          <div key={index} className="col-md-4 mt-2">
            <div className="card">
              <div className="card-body">
                <div className="card-img-actions">
                  <img
                    src={data.imageUrl}
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
                    <p href="#" className="text-default mb-2" data-abc="true">
                      {data.name}
                    </p>
                  </h6>
                 
                </div>
                <h3 className="mb-0 font-weight-semibold">₹{data.price}</h3>
                <div>
                  <i className="fa fa-star star" />
                  <i className="fa fa-star star" />
                  <i className="fa fa-star star" />
                  <i className="fa fa-star star" />
                </div>
                <div className="text-muted mb-3">34 reviews</div>
                <button type="button" className="btn bg-cart">
                  <i className="fa fa-cart-plus mr-2" /> Add to cart
                </button>
              </div>
            </div>
          </div>
            )
          }):'No Products Found'}

        </div>
      </div>
    </div>
  );
}

export default HomeComponent2;
