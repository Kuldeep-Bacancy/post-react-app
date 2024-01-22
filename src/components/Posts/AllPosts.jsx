import React, { useState } from 'react'
import Post from './Post'
import { getAllPosts } from '../../services/posts'
import { useQueries, useQuery } from '@tanstack/react-query'
import Loader from '../Loader'
import Error from '../others/Error'
import { getUser } from '../../services/users'

function AllPosts() {
  const [skipPost, setSkipPost ] = useState(0)

  const { data, isPending, isFetching, isLoading, isError, error } = useQuery({
    queryKey: ['posts', skipPost],
    queryFn: () => getAllPosts(skipPost)
  })

  const authorIds = data?.posts?.map((post) => post.userId)

  const postIds = data?.posts?.map((post) => post.id )

  const lastPostId = postIds && postIds.length > 0 ? postIds[postIds.length - 1] : undefined; 
  
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

  const loadPreviousPosts = () => {
    if (skipPost >= 20) {
      setSkipPost(skipPost - 20);
    }
  };

  const loadNextPosts = () => {
    if (lastPostId !== undefined) {
      setSkipPost(lastPostId);
    }
  };

  if (isPending || isFetching || isLoading) return <Loader />

  if (isError) return <Error message={error.message} />

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto p-8 flex-grow">
        <h2 className="text-2xl font-bold mb-4 text-center">Latest Posts</h2>
        <div className="flex flex-row mx-auto">
          <button type="button" className="bg-gray-800 text-white rounded-l-md border-r border-gray-100 py-2 hover:bg-red-700 hover:text-white px-3" onClick={loadPreviousPosts}>
            <div className="flex flex-row align-middle">
              <svg className="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
              </svg>
              <p className="ml-2">Prev</p>
            </div>
          </button>
          <button type="button" className="bg-gray-800 text-white rounded-r-md py-2 border-l border-gray-200 hover:bg-red-700 hover:text-white px-3" onClick={loadNextPosts}>
            <div className="flex flex-row align-middle">
              <span className="mr-2">Next</span>
              <svg className="w-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </div>
          </button>
        </div>
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