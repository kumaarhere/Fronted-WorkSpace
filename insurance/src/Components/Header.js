import React from 'react'
import { useNavigate } from 'react-router-dom';
import p3 from '../Components/images/p3.jpeg';
import '../App.css';
import PhoneIcon from '@mui/icons-material/Phone';


function Header() {



      let navigate=useNavigate();
    const handleClick=()=>
    {
        navigate("/admin");
    }


  return (
    <div className='text-center' >
      <header >
      <div class="d-flex justify-content-between align-items-center  py-2 rounded fixed" style={{background:'#f0f8ff'}} >

				<div className="" >
        <img class="mx-3 ramana" src={p3} alt="my pic" title='RamanaSoft Insurance' style={{borderRadius:'10px',cursor:'pointer'}}></img>
        {/* <span className='col-3 fw-bold company' style={{color:'teal',fontSize:'25px'}}>RamanaSoft Insurance Company</span> */}
				</div> 

				<div className="ms-auto me-3 ">
        <button style={{cursor:'pointer',background:'#ace1af'}} className='btn  fw-bold text-nowrap' onClick={handleClick}><PhoneIcon />Call Us </button>
				</div> 

			</div>
			
       
      </header>
    </div>
  )
}

export default Header
