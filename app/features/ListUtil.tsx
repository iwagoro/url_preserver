import { listInterface } from "@/consts/Interface"

const filterLists = (lists: Record<string, listInterface>,keyword:string) => {

    if(keyword === "") return null

    else{
        let temp = {}
        Object.keys(lists).map((list) => {
            if(list.toLowerCase().includes(keyword)){
                temp = { ...temp, [list]: lists[list] }
            }
        })
        return temp
    }
}

const sortLists = (lists: Record<string,listInterface>, keyword: string) => {

    if (keyword === "") return null
    
    let temp = Object.keys(lists);
    let result ={}

    if(keyword === "昇順") temp = temp.sort((a, b) => (a > b ? 1 : -1));
    
    else temp = temp.sort((a, b) => (a < b ? 1 : -1));
    
    Object.values(temp).map(data => result = ({...result,[data]:lists[data]}))
    return result
}




export {filterLists,sortLists}