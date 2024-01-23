import React from 'react'
import { getTodos } from '../../services/todos'
import { useQuery } from '@tanstack/react-query'
import Loader from '../Loader'
import Error from '../others/Error'
import AddTodo from './AddTodo'
import TodoList from './TodoList'

function AllTodos() {
  const { data: todos, isError, isFetching, isPending, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos
  })

  console.log("error", error);

  if (isFetching || isLoading || isPending) return <Loader />

  if (isError) return <Error message={error.message} />

  return (
    <div className="max-w-md mx-auto bg-white rounded p-4 shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Todo List</h1>
      <AddTodo/>
      <TodoList todos={todos} />
    </div>
  )
}

export default AllTodos