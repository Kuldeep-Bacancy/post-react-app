import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getUsers } from '../../services/users';
import { createPost } from '../../services/posts';
import { useMutation } from '@tanstack/react-query';

function NewPost() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [options, setOptions] = useState([])

  const addPost = useMutation({
    mutationFn: (data) => {
      createPost(data)
    }
  })

  useEffect(()=>{
    async function getData() {
      const response = await getUsers()
      const results = []
      response.users.forEach((user) => {
        results.push({ id: user.id, name: `${user?.firstName} ${user?.lastName}`})
      })
      setOptions(results)
    }
    getData()
  }, [])

  const submitHandler = (data) => {
    const tags = data?.tags?.split(",").map((tag) => tag.trim())
    const newData = {...data, tags: tags }
    addPost.mutate(newData)
  }

  
  return (
    <div className="max-w-2xl mx-auto mt-8 p-8 bg-white shadow-md">
      <ul className='mb-3'>
        <span>Notes:</span>
        <li className='text-red-400'>Adding a new post will not add it into the server.We have used dummy server</li>
        <li className='text-red-400'>It will simulate a POST request and will return the new created post with a new id</li>
      </ul>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
          <input type="text" id="title" name="title" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="Enter the title" {...register('title', { required: 'Title is required!' }) } />
          <p className='error'>{errors.title?.message}</p>
        </div>

        <div className="mb-4">
          <label htmlFor="body" className="block text-gray-700 text-sm font-bold mb-2">Body:</label>
          <textarea id="body" name="body" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="Enter the body" {...register('body', { required: 'Body is required!' })}></textarea>
          <p className='error'>{errors.body?.message}</p>
        </div>
  
        <div className="mb-4">
          <label htmlFor="userId" className="block text-gray-700 text-sm font-bold mb-2">User ID:</label>
          <select id="userId" name="userId" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" {...register('userId', { required: 'User is required!' })}>
            {
              options?.map((option) => {
                return <option key={option.id} value={option.id}>{option.name}</option>
              })
            }
          </select>
          <p className='error'>{errors.userId?.message}</p>
        </div>

        <div className="mb-4">
          <label htmlFor="tags" className="block text-gray-700 text-sm font-bold mb-2">Tags (comma-separated):</label>
          <input type="text" id="tags" name="tags" className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500" placeholder="e.g., tag1, tag2, tag3" {...register('tags', { required: 'Tags is required!' })} />
          <p className='error'>{errors.tags?.message}</p>
        </div>

        <div className="flex items-center justify-center">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-700">{ addPost.isPending ? "Adding Post" : 'Create Post' }</button>
        </div>
      </form> 
    </div>
  )
}

export default NewPost