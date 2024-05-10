import React from 'react'
import { useNavigate } from 'react-router-dom';
import p3 from '../Components/images/p3.jpeg';
import '../App.css';
import PhoneIcon from '@mui/icons-material/Phone';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function Header() {

      let navigate=useNavigate();
    const handleClick=()=>
    {
        navigate("/admin");
    }

      const [open, setOpen] = React.useState(false);
    
      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

  return (
    <div className='text-center' >
      <header >
      <div class="d-flex justify-content-between align-items-center  py-2 rounded fixed" style={{background:'#f0f8ff'}} >

				<div className="" >
        <img class="mx-3 ramana" src={p3} alt="my pic" title='RamanaSoft Insurance' style={{borderRadius:'10px',cursor:'pointer'}}></img>
        {/* <span className='col-3 fw-bold company' style={{color:'teal',fontSize:'25px'}}>RamanaSoft Insurance Company</span> */}
				</div> 

				<div className="ms-auto me-3 ">
        {/* <button style={{cursor:'pointer',background:'#ace1af'}} className='btn  fw-bold text-nowrap'><PhoneIcon />Call Us </button> */}
        <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen} className='btn  fw-bold text-nowrap'>
      <PhoneIcon />Call Us
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <h3 className='text-center'>Call Us</h3>
            <h4><PhoneIcon />1800-143-123</h4>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </React.Fragment>
				</div> 

			</div>
			
       
      </header>
    </div>
  )
}

export default Header
