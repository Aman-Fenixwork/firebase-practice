import React, { useEffect, useState } from 'react'
import Styles from "../../styles/scss/shopping/shop.module.css"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { db } from "../../config/firebase";
import { orderBy, query, collection, onSnapshot, addDoc , deleteDoc, doc, setDoc} from 'firebase/firestore';

const Shopping = () => {

    const [data, setData] = useState<any>([]);
    const [value, setValue] = useState<any>('');

    useEffect(() => {
        const q = query(collection(db,"shopping-items"),orderBy("timestamp","desc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setData(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
        });
        return () => unsubscribe()
    },[])

    const handleClick = () => {
        addDoc(collection(db, "shopping-items"), {
            name: value,
            timestamp: new Date()
        })
    }

    const handleDelete = async (id : any) => {
        await deleteDoc(doc(db, "shopping-items", id));
    }

    const handleUpdate = (id: any) => {
        const itemRef = doc(db, "shopping-items", id);
        let name =  prompt("What would you like to update it to?")
        setDoc(itemRef, {
            name: name,
            timestamp: new Date()
        })
    }
    return (
        <>
            <div className={Styles.shoppingContainer}>
                <div className={Styles.shop}>
                    <div className={Styles.shoppingHeader}>
                        <TextField id="outlined-basic" label="Enter name" variant="outlined" onChange={(e) => setValue(e.target.value)} />
                        <Button disabled={value.length > 0  ? true : false} variant="outlined" onClick={handleClick}>Save</Button>
                    </div>
                    <div className={Styles.shoppingItems}>
                        {
                            data.map((item : any,key : any) => {
                                return (
                                    <div key={key} className={Styles.shoppingItem}>
                                        <h1>{item.name}</h1>
                                        <div>
                                            <EditIcon className={Styles.icon} onClick={() => handleUpdate(item.id)}/>
                                            <DeleteIcon className={Styles.icon} onClick={() => handleDelete(item.id)}/>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        
                    </div>
                </div>
                
            </div>
        </>
    )
}

export default Shopping