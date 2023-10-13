import API from "./api";

export const login = (email, password) => {
  return API.post('/users/login/', { email, password })
}

export const signup = (data) => {
  return API.post('/users/signup/', { ...data })
}
