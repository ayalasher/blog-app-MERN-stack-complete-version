import { createContext, useState } from "react";


export const GlobalContext = createContext(null) ; 


//Context() is similar to Globalstate()
export default function Context({children}) {

    
 
    const [Formdata,setFormdata] = useState({
        title:'',
        description:'',
    })

    const [Blogist,setBlogist] = useState([])

    const [pending , setPending] = useState(false)

    const [ced,setCed ]  = useState(false)


    return <GlobalContext.Provider value={{ced,setCed,Blogist,setBlogist,pending,setPending,Formdata,setFormdata}} > {children} </GlobalContext.Provider>
}