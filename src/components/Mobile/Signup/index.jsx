import React, { useEffect, useState } from 'react'
import { Form, FormControl, InputGroup } from "react-bootstrap";

import sylconlogo from '../../../assets/images/sylconpic.png'
import { IoIosArrowBack } from 'react-icons/io'
import { useDispatch, useSelector } from 'react-redux';
import { getEveryCities } from '../../../redux/store/cityReducer';
import { deliveryParnterRegister } from '../../../redux/store/userReducer';


function Signup() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [partnerDetails, setPartnerDetails] = useState([]);
    const [errorPass, setErrorPass] = useState(false);
    const cities = useSelector((state) => state.city?.city_data?.data);

    useEffect(() => {
        dispatch(getEveryCities());
        // dispatch(getAllCities());
        if (localStorage.getItem('email')) {
            let data = localStorage.getItem('email');
            setPartnerDetails({ ...partnerDetails, email: data });
        }
    }, []);

    const submitSignupData = (e) => {
        e.preventDefault();
        if (partnerDetails.password && partnerDetails.confirm_password && partnerDetails.confirm_password === partnerDetails.password) {
            setLoading(true)
            const formData = new FormData();
            formData.append("user_id", localStorage.getItem("user_id") ?? false);
            formData.append("name", partnerDetails.name);
            formData.append("email", partnerDetails.email);
            formData.append("password", partnerDetails.password);
            formData.append("phone", partnerDetails.phone);
            formData.append("city_id", partnerDetails.city_id);
            formData.append("age", partnerDetails.age);
            formData.append("gender", partnerDetails.gender);
            formData.append("license_number", partnerDetails.license_number);
            formData.append("license_document", partnerDetails.license_document);
            formData.append("aadhar_number", partnerDetails.aadhar_number);
            formData.append("aadhar_document", partnerDetails.aadhar_document);
            // formData.append("vehicle_number", partnerDetails.vehicle_number);
            dispatch(deliveryParnterRegister(formData)).then((response) => {
                console.log(response.payload.data, 'dd')
                if (response.payload.success && response.payload.data.deliveryGuy) {
                    window.location.replace("/home")
                } else if (response.payload.success) {
                    window.location.replace("/signup")
                } else {
                    setLoading(false)
                }
            }).catch(error => {
                console.error("send OTP failed", error);
            })
        } else {
            setErrorPass(true)
        }
    }

    return (
        <div style={{ minHeight: "100vh" }} className='bg-slate-50'>
            <div className='flex items-center bg-white pb-3' style={{ padding: "15px 0 0 0" }}>
                <div className='pl-3' onClick={() => {
                    window.history.back();
                }}>
                    <IoIosArrowBack size={25} />
                </div>
                <div className='grow flex items-center justify-center '>
                    <img 
                    src={sylconlogo}
                     className='pe-4' alt="sylcon" style={{ width: '15rem' }} />
                </div>
            </div>
            <div className='px-3 w-100 mt-4' style={{ bottom: '0px' }}>
                <Form onSubmit={(e) => submitSignupData(e)}>
                    <div style={{ color: "#070648", fontWeight: "600" }}>
                        Name
                    </div>
                    <div className="mt-2">
                        <InputGroup
                            hasValidation
                            className="b-r-10  mobile-signup-input"
                            style={{ boxSizing: "border-box" }} >
                            <FormControl
                                type="text"
                                placeholder="Enter Name"
                                required
                                value={partnerDetails.name ?? null}
                                name="name"
                                onChange={(e) => {
                                    let data = e.target.value;
                                    setPartnerDetails({ ...partnerDetails, name: data });
                                }}
                                className="mobile-signup-with-icon mb-3"
                            />
                        </InputGroup>
                    </div>
                    <div style={{ color: "#070648", fontWeight: "600" }}>
                        Email
                    </div>
                    <div className="mt-2">
                        <InputGroup
                            hasValidation
                            className="b-r-10 mobile-signup-input"
                            style={{ boxSizing: "border-box" }} >
                            <FormControl
                                type="email"
                                placeholder="Enter Email"
                                required
                                name="email"
                                value={partnerDetails.email ?? null}
                                onChange={(e) => {
                                    let data = e.target.value;
                                    setPartnerDetails({ ...partnerDetails, email: data });
                                }}
                                className="mobile-signup-with-icon mb-3"
                            />
                        </InputGroup>
                    </div>
                    <div style={{ color: "#070648", fontWeight: "600" }}>
                        Password
                    </div>

                    <div className="mt-2">
                        <InputGroup
                            hasValidation
                            className="b-r-10  mobile-signup-input"
                            style={{ boxSizing: "border-box" }} >
                            <FormControl
                                type="password"
                                placeholder="Enter Password"
                                required
                                name="password"
                                value={partnerDetails.password ?? null}
                                onChange={(e) => {
                                    let data = e.target.value;
                                    setPartnerDetails({ ...partnerDetails, password: data });
                                    setErrorPass(false)
                                }}
                                className="mobile-signup-with-icon mb-3"
                            />
                        </InputGroup>
                    </div>

                    <div className='flex justify-between' style={{ color: "#070648", fontWeight: "600" }}>
                        <div>
                            Confirm Password
                        </div>
                        {errorPass ?
                            <div className='text-red-600'>
                                Password not matching
                            </div> : null}
                    </div>
                    <div className="mt-2">
                        <InputGroup
                            hasValidation
                            className="b-r-10  mobile-signup-input "
                            style={{ boxSizing: "border-box" }} >
                            <FormControl
                                type="password"
                                placeholder="Enter Confirm Password"
                                required
                                name="confirm_password"
                                value={partnerDetails.confirm_password ?? null}
                                onChange={(e) => {
                                    let data = e.target.value;
                                    setPartnerDetails({ ...partnerDetails, confirm_password: data });
                                    setErrorPass(false)
                                }}
                                className="mobile-signup-with-icon mb-3"
                            />
                        </InputGroup>
                    </div>


                    <div style={{ color: "#070648", fontWeight: "600" }}>
                        Contact Number
                    </div>
                    <div className="mt-2">
                        <InputGroup
                            hasValidation
                            className="b-r-10  mobile-signup-input "
                            style={{ boxSizing: "border-box" }} >
                            <FormControl
                                type="tel"
                                placeholder="Enter Phone No"
                                required
                                minLength="10"
                                maxLength="10"
                                name="phone"
                                value={partnerDetails.phone ?? null}
                                onChange={(e) => {
                                    let data = e.target.value;
                                    setPartnerDetails({ ...partnerDetails, phone: data });
                                }}
                                className="mobile-signup-with-icon mb-3"
                            />
                        </InputGroup>
                    </div>

                    <div style={{ color: "#070648", fontWeight: "600" }}>
                        Select City
                    </div>

                    <div className="mt-2">
                        <Form.Select aria-label="Default select example" className='mobile-signup-with-icon mb-3 form-select w-100' name="city"
                            onChange={(e) => {
                                let data = e.target.value;
                                setPartnerDetails({ ...partnerDetails, city_id: data });
                            }}
                            value={partnerDetails.city_id ?? null}
                        >
                            <option value="">Select City</option>
                            {cities && cities.map((city) => (
                                <option value={city?.id}>{city.name}</option>
                            ))}
                        </Form.Select>
                    </div>

                    <div style={{ color: "#070648", fontWeight: "600" }}>
                        Select Gender
                    </div>

                    <div className="mt-2">
                        <Form.Select aria-label="Default select example" className='mobile-signup-with-icon mb-3 form-select w-100' name="gender"
                            onChange={(e) => {
                                let data = e.target.value;
                                setPartnerDetails({ ...partnerDetails, gender: data });
                            }}
                            value={partnerDetails.gender ?? null}
                        >
                            <option value="">Select Gender</option>
                            <option value="MALE">MALE</option>
                            <option value="FEMALE">FEMALE</option>
                        </Form.Select>
                    </div>

                    <div style={{ color: "#070648", fontWeight: "600" }}>
                        Age
                    </div>
                    <div className="mt-2">
                        <InputGroup
                            hasValidation
                            className="b-r-10  mobile-signup-input "
                            style={{
                                boxSizing: "border-box",
                            }}
                        >
                            <FormControl
                                type="text"
                                placeholder="Enter Age"
                                required
                                name="age"
                                value={partnerDetails.age ?? null}
                                onChange={(e) => {
                                    let data = e.target.value;
                                    setPartnerDetails({ ...partnerDetails, age: data });
                                }}
                                className="mobile-signup-with-icon mb-3"
                            />
                        </InputGroup>
                    </div>

                    <div style={{ color: "#070648", fontWeight: "600" }}>
                        License number
                    </div>
                    <div className="mt-2">
                        <InputGroup
                            hasValidation
                            className="b-r-10 mobile-signup-input"
                            style={{
                                boxSizing: "border-box",
                            }}
                        >
                            <FormControl
                                type="text"
                                placeholder="Enter License number"
                                required
                                name="license_number"
                                value={partnerDetails.license_number ?? null}
                                onChange={(e) => {
                                    let data = e.target.value;
                                    setPartnerDetails({ ...partnerDetails, license_number: data });
                                }}
                                className="mobile-signup-with-icon mb-3"
                            />
                        </InputGroup>
                    </div>


                    <div style={{ color: "#070648", fontWeight: "600" }}>
                        License document
                    </div>

                    <div className="mt-2">
                        <InputGroup
                            hasValidation
                            className="b-r-10 mobile-signup-input"
                            style={{
                                boxSizing: "border-box",
                            }}
                        >
                            <FormControl
                                type="file"
                                placeholder="select License Document"
                                required
                                name="license_document"
                                onChange={(e) => {
                                    let data = e.target.files[0];
                                    setPartnerDetails({ ...partnerDetails, license_document: data });
                                }}
                                className="mobile-signup-with-icon mb-3"
                            />
                        </InputGroup>
                    </div>

                    <div style={{ color: "#070648", fontWeight: "600" }}>
                        Aadhar number
                    </div>
                    <div className="mt-2">
                        <InputGroup
                            hasValidation
                            className="b-r-10  mobile-signup-input "
                            style={{
                                boxSizing: "border-box",
                            }}
                        >
                            <FormControl
                                type="text"
                                placeholder="Enter Aadhar Number"
                                required
                                name="aadhar_number"
                                value={partnerDetails.aadhar_number ?? null}
                                onChange={(e) => {
                                    let data = e.target.value;
                                    setPartnerDetails({ ...partnerDetails, aadhar_number: data });
                                }}
                                className="mobile-signup-with-icon mb-3"
                            />
                        </InputGroup>
                    </div>

                    <div style={{ color: "#070648", fontWeight: "600" }}>
                        Aadhar document
                    </div>

                    <div className="mt-2">
                        <InputGroup
                            hasValidation
                            className="b-r-10 mobile-signup-input"
                            style={{
                                boxSizing: "border-box",
                            }}
                        >
                            <FormControl
                                type="file"
                                placeholder="select Aadhar Document"
                                required
                                name="aadhar_document"
                                onChange={(e) => {
                                    let data = e.target.files[0];
                                    setPartnerDetails({ ...partnerDetails, aadhar_document: data });
                                }}
                                className="mobile-signup-with-icon mb-3"
                            />
                        </InputGroup>
                    </div>

                    {/* <div style={{ color: "#070648", fontWeight: "600" }}>
                        Vehicle number
                    </div>
                    <div className="mt-2">
                        <InputGroup
                            hasValidation
                            className="b-r-10  mobile-signup-input "
                            style={{
                                boxSizing: "border-box",
                            }}
                        >
                            <FormControl
                                type="text"
                                placeholder="Enter Vehicle Number"
                                required
                                name="vehicle_number"
                                value={partnerDetails.vehicle_number ?? null}
                                onChange={(e) => {
                                    let data = e.target.value;
                                    setPartnerDetails({ ...partnerDetails, vehicle_number: data });
                                }}
                                className="mobile-signup-with-icon mb-3"
                            />
                        </InputGroup>
                    </div> */}
                    <button type="submit" className='get-start-button mt-3 mb-8'>
                        Submit to Approval
                    </button>
                </Form>
            </div>


        </div>
    )
}

export default Signup
