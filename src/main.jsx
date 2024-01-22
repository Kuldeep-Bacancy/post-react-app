import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './components/others/Layout.jsx'
import RouterError from './components/others/RouteError.jsx'
import AllPosts from './components/Posts/AllPosts.jsx'
import ShowPost from './components/Posts/ShowPost.jsx'
import NewPost from './components/Posts/NewPost.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'


const queryClient = new QueryClient()

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<RouterError />}>
      <Route path="" element={<AllPosts />} />
      <Route path='/posts/:postId' element={<ShowPost/>} />
      <Route path="/new-post" element={<NewPost/>} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
    </QueryClientProvider>
  </React.StrictMode>,
)
