import React, { useState } from 'react'
import { FaLocationDot } from 'react-icons/fa6'

const Searchbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className='flexBetween pl-6 h-[3.3rem] bg-white w-full max-w-[366px]
    rounded-full ring-1 ring-slate-500/85'>
      <input 
        type="text" 
        placeholder='Enter Residency name/ City/ Country' 
        className='bg-transparent border-none outline-none w-full'
        value={searchTerm}
        onChange={handleInputChange}
      />
      <button type="submit" className="bg-transparent border-none">
        <FaLocationDot className='relative right-4 text-xl hover:text-secondary cursor-pointer'/>
      </button>
    </form>
  )
}

export default Searchbar
