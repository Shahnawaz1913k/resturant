import React, { useEffect , useRef, useState} from 'react'
import {MdShoppingCart} from 'react-icons/md' 
import {motion} from 'framer-motion'
import NotFound from './img/NotFound.svg';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

const RowContainer = ({flag,data,scrollValue}) => {
    const rowContainer = useRef();

    const [items, setItems] = useState([])
    const [{cartItems}, dispatch] = useStateValue();

    const addtocart = () =>{
        dispatch({
            type : actionType.SET_CARTITEMS,
            cartItems : items
        });
        //console.log(cartItems);
        localStorage.setItem("cartItems", JSON.stringify(items))
        
    };

    useEffect(() => {
        addtocart();
    },[items])

    useEffect(()=>{
        rowContainer.current.scrollLeft += scrollValue;
    },[scrollValue])

    
  return (
    <div

    ref = {rowContainer} 
    className={`w-full my-12 flex items-center gap-3 scroll-smooth ${
        flag ? 'overflow-x-scroll scrollbar-none':'overflow-x-hidden flex-wrap'}`}>
        {data && data.length>0 ?
         data.map(item =>(
            <div key={item?.id}
            className='w-300 h-[225px] md:w-225 bg-cardOverlay rounded-lg p-2 my-12 
            backdrop-blur-lg hover:drop-shadow-md flex flex-col items-center justify-between'>
                <div className='w-full flex items-center justify-between'>
                    <motion.img whileHover = {{scale:1.2}} 
                    src={item?.imageURL} alt="image" 
                    className='w-40 -mt-8 drop-shadow-2xl'/>
                    <motion.div whileTap={{scale : 0.75}}className='w-8 h-8 rounded-full bg-red-600 flex items-center justify-center cursor-pointer
                        hover:shadow-md' onClick={()=> setItems([...cartItems,item])}>
                        <MdShoppingCart className='text-white'/>
                    </motion.div>
                </div>
                <div className='w-full flex flex-col items-end justify-end'>
                    <p className='text-textColor font-semibold text-base md:text-lg'>
                        {item?.title}
                    </p>
                    <p className='mt-1 text-sm text-gray-500'>{item?.calories}</p>
                    <div className='flex items-center gap-8'>
                        <p className='text-lg text-headingColor font-semibold'>
                            <span className='text-sm text-red-500'>$</span>{item?.price}</p>
                    </div>
                </div>
            </div>
        )):
        <div className='w-full flex flex-col items-center justify-center'>
        <img src={NotFound} alt="Not Found" className='h-340 '/>
        <p className='text-xl text-headingColor font-semibold'>Items Not Found</p>
        </div>
        }
    </div>
  );
}; 

export default RowContainer