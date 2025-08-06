import React from 'react'
import { Link } from 'react-router-dom'
import {VscSettings} from 'react-icons/vsc'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import 'swiper/css'
import 'swiper/css/pagination'
import { PROPERTIES } from '../constant/data';
import Item from './Item';

const Properties = () => {
  return (
    <section className='max-padd-container '>
        <div className='max-padd-container bg-primary py-16 xl:py-28  rounded-3xl'>
           <span className='medium-18'>Your Future Home Await</span> 
            <h2 className='h2'>Find Your Dream Here</h2>
            <div className='flexBetween mt-8 mb-6'>
                <h5><span className='font-bold'>Showing 1-9</span>out of 3k properties</h5>
                <Link to={'/'}><VscSettings className='bg-white text-3xl
                rounded-md h-10 w-10 p-2 border'/></Link>
            </div>
            {/* container  */}
            <Swiper
            autoplay={{
                delay: 4000,
                disableOnInteraction: false,
            }}
            breakpoints={{
                600:{
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1124:{
                    slidesPerView:3,
                    spaceBetween: 30,
                },
                1300:{
                    slidesPerView: 4,
                    spaceBetween:30,
                },
            }}
            modules={[ Autoplay ]}
            className='h-[488px] md:h-[533px] xl:h-[422px] mt-5'
            >
                {
                    PROPERTIES.map((property)=>(
                        <SwiperSlide key={property.title}>
                            <Item property={property}/>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    </section>
  )
}

export default Properties
