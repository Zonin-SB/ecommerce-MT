import { axiosUserInstance } from "../axios";

export const userSignup = async (values) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUserInstance.post("/signup", values, config);

    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const userLogin = async (values) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUserInstance.post("/login", values, config);

    if (data) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const addProduct = async (values) => {
    console.log(values,'in ax');
    try {
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
      
        const { data } = await axiosUserInstance.post('/addProduct', values, config);
      
        if (data.status) {
          return data;
        }
    } catch (error) {
        console.log(error);
    }
  
  };

  export const getProducts = async () => {
    try {
        const config = {
            headers: {
              "Content-Type": "application/json",
            },
          };
      
        const { data } = await axiosUserInstance.get('/getProducts',config);
      
        if (data.status) {
          return data;
        }
    } catch (error) {
        console.log(error);
    }
  
  };
