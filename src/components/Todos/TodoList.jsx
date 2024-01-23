import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { deleteTodo } from '../../services/todos'

function TodoList({ todos }) {
  const queryClient = useQueryClient()

  const deleteTodoMutation = useMutation({
    mutationFn: (todoId) => deleteTodo(todoId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos']
      })
    }
  })
  
  const deleteHandler = (todoId) => {
    deleteTodoMutation.mutate(todoId)
  }

  return (
    <ul>
      {
        todos?.map((todo) => {
          return (
            <li className="flex justify-between items-center p-2 border-b" key={todo.id}>
              <span className="flex-grow">{todo.content}</span>
              <button className="px-3 py-2 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" onClick={() => deleteHandler(todo.id)}>Delete</button>
            </li>
          )
        })
      }
    </ul>
  )
}

export default TodoList