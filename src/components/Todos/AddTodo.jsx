import { useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { createTodo } from '../../services/todos'


function AddTodo() {
  const queryClient = useQueryClient()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const addTodoMutation = useMutation({
    mutationFn: (data) => createTodo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['todos']
      })
    }
  })

  const submitHandler = (data) => {
    addTodoMutation.mutate(data)
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="flex mb-4">
        <input type="text" className="w-full p-2 border rounded-l focus:outline-none" placeholder="Add a new todo" {...register('content', { required: 'Content is required!' })} />
        <button className="bg-blue-500 text-white p-2 rounded-r">Add</button>
      </div>
      <p className='error'>{errors.content?.message}</p>
    </form>
  )
} 

export default AddTodo