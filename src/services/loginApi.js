import axios from "axios";

const baseUrl = "http://localhost:3001/login/";

const login = async (user) => {
  const response = await axios.post(baseUrl, user);
  return response;
};

export default {
  login,
};
