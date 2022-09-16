import React, { useState } from 'react';
import {motion} from 'framer-motion';
import {MdAttachMoney, MdCloudUpload, MdDelete, MdFastfood, MdFoodBank} from 'react-icons/md'
import {categories} from '../utils/data';
import Loader from './Loader';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase.config';
import { saveItem } from '../utils/firebaseFunctions';
import { useStateValue } from '../context/StateProvider';
import { getAllmed } from '../utils/firebaseFunctions';
import { actionType } from '../context/reducer';

const CreateContainer = () => {
  const [title, setTitle] = useState("");
  const [calories, setCalories] = useState("");
  const [price, setPrice] = useState("");
  const [imageAsset, setImageAsset] = useState(null);
  const [category, setCategory] = useState(null);
  const [fields, setFields] = useState(false);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [msg, setMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [{medicine},dispatch] = useStateValue();
  const uploadImage = (e) =>{
    setIsLoading(true);
    const imageFile = e.target.files[0];
    console.log(imageFile);
    const storageRef = ref(storage,`Images/${Date.now()}-${imageFile.name}`)
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(`state_changed`,(snapshot) => {
      const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes)*100
      console.log(uploadProgress);
      },(error) =>{
      console.log(error);
      setFields(true);
      setMsg('error while uploading');
      setAlertStatus('danger');
      setTimeout(() => {
          setFields(false);
          setIsLoading(false);
      },4000);
      }, ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURl) =>{
        setImageAsset(downloadURl);
        setIsLoading(false);
        setFields(true);
        setMsg('Image Uploaded Successfully');
        setAlertStatus('success');
        setTimeout(()=>{
          setFields(false);
        },4000);
      })
        })
  };

  const deleteImage = () =>{
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() =>{
      setImageAsset(null);
      setIsLoading(false);
      setFields(true);
      setMsg("Image Deleted Successfully");
      setAlertStatus("success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    })
  };

  const saveDetails = () =>{
    setIsLoading(true);
    try{
      if(!title || !category || !calories || !price ||!imageAsset)
      {
        setFields(true);
        setMsg("Required fileds are empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      }else{
        const data = {
          id:`${Date.now()}`,
          title : title,
          imageURL : imageAsset,
          category : category,
          calories : calories,
          qty : 1,
          price : price 
        }
        saveItem(data);
        setIsLoading(false);
        setFields(true);
        setMsg('Data added Successfully');
        setAlertStatus('success');
        clearData();
        setTimeout(()=>{
          setFields(false);
          
        },4000);
      }
      fetchData();
      }

    catch(error){
      console.log(error);
      setFields(true);
      setMsg('error while uploading');
      setAlertStatus('danger');
      setTimeout(() => {
          setFields(false);
          setIsLoading(false);
      },4000);
    }
  };
  const clearData =() =>{
    setTitle('');
    setImageAsset(null);
    setCategory("Select category");
    setPrice('');
    setCalories('')
  }
  const fetchData = async () =>{
    await getAllmed().then((data) =>{
      dispatch({
        type : actionType.SET_MEDICINE,
        medicine : data
      });
    });
  };
  return (
    <div className='w-full min-h-screen flex items-center justify-center'>
      <div className='w-[90%] md:w-[75%] border border-green-300 rounded-lg p-4 flex flex-col 
      items-center justify-center gap-4'>
      {
        fields && (
          <motion.p initial={{opacity : 0}}
          animate={{opacity : 1}}
          exit={{opacity : 0}} className={`w-full p-2 rounded-lg  text-center ${alertStatus === 'danger' ? 
          'bg-red-400 text-red-800' : 'bg-emerald-400 text-emerald-800'}`}>
            {msg}
          </motion.p>
        )
      }
      <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
        <MdFastfood className='text-xl  text-gray-700 ' />
        <input type="text" required value={title} placeholder='Enter title ' 
        className='w-full h-full text-lg bg-transparent font-semibold outline-none border-none placeholder-text-gray-500 text-textColor' onChange={(e) => setTitle(e.target.value) }/>
      </div>
      <div className='w-full'>
        <select onChange={(e)=>setCategory(e.target.value)} className='outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer'>
          <option value="other" className='bg-white'>Select category</option>
          {categories && categories.map(item => 
            (
              <option key={item.id} className='text-base border-0 outline-none capitalize bg-white text-headingColor'
              value={item.urlParamName}>
                {item.name}
              </option>
            ))}
        </select>
      </div>
      <div className='group flex justify-center items-center flex-col border-2 border-dashed
       border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg'>
        {
          isLoading ? <Loader /> : <>
          {!imageAsset ? <>
          <label className='w-full h-full flex flex-col items-center justify-center cursor-pointer'>
            <div className='w-full h-full flex flex-col items-center justify-center gap-2'>
              <MdCloudUpload className='text-gray-500 text-3xl hover:text-green-500'/>
              <p className='text-gray-500 hover:text-green-500 '>click here to upload </p>
            </div>
            <input type='file' name='uploadimage' accept='image/*' onChange={uploadImage} 
            className = 'w-0 h-0'/>
            </label></> :( <>
            <div className="relative h-full">
              <img src={imageAsset} alt="uploaded image" className='w-full h-full object-cover' />
              <button type='button' 
              className='absolute bottom-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer
               outline-none hover:shadow-md duration-500 transition-all ease-in-out'
               onClick={deleteImage}
              ><MdDelete className=' text-white'/> </button>
            </div>
            </>)}
          </>
        }
       </div>
       <div className='w-full flex flex-col md:flex-row items-center gap-3'>
        <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
          <MdFoodBank className='text-gray-700 text-2xl'/>
          <input type="text" required 
          value={calories}
          onChange = {(e)=>setCalories(e.target.value)}
          placeholder='Calories' 
          className='w-full h-full text-lg font-semibold bg-transparent outline-none border-none
           placeholder:text-gray-400 text-textColor'/>
        </div>
        <div className='w-full py-2 border-b border-gray-300 flex items-center gap-2'>
          <MdAttachMoney className='text-gray-700 text-2xl'/>
          <input type="text" 
          required 
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder='Price' 
          className='w-full h-full text-lg font-semibold bg-transparent 
          outline-none border-none placeholder:text-gray-400 text-textColor'/>
        </div>
       </div>
       <div className='flex items-center w-full'>
        <button type='button' className='ml- md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500
         px-12 py-2 rounded-lg text-lg text-white font-semibold' onClick={saveDetails}>Save</button>
       </div>
      </div>
    </div>
  )
}

export default CreateContainer