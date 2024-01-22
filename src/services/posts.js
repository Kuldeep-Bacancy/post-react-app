import axios from "axios";
import { postURL } from "../constants";

export const getAllPosts = async () => {
  const response = await axios.get(postURL)
  return response.data
}

export const getPost = async (postId) => {
  const response = await axios.get(`${postURL}/${postId}`)
  return response.data
}

export const createPost = async (data) => {
  let config = {
    header: {
      'Content-Type': 'application/json',
    }
  }
  const response = await axios.post(`${postURL}/add`, data, config)
  console.log("create post response", response);
  return response.data
}

export const getPostComments = async (postId) => {
  const response = await axios.get(`${postURL}/${postId}/comments`)
  return response.data
}

