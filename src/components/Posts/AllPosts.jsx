import React from 'react'
import Post from './Post'
import { getAllPosts } from '../../services/posts'
import { useQueries, useQuery } from '@tanstack/react-query'
import Loader from '../Loader'
import Error from '../others/Error'
import { getUser } from '../../services/users'

function AllPosts() {
  const { data, isPending, isFetching, isLoading, isError, error } = useQuery({
    queryKey: ['posts'],
    queryFn: getAllPosts
  })

  const authorIds = data?.posts?.map((post) => post.userId)

  const usersData = useQueries({
    queries: authorIds
      ? authorIds.map((id) => {
        return {
          queryKey: ['user', id],
          queryFn: () => getUser(id),
        }
      })
      : [], // if users is undefined, an empty array will be returned
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
            <Post key={post.id} content={post} usersData={usersData} />
          ))
        }
        </div>
      </div>
    </div>
  )
}

export default AllPosts