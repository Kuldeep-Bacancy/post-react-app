import axios from "axios";
import { userURL } from "../constants";


export const getUsers = async () => {
  const response = await axios.get(userURL)
  return response.data
}

export const getUser = async (userId) => {
  const response = await axios.get(`${userURL}/${userId}`)
  return response.data
}