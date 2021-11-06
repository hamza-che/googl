import React, {useEffect} from 'react';
import { useLocation } from 'react-router';
import ReactPlayer from 'react-player';

import { useResultsContext } from '../contexts/ResultsContextProvider';
import { Loading } from './Loading';

export const Results = () => {
  const { results, isLoading, searchTerm, getResults } = useResultsContext();
  const location = useLocation();

  useEffect(() => {
    if (searchTerm) {
      if (location.pathname === '/videos') {
        getResults(`/search/q=${searchTerm} videos`)
      } else {
        getResults(`${location.pathname}/q=${searchTerm}&num=50`)
      }
    }
  }, [searchTerm, location.pathname])

  if (isLoading) return <Loading/>;

  switch (location.pathname) {
    case '/search':
      return (
        <div className='flex flex-wrap justify-between space-y-6 sm:px-56'>
          {
            results?.map(({title, link}, index) => (
              <div key={index} className='md:w-2/5 w-full'>
                <a href={link} target='_blank' rel='noreferrer'>
                  <p className='text-sm'>
                    {link.length > 30 ? link.substring(0, 30) : link}
                  </p>
                  <p className='text-lg text-blue-700 dark:text-blue-300 hover:underline'>
                    {title}
                  </p>
                </a>
              </div>
            ))
          }
        </div>
      )
    case '/images':
      return (
        <div className='flex flex-wrap justify-center items-center'>
          {
            results?.map(({image, link:{title, href}}, index) => (
              <a href={href} key={index} className='sm:p-3 p-2 m-3' target='_blank' rel='noreferrer'>
                <img src={image?.src} alt={title} className='w-full' loading='lazy' />
                <p className='text-sm w-36 break-words sm:mt-2'>
                  {title}
                </p>
              </a>
            ))
          }
        </div>
      )
    case '/news':
      return (
        <div className='flex flex-wrap justify-between space-x-3 space-y-6 sm:px-56 items-center'>
          {
            results?.map(({title, links, id, source}) => (
              <div key={id} className='md:w-2/5 w-full'>
                <a href={links?.[0]?.href} target='_blank' rel='noreferrer' className='hover:underline'>
                  <p className='text-lg text-blue-700 dark:text-blue-300 hover:underline'>
                    {title}
                  </p>
                </a>
                  <div className='flex gap-4'>
                    <a href={source?.href} target='_blank' rel='noreferrer' className='hover:underline break-words'>
                      {source?.href}
                    </a>
                  </div>
              </div>
            ))
          }
        </div>
      )
    case '/videos':
      return (
        <div className="flex flex-wrap justify-center">
          {console.log(results)}
          {
            results.map((video, index) => (
              <div key={index} className="p-2">
                <ReactPlayer url={video.additional_links?.[0].href} controls width='355px' height='200px' />
              </div>
            ))
          }
        </div>
      )
    default:
      return 'ERROR!'
  }
}
