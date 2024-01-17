import React from 'react'
import Post from './Post'
import { getAllPosts } from '../../services/posts'
import { useQuery } from '@tanstack/react-query'
import Loader from '../Loader'
import Error from '../others/Error'

function AllPosts() {
  const { data, isPending, isFetching, isLoading, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: getAllPosts
  })

  if (isPending || isFetching || isLoading) return <Loader />

  if (isError) return <Error message={error.message} />

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto p-8 flex-grow">
        <h2 className="text-2xl font-bold mb-4 text-center">Latest Posts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {
          data?.posts?.map((post) => (
            <Post key={post.id} content={post} />
          ))
        }
        </div>
      </div>
    </div>
  )
}

export default AllPosts