import React from 'react'
import Searchbar from '../components/Searchbar'
import { PROPERTIES } from "../constant/data";
import Item from "../components/Item";

const Listing = () => {
  return (
    <main className='max-padd-container my-[99px]'>
      <div className='max-padd-container py-10 xl:py-22 bg-primary rounded-3xl'>
        <div>
          <Searchbar />
          {/* container  */}
          <div className='grid gap-6 grid-cols-1 md:grid-cols-2 
          xl:grid-cols-3 mt-10'>
          {
               PROPERTIES.map((property)=>(
              <Item key={property.title} property={property}/>
                ))
          }
            
          </div>
        </div>
      </div>
    </main>
  )
}

export default Listing
