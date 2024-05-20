import React, { useState, useEffect } from 'react';
// import './Profile.css';
import { Link, useLocation } from 'react-router-dom';
import PropertyInsuranceService from './Service/PropertyInsuranceService';
import { integerRege6, regexEmail, regexFullName, regexHouseNo,  regexMobileNo, regexStreet,  regexUsername } from './RegularExpressions';
import { TextField } from '@mui/material';
import AccountCircleSharpIcon from '@mui/icons-material/AccountCircleSharp';

function Profile() {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
    const location = useLocation();
    const { state } = location;
    const [mobileno] = useState(state?.values);
    // const mobileno = 8074266396;

    const storedMobileNumber = sessionStorage.getItem('mobileNumber');
    sessionStorage.setItem('mobileNumber', mobileno);

    const [signUpDetails, setSignUpDetails] = useState([]);
    const [StrucutureDetails, setStructureDetails] = useState([]);
    const [fillDetails, setFilldetails] = useState([]);
    const [paymentDetails, setPaymentDetails] = useState([]);

    const [showContactForm, setShowContactForm] = useState(false);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingAddress, setIsEditingAddress] = useState(false);
    const [verified, setVerified] = useState(false);
    const [notVerified, setNotVerified] = useState('');

    const [contact, setContact] = useState({
        id: '',
        name: '',
        mobileno: mobileno,
        email: '',
    });

    const [address, setAddress] = useState({
        pincode:"",
        houseno:"",
        city:"",
        state:"",
        streetno:""
    });

    const [validationErrors, setValidationErrors] = useState({
        name: '',
        mobileno: '',
        email: '',
        pincode: '',
        city:"",
        state:"",
        houseno: '',
        streetno: '',
    });

    const [emailotp,setEmailotp]=useState("");

    const [isEditingMobile, setIsEditingMobile] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [otpSent, setOtpSent] = useState(false); // State to track whether OTP has been sent
    const [otpSent1, setOtpSent1] = useState(false);
    const[enteredOtp,SetEnterOtp]=useState("");
    const [otp, setOtp] = useState('');

    const [data, setData] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name in contact) {
            setContact({
                ...contact,
                [name]: value
            });
        } else if (name in address) {
            setAddress({
                ...address,
                [name]: value
            });
        }

        // Validation
        switch (name) {
            case 'name':
                setValidationErrors({ ...validationErrors, [name]: regexUsername.test(value) ? '' : 'Username must be 3 or more characters' });
                break;
            case 'mobileno':
                setValidationErrors({ ...validationErrors, [name]: regexMobileNo.test(value) ? '' : 'Please Enter a Valid MobileNo' });
                break;
            case 'email':
                setValidationErrors({ ...validationErrors, [name]: regexEmail.test(value) ? '' : 'Please enter a valid email address' });
                break;
            case 'pincode':
                setValidationErrors({ ...validationErrors, [name]: integerRege6.test(value) ? '' : 'Enter Valid Pincode' });
                break;
            case 'houseno':
                setValidationErrors({ ...validationErrors, [name]: regexHouseNo.test(value) ? '' : 'Enter Valid House number' });
                break;
            case 'streetno':
                setValidationErrors({ ...validationErrors, [name]: regexStreet.test(value) ? '' : 'Enter valid streetno name' });
                break;
            case 'city':
                setValidationErrors({ ...validationErrors, [name]: regexFullName.test(value) ? '' : 'Enter valid city name' });
                break;
            case 'state':
                setValidationErrors({ ...validationErrors, [name]: regexFullName.test(value) ? '' : 'Enter valid state name' });
                break;
            default:
                break;
        }
    };

    useEffect(() => {     
        PropertyInsuranceService.getCustomerIdByMobileNo(storedMobileNumber)
            .then((res) => {
                setSignUpDetails(res.data);
                const customerId = res.data[0]?.customerId;
                if (customerId) {
                    PropertyInsuranceService.getStructureDetailsByCustomerId(customerId)
                        .then((res) => {
                            setStructureDetails(res.data);
                        });
                    PropertyInsuranceService.getFillDetailsByCustomerId(customerId)
                        .then((res) => {
                            setFilldetails(res.data);
                        });
                    PropertyInsuranceService.getPaymentDetailsByCustomerId(customerId)
                        .then((res) => {
                            setPaymentDetails(res.data);
                        })
                        .catch((error) => {
                            console.error();
                        });
                }
            });
        }, []); 

    const handleShowForm = (e) => {
        e.preventDefault();
        setShowContactForm(true);
        setShowAddressForm(true);
    };

    useEffect(() => {
        setContact({
            ...contact,
            email: signUpDetails[0]?.email,
            mobileno: signUpDetails[0]?.mobileno,
            name: fillDetails[0]?.fullname,
        });
        setAddress({
            ...address,
            pincode:fillDetails[0]?.pincode,
            houseno:fillDetails[0]?.houseno,
            streetno: fillDetails[0]?.streetno,
            city:fillDetails[0]?.city,
            state:fillDetails[0]?.state
        });
    }, [signUpDetails,fillDetails]);

    const handleEditAddress = (e) => {
        e.preventDefault();
        setIsEditingAddress(true);
    };

    const handleEditMobile = (e) => {
        e.preventDefault();
        setIsEditingMobile(true);
    };

    const handleEditEmail = (e) => {
        e.preventDefault();
        setIsEditingEmail(true);
    };

    const handleSaveMobile = () => {
        // e.preventDefault();
        if (regexMobileNo.test(contact.mobileno)) {
            var id=signUpDetails[0].id;
        var mobno=contact.mobileno;
console.log(id,mobno)
if (id && mobno) {
    PropertyInsuranceService.updateCustomerByMobileNo(id, mobno)
        .then((res) => {
            console.log("details:", res.data);
            const updateResponse = res.data;
            console.log(updateResponse);
            setIsEditingMobile(false);
        })
        .catch((error) => {
            console.error(error);
        });
} else {
    console.error("ID or mobile number is missing");
}
        }
    };

    const handleSaveEmail = () => {
        // e.preventDefault();
        const email=contact.email
        if (regexEmail.test(email)) {
            var id = signUpDetails[0]?.id;
            var emailId=contact.email;
            PropertyInsuranceService.updateCustomerByEmailId(id,emailId).then((res) => {
                console.log("details :"+ res.data);
                const updateResponse = res.data;
                console.log(updateResponse);
                setIsEditingEmail(false);
            }).catch((error) => {
                console.error();
            });
        }
    };

    const handleSaveAddress = (e) => {
        e.preventDefault();
console.log(address);
        if(regexHouseNo.test(address.houseno) && regexStreet.test(address.streetno) && regexFullName.test(address.city)&& regexFullName.test(address.state) && integerRege6.test (address.pincode)) {
            console.log(fillDetails);
            for (let i = 0; i < fillDetails.length; i++) {
                const id = fillDetails[i]?.id;
                console.log(id);
                PropertyInsuranceService.updateFillDetailById(id,address).then((res) => {
                    console.log("details :"+ res.data);
                    const updateResponse = res.data;
                    console.log(updateResponse);
                    setIsEditingAddress(false);
                });
            }
            setIsEditingAddress(false);
        }
        
    };

    const handleSendOTP = () => {

       console.log(contact.mobileno); 
       if(regexMobileNo.test(contact.mobileno))
        {
        PropertyInsuranceService.checkMobileNumber(contact.mobileno).then((res)=>
    {

        console.log(res.data);
        setData(res.data);
        if (res.data === "Mobile number is not exists")
    {
        setOtpSent(true);
        PropertyInsuranceService.getOtp1().then((res) => 
        {
          console.log(res.data);
          const otp=res.data;
          SetEnterOtp(res.data);
          PropertyInsuranceService.getOtp(contact.mobileno,otp).then(() => {
          
          }).catch(error => {
            console.error(error);
          });
        })
    }
    }).catch(error => {
        console.error(error);
      });
    }
    else {setData("")}
    };
    const handleSendOTP1 = () => {

        if(regexMobileNo.test(contact.mobileno))
        {

        PropertyInsuranceService.checkEmail(contact.email).then((res)=>
    {
        console.log(res.data);
        setData(res.data);
        if (res.data === "Email is not exists")
  {

        setOtpSent1(true);
        // console.log(otp,enteredOtp);
        PropertyInsuranceService.sendEmailotp(contact.email).then((res) => {
            console.log(res.data);
            const otp=res.data;
            SetEnterOtp(res.data);
            
        }).catch(error => {
          console.error(error);
        });
  }

    }).catch(error => {
        console.error(error);
      });
    }
    };

    const handleVerifyOTP = () => {
console.log(signUpDetails,contact.mobileno)
        if (otp == enteredOtp.toString()) {
            setNotVerified("Mobile Number Verified Successfully!");
            //navigate("/login",{state:{values:mobileNumber}})
           signUpDetails[0].mobileno=contact.mobileno;
        //    var id=signUpDetails[0].id;
        // var mobn=contact.mobileno;
            handleSaveMobile();
            // console.log(mobn,id)
            setVerified(true);
            setOtpSent(false);
        setIsEditingMobile(false);
        setIsEditingEmail(false);
        setOtp("");
          } else {
            setNotVerified("Enter Valid otp!");
            setVerified(false);
            setOtp("");
          }

    };
    const handleVerifyOTP1 = () => {
       
            if (otp == enteredOtp.toString()) {
                 setNotVerified(" Verified Successfully!");
                 //navigate("/login",{state:{values:mobileNumber}})
                 signUpDetails[0].email=contact.email;
                 handleSaveEmail();
                 setVerified(true);
                 setOtpSent1(false);
             setIsEditingMobile(false);
             setIsEditingEmail(false);
             setOtp("");
               } else {
                 setNotVerified("Enter Valid otp!");
                 setVerified(false);
                 setOtp("");
                
               }
    };

    const renderOTPFieldOrButton = () => {
        if (otpSent) {
            return (
                <div>
                    <label>Enter OTP:</label>
              <input 
                type="text" 
                placeholder="Enter OTP" 
                value={otp} 
                onChange={(e) => setOtp(e.target.value)} 
              />
                    <button onClick={handleVerifyOTP}>Verify</button>
                    <p>{notVerified}</p>
                </div>
            );
        }
    };

    const renderOTPFieldOrButton1 = () => {
        if (otpSent1) {
            return (
                <div>
                    <label>Enter OTP:</label>
              <input 
                type="text" 
                placeholder="Enter OTP" 
                value={otp} 
                onChange={(e) => setOtp(e.target.value)} 
              />
                    <button onClick={handleVerifyOTP1}>Verify</button>
                    <p>{notVerified}</p>
                </div>
            );
        }
    };

    const handleCancel=()=>
    {
        setOtpSent1(false);
        setOtpSent(false);
        setIsEditingMobile(false);
        setIsEditingEmail(false);
        contact.mobileno=signUpDetails[0].mobileno;
        contact.email=signUpDetails[0].email;
        setValidationErrors("");
        setData("");
        setNotVerified("");
    }

    console.log(address)
    console.log(signUpDetails,StrucutureDetails,fillDetails,paymentDetails)

    return (
        <div className='row container-fluid pay'>
            <div className='col-12 col-lg-3 col-md-4 mt-3 rounded line' style={{borderRight:'3px solid grey'}}>
                <h2 className='text-light fw-bold text-center rounded' style={{background:'#318ce7'}}>Profile <AccountCircleSharpIcon className='fs-1'/></h2>
                <div>
                    <h4 className='text-secondary'>Contact Details</h4>
                    <div className='ms-lg-2'>
                        {/* <span className='fw-semibold'>Name:</span> */}
                        {/* {isEditing ? (
                            <input
                                type="text"
                                name="name"
                                value={fillDetails[0]?.fullname}
                                onChange={handleChange}
                            />
                            ) : ( */}
                                <TextField
                                    className='col-12 col-lg-11 mt-2'
                                    id="outlined-input"
                                    // label="Name"
                                    name='name'
                                    value={fillDetails[0]?.fullname}
                                    InputProps={{
                                    disabled:true,
                                    className:'fw-bold text-secondary',
                                    }}
                                />
                            {/* // <span className='fw-bold text-dark mx-2'>{contact.name}</span> */}
                        {/* )} */}
                        <br/>
                        <small>
                            {isEditing && validationErrors.name && <span className="ms-5 error text-danger">{validationErrors.name}</span>}
                        </small>
                    </div>
                    <div className='ms-lg-2 mt-2'>
                        {isEditingMobile ? (
                            <TextField
                                type="text"
                                className='col-12 col-lg-11 mt-2'
                                name="mobileno"
                                label="Mobile No"
                                variant="outlined"
                                value={contact.mobileno}
                                onChange={handleChange}
                                onKeyPress={(e) => {
                                // Prevent input if the key pressed is not a number
                                const onlyNumbers = /[0-9]/;
                                if (!onlyNumbers.test(e.key)) {
                                    e.preventDefault();
                                }
                                }}
                                inputProps={{maxLength:10}}
                            />
                            ) : (
                                <TextField
                                    className='col-12 col-lg-11 mt-2'
                                    id="outlined-disabled-input"
                                    label="Mobile No."
                                    name='mobileno'
                                    onChange={handleChange}
                                    defaultValue={contact.mobileno}
                                    InputProps={{
                                    disabled: true,
                                    className:'fw-bold',
                                    }}
                                />
                            )}
                            <div>{data === "Mobile number exists" && <h5 style={{ color: 'red' }}>{data}</h5>}</div>
                        <small>
                        {isEditingMobile && validationErrors.mobileno && <span className="ms-3 error text-danger">{validationErrors.mobileno}</span>}
                        </small>
                        <p className='mt-2 text-center me-5'>
                            {isEditingMobile ? (
                                <>
                                    <Link onClick={handleSendOTP} className='me-4 text-decoration-none text-success'>Send OTP</Link>
                                    <Link onClick={handleCancel} className='text-decoration-none text-danger'>Cancel</Link>
                                </>

                            ) : (
                                <Link onClick={handleEditMobile} className=" text-decoration-none ">
                                   Update <i className="fas fa-pencil-alt text-primary"></i>
                                </Link>
                            )}
                        </p>
                        <div className="text-center my-2">
                            {renderOTPFieldOrButton()}
                        </div>
                    </div>
                    <div className='ms-lg-2'>
                        {isEditingEmail ? (
                            <TextField
                                type="text"
                                className='col-12 col-lg-11 mt-2'
                                name="email"
                                label="E-Mail"
                                variant="outlined"
                                value={contact.email}
                                onChange={handleChange}
                                inputProps={{maxLength : 100}}
                            />
                            ) : (
                                <TextField
                                    className='col-12 col-lg-11 mt-2'
                                    id="outlined-disabled-input"
                                    label="E-Mail"
                                    name='email'
                                    onChange={handleChange}
                                    value={contact.email}
                                    InputProps={{
                                    disabled: true,
                                    className:'fw-bold',
                                    }}
                                />
                        )}
                        <p className='mt-2 text-center me-5'>
                            {isEditingEmail ? (
                                <>
                                    <Link onClick={handleSendOTP1} className='me-4 text-decoration-none text-success'>SendOTP</Link>
                                    <Link onClick={handleCancel} className='text-decoration-none text-danger'>Cancel</Link>
                                </>
                                ) : (
                                    <Link onClick={handleEditEmail}className=" text-decoration-none">Update <i className="fas fa-pencil-alt text-primary"></i></Link>
                            )}
                        </p>
                        <small>
                        {isEditingEmail && validationErrors.email && <span className="ms-5 error text-danger">{validationErrors.email}</span>}
                        {data === "Email is exists" && <h5 className='text-danger'>{data}</h5>}</small>
                        <div className="text-center my-2">
                            {renderOTPFieldOrButton1()}
                        </div>
                    </div> 
                    <h4 className='text-secondary'>Address Details</h4>
                    <div className='ms-lg-2'>
                    <div>
                        {isEditingAddress ?
                            (
                                <TextField
                                    type="text"
                                    className='col-12 col-lg-11 mt-2'
                                    name="houseno"
                                    // label="House No."
                                    variant="outlined"
                                    value={address.houseno}
                                    onChange={handleChange}
                                    inputProps={{maxLength : 20}}
                                />
                            ) : (
                                <TextField
                                    className='col-12 col-lg-11 mt-2'
                                    id="outlined-disabled-input"
                                    // label="House No."
                                    name='houseno'
                                    onChange={handleChange}
                                    value={address.houseno}
                                    InputProps={{
                                    disabled: true,
                                    className:'fw-bold',
                                    }}
                                />
                        )}<small>
                        {isEditingAddress && validationErrors.houseno && <span className="ms-5 error text-danger">{validationErrors.houseno}</span>}</small>
                    </div>
                    <div>
                        {isEditingAddress ?
                            (
                                <TextField
                                    type="text"
                                    className='col-12 col-lg-11 mt-2'
                                    name="streetno"
                                    // label="Street No."
                                    variant="outlined"
                                    value={address.streetno}
                                    onChange={handleChange}
                                    inputProps={{maxLength : 20}}
                                />
                            ) : (
                                <TextField
                                    className='col-12 col-lg-11 mt-2'
                                    id="outlined-disabled-input"
                                    // label="Street No."
                                    name='streetno'
                                    onChange={handleChange}
                                    value={address.streetno}
                                    InputProps={{
                                    disabled: true,
                                    className:'fw-bold',
                                    }}
                                />
                        )}<small>
                        {isEditingAddress && validationErrors.streetno && <span className="ms-5 error text-danger">{validationErrors.streetno}</span>}</small>
                    </div>
                    <div>
                        {isEditingAddress ?
                            (
                                <TextField
                                    type="text"
                                    className='col-12 col-lg-11 mt-2'
                                    name="city"
                                    // label="City"
                                    variant="outlined"
                                    value={address.city}
                                    required
                                    onChange={handleChange}
                                    // onKeyPress={(e) => {
                                    //     // Prevent input if the key pressed is not a number
                                    //     const onlyNumbers = /[0-9]/;
                                    //     if (!onlyNumbers.test(e.key)) {
                                    //         e.preventDefault();
                                    //     }
                                    //     }}
                                    inputProps={{maxLength : 40}}
                                />
                            ) : (
                                <TextField
                                    className='col-12 col-lg-11 mt-2'
                                    id="outlined-disabled-input"
                                    // label="City"
                                    name='city'
                                    onChange={handleChange}
                                    value={address.city}
                                
                                    InputProps={{
                                    disabled: true,
                                    className:'fw-bold',
                                    }}
                                />
                        )}<small>
                        {isEditingAddress && validationErrors.city && <span className="ms-5 error text-danger">{validationErrors.city}</span>}</small>
                    </div>
                    <div>
                        {isEditingAddress ?
                            (
                                <TextField
                                    type="text"
                                    className='col-12 col-lg-11 mt-2'
                                    name="state"
                                    // label="state"
                                    variant="outlined"
                                    value={address.state}
                                    onChange={handleChange}
                                    required
                                    inputProps={{maxLength : 40}}
                                />
                            ) : (
                                <TextField
                                    className='col-12 col-lg-11 mt-2'
                                    id="outlined-disabled-input"
                                    // label="state"
                                    name='state'
                                    onChange={handleChange}
                                    value={address.state}
                                    InputProps={{
                                    disabled: true,
                                    className:'fw-bold',
                                    }}
                                />
                        )}<small>
                        {isEditingAddress && validationErrors.state && <span className="ms-5 error text-danger">{validationErrors.state}</span>}</small>
                    </div>
                    <div>
                        {isEditingAddress ?
                            (
                                <TextField
                                    type="text"
                                    className='col-12 col-lg-11 mt-2'
                                    name="pincode"
                                    // label="Pincode"
                                    variant="outlined"
                                    value={address.pincode}
                                    onChange={handleChange}
                                    onKeyPress={(e) => {
                                        // Prevent input if the key pressed is not a number
                                        const onlyNumbers = /[0-9]/;
                                        if (!onlyNumbers.test(e.key)) {
                                            e.preventDefault();
                                        }
                                        }}
                                    inputProps={{maxLength : 6}}
                                />
                            ) : (
                                <TextField
                                    className='col-12 col-lg-11 mt-2'
                                    id="outlined-disabled-input"
                                    // label="Pincode"
                                    name='pincode'
                                    onChange={handleChange}
                                    value={address.pincode}
                                    InputProps={{
                                    disabled: true,
                                    className:'fw-bold',
                                    }}
                                />
                        )}<small>
                        {isEditingAddress && validationErrors.pincode && <span className="ms-5 error text-danger">{validationErrors.pincode}</span>}</small>
                    </div>
                    <div className="text-center my-2">
                            {isEditingAddress ? (
                                <Link onClick={handleSaveAddress} className='text-decoration-none text-success'>Save</Link>
                            ) : (
                                <Link onClick={handleEditAddress} className='text-decoration-none'>Update<i className="fas fa-pencil-alt text-primary ms-1"></i></Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-12 col-lg-9 col-md-8 mt-3'>
                <h2 className='text-light fw-bold text-center rounded' style={{background:'#318ce7'}}>Policy Details<span><Link to='/'><button className='btn btn-danger float-end me-2 fw-bold py-1 mt-1'>Log Out</button></Link></span></h2>
                <div className='ms-2'>
                    <h4 className='text-secondary'>Customer Details</h4>
                    {/* new table */}
                    
                    <div>
                        <div className="card shadow mt-3 fillOutPage">
                            <div className="card-header pcdetails d-flex justify-content-between flex-wrap">
                                <h4 className="text-start fw-bold text-secondary">RamanaSecure Living</h4>
                                <h5 className="text-end mt-2 mt-md-0">
                                <span className="fw-bold text-secondary">ID :</span>
                                {signUpDetails[0]?.customerId}
                                </h5>
                            </div>
                            <div className="card-body">
                                <div className="row pcdetails">
                                <div className="col-md-6">
                                    <p className="card-text fw-bold">
                                    Name &nbsp;&nbsp;: <span className="fw-bold text-secondary">
                                        {signUpDetails[0]?.name}
                                    </span>
                                    </p>
                                    <p className="card-text fw-bold">
                                    Email &nbsp;&nbsp;&nbsp;: <span className="fw-bold text-secondary">
                                        {signUpDetails[0]?.email}
                                    </span>
                                    </p>
                                    <p className="card-text fw-bold">
                                    Mobile&nbsp; :<span className="fw-bold text-secondary"> {mobileno}</span>
                                    </p>
                                    <p className="card-text fw-bold">
                                    Address : <span className="fw-bold text-secondary">
                                        { fillDetails[0]?.propertyhouseNo }
                                        {fillDetails[0]?.propertystreetNo}
                                        {fillDetails[0]?.propertypincode}
                                        {fillDetails[0]?.propertycity}
                                        {fillDetails[0]?.propertystate}
                                    </span>
                                    </p>
                                </div>
                                <div className="col-md-6 mt-3 mt-md-0">
                                    <p className="card-text fw-bold">
                                    Age of the building : <span className="fw-bold text-secondary">
                                        {StrucutureDetails[0]?.buildingAge}
                                    </span>
                                    </p>
                                    <p className="card-text fw-bold">
                                    Premium Amount &nbsp;&nbsp;&nbsp;: <span className="fw-bold text-secondary"> ₹{paymentDetails[0]?.premium} /-</span>
                                    </p>
                                    <p className="card-text fw-bold">
                                    Property Value &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : <span className="fw-bold text-secondary"> {StrucutureDetails[0]?.marketValue}</span>
                                    </p>
                                    <p className="card-text fw-bold">
                                    No. Of Years &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; : <span className="fw-bold text-secondary"> {paymentDetails[0]?.year}&nbsp;Years</span>
                                    </p>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Profile;
