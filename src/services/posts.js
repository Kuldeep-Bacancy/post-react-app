import axios from "axios";
import { postURL } from "../constants";

export const getAllPosts = async (skip) => {
  const response = await axios.get(`${postURL}?skip=${skip}&limit=20`)
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
  return response.data
}

export const getPostComments = async (postId) => {
  const response = await axios.get(`${postURL}/${postId}/comments`)
  return response.data
}

