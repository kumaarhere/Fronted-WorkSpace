import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { regexEmail, regexMobileNo, regexPassword, regexUsername } from './RegularExpressions';
import PropertyInsuranceService from './Service/PropertyInsuranceService';
import TextField from '@mui/material/TextField';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import RamanaLogo from './images/p4.jpeg'
import shield from './images/shield.png'
import care from './images/care.png'
import '../App.css'
import Header from './Header';
import { useSpring, animated } from 'react-spring';



function GetQuote() 
{
  const location = useLocation();
  const { state } = location;




  const marketValue = state?.formValues?.marketValue ;
  console.log( marketValue);

  const security=state?.formValues?.security ;

   const buildingAge = state?.formValues?.buildingAge;

   const squareFeet = state?.formValues?.squareFeet;
   const pincode = state?.formValues?.pincode;
   const person = state?.formValues?.person;
   const effected = state?.formValues?.effected;

  

  // const [value,setValue]=useState();
  const [Premium,setPremium]=useState();
  const [year,setYear]=useState();
  function handleGoBack(){
    window.history.back();
  }

  const [showOTPInput,setshowOTPInput]=useState(false);
 
  
  function sendOTP(e){
  e.preventDefault();
    setshowOTPInput(true);
    console.log(showOTPInput);
  }
  const caliculate1=()=>
  {
    if(marketValue===undefined)
    {
      setUrlCopy(true)
    }
    
   
    if(security === "Yes")
    {
      let baseRate = 0.001;
      setYear(1);
    
    if(buildingAge === "0 to 5 Years") 
     {baseRate-=0.0001;}
    
  else if(buildingAge === "5 to 10 Years")  
  {baseRate-=0.0002;}
    

  else if(buildingAge === "10 to 15 Years")
  {baseRate-=0.0003;}
   
  else if(buildingAge === "15 to 20 Years")
  {baseRate-=0.0004;}

  else if(buildingAge === "20 to 25 Years")
  {baseRate-=0.0005;}

  setPremium(Math.floor((marketValue*baseRate)*10));
  // setValue(marketValue);
  console.log(baseRate);
    }
    else if(security === "No") {
      let baseRate = 0.002;
      setYear(1);
    
    if(buildingAge === "0 to 5 Years") 
     {baseRate-=0.0001;}
    
  else if(buildingAge === "5 to 10 Years")  
  {baseRate-=0.0002;}
    

  else if(buildingAge === "10 to 15 Years")
  {baseRate-=0.0003;}
   
  else if(buildingAge === "15 to 20 Years")
  {baseRate-=0.0004;}

  else if(buildingAge === "20 to 25 Years")
  {baseRate-=0.0005;}
  if(marketValue!==undefined)
  {
    setYear(1);
    setPremium(Math.floor((marketValue*baseRate)*10));
  }

  // setValue(marketValue);
  console.log(baseRate);
    }
}
  const caliculate2=()=>
  {
    if(marketValue===undefined)
    {
      setUrlCopy(true)
    }
    // setYear(2);

    if(security === "Yes")
    {
      let baseRate = 0.001;
      setYear(2);
    
    if(buildingAge === "0 to 5 Years") 
     {baseRate-=0.0001;}
    
  else if(buildingAge === "5 to 10 Years")  
  {baseRate-=0.0002;}
    

  else if(buildingAge === "10 to 15 Years")
  {baseRate-=0.0003;}
   
  else if(buildingAge === "15 to 20 Years")
  {baseRate-=0.0004;}

  else if(buildingAge === "20 to 25 Years")
  {baseRate-=0.0005;}

  setPremium(Math.floor((marketValue*baseRate)*10)*2-100);
  // setValue(marketValue);
  console.log(baseRate);
    }
    else if(security === "No") {
      let baseRate = 0.002;
       setYear(2);
    
    if(buildingAge === "0 to 5 Years") 
     {baseRate-=0.0001;}
    
  else if(buildingAge === "5 to 10 Years")  
  {baseRate-=0.0002;}
    

  else if(buildingAge === "10 to 15 Years")
  {baseRate-=0.0003;}
   
  else if(buildingAge === "15 to 20 Years")
  {baseRate-=0.0004;}

  else if(buildingAge === "20 to 25 Years")
  {baseRate-=0.0005;}
  if(marketValue!==undefined)
  {
    setYear(2);
    setPremium(Math.floor((marketValue*baseRate)*10)*2-100);
  }

  // setPremium(Math.floor((marketValue*baseRate)*10)*2-100);
  // setValue(marketValue);
  console.log(baseRate);
    
      }
    
  }
  
  const caliculate3=()=>
  {
    if(marketValue===undefined)
    {
      setUrlCopy(true)
    }
    
    // setYear(3);
    
    if(security === "Yes")
    {
      let baseRate = 0.001;
      setYear(3);
    
    if(buildingAge === "0 to 5 Years") 
     {baseRate-=0.0001;}
    
  else if(buildingAge === "5 to 10 Years")  
  {baseRate-=0.0002;}
    

  else if(buildingAge === "10 to 15 Years")
  {baseRate-=0.0003;}
   
  else if(buildingAge === "15 to 20 Years")
  {baseRate-=0.0004;}

  else if(buildingAge === "20 to 25 Years")
  {baseRate-=0.0005;}

  setPremium(Math.floor((marketValue*baseRate)*10)*3-200);
  // setValue(marketValue);
  console.log(baseRate);
    }
    else if(security === "No"){
      let baseRate = 0.002;
       setYear(3);
    
    if(buildingAge === "0 to 5 Years") 
     {baseRate-=0.0001;}
    
  else if(buildingAge === "5 to 10 Years")  
  {baseRate-=0.0002;}
    

  else if(buildingAge === "10 to 15 Years")
  {baseRate-=0.0003;}
   
  else if(buildingAge === "15 to 20 Years")
  {baseRate-=0.0004;}

  else if(buildingAge === "20 to 25 Years")
  {baseRate-=0.0005;}
  
  if(marketValue!==undefined)
  {
    setYear(3);
    setPremium(Math.floor((marketValue*baseRate)*10)*3-200);
  }
  // setPremium(Math.floor((marketValue*baseRate)*10)*3-200);
  // setValue(marketValue);
  console.log(baseRate);
    
  }
  }
  
  const caliculate4=()=>
  {
    if(marketValue===undefined)
    {
      setYear();
      setUrlCopy(true)
    }
    // setYear(4);
    
    if(security === "Yes")
    {
      let baseRate = 0.001;
      setYear(4);
    
    if(buildingAge === "0 to 5 Years") 
     {baseRate-=0.0001;}
    
  else if(buildingAge === "5 to 10 Years")  
  {baseRate-=0.0002;}
    

  else if(buildingAge === "10 to 15 Years")
  {baseRate-=0.0003;}
   
  else if(buildingAge === "15 to 20 Years")
  {baseRate-=0.0004;}

  else if(buildingAge === "20 to 25 Years")
  {baseRate-=0.0005;}

  setPremium(Math.floor((marketValue*baseRate)*10)*4-300);
  // setValue(marketValue);
  console.log(baseRate);
    }
    else if(security === "No"){
      let baseRate = 0.002;
      setYear(4);
    
    if(buildingAge === "0 to 5 Years") 
     {baseRate-=0.0001;}
    
  else if(buildingAge === "5 to 10 Years")  
  {baseRate-=0.0002;}
    

  else if(buildingAge === "10 to 15 Years")
  {baseRate-=0.0003;}
   
  else if(buildingAge === "15 to 20 Years")
  {baseRate-=0.0004;}

  else if(buildingAge === "20 to 25 Years")
  {baseRate-=0.0005;}
  if(marketValue!==undefined)
  {
    
    setPremium(Math.floor((marketValue*baseRate)*10)*4-300);
  }

  // setPremium(Math.floor((marketValue*baseRate)*10)*4-300);
  // setValue(marketValue);
  console.log(baseRate);

  }
  }

  const caliculate5=()=>
  {
    if(marketValue===undefined)
    {
      setUrlCopy(true)
    }
    // setYear(5);
    
    if(security === "Yes")
    {
      let baseRate = 0.001;
      setYear(5);
    
    if(buildingAge === "0 to 5 Years") 
     {baseRate-=0.0001;}
    
  else if(buildingAge === "5 to 10 Years")  
  {baseRate-=0.0002;}
    

  else if(buildingAge === "10 to 15 Years")
  {baseRate-=0.0003;}
   
  else if(buildingAge === "15 to 20 Years")
  {baseRate-=0.0004;}

  else if(buildingAge === "20 to 25 Years")
  {baseRate-=0.0005;}

  setPremium(Math.floor((marketValue*baseRate)*10)*5-400);
  // setValue(marketValue);
  console.log(baseRate);
    }
    else if(security === "No") {
      let baseRate = 0.002;
      setYear(5);
    
    if(buildingAge === "0 to 5 Years") 
     {baseRate-=0.0001;}
    
  else if(buildingAge === "5 to 10 Years")  
  {baseRate-=0.0002;}
    

  else if(buildingAge === "10 to 15 Years")
  {baseRate-=0.0003;}
   
  else if(buildingAge === "15 to 20 Years")
  {baseRate-=0.0004;}

  else if(buildingAge === "20 to 25 Years")
  {baseRate-=0.0005;}

  if(marketValue!==undefined)
  {
    setYear(5);
    setPremium(Math.floor((marketValue*baseRate)*10)*5-400);
  }

  // setPremium(Math.floor((marketValue*baseRate)*10)*5-400);
  // setValue(marketValue);
  console.log(baseRate);

    }
  }

  const [data,setData] = useState("");
  const [data1,setData1] = useState("");
  const [login,setLogin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showstate , setState] = useState(false);


  // useEffect(() => {
  //   const storedYear = sessionStorage.getItem('year');
  //   const storedPremium = sessionStorage.getItem('Premium');
  //   setYear(storedYear ? parseInt(storedYear, 10) : null);
  //   setPremium(storedPremium ? parseInt(storedPremium, 10) : null);
  // }, []);
  
  let startingCustomerId = parseInt(localStorage.getItem('customerId')) || 11110;

 
   const [feilds, setFeilds] = useState({
    name: '',
    mobileno: '',
    email: '',
    password: '',
    paymentId: '',
    customerId:"",
  });

  const [validationErrors, setValidationErrors] = useState({
    name: '',
    mobileno: '',
    email: '',
    password: '',
  });

   const [values, setValues] = useState({
      mobileno: '',
      password: '',
      email: '',
    });
  
  const change=(e)=>
  {
        const {name,value}=e.target;
       setFeilds({...feilds,[name]:value});

       setValues({...values,[name]:value});

        // validation name:
        if(name === "name"){
          if(!regexUsername.test(value))
          {
            setValidationErrors({ ...validationErrors, [name]: "Full Name must be 3 or more character ex: abc" });
          } else {
            setValidationErrors({ ...validationErrors, [name]: "" });
          }
        }

        // validation for mobile no :
        if(name === "mobileno"){
          if(!regexMobileNo.test(value))
          {
            setValidationErrors({ ...validationErrors, [name]: "Phone must start with 6,7,8,9 series with  10 digits" });
          } else {
            setValidationErrors({ ...validationErrors, [name]: "" });
          }
          }

          // validation for email :
          if(name === "email"){
            if(!regexEmail.test(value))
            {
              setValidationErrors({ ...validationErrors, [name]: "Please enter valid email ex: example@gmail.com" });
            } else {
              setValidationErrors({ ...validationErrors, [name]: "" });
            }
          }

          // validation for password :
          if(name === "password")
          {
            if(!regexPassword.test(value))
            {
              setValidationErrors({ ...validationErrors, [name]: "password  1 uppercase letter, 1 special symbol and 1 digit minlength 8" });
            } else {
              setValidationErrors({ ...validationErrors, [name]: "" });
            }
          }

          sessionStorage.setItem(name, value);
  }

 

  useEffect(() => {
    // Retrieve feilds data from sessionStorage
    const storedName = sessionStorage.getItem('name');
    const storedMobileNo = sessionStorage.getItem('mobileno');
    const storedEmail = sessionStorage.getItem('email');
    const storedPassword = sessionStorage.getItem('password');

    // Update feilds state with sessionStorage data if available
    if (storedName) {
        setFeilds((prevFeilds) => ({ ...prevFeilds, name: storedName }));
    }
    if (storedMobileNo) {
        setFeilds((prevFeilds) => ({ ...prevFeilds, mobileno: storedMobileNo }));
    }
    if (storedEmail) {
        setFeilds((prevFeilds) => ({ ...prevFeilds, email: storedEmail }));
    }
    if (storedPassword) {
        setFeilds((prevFeilds) => ({ ...prevFeilds, password: storedPassword }));
    }
}, []);


var j = location.state?.i;
var i=0;
  const handleSignUp = () =>
   {
      if(marketValue===undefined)
      {
        setUrlCopy(true);
        setShowModal(false);
       
      }
    if((year === 1 || year === 2 || year === 3 || year === 4 || year === 5 )&& i === 0 && j === undefined )
    {
      i++;
       console.log(i);
       if(marketValue===undefined)
       {
        setShowModal(false);
       }
       else{
        setShowModal(true)
       }
       
      }
        
      else if (j>0){

        if(year === 1 || year === 2 || year === 3 || year === 4 || year === 5 )
        {
          
        i=j;
         setShowModal(false);

          navigate("/fill", { state: { formData: feilds, premiumData: { year, Premium } ,  marketValue ,buildingAge , security , squareFeet ,pincode,person,effected,i,startingCustomerId} })
        }
        else {
          setState(true);
        }
      }
     
      else {
        setShowModal(true)
        console.log(year)
      }
    
  };
  // const handleSignUp = ()=>
  // {
  //   navigate("/fill", { state: { formData: feilds, premiumData: { year, Premium } ,  marketValue ,buildingAge , security , squareFeet ,pincode,person,effected,i,startingCustomerId} })
  // }
   const [customer,setCustomer] = useState("");
  const [signUpDetails, setSignUpDetails] = useState([]);

  useEffect(() => {
    if (values.mobileno) {
      PropertyInsuranceService.getCustomerIdByMobileNo(values.mobileno)
        .then((res) => {
          setSignUpDetails(res.data);   
    });
  }
  });
  
  const signUpRows = signUpDetails.map((details) => (
    <tr key={details.id}>
     {details.email}
    </tr>
  ));
  const signUpRowsAsString = signUpRows.map(row => row.props.children); 
  values.email = signUpRowsAsString.join(', ');

  // console.log(feilds);
  const handleClose = () => setShowModal(false);
  const clickClose =()=> setState(false);
  const clickClosebutton =()=> setLogin(false);

  // navigating signup page :
  const navigate=useNavigate();

  const handleClick=(e)=>{

    e.preventDefault();
    
    console.log(i);


    if(regexUsername.test(feilds.name) && regexMobileNo.test(feilds.mobileno) && regexEmail.test(feilds.email))
      {
        const s=feilds.mobileno;
        const d=feilds.email;
        console.log(s)
        console.log(d)
        
      // PropertyInsuranceService.checkEmail(d).then((res)=>{
        
    //  //   const check=res.data;
    //     console.log(check);
    //     setData1(check);
       
      //PropertyInsuranceService.checkMobileNumber(s).then((res)=>{
       
        //console.log(res.data);
      //  setData(res.data);
        //const ch=res.data;
        //console.log(ch);
        
    //     if(ch === "Mobile number is not exists" && check ==="email is not exists")
    //  {
         i++;
   
        console.log(i);
       navigate("/fill", { state: { formData: feilds, premiumData: { year, Premium } ,  marketValue ,buildingAge , security , squareFeet ,pincode,person,effected,i,startingCustomerId} })
     
        console.log("feilds =>"+JSON.stringify(feilds));
        // PropertyInsuranceService.createCustomer(feilds);

      }
     // })
  //  })
    
      
   //   }

  }

// i++;
  
  const handleClicksignup =(e)=>
      {
        e.preventDefault();
        
        async function performLogin(){
        
          const response = await PropertyInsuranceService.login(values);
          //console.log(response)
          const loginResponse = response.data; 
          //  setCustomer(loginResponse);
          console.log('Login Response:', loginResponse);
       
          i++;
            console.log(i);

          if (loginResponse === "Login successful!") 
          { 
         
            
            // setshowState(true);
            //  navigate("",{state:{values:values}})
        
            navigate("/fill", { state: { formData: values, premiumData: { year, Premium } ,  marketValue ,buildingAge , security , squareFeet ,pincode,person,effected,i,startingCustomerId} })
            
          } 
          else 
          {
            
             setCustomer(loginResponse);
          }
      }
      performLogin();
      }

      const hanldeKey=(event)=>
        {
          // e.preventDefault();
          const charCode=event.which ? event.which : event.keyCode;

          if((charCode<48 || charCode>57 ) && charCode!==8  &&  (charCode<37 || charCode>40)  )
          {
            event.preventDefault();
          }
        }

        const[urlCopy,setUrlCopy]=useState();
        const urlOk=()=>
        {
          navigate("/property");
        }
        
        const [isBuyNow, setIsBuyNow] = useState(false);

        const slideAnimation = useSpring({
          from: { transform: 'translateX(50%)' },
          to: { transform: isBuyNow ? 'translateX(-100%)' : 'translateX(0%)' },
          delay: 2000, // Delay for 1 second
          onRest: () => setIsBuyNow(!isBuyNow)
        }); 

  return (
    <div className='property'>
      <Header/>
    <div className=' pt-4'>
      <div className='row mt-lg-5'>
       <div className='col-12 col-lg-3 ms-lg-3 ms-2 order-2 order-lg-1'>
       <div class="card mt-2 mb-3" >
        <div class="card-body bg-light border border-warning rounded shadow ">
           <h5 class="card-title bg-warning-subtle text-center rounded p-1 fw-bold">Secure your home rightfully!</h5>
           <p class="card-title bg-secondary-subtle text-center rounded p-1 fw-bold">You have the right to buy home insurance from RamanaSoft</p>
            <ui className="custom-bullet">
              <li style={{whiteSpace:'nowrap'}}><span className='fw-bold'>Banks accept</span> all online bought policies</li>
              <li style={{whiteSpace:'nowrap'}}><span className='fw-bold'>Instant policy </span> with zero documentation</li>
              {/* <li style={{whiteSpace:'nowrap'}}>save <span className='fw-bold'>up to 25%</span> by comparing plans</li> */}
              <li style={{whiteSpace:'nowrap'}}>Buy <span className='fw-bold'>without unwanted </span> addons!</li>
            </ui>
            <small className='text-secondary ms-4'>Strandard <span><a href='#' className='text-decoration-none'>terms & conditions</a></span> apply.</small>
        </div>
     </div>

<div class="card text-center mb-3">
  <div class="card-body bg-light border border-danger rounded shadow">
    <h5 class="card-title text-start bg-danger-subtle rounded fw-bold p-1 text-center">Entire Housing Society</h5>
    <p class="card-text">Secure your entire housing society against <br/><ul className='d-flex justify-content-evenly fw-semibold mt-1'><li>Fire</li><li>Theft</li><li>Natural disasters</li></ul> </p>
    <button  class="btn text-success border fw-bold">Buy Now <HomeIcon /></button>
  </div>
</div>

<div class="card text-center">
  <div class="card-body bg-light border border-primary rounded row">
    <h5 class="card-title fw-bold bg-secondary-subtle rounded text-dark">Talk to Expert</h5>
    <div className='col mt-lg-2 rounded'>
      <img src={care} className='img-fluid  care' alt='customer care'></img>
    </div>
    <div className='col-lg-8'>
    <p class="card-text ">Our agent can help you to buy the best home insurance!</p>
    <button  class="btn fw-bold text-primary border"><PhoneIcon />Talk to Expert</button>
    </div>
  </div>
</div>
</div>
       <div className='col-12 col-lg-8 ms-lg-5 ms-2 order-1 order-lg-2'>
       <div className='d-flex justify-content-around align-items-center flex-wrap'>
  <div>
    <a onClick={handleGoBack} title="Back">
      <KeyboardArrowLeftOutlinedIcon className='border bg-light fs-1 fs-lg-2 rounded text-primary' />
    </a>
  </div>
  <div className='col-7 ms-4 col-lg-4 mb-4 mt-5 mt-lg-0 pt-lg-0 pt-3'> 
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label" className='fw-bold'>Select Years</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={year}
        label="Age of the Building"
        className='fw-bold'
        required
      >
        <MenuItem value={1} onClick={caliculate1}>1 Year</MenuItem>
        <MenuItem value={2} onClick={caliculate2}>2 Years</MenuItem>
        <MenuItem value={3} onClick={caliculate3}>3 years</MenuItem>
        <MenuItem value={4} onClick={caliculate4}>4 years</MenuItem>
        <MenuItem value={5} onClick={caliculate5}>5 years</MenuItem>
      </Select>
    </FormControl>
  </div>
  <div>
    <p className='ms-4 fw-bold text-secondary'>All premiums are inclusive of GST</p>
  </div>
</div>

        <div class="card ">
          <img src={shield} style={{width:'45px',position:'absolute'}} title='secure' alt="100% secured"className='p-2 bg-light rounded'></img>
  <div class="card-body d-flex flex-column flex-md-row justify-content-md-around align-items-center p-3">
    <div>
    <img src={RamanaLogo}title='RamanaSoft' alt='company-logo' className='rounded shadow' style={{width:'60px'}}></img>
    </div>
    <div>
    <h5 class="card-title fw-bold mt-3">RamanaSecure Living</h5>
    </div>
    <div>
    <p class="card-text fw-bold text-secondary">Policy Term</p>
    <h5 className='text-center fw-bold'>{year?year:0}{' '}{year===1?'year':'years'}</h5>
    </div>
    <div className='mt-2 mt-md-0'>
    <div className="">
      {/* <button className="hover-button btn-primary fw-bold  buy shadow px-5 py-3 rounded mt-lg-2"  onClick={handleSignUp}>
        <span className="default-text mt-1">&#x20B9; {Premium?Premium:0}/-</span>
        <span className="hover-text mt-1">Buy Now</span>
      </button> */}
      <button style={{ position: 'relative', width: '150px', height: '50px', overflow: 'hidden' }} className='btn btn-primary rounded buy shadow fw-bold' onClick={handleSignUp}>
      <animated.div style={{ ...slideAnimation, position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
        {isBuyNow ? 'Buy Now' : `₹${Premium?Premium:0}/-`}
      </animated.div>
    </button>
    </div>
    <p className='text-secondary mt-1 ms-2'>inclusive of all taxes.</p>


    </div>
  </div>
  <div class="card-footer text-body-secondary text-end fw-bold">
    <div className='d-flex flex-column flex-md-row   justify-content-evenly mt-2'>
    <div><p className='text-secondary px-3'style={{borderRight:'6px solid #ccc'}}>Property Value -<span className='fw-bold text-dark'>&nbsp;{marketValue}</span></p></div>
    <div><p className='text-secondary' >Age Of The Building -<span className='fw-bold text-dark'>&nbsp;{buildingAge}</span></p></div>
    <div><p className='text-secondary px-3'style={{borderLeft:'6px solid #ccc'}}>SquareFeet -<span className='fw-bold text-dark'>&nbsp;{squareFeet}</span></p></div>
    </div>
  </div>
</div>
       </div>
      </div>
      <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton  >
            <Modal.Title ><h3 className='text-center fw-bold text-secondary'>SignUp with <img src={RamanaLogo}alt='logo' className='rounded'style={{width:'60px', height:'40px'}}></img></h3></Modal.Title>
            </Modal.Header>
            <Modal.Body className='mx-3'>         
              <form onSubmit={handleClick}>
                 <TextField
                    className='mt-2 w-100'
                    id="outlined-basic"
                    // variant="outlined"
                    label="Full Name"
                    placeholder="Enter Your Name"
                    name='name'
                    required
                    value={feilds.name}
                    onChange={change}
                    inputProps={{ maxLength: 20 }}
                  /><br/>{validationErrors.name && <span className="text-danger">{validationErrors.name}</span>}<br/>
                  <div className='row'>
                    <div className='col-12 col-lg-8'>
                  
                  <TextField
                    className='mt-1 w-100'
                    id="outlined-basic"
                    // variant="outlined"
                    label="Email-Id"
                    placeholder="Enter Your Mail-Id"
                    name='email'
                    maxLength={20}
                    required
                    value={feilds.email}
                    onChange={change}
                    /><br/>{validationErrors.email && <span className="text-danger">{validationErrors.email}</span>}<br/>
                    </div>
                    <div style={{float:'right'}} className='col-12 col-lg-4'>
                    <button className='btn btn-success px-3 py-2 rounded mt-2 fw-bold shadow' onClick={sendOTP}>Send OTP</button>
                    </div>
                  </div>
                    <div className='row'>
                      <div className='col-12 col-lg-8'>
                 <TextField
                    className=' mt-1 w-100'
                    id="outlined-basic"
                    // variant="outlined"
                    label="Mobile No."
                    placeholder="Enter Your Mobile No."
                    name='mobileno'
                    required
                    value={feilds.mobileno}
                    onChange={change}
                    inputProps={{ maxLength: 10 }}
                    onKeyPress={(e) => {
                      const isValidInput = /[0-9]/;
                      if (!isValidInput.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    autoComplete='off'
                    /><br/>{validationErrors.mobileno && <span className="text-danger">{validationErrors.mobileno}</span>}<br/>
                    </div>

                  <div style={{float:'right'}} className='col-12 col-lg-4'>
                    <button className='btn btn-success px-3 py-2 rounded mt-2 fw-bold shadow' onClick={sendOTP}>Send OTP</button>
                  </div>
                  {showOTPInput && (
                  <div>
                     <div className='ms-5'>
                      <small className='text-success '>OTP sent to your mobile Number</small>
                      <form className='w-75 d-flex flex-nowrap pt-3'>
                      {[...Array(4)].map((_, index) => (
                      <input key={index} type="text"
                       className='w-25 border ps-2 fw-bold' 
                       maxLength={1} 
                       style={{ marginRight: '8px' }}
                       autoFocus={index === 0}
                       onKeyPress={(e) => {
                        const isValidInput = /[0-9]/;
                        if (!isValidInput.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      />
                       ))}
                       <button className='btn btn-info text-nowrap fw-bold shadow ms-3'>Verify OTP</button>
                      </form>
                     </div>
                  </div>
                    )}
                  </div>
                  {/* <TextField
                    type='password'
                    className='mt-2 border w-100'
                    id="outlined-basic"
                    // variant="outlined"
                    label="Password"
                    placeholder="Enter Your Password"
                    name='password'
                    maxLength={20}
                    required
                    value={feilds.password}
                    onChange={change}
                    /><br/>{validationErrors.password && <span className="text-danger">{validationErrors.password}</span>}<br/> */}
                
                  {data === "Mobile number exists" && <h5 className='text-danger'>{data}</h5>}
                  {data1 === "email exists" && <h5 className='text-danger'>{data1}</h5>}
                  <hr></hr>
                  <div className='d-flex justify-content-center me-4'>
                  <div className=''>
                    <input type='submit' value="SignUp" className='btn btn-primary shadow px-5 fw-bold mb-2 shadow'/>
                  </div>
                </div>
                
              </form>

              <div>
              </div>
            </Modal.Body>
          </Modal>
    </div>

    <div>
            <Modal show={login} onHide={clickClosebutton} className='text-center' >
           <Modal.Header closeButton  >
                    <Modal.Title ><h3 className='text-center'>Enter Your Details:</h3></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <form onSubmit={handleClicksignup}>
                <div class="form-group mt-4">
      <label class="control-label col-lg-4 col-md-6 col-sm-6 col-12">Mobile No :</label>
      <input className='text-center my-3' type='text' name='mobileno' maxLength={10} style={{ borderRadius: '10px', borderColor: 'cyan' }}  placeholder='Mobile No.... Ex: 7698888123.'  required value={values.mobileno} onChange={change} /> <br></br>
    </div>

    <div class="form-group mt-2">
      <label class="control-label col-lg-4 col-md-6 col-sm-6 col-12">Password :</label>
      <input className='text-center my-3' type='password' name='password' style={{ borderRadius: '10px', borderColor: 'cyan' }} placeholder='Password.... Ex: abc@123.' required onChange={change} /> <br></br>
    </div>
    <div class="d-flex justify-content-center w-100">

    {customer !== "Login successful!" && <h4 style={{ color: 'red' }}>{customer}</h4>}

    </div>

    <div>
      <button className='btn btn-primary text-center my-3 me-2'>Login</button>
      </div>
      <div>
           <span className="login-link text-primary my-3" style={{cursor:'pointer'}} onClick={() =>{
             setLogin(false);
             setShowModal(true) ;
             }}>Switch to Signup....</span> 
      </div>
  
    </form>
                </Modal.Body>
               
            </Modal>
    </div>
    <div>
           <Modal show={showstate} onHide={clickClose} className='text-center' >

                <Modal.Body>
                  <h4 className='mt-5'>Please Select Any one Of The Year Premium</h4>
                  <button className='btn btn-outline-primary my-5' onClick={clickClose} >Close</button>
                </Modal.Body>
               
            </Modal>
    </div>
    <div>
           <Modal show={urlCopy}  className='text-center' >

                <Modal.Body>
                  <h4 className='mt-5'>Please Enter the Property Details</h4>
                  <button className='btn btn-outline-primary my-5' onClick={urlOk} >OK</button>
                </Modal.Body>
               
            </Modal>
    </div>
    

    </div>
  );
}

export default GetQuote;
