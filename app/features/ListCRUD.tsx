import { db } from "@/lib/FireBase"
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc, setDoc } from "firebase/firestore"

const filterLists = (lists:Record<string,boolean>,keyword:string) => {
    const result:(Record<string,boolean>) = {}
    if(keyword === "") return null
    else{
        Object.keys(lists).map( list => list.toLowerCase().includes(keyword) && (result[list] = false))
    }
    return result
}

const sortLists = (lists: Record<string, boolean>, keyword: string) => {
    const result: (Record<string, boolean>) = {}
    if (keyword === "") return null
    
    let temp = Object.keys(lists);

    if(keyword === "昇順"){
        temp = temp.sort((a, b) => (a > b ? 1 : -1));
    }
    else{
        temp = temp.sort((a, b) => (a < b ? 1 : -1));
    }
    Object.values(temp).map((data) => (result[data] = false));
    return result
}

const addList = async  (listData:string, keyword: string) => {
    if(listData === "") return null
    const Ref = collection(db,"User","test@gmail.com",keyword)
    const type = keyword === "Tags" ? "tag" : "preset"
    await setDoc(doc(Ref,listData),{
        name:listData,
        type:type
    })
    .then( () => {
        console.log('success : addList')
        return 1
    })
    .catch( () => {
        console.log('failed : addList')
        return 0
    })
}

const deleteList = async (listData: { name: string, type: string }, keyword: string) => {
    
}





export {filterLists,sortLists,addList,deleteList}