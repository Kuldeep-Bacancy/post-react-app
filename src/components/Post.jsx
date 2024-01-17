import React from 'react'

function Post({ content }) {
  const { id , title, body, userId, tags, reactions } = content
  return (
    <div className="max-w-md bg-white p-8 rounded-md shadow-md" key={id}>
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <p className="text-gray-700 mb-6">{body}</p>
      <div className="flex items-center mb-4">
        <span className="text-gray-500 text-sm">Tags:</span>
        <div className="ml-2">
        {
          tags.map((tag) => {
            return <span key={tag} className="text-blue-500 mx-2">#{tag}</span>
          })
        }
        </div>
      </div>
      <div className="flex items-center text-gray-500 text-sm">
        <span className="mr-2">Reactions: {reactions}</span>
        <span className="mr-2">Author ID: {userId}</span>
      </div>
    </div>
  )
}

export default Post