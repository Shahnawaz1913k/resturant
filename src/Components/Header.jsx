import React from 'react'
import {Link} from 'react-router-dom'
import Logo from './img/logo.png'
import Avatar from './img/avatar.png'
import {useState} from 'react';
import {motion} from "framer-motion" 
import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth"
import {app} from "../firebase.config"
import {MdShoppingBasket, MdAdd, MdLogout} from 'react-icons/md'
import { async } from '@firebase/util'
import { useStateValue } from '../context/StateProvider'
import { actionType } from '../context/reducer'
const Header = ()=> {
  const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [{user, cartShow, cartItems}, dispatch] = useStateValue();
    const [isMenu, setisMenu] = useState(false);
  const login = async()=>{
    if(!user){
      const {user:{refreshToken,providerData}} = await signInWithPopup(firebaseAuth,provider)
    dispatch({
      type: actionType.SET_USER,
      user : providerData[0]
    });
    localStorage.setItem('user', JSON.stringify(providerData[0]))
    }else{
      setisMenu(!isMenu)
    }
  };
  const logout = () =>{
    setisMenu(false);
    localStorage.clear();
    dispatch({
      type : actionType.SET_USER,
      user : null
    });
  }
  const showCart =() =>{
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow : !cartShow
    });  
  }
  return (
    <header className='fixed z-50 w-screen p-0 px-4 md:p-6 md:px-16 bg-gray-300'>
      {/*Desktop  */}
      <div className='hidden md:flex w-full h-full items-center justify-between'>
        <Link to={'/'} className='flex items-center gap-2'>
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className='text-headingColor text-xl font-bold'>Online Med</p>
          </Link>
          <div className='flex items-center gap-8'>
          <motion.ul initial={{opacity: 0,x: 200}}
          animate={{opacity:1,x: 0}}
          exit={{opacity: 0,x: 200}} className='flex items-center gap-8 ml-auto'>
            <li className='text-base text-textColor hover:text-textHeadingColor duration-100 transition-all ease-in-out cursor-pointer' onClick={() => setisMenu(false)}>About us</li>
            <li className='text-base text-textColor hover:text-textHeadingColor duration-100 transition-all ease-in-out cursor-pointer' onClick={() => setisMenu(false)}>Home</li>
            <li className='text-base text-textColor hover:text-textHeadingColor duration-100 transition-all ease-in-out cursor-pointer' onClick={() => setisMenu(false)}>Services</li>
          </motion.ul>
        <div className='relative flex items-center justify-center' onClick={showCart}>
          <MdShoppingBasket className='text-textColor text-2xl cursor-pointer'/>
          {cartItems && cartItems.length > 0 &&
          <div className='absolute -top-2 -right-2 w-5 h-5 rounded-full bg-green-600'>
          <p className='text-xs text-white font-semibold flex items-center justify-center'>{cartItems.length}</p>
        </div>}
        </div>
        <div className='relative'>
          <motion.img 
        whileTap={{scale:0.6}} 
        src={user ? user.photoURL : Avatar} 
        className='w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full' 
        alt="profile" onClick={login}/>
        {
          isMenu && (
            <motion.div initial={{opacity : 0, scale: 0.6}}
            animate={{opacity : 1, scale: 1}}
            exit={{opacity : 0, scale: 0.6}} className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0 py-0'>
        {
          user && user.email === "sa467546@gmail.com" &&(
            <Link to={"/createItem"}>
            <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100
        transition-all duration-100 ease-in-out text-textColor text-base' onClick={() => setisMenu(false)}>New Item <MdAdd /></p>
        </Link>
          )
        }
        <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100
        transition-all duration-100 ease-in-out text-textColor text-base' onClick={logout}>Logout <MdLogout /></p>
        </motion.div>
          )
        }
        </div>
      </div>
    </div>

      {/*Mobile */}
      <div className='flex md:hidden w-full h-full '>
      <Link to={'/'} className='flex items-center gap-2'>
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className='text-headingColor text-xl font-bold'>Online Med</p>
          </Link>
      </div>
      
    </header>
  )
}
export default Header;
