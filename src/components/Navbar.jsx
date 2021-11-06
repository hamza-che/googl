import React from 'react'
import { Link } from 'react-router-dom'

import {Search} from './Search'

export const Navbar = ({darkTheme, setDarkTheme}) => {
  return (
    <div className='p-5 pb-0 flex flex-wrap sm:justify-between justify-center items-center border-b border-gray-200 dark:border-gray-700'>
      <div className='flex items-center justify-between space-x-5 w-screen'>
        <Link to='/'>
          <p className='text-2xl font-bold bg-blue-500 text-white py-1 px-2 rounded dark:bg-gray-500 dark:text-gray-900'>
            Googl 🔎
          </p>
        </Link>
        <button type='button' onClick={() => setDarkTheme(!darkTheme)} className='text-xl bg-white dark:bg-gray-50 dark:text-gray-900 rounded-full border px-2 py-1 hover:shadow-md transition ease-out duration-200'>
          {darkTheme ? '💡 Light' : '🌙 Dark'}
        </button>
      </div>
      <Search />
    </div>
  )
}
