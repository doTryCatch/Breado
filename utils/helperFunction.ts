//access seller users record with their name and id
import axios from "axios";
//fetch data function only for get request
export const fetchData = async (url: string) => {
  try {
    const response = await axios.get(url, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.log("Error:", error);
    throw new Error(error.message);
  }
};
export const placeOrder = async (
  url: string,
  orderData: {
    userId: number;
    products: { productId: number; productQuantity: number }[];
  },
) => {
  try {
    const response = await axios.post(url, orderData, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Error:", error);
  }
};

export const getRecord = async (url: string) => {
  try {
    const response = await axios.get(url, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching records:", error);
    if (error.response && error.response.data) {
      console.error("Error Message:", error.response.data.message);
    }
  }
};
