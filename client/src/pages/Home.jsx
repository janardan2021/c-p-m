import { useUserContext } from "../hooks/useUserContext.js"

import { register } from 'swiper/element/bundle';
import { FaArrowRight } from "react-icons/fa";

import cpm1 from '../components/assets/cpm1.png'
import cpm2 from '../components/assets/cpm2.png'
import cpm3 from '../components/assets/cpm3.png'
import cpm4 from '../components/assets/cpm4.png'
import { useNavigate } from "react-router-dom";

export default function Home() {
    const {state: cpmuser} = useUserContext()
    const navigate = useNavigate()

    function onClick() {
        if(cpmuser === null) {
            navigate('/login')
        } else {
            navigate('/manage')
        }
    }
    register();
  return (
    <div className='flex flex-col items-center justify-center w-full'>

        <div>
           <p className='text-4xl font-bold mt-6 text-center'>
           Client project management for small businesses
           </p>
           <p className='text-xl font-medium my-6 text-center'>
            Create and manage simple projects of your client with 
               <span className='text-2xl font-bold mx-2 text-green-700'>C-P-M</span>
           </p>
        </div>

        <div className='w-4/5 h-[400px] py-3 px-4 mx-auto bg-gray-100
                        rounded-xl shadow-lg shadow-gray-500'>
        <swiper-container slides-per-view="1" 
                            loop="true"
                            autoplay-delay="3000"
                            centered-slides="true"
                            // grab-cursor ="true"
                            //  css-mode="true"
                            // navigation="true"
                        pagination="true"
                        speed="1000">

            <swiper-slide>
                <div className="w-full rounded-xl overflow-hidden">
                        <img src={cpm1} className="object-contain h-[350px] w-full rounded-xl"/>
                </div>
            </swiper-slide>
            <swiper-slide>
            <div className="w-full rounded-xl overflow-hidden">
                        <img src={cpm2} className="object-contain h-[350px] w-full rounded-xl"/>
                </div>
            </swiper-slide>
            <swiper-slide>
            <div className="w-full rounded-xl overflow-hidden">
                        <img src={cpm3} className="object-contain h-[350px] w-full rounded-xl"/>
                </div>
            </swiper-slide>
            <swiper-slide>
            <div className="w-full rounded-xl overflow-hidden">
                        <img src={cpm4} className="object-contain h-[350px] w-full rounded-xl"/>
                </div>
            </swiper-slide>
    
        </swiper-container>
        </div>

        <div>
            <div className='w-full bg-green-700 text-white uppercase rounded mb-6 px-10
                py-4 shadow-md hover:bg-green-600 hover:shadow-lg transition duration-150 
                ease-in-out active:bg-green-800 hover:scale-105 my-5' 
                onClick={onClick}>
                Get started
                <FaArrowRight className='inline mx-4 text-xl'/>
            </div>
        </div>
    </div>
  )
}
