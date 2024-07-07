import { useContext, useEffect } from "react"
import { GlobalContext } from "../context/Context"
import axios from "axios"
import {FaTrash,FaEdit}  from 'react-icons/fa'
import styles from './styles.module.css'
import {useNavigate} from 'react-router-dom'

export default function Home() {

    const {Blogist,setBlogist,pending,setPending} = useContext(GlobalContext) ; 
    const navigate = useNavigate()


    async function fetchlistofblogs() {
        setPending(true)
        const response = await axios.get('http://localhost:3000/trials')
        const result = await response.data;

        console.log(result);

        if (result && result.Blogist && result.Blogist.length) {
            setBlogist(result.Blogist)
            setPending(false); 
        } else {
            setPending(false);
            setBlogist([])
        }
        

    }

    async function handledeleteblog(getcurrentid) {
        console.log(getcurrentid);
        const response = await axios.delete(`http://localhost:3000/trials/delete/${getcurrentid}`)
        const result = await response.data

        if (result?.message) {
            fetchlistofblogs();
            // navigate(0)
        }
    }

 function handleedit(getcurrentblogitem) {
        console.log(getcurrentblogitem);
        navigate('/addblog',{state:{getcurrentblogitem}})
    }

    useEffect(( )=>{
        fetchlistofblogs();
    },[])


    return <div>
        <h2>Blog list .  </h2>

        {
            pending ? ( <div>Loading blogs</div> ) : ( <div className={styles.bloglist} > { Blogist&&Blogist.length ? Blogist.map(blogitem=> <div key={blogitem._id} >
                <p> {blogitem.title} </p>
                <p> {blogitem.description} </p>
                <FaEdit onClick={()=>handleedit(blogitem)} size={25} />
                <FaTrash onClick={()=>handledeleteblog(blogitem._id)} size={25} />
            </div> ): <h4>No blogs added</h4> }</div> 
               )
        }

    </div>
}