import {getApp, getApps, initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyCQ9goAwOfxLTzYPAWijci6-Y0RLaKcSiA",
    authDomain: "resturantapp-e9894.firebaseapp.com",
    databaseURL: "https://resturantapp-e9894-default-rtdb.firebaseio.com",
    projectId: "resturantapp-e9894",
    storageBucket: "resturantapp-e9894.appspot.com",
    messagingSenderId: "312349758122",
    appId: "1:312349758122:web:1487ca3ff02445104f36d3"
  };

  const app = getApps.length>0?getApp():initializeApp(firebaseConfig);
  const firestore = getFirestore(app)
  const storage = getStorage(app)

  export {app,firestore,storage};

  