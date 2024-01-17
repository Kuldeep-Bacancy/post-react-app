import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { getPost } from '../../services/posts'
import { useQuery } from '@tanstack/react-query'
import Loader from '../Loader'
import Error from '../others/Error'


function ShowPost() {
  const { postId } = useParams()

  const { data, isPending, isFetching, isLoading, isError, error } = useQuery({
    queryKey: ['post'],
    queryFn: () => getPost(postId)
  })

  if (isPending || isFetching || isLoading) return <Loader />

  if (isError) return <Error message={error.message} />

  const { title, body, userId, tags, reactions } = data

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md mt-3">
      <Link to="/" className="text-blue-500 mb-4 inline-block">&larr; Back to All Posts</Link>
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <p className="text-gray-600 mb-4">{body}</p>

      <div className="flex items-center text-sm text-gray-500 mb-4">
        <span className="mr-2">Posted by User {userId}</span>
        <span>&bull;</span>
        <span className="mx-2">Tags: </span>
        {
          tags.map((tag) => {
            return <span key={tag} className='mr-2'>#{tag}</span>
          })
        }
      </div>

      <div className="flex items-center">
        <div className="mr-4">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M12 6v6m0 6V6m0 6h6M12 6H6"></path>
          </svg>
          <span className="ml-1">{reactions}</span>
        </div>
      </div>
    </div>
  )
}

export default ShowPost