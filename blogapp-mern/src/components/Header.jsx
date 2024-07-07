import { Link } from 'react-router-dom'
import styles from './styles.module.css'

export default function Header() {
    return <div className={styles.header} >
        <h3>MERN stack blog app</h3>

        <ul>
            <Link to={'/'} ><li>Home</li></Link>
            <Link to={'/addblog'} ><li>Add blog</li></Link>
        </ul>
        
    </div>
}