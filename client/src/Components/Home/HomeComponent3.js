import React from "react";
import logo from "../../images/mt-logo.png";

function HomeComponent3() {
  return (
    <>
      <footer className="text-center text-lg-start bg-white text-muted">
        <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"></section>
        <section className="">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="fw-bold mb-4 font-weight-bold fs-4">
                  <span>
                    {" "}
                    <img src={logo} alt="logo" style={{ width: "40px" }} />
                  </span>
                  logoipsum
                </h6>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
              </div>
              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">QUICK LINKS</h6>
                <p>Products</p>
                <p>Classifieds</p>
                <p>Contact us</p>
                <p>Login</p>
                <p>Sign Up</p>
              </div>
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold mb-4">CUSTOMER AREA</h6>
                <p>My Account</p>
                <p>Orders</p>
                <p>Tracking List</p>
                <p>Terms</p>
                <p>Privacy Policy</p>
                <p>Return Policy</p>
                <p>My Cart</p>
              </div>
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p>
                  <i className="fas fa-home me-3" /> New York, NY 10012, US
                </p>
                <p>
                  <i className="fas fa-envelope me-3" />
                  info@example.com
                </p>

                <p>
                  <i className="fas fa-print me-3" /> + 123 456 789
                </p>
              </div>
            </div>
          </div>
        </section>
      </footer>
    </>
  );
}

export default HomeComponent3;
