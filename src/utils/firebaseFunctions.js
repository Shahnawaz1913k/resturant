
import { collection, doc, orderBy, setDoc, query, getDocs} from "firebase/firestore"
import { firestore } from "../firebase.config"

export const  saveItem = async (data) =>{
    await setDoc(doc(firestore, 'medicine',`${Date.now()}`), data, {merge:true}
    );
};

export const getAllmed = async () =>{
    const items = await getDocs(
        query(collection(firestore, 'medicine'), orderBy("id" ,"desc"))
    );
    return items.docs.map((doc) => doc.data());
}
