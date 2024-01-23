import React from 'react'
import { NavLink } from 'react-router-dom'

function Header() {
  return (
    <header className="bg-gray-800 text-white p-4">
      <h1 className="text-2xl font-bold">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-white hover:underline ${isActive ? "text-orange-700" : "text-gray-700"}`
          }
        >
          My Blog
        </NavLink>
        <span className="mx-2">|</span>
        <NavLink
          to="/new-post"
          className={({ isActive }) =>
            `text-white hover:underline ${isActive ? "text-orange-700" : "text-gray-700"}`
          }
        >
          New Post
        </NavLink>
        <span className="mx-2">|</span>
        <NavLink
          to="/todos"
          className={({ isActive }) =>
            `text-white hover:underline ${isActive ? "text-orange-700" : "text-gray-700"}`
          }
        >
          Todos
        </NavLink>
      </h1>
    </header>
  )
}

export default Header