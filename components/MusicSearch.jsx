"use client"
import React, { useState } from 'react'
import { FaSpinner } from 'react-icons/fa6';
import { FiSearch } from 'react-icons/fi';
import { IoAdd } from 'react-icons/io5';
import { useData } from "@/providers/DataContext";
const MusicSearch = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchSpinner, setSearchSpinner] = useState(false);
  const {roomId} = useData();

  const fetchYouTubeResults = async () => {
    try {
      setSearchSpinner(true);
      const response = await fetch(`/api/search-music?query=${encodeURIComponent(query)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch results');
      }

      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
    finally{
      setSearchSpinner(false);
    }
  };

  const handleQueryChanges = (e) =>{
    const value = e.target.value;
    setQuery(value);
  }

  const addMusicToQueue = async(data) => {
    const response = await fetch("/api/add-music-to-queue",{
      method:'POST',
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        data,
        roomId:roomId
      })
    })
    const result = await response.json();
    console.log(result);
  }
  return (
    <div className="flex h-[50%] flex-col items-center justify-end w-full pr-4">
      <div className='flex w-full gap-2'>
        <input type="text" 
        className="rounded-xl border border-gray-500 p-4 w-full bg-transparent text-white" 
        placeholder="Search for songs..."
        value={query}
        onChange={handleQueryChanges}/>
        <button className='text-3xl border border-gray-500 p-4 rounded-xl' onClick={fetchYouTubeResults}> <FiSearch/> </button>
      </div>
        <div className="m-3 px-4 pt-10 bg-gray-800 w-full rounded-xl flex flex-col overflow-scroll items-center justify-center">
          {searchSpinner === true &&<FaSpinner className='text-2xl animate-spin'/>}
          {searchResults.length===0?
          <span className="text-gray-400 text-xl">No songs to show..</span>
          :
          searchResults.map((result)=>(
            <div key={result.id.videoId} className='flex w-full p-2 justify-start items-center gap-2'>
              <img
                src={result.snippet.thumbnails.default.url}
                alt={result.snippet.title}
                className='h-[70px] w-[70px]'
              />
              <span>{result.snippet.title.slice(0,50)}...</span>
              <button className='text-2xl rounded-full border border-gray-500 p-2' onClick={()=>{addMusicToQueue(result)}}>
                <IoAdd/>
              </button>
            </div>
          ))
          }
        </div>
    </div>
  )
}

export default MusicSearch
