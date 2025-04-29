import React, { useState,useEffect } from 'react'
import { NavLink,Link} from 'react-router-dom'
import "../style/App.css"

function Navbar(){
   const [Show,setShow] = useState(false)

   function Menu(){
      setShow(!Show)
   }
        
   useEffect(()=>{
    const handleScroll = () =>{
      setShow(false)
    }
    window.addEventListener("scroll",handleScroll)
   },[])

    return(
     
   <>
  <nav>
  <div className="">
    <NavLink to="/"><h2>ExpenseApp</h2></NavLink>
     
   </div>
    <ul className='menu-items'>
     <li>
       <a href='#about'>About Us</a> 
      </li>
      <li>
      <a href='#testimony'>Testimonies</a> 
      </li> 
      <li>
              <a href="https://wa.me/2349126785031?text=I%20Want%20to%20Hire%20A%20Developer" target='_blank'>Hire a Developer</a>
              </li>
      
    </ul>
      <div className="logout">
        <ul>
          <li><NavLink to="/register">Register</NavLink> </li>
        </ul>
      </div>

    <div className={ "menu"} onClick={Menu}>
     <div className="bar bar1"></div>
     <div className="bar bar2"></div>
     <div className="bar bar3"></div>
    </div>       
    </nav> 


    
    { Show && ( <div className="dropdown">
            <ul>
              <li>
                <Link  to="/" onClick={Menu}>Home</Link>
              </li>
              <li>
                <a href="/#about" onClick={Menu}>About</a>
              </li>
             
              <li>
                <a href='#testimony' onClick={Menu}>Testimonies</a>
              </li>
              <li>
                <Link to="/register"  onClick={Menu}>Register</Link>
              </li>
              <li>
              <a href="https://wa.me/2349126785031?text=I%20Want%20to%20Hire%20A%20Developer" target='_blank'>Hire a Developer</a>
              </li>
            </ul>
          </div>
         ) }
  
        </>
    )
}


export default Navbar