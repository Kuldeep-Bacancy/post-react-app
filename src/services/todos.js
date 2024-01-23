import axios from "axios"
import { todosURL } from "../constants"

export const getTodos = async () => {
  const response = await axios.get(`${todosURL}`)
  return response.data
}

export const createTodo = async (todo) => {
  const response = await axios.post(`${todosURL}`, todo)
  return response.data
}

export const deleteTodo = async (todoId) => {
  const response = await axios.delete(`${todosURL}/${todoId}`)
  return response.data
} 
