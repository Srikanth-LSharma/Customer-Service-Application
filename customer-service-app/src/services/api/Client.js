import axios from "axios";

const Client = axios.create({
  baseURL: 'http://localhost:888',
});

const accessToken=localStorage.getItem('access_token');
const dummyaccessToken = "HELLOWORLD"

Client.interceptors.request.use(
  config => {
      config.headers.authorization= `Bearer ${accessToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

Client.interceptors.response.use(
  (response) =>  {
    if(response.status === 401) {
    alert("You are not authorized");
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

export default Client;