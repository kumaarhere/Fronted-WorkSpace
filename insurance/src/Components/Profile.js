import React, { useState, useEffect } from 'react';
// import './Profile.css';
import { Link, useLocation } from 'react-router-dom';
import PropertyInsuranceService from './Service/PropertyInsuranceService';
import { integerRege6, regexEmail, regexHouseNo,  regexMobileNo, regexStreet,  regexUsername } from './RegularExpressions';
import { TextField } from '@mui/material';

function Profile() {
    const location = useLocation();
    const { state } = location;
    const [mobileno] = useState(state?.values);

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
        streetno:""
    });

    const [validationErrors, setValidationErrors] = useState({
        name: '',
        mobileno: '',
        email: '',
        pincode: '',
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
            const id = signUpDetails[0]?.id;
            PropertyInsuranceService.updateCustomerByMobileNo(id,contact).then((res) => {
                console.log("details :"+ res.data);
                const updateResponse = res.data;
                console.log(updateResponse);
                setIsEditingMobile(false);
            }).catch((error) => {
                            console.error();
                        });
        }
    };

    const handleSaveEmail = () => {
        // e.preventDefault();
        const email=contact.email
        if (regexEmail.test(email)) {
            const id = signUpDetails[0]?.id;
            PropertyInsuranceService.updateCustomerByEmailId(id,contact).then((res) => {
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
        if(regexHouseNo.test(address.houseno) && regexStreet.test(address.streetno) && integerRege6.test(address.pincode)) {
            console.log(fillDetails);
            for (let i = 0; i < fillDetails.length; i++) {
                const id = fillDetails[i]?.id;
                console.log(id);
                PropertyInsuranceService.updateFillDetailsById(id,address).then((res) => {
                    console.log("details :"+ res.data);
                    const updateResponse = res.data;
                    console.log(updateResponse);
                    setIsEditingAddress(false);
                });
            }
        }
        setIsEditingAddress(false);
    };

    const handleSendOTP = () => {

        
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
        console.log(otp,enteredOtp);
        PropertyInsuranceService.getEmailOtp(contact.email).then((res) => {
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

        if (otp === enteredOtp.toString()) {
            setNotVerified("Mobile Number Verified Successfully!");
            //navigate("/login",{state:{values:mobileNumber}})
           signUpDetails[0].mobileno=contact.mobileno;
            handleSaveMobile();
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
       
            if (otp === enteredOtp.toString()) {
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

    return (
        <div className='row container-fluid'>
            <div className='col-3 mt-3 rounded' style={{borderRight:'3px solid grey'}}>
                <h2 className='text-light fw-bold text-center rounded' style={{background:'#318ce7'}}>Profile</h2>
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
                                    id="outlined-disabled-input"
                                    label="Name"
                                    name='name'
                                    onChange={handleChange}
                                    defaultValue={contact.name}
                                    InputProps={{
                                    disabled: true,
                                    className:'fw-bold',
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
                        <small>
                        {isEditingMobile && validationErrors.mobileno && <span className="ms-3 error text-danger">{validationErrors.mobileno}</span>}
                        </small>
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
                                    defaultValue={contact.email}
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
                                    label="House No."
                                    variant="outlined"
                                    value={address.houseno}
                                    onChange={handleChange}
                                    inputProps={{maxLength : 20}}
                                />
                            ) : (
                                <TextField
                                    className='col-12 col-lg-11 mt-2'
                                    id="outlined-disabled-input"
                                    label="House No."
                                    name='houseno'
                                    onChange={handleChange}
                                    defaultValue={address.houseno}
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
                                    label="Street No."
                                    variant="outlined"
                                    value={address.streetno}
                                    onChange={handleChange}
                                    inputProps={{maxLength : 20}}
                                />
                            ) : (
                                <TextField
                                    className='col-12 col-lg-11 mt-2'
                                    id="outlined-disabled-input"
                                    label="Street No."
                                    name='streetno'
                                    onChange={handleChange}
                                    defaultValue={address.streetno}
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
                                    name="pincode"
                                    label="Pincode"
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
                                    label="Pincode"
                                    name='pincode'
                                    onChange={handleChange}
                                    defaultValue={address.pincode}
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
            <div className='col-9 mt-3'>
                <h2 className='text-light fw-bold text-center rounded' style={{background:'#318ce7'}}>Policy Details</h2>
                <div className='ms-2'>
                    <h4 className='text-secondary'>Customer Details</h4>
                    {/* new table */}
                    
                    <div>
                        <div>
                        <div className="card shadow mt-3">
                          <div className='d-flex justify-content-around card-header'>
                            <h4 className=' text-start fw-bold text-secondary'> RamanaSecure Living</h4>
                            <h5 className=" text-end"><span className='fw-bold text-secondary'>ID :</span>2434-34ty0-4566y0  <i className="fa-regular fa-copy fs-4 p-2 bg-seconday-subtle"></i></h5>
                          </div>
                          <div className="card-body">
                           <div className='d-flex justify-content-around'>
                            <div className=''>
                           <p className="card-text fw-bold">Name : <span className='fw-bold text-secondary'>Sree HarshaVardhan</span></p>
                           <p className="card-text fw-bold">Email: <span className='fw-bold text-secondary '>sreeharshavardhan@gmail.com</span></p>
                           <p className="card-text fw-bold">Mobile : <span className='fw-bold text-secondary '>+917993277707</span></p>
                           <p className="card-text fw-bold">Property Value : <span className='fw-bold text-secondary'>20000000</span></p>
                           </div>
                           <div>
                           <p className="card-text fw-bold">age of the building : <span className='fw-bold text-secondary'>5 to 10 years</span></p>
                           <p className="card-text fw-bold">Premium Amount: <span className='fw-bold text-secondary '>₹ 53590 /-</span></p>
                           <p className="card-text fw-bold">Address: <span className='fw-bold text-secondary'>1-89,Ameerpet,Hyderabad,Telangana</span></p>
                           </div>
                           </div>
                        </div>
                    </div>
                        </div>
                    </div>
                </div>
            </div>







            <div className="form-container col-3 mt-3">
                <button onClick={handleShowForm} style={{ borderRadius: '10000%' }}>Profile</button>

                {showContactForm && (
                    <>
                        <h2>Contact Details</h2>
                        <table className="contact-table ms-5">
                            <tbody>
                                <tr>
                                    <td>
                                        <div>
                                            Name:
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={fillDetails[0]?.fullname}
                                                    onChange={handleChange}
                                                />
                                            ) : (
                                                <span>{contact.name}</span>
                                            )}
                                            <div>
                                                {isEditing && validationErrors.name && <span className="ms-5 error text-danger">{validationErrors.name}</span>}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                    <span>
                                        <span>
                                            Mobile:
                                            {isEditingMobile ? (
                                                <input
                                                    type="text"
                                                    name="mobileno"
                                                    value={contact.mobileno}
                                                    onChange={handleChange}
                                                    onKeyPress={(e) => {
                                                        // Prevent input if the key pressed is not a number
                                                        const onlyNumbers = /[0-9]/;
                                                        if (!onlyNumbers.test(e.key)) {
                                                          e.preventDefault();
                                                        }
                                                    }}
                                                    maxLength={10}
                                                />
                                            ) : (
                                                <span>{contact.mobileno}</span>
                                            )}</span>
                                            <span  >
                                                {isEditingMobile ? (
                                                    < >
                                                    <Link onClick={handleSendOTP} className='me-3'>Sendotp</Link>
                                                    <Link onClick={handleCancel}>Cancel</Link>
                                                    </>
                                                ) : (
                                                    <Link onClick={handleEditMobile} className="ms-5">
                                                    Update Mobile <i className="fas fa-pencil-alt text-primary"></i>
                                                </Link>
                                                )}
                                            </span>
                                            {isEditingMobile && validationErrors.mobileno && <span className="ms-5 error text-danger">{validationErrors.mobileno}</span>}
                                        <div>
            {data === "Mobile number exists" && <h5 style={{ color: 'red' }}>{data}</h5>}
          </div>
                                        </span>
                                        <div className="text-center my-3">
                            {renderOTPFieldOrButton()}
                        </div>
                                    </td>
                                    
                                </tr>
                                <tr>
                                    <td>
                                    <div>
                                            Email:
                                            {isEditingEmail ? (
                                                <input
                                                    type="text"
                                                    name="email"
                                                    value={contact.email}
                                                    onChange={handleChange}
                                                     maxLength={100}
                                                />
                                            ) : (
                                                <span>{contact.email}</span>
                                            )}
                                            <span >
                                                {isEditingEmail ? (
                                                    <>
                                                    <Link onClick={handleSendOTP1} className='me-3'>Sendotp</Link>
                                                     <Link onClick={handleCancel}>Cancel</Link>
                                                    </>
                                                ) : (
                                                    <Link onClick={handleEditEmail}className="ms-4">Update Email</Link>
                                                )}
                                            </span>
                                            {isEditingEmail && validationErrors.email && <span className="ms-5 error text-danger">{validationErrors.email}</span>}
                                            {data === "Email is exists" && <h5 style={{ color: 'red' }}>{data}</h5>}
                                        </div>
                                        <div className="text-center my-3">
                            {renderOTPFieldOrButton1()}
                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        
                    </>
                )}

                {showAddressForm && (
                    <>
                        <h2 className='mt-3'>Address Details</h2>
                        <table className="address-table ms-5">
                            <tbody>
                                <tr>
                                    <td>
                                        <div>
                                            Pincode:
                                            {isEditingAddress ? (
                                                <input
                                                    type="text"
                                                    name="pincode"
                                                    value={address.pincode}
                                                    onChange={handleChange}
                                                    maxLength={6}
                                                />
                                            ) : (
                                                <span>{address.pincode}</span>
                                            )}
                                            <div>
                                                {isEditingAddress && validationErrors.pincode && <span className="ms-5 error text-danger">{validationErrors.pincode}</span>}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>
                                            House No:
                                            {isEditingAddress ? (
                                                <input
                                                    type="text"
                                                    name="houseno"
                                                    value={address.houseno}
                                                    onChange={handleChange}
                                                />
                                            ) : (
                                                <span>{address.houseno}</span>
                                            )}
                                            <div>
                                                {isEditingAddress && validationErrors.houseno && <span className="ms-5 error text-danger">{validationErrors.houseno}</span>}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div>
                                            streetno:
                                            {isEditingAddress ? (
                                                <input
                                                    type="text"
                                                    name="streetno"
                                                    value={address.streetno}
                                                    onChange={handleChange}
                                                />
                                            ) : (
                                                <span>{address.streetno}</span>
                                            )}
                                            <div>
                                                {isEditingAddress && validationErrors.streetno && <span className="ms-5 error text-danger">{validationErrors.streetno}</span>}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <div className="text-center my-3">
                            {isEditingAddress ? (
                                <Link onClick={handleSaveAddress}>Save Address</Link>
                            ) : (
                                <Link onClick={handleEditAddress}>Edit Address</Link>
                            )}
                        </div>
                    </>
                )}
            </div>
            <div className='col-8 mt-3'>
                <div>
                    <h1>Policy Details</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>User Name</th>
                                <th>User Mobile No</th>
                                <th>User MailId</th>
                                <th>Property Value</th>
                                <th>NO OF Years</th>
                                <th>Premium Amount</th>
                                <th>Customer ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            { 
                            signUpDetails.map((signUpDetail, index =0) => (
                                <>
                                {paymentDetails.map((paymentDetail, paymentIndex=0) => (
                                    <>
                                    {0 === paymentIndex && (
                                        <tr key={`${index}-${paymentIndex}`}>
                                            <td>{fillDetails[0]?.fullname}</td>
                                            <td>{signUpDetails[0].mobileno}</td>
                                            <td>{signUpDetails[0].email}</td>
                                            {/* <td>{contact.email}</td> */}
                                            <td>{StrucutureDetails[index]?.marketValue}</td>
                                            <td>{paymentDetails[0]?.year}</td>
                                            <td>{paymentDetails[0]?.premium}</td>
                                            <td>{paymentDetails[0]?.customerId}</td>
                                        </tr>
                                    )}
                                    </>
                                ))}
                                </>
                            ))}
                            { 
                            signUpDetails.map((signUpDetail, index =1) => (
                                <>
                                {paymentDetails.map((paymentDetail, paymentIndex=1) => (
                                    <>
                                    {0 === paymentIndex && (
                                        <tr key={`${1}-${paymentIndex}`}>
                                            <td>{fillDetails[1]?.fullname}</td>
                                            <td>{signUpDetails[0].mobileno}</td>
                                            <td>{signUpDetails[0].email}</td>
                                            <td>{StrucutureDetails[1]?.marketValue}</td>
                                            <td>{paymentDetails[1]?.year}</td>
                                            <td>{paymentDetails[1]?.premium}</td>
                                            <td>{paymentDetails[1]?.customerId}</td>
                                        </tr>
                                    )}
                                    </>
                                ))}
                                </>
                            ))}
                            { 
                            signUpDetails.map((signUpDetail) => (
                                <>
                                {paymentDetails.map(( paymentIndex=1) => (
                                    <>
                                    {0 === paymentIndex && (
                                        <tr key={`${2}-${paymentIndex}`}>
                                            <td>{fillDetails[2]?.fullname}</td>
                                            <td>{contact.mobileno}</td>
                                            <td>{contact.email}</td>
                                            <td>{StrucutureDetails[2]?.marketValue}</td>
                                            <td>{paymentDetails[2]?.year}</td>
                                            <td>{paymentDetails[2]?.premium}</td>
                                            <td>{paymentDetails[2]?.customerId}</td>
                                        </tr>
                                    )}
                                    </>
                                ))}
                                </>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='my-3'>
                    <h3>Quotation Page:</h3>
                </div>
            </div>
        </div>
    );
}

export default Profile;
