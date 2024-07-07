import React , { useContext, useEffect } from 'react'
import styles from './styles.module.css'
import Context, { GlobalContext } from '../context/Context.jsx'
import axios, {Axios} from 'axios'
import {useNavigate,useLocation} from 'react-router-dom'



export default function Addblog() {
    const {Formdata,setFormdata,ced,setCed} = useContext(GlobalContext) ; 
    const navigation = useNavigate()
    const location = useLocation()

  async  function saveblogtodatabase() {
    const response = ced ? await axios.put(`http://localhost:3000/trials/update/${location.state.getcurrentblogitem
        ._id}`,{
        title : Formdata.title,
        description:Formdata.description
    }) :  await axios.post('http://localhost:3000/trials/add',{
        title:Formdata.title,
        description:Formdata.description
    })

    const result = await response.data ; 
    console.log(result);

    if (result) {
        setCed(false)
        setFormdata({
            title: '',
            description: ''
        })
        navigation('/')
    }
    } 

    console.log(Formdata );

    useEffect(()=>{
        console.log(location);
        if (location.state) {
            const {getcurrentblogitem
            } = location.state ; 
            setCed(true)
            setFormdata({
                title:getcurrentblogitem
                .title,
                description: getcurrentblogitem
                .description
            })
        }
    },[location])
    return  <div className={styles.wrapper} >


        <h2> {ced ? 'Edit a blog' : 'Add a blog' } </h2>
        <div className={styles.formwrapper} >
            <input className={styles.input} type="text" name="title"
            id='title'
            placeholder='Enter blog title'
            value={Formdata.title}
            onChange={(e)=>setFormdata({...Formdata,title:e.target.value})} />

            <textarea className={styles.textarea} name="description" id="decsritpion"
            
            placeholder='Enter blog decsrption' 
            value={Formdata.description}
            onChange={(event)=>setFormdata({...Formdata,description:event.target.value})} />     

            <button onClick={saveblogtodatabase}  className={styles.button} > {ced ? 'Edit blog' : 'Add  blog' } </button>
        
        </div>

    </div> 
}