import React,{useState, useEffect} from 'react'
import { MdMedication } from 'react-icons/md';
import {categories} from '../utils/data'
import { motion } from 'framer-motion';
import RowContainer from './RowContainer';
import { useStateValue } from '../context/StateProvider';

const MenuContainer = () => {
    const [filter, setFilter] = useState('fish')
    const [{medicine},dispatch] = useStateValue()
    {/*useEffect(() => {
    
    }, [filter])*/}
    
  return (
    <section section className='w-full my-6' id='menu'> 
    <div className='w-full flex flex-col items-center justify-between'>
          <p className='text-2xl font-semibold capitalize text-headingColor relative before:absolute before:
          rounded-lg before:content before:w-24 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-green-400 to-green-600
          transition-all ease-in-out duration-100 mr-auto'>
            Shop By Category
          </p>

          <div className='w-full flex items-center justify-start lg:justify-center gap-8 py-6 
          overflow-x-scroll scrollbar-none'>
            {categories && categories.map(category =>(
               <motion.div 
               whileTap={{scale:0.8}} 
               key={category.id} className={`group ${filter === category.urlParamName ?'bg-green-500' : 'bg-gray-400'} w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-lg 
               flex flex-col gap-3 items-center justify-center hover:bg-green-500`} onClick = {() => setFilter(category.urlParamName)}>
                   <div className={`w-10 h-10 rounded-full ${filter === category.urlParamName ?'bg-gray-400' : 'bg-green-500'} group-hover:bg-gray-400 flex items-center
                   justify-center`}>
                       <MdMedication className='text-white text-lg'/>
                   </div>
                   <p className={`text-[10px] ${filter === category.urlParamName ?'text-white' : 'text-gray-500'} text-textColor group-hover:text-white`}>{category.name}</p>
               </motion.div> 
            ))}
          </div>
          <div className='w-full'>
            <RowContainer flag={false} data={medicine?.filter(n => n.category == filter)}/>
          </div>
    </div>
    </section>
  )
}

export default MenuContainer;