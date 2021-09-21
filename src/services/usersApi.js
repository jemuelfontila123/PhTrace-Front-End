import axios from "axios";

const baseUrl = "http://localhost:3001/users/";
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
const register = async (user) => {
  const response = await axios.post(`${baseUrl}register`, user);
  return response;
};
const getData = async (id) => {
  const response = await axios.get(`${baseUrl}${id}`, config);
  return response;
};
const getQR = async (user) => {
  const response = await axios.post(`${baseUrl}getqr`, { id: user.id }, config);
  return response;
};
const update = async (firstName, lastName, email, password) => {
  const response = await axios.post(
    `${baseUrl}update`,
    { firstName, lastName, email, password },
    config
  );
  return response;
};
const verifyCode = async (user, code) => {
  const response = await axios.post(
    `${baseUrl}verify`,
    { id: user.id, code: code },
    config
  );
  return response;
};
const healthCheck = async (user, checked) => {
  const response = await axios.post(
    `${baseUrl}healthcheck`,
    { id: user.id, checked },
    config
  );
};
const uploadImage = async (file) => {
  const response = await axios.post(`${baseUrl}upload`, file, config);
  return response.data;
};
export default {
  register,
  setToken,
  getQR,
  uploadImage,
  verifyCode,
  getData,
  healthCheck,
  update,
};
