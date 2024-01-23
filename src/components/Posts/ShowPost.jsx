import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { getPost, getPostComments } from '../../services/posts'
import { useQuery } from '@tanstack/react-query'
import Loader from '../Loader'
import Error from '../others/Error'


function ShowPost() {
  const { postId } = useParams()

  const { data, isPending, isFetching, isLoading, isError, error } = useQuery({
    queryKey: ['post'],
    queryFn: () => getPost(postId)
  })

  const { data: comments, refetch } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getPostComments(postId),
    enabled: false
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
          <h2 className="text-xl font-semibold mb-2">Reactions</h2>
          <span className="ml-1">{reactions}</span>
        </div>
      </div>

      <div className="mt-4">
        <button className='text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' onClick={refetch}>Show Comments</button>
        <div className="border-t border-gray-300 py-2">
          {comments?.comments?.map((comment) => (
            <div key={comment.id} className="mb-2">
              <span className="font-semibold">{comment?.user?.username}</span>
              <p className="text-gray-600">{comment.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ShowPost