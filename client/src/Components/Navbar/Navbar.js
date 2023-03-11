import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { BsBasket } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { AiOutlineLogout } from "react-icons/ai";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from 'react-redux';
import { cartCount, userLoginDetails } from "../../redux/userReducer";
import Swal from 'sweetalert2';


function Navbar() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const user = useSelector((state) => state.user.userDetails);
  const count = useSelector((state) => state.user.cart);

console.log(count,'count');
  const logout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to Logout!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('userToken');

    dispatch(userLoginDetails(null));
    dispatch(cartCount(null))
    navigate('/');
    window.location.reload()
        Swal.fire('Logged out!', 'You have been logged out', 'success');
      }
    });
  };
  return (
    <div className="p-2">
      <nav className="navbar navbar-expand-lg navbar-light bg-white ">
        <div className="container-fluid">
         <Link to={'/'}><p className="navbar-brand font-weight-bold">
            logoipsum
          </p></Link> 
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <p className="nav-link active" aria-current="page" href="#"></p>
              </li>
              <li className="nav-item">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary.bg-gradient dropdown-toggle p-2"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    classifieds
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <p className="dropdown-item" href="#">
                        Action
                      </p>
                    </li>
                    <li>
                      <p className="dropdown-item" href="#">
                        Another action
                      </p>
                    </li>
                    <li>
                      <p className="dropdown-item" href="#">
                        Something else here
                      </p>
                    </li>
                  </ul>
                </div>
              </li>

              <li>
                <div className="input-group p-2">
                  <div className="form-outline">
                    <input type="search" id="form1" className="form-control" />
                  </div>
                  <button type="button" className="btn btn-primary">
                    <BsSearch />
                  </button>
                </div>
              </li>
            </ul>

            <div className="p-2">
              <AiOutlineHeart size={24} />
            </div>

            <div className="p-2">
              <BsBasket size={24} />
              {count>0?"":""}
            </div>

            <div className="p-2">
              {user==null?
              <Link to={"/login"} className="link text-decoration-none">
                <FaUserCircle size={24} style={{ color: "black" }} />
              </Link>
             
                : <Link><AiOutlineLogout size={24} style={{ color: "black" }} onClick={logout} /></Link>
             }
            </div>

            <div className="d-grid gap-2 d-md-flex justify-content-md-end p-3">
              <button className="btn btn-info text-white" type="button">
                classifieds
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
