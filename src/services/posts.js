import axios from "axios";

const postURL = 'https://dummyjson.com/posts'

export const getAllPosts = async () => {
  const response = await axios.get(postURL)
  return response.data
}

export const getPost = async (postId) => {
  const response = await axios.get(`${postURL}/${postId}`)
  return response.data
}

