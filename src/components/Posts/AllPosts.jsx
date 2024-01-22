import React from 'react'
import Post from './Post'
import { getAllPosts } from '../../services/posts'
import { useInfiniteQuery, useQueries } from '@tanstack/react-query'
import Loader from '../Loader'
import Error from '../others/Error'
import { getUser } from '../../services/users'
import InfiniteScroll from 'react-infinite-scroll-component'

function AllPosts() {
  const {
    data,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: getAllPosts,
    getNextPageParam(lastPage) {
      if(lastPage.prevSkip + 20 > lastPage.total){
        return false
      }
      return lastPage.prevSkip + 20
    }
  })


  const posts = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.posts]
  }, [])

  const authorIds = posts?.map((post) => post.userId)

  const postIds = posts?.map((post) => post.id )

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

  if (isError) return <Error message={error.message} />

  return (
    <div className="flex flex-col min-h-screen">
      <InfiniteScroll 
        dataLength={data?.pages ? data?.pages.length : 0}
        next={() => fetchNextPage()}
        hasMore={hasNextPage}
        loading={<Loader />}
      >
        <div className="container mx-auto p-8 flex-grow">
          <h2 className="text-2xl font-bold mb-4 text-center">Latest Posts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {
              posts?.map((post) => (
                <Post key={post.id} content={post} usersData={usersData} />
              ))
            }
          </div>
        </div>
      </InfiniteScroll>
    </div>
  )
}

export default AllPosts