import { useState } from "react";
import { initializeApp } from "firebase/app";
import { 
    getFirestore, 
    doc, 
    setDoc, 
    deleteDoc, 
    updateDoc, 
    getDoc, 
    getDocs, 
    query, 
    collection,
    enableIndexedDbPersistence 
} from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAotQpsLX54MfxvgOCIc11LfVImH36iDqE",
    authDomain: "finance-manager-372f2.firebaseapp.com",
    databaseURL: "https://finance-manager-372f2-default-rtdb.firebaseio.com",
    projectId: "finance-manager-372f2",
    storageBucket: "finance-manager-372f2.appspot.com",
    messagingSenderId: "169856715385",
    appId: "1:169856715385:web:42bb46c1994c490deea2a8",
    measurementId: "G-4QKY1F85MM"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

enableIndexedDbPersistence(db).then(() => {
    console.log("Offline persistence enabled successfully");
}).catch((error) => {
    console.error("Error enabling offline persistence:", error);
});

const UID = 'users/tjlRDGn2watycJT5gysj';
export default function useDB() {
    const [isLoading, setIsLoading] = useState(false);

    async function get(url) {
        let data;
        let path = doc(db, UID + url);
        setIsLoading(true);
        try {
            const response = await getDoc(path)
            if (response.exists()) {
                data = response.data();
            }
        } catch (error) {
            console.error("Error getting document:", error);
        } finally {
            setIsLoading(false);
        }
        return data;
    }

    async function create(url, data) {
        setIsLoading(true);
        let path = doc(db, UID + url);
        try {
            await setDoc(path, data);
        } catch(e) {
            console.error("Error creating document:", e);
        } finally {
            setIsLoading(false);
        }
    }

    async function update(url, data) {
        setIsLoading(true);
        let path = doc(db, UID + url);
        try {
            await updateDoc(path, data);
        } catch(e) {
            console.error("Error updating document:", e);
        } finally {
            setIsLoading(false);
        }
    }

    async function makeQuery(url) {
        const customQuery = query(collection(db, UID + url));
        const querySnapshot = await getDocs(customQuery);
        let data = [];
        querySnapshot.forEach((snap) => data.push(snap.data()));
        return data;
    }

    async function deleteRecord(url) {
        setIsLoading(true);
        let path = doc(db, UID + url);
        try {
            await deleteDoc(path);
        } catch(e) {
            console.error("Error deleting document:", e);
        } finally {
            setIsLoading(false);
        }
    }

    function generateID(length = 20) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    return {get, create, update, deleteRecord, makeQuery, generateID, isLoading};
}
