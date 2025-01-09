// config.js
const BASE_URL = "https://breado-backened.onrender.com";

export const API = {
  LOGIN: `${BASE_URL}/auth/login`,
  SIGNUP: `${BASE_URL}/auth/signup`,

  getProfile: `${BASE_URL}/auth/getProfile`,
  getSellers: `${BASE_URL}/records/getSellers`,
  getProducts: `${BASE_URL}/records/getProducts`,
  getRecord: `${BASE_URL}/records/getRecord`,
  addProduct: `${BASE_URL}/product/add`,
  deleteProduct: `${BASE_URL}/product/delete`,
  updateProduct: `${BASE_URL}/product/update`,
  createOrder: `${BASE_URL}/orders/create`,
  paymentForOrder: `${BASE_URL}/orders/paymentDeposit`,
  getAllExpense: `${BASE_URL}/records/expenseOverview`,
  getOrderStat: `${BASE_URL}/records/getOrderStat`,
  addExpense: `${BASE_URL}/expense/add`,
  // Add more endpoints as needed
};

export default BASE_URL;
