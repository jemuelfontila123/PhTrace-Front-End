import axios from "axios";
const baseUrl = "http://localhost:3001/establishments";
const dohUrl = "http://localhost:3001/doh";
let config = null;
let token = null;
const setHeaders = (token) => {
  config = {
    headers: { Authorization: token },
  };
};
const setToken = (value) => {
  token = `bearer ${value}`;
  setHeaders(token);
};

const register = async (establishment) => {
  const response = await axios.post(`${baseUrl}/register`, establishment);
  return response;
};
const addUser = async (userInstance) => {
  const response = await axios.post(`${baseUrl}`, userInstance, config);
  return response;
};
const update = async (data) => {
  const response = await axios.put(`${baseUrl}`, data, config);
  return response;
};
const addEmployee = async (employee) => {
  const response = await axios.post(`${baseUrl}/employee`, employee, config);
  return response;
};
const delUser = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response;
};
const delEmployee = async (id) => {
  const response = await axios.delete(`${baseUrl}/employee/${id}`, config);
  return response;
};
const getData = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`, config);
  return response;
};
const addNotification = async () => {
  const response = await axios.get(dohUrl, config);
  return response;
};
const deleteNotification = async (id) => {
  const response = await axios.delete(`${baseUrl}/notification/${id}`, config);
  return response;
};
export default {
  register,
  addUser,
  addEmployee,
  delUser,
  delEmployee,
  setToken,
  getData,
  update,
  addNotification,
  deleteNotification,
};
