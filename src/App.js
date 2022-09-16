
import './App.css';
import { useEffect } from 'react';
import { Route,Routes } from 'react-router-dom';
import {Header,CreateContainer,MainContainer} from "./Components"
import { AnimatePresence } from 'framer-motion'
import { useStateValue } from './context/StateProvider';
import { getAllmed } from './utils/firebaseFunctions';
import { actionType } from './context/reducer';
function App() {
const [{medicine},dispatch] = useStateValue();

  const fetchData = async () =>{
    await getAllmed().then((data) =>{
      dispatch({
        type : actionType.SET_MEDICINE,
        medicine : data
      });
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <AnimatePresence exitBeforeEnter>
  <div className="w-screen h-auto flex flex-col bg-slate-100">
         <Header /> 
        
         <main className='mt-30 md:mt-28 px-16 -py-10 w-full'>
         <Routes>
            <Route path="/*" element={<MainContainer />}/>
            <Route path="/createitem" element={<CreateContainer/>}/>
         </Routes>
         </main>
        </div>
        </AnimatePresence>
  )
};

export default App;
