import Header from './Header'
import React, {useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import p5 from '../Components/images/p5.png'
import PropertyInsuranceService from './Service/PropertyInsuranceService'
import { Modal } from 'react-bootstrap'
import {GoogleLogin} from 'react-google-login';
import TextField from '@mui/material/TextField';
import { Tooltip, IconButton, InputAdornment } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { regexMobileNo } from './RegularExpressions'


const clientId = "246541673533-e90kj0pumgndrmt51j27v853d3pkon00.apps.googleusercontent.com";


function Login() {
  // var i = 0 ;

  const [showState , setshowState] = useState(false);
  const clickClose =()=> {
    setshowState(false) ;
    window.location.reload();
  }

  const [userData, setUserData] = useState(null);

  const onSuccess = (res) => {
    console.log("LOGIN SUCCESS! Current user: ", res.profileObj);
   // i++;
    // navigate("/login",{state:{i}}) 
    setshowState(true);
    setUserData(res.profileObj);
    console.log(userData);
  }
    const onFailure = (res) => {
     console.log("LOGIN FAILED! res: ", res);
    
  }

    let navigate=useNavigate();

    const [values, setValues] = useState({
      mobileno: ''
    });
  

    const change=(e)=>
    {
          const {name,value}=e.target;
          setValues({...values,[name]:value});
  
    }
  
    const [data,setData]=useState();
   
    const [validationErrors,setValidationErrors]=useState({
      mobileno : ''
    })

    const HandleSubmit=(e)=>
    {
      e.preventDefault();
      console.log("values =>"+JSON.stringify(values));

      

    //   async function performLogin(){
      
    //     const response = await PropertyInsuranceService.login(values);
    //     //console.log(response)
    //     const loginResponse = response.data; 
    //     // setData( loginResponse);
    //     console.log('Login Response:', loginResponse);
    //     // i++;
    //     if (loginResponse === "Login successful!") 
    //     { 
          
    //       // setshowState(true);
    //        navigate("/login",{state:{values:values}}) 
    //     } 
    //     else 
    //     {
    //       setData( loginResponse);
    //     }
    // }
    // performLogin();
      
      //  window.location.reload();
    }

    const handleClick=()=>
    {
      navigate("/property");
    }

    const [showOTPInput,setshowOTPInput]=useState(false);


    function sendOTP(e){
      e.preventDefault();
      console.log(showOTPInput);
      const {name,value}=e.target;
      setValues({...values,[name]:value}); 
      setshowOTPInput(true);
      
      if (name === "mobileno") {
        
        if (!regexMobileNo.test(value)) {
          setValidationErrors({ ...validationErrors, [name]: "Phone must start with 6,7,8,9 series with  10 digits" });
        } else {
          setValidationErrors({ ...validationErrors, [name]: "" });
        }
      }
      }


    return (
      <div className='container-fluid'>
        <div style={{position:'fixed',width:'100%'}}><Header/></div>
        <div className='row mt-3'>
          <div className='col-12 col-lg-7 mt-2'>
            <button className='btn btn-primary mx-3 mt-5' onClick={handleClick} >PropertyInsurance</button>
          </div>
          <div className='col-12 col-lg-5 mt-5'>
            <form onSubmit={HandleSubmit} className='form-inline'>
              <div className='mx-5 my-5'>
                <TextField
                  className=''
                  id="outlined-basic"
                  label="Mobile No."
                  placeholder="Enter Your Mobile No."
                  name='mobileno'
                  onChange={change}
                  value={values.mobileno}
                  // required
                  inputProps={{ maxLength: 10 }}
                  onKeyPress={(e) => {
                    const isValidInput = /[0-9]/;
                    if (!isValidInput.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                  />
                  {validationErrors.mobileno && <span className="text-danger">{validationErrors.mobileno}</span>}
                  <span>
                <button className='btn btn-success rounded fw-bold shadow mt-2 mx-3 py-2' onClick={sendOTP}>Send OTP</button></span>
                <br/>
                {showOTPInput && (
                  <div>
                     <div className='ms-2 mt-2'>
                      <small className='text-success '>OTP sent to your mobile No.</small>
                      <form className='w-75 d-flex flex-nowrap pt-3'>
                      {[...Array(4)].map((_, index) => (
                        <input
                          key={index} 
                          type="text" 
                          autoFocus = {index === 0}
                          className='w-25 border ps-3 fw-semibold' 
                          maxLength={1} 
                          style={{ marginRight: '8px' }} 
                          onKeyPress={(e) => {
                            const isValidInput = /[0-9]/;
                            if (!isValidInput.test(e.key)) {
                            e.preventDefault();
                            }
                          }}
                        />
                       ))}
                       <button className='btn btn-info text-nowrap fw-bold shadow ms-2'>Verify OTP</button>
                      </form>
                     </div>
                  </div>
                    )}
              
                <div className='mt-4'>
                    <button className='btn btn-link me-5 text-decoration-none' onClick={handleClick} >New User ?</button>                
                    <button className='btn btn-primary px-3 ms-5'>Login</button>
                </div>
              </div>
              {/* <div>
                {data !== "Login successful!" && <h4 style={{ color: 'red' }}>{data}</h4>}
              </div> */}
            </form>
          </div>
        </div>
      </div>
    )
}

export default Login;
