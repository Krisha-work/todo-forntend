import axios from "axios";


const getHeader = () => {
  const Token = localStorage.getItem("token");
  console.log("Token", Token);
  return {
    Authorization: Token ? Token : "",
  };
};

const instance = axios.create({
  baseURL: "http://localhost:3000/api/",
  // Authorization: Token ? Token : "",
  validateStatus: () => true
  // headers: header(),
});

// instance.defaults.headers.common['Authorization'] = Token ;

// Add a request interceptor
instance.interceptors.request.use(
  async (config) => {
    const header = getHeader()
    config.headers = { ...header, ...config.headers}
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  async (response) => {
    if (response.status == 401 || response.status == 500) {
      console.log(response.response.data.message);
      alert(response.response.data.message);
    }
    return response;
  },
  async (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default instance;
