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
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosUserInstance.post(
      "/addProduct",
      values,
      config
    );

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

    const { data } = await axiosUserInstance.get("/getProducts", config);

    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const addToCart = async (token, id) => {
  try {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosUserInstance.get(`/addToCart/${id}`, config);

    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
export const removeFromCart = async (token, id) => {
  try {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosUserInstance.get(`/removeCart/${id}`, config);

    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCart = async (token) => {
  try {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosUserInstance.get("/getCart", config);

    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCartProducts = async (token) => {
  try {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosUserInstance.get("/getCartProducts", config);

    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const addCartCount = async (token, id) => {
  try {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosUserInstance.get(`/addCartCount/${id}`, config);

    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const decrementCartCount = async (token, id) => {
  try {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosUserInstance.get(
      `/decrementCartCount/${id}`,
      config
    );

    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const removeProduct = async (token, id) => {
  try {
    const config = {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosUserInstance.get(
      `/removeProduct/${id}`,
      config
    );

    if (data.status) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};
