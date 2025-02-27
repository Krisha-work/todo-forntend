import instance from "../../utils/apiHelper";

const SIGN_UP_POST_URL = "user/register";
const LOGIN_POST_URL = "user/login";
const GET_USER_DATA_GET_URL = "user/userdata";
const UPDATE_USER_DATA_PUT_URL = "user/user";
const DELETE_USER_DATA_DELETE_URL = "user/logout";

export const signupRoute = (data) => {
  return instance.post(`${SIGN_UP_POST_URL}`, data);
};

export const loginRoute = (data) => {
  return instance.post(LOGIN_POST_URL, data);
};

export const getUserRoute = () => {
  return instance.get(GET_USER_DATA_GET_URL);
};

export const updateUserRoute = (id, data) => {
  return instance.put(`${UPDATE_USER_DATA_PUT_URL}/${id}`, data);
};

export const deleteUserRoute = (id) => {
  return instance.delete(`${DELETE_USER_DATA_DELETE_URL}/${id}`);
};


