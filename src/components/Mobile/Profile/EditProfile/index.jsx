import React, { useEffect, useState } from 'react'
import { Form, FormControl, InputGroup } from "react-bootstrap";
import BackButtonName from '../../../Elements/BackButtonName';
import { useDispatch, useSelector } from 'react-redux';
import Lottie from 'react-lottie';
import animationData from '../../../../assets/lottie/track-order-loading.json'
import { useParams } from 'react-router-dom';
import { getPartnerProfile } from '../../../../redux/store/profileReducer';
import { deliveryParnterUpdate } from '../../../../redux/store/userReducer';
import { BsExclamationCircle, BsExclamationCircleFill } from 'react-icons/bs';


function EditProfile() {

    const dispatch = useDispatch();
    let { id } = useParams();
    const [loading, setLoading] = useState(false);
    // const profile = useSelector((state) => state.profile?.profile_data?.user);
    const [partnerDetails, setPartnerDetails] = useState([]);
    const [errorPass, setErrorPass] = useState(false);
    const [msg, setMsg] = useState(false)

    useEffect(() => {
        if (localStorage.getItem("userLogin") && localStorage.getItem("auth_token")) {
            setLoading(true)
            const formData = new FormData();
            formData.append("token", localStorage.getItem("auth_token"));
            formData.append("user_id", id);
            dispatch(getPartnerProfile(formData)).then((response) => {
                if (response.payload.success) {
                    setLoading(false)
                    let User = response.payload.user;
                    setPartnerDetails({
                        ...partnerDetails,
                        name: User.user.name,
                        email: User.user.email,
                        phone: User.user.phone,

                        bank_name: User.user?.bank_detail?.bank_name ?? null,
                        holder_name: User.user?.bank_detail?.holder_name ?? null,
                        account: User.user?.bank_detail?.account ?? null,
                        ifsc: User.user?.bank_detail?.ifsc ?? null,
                    });
                } else {
                    setLoading(false)
                }
            }).catch(error => {
                console.error("send OTP failed", error);
            })
        } else {
            window.location.replace("/login")
        }

    }, []);
 

    const submitSignupData = (e) => {
        e.preventDefault();
        if (partnerDetails.password ? partnerDetails.confirm_password === partnerDetails.password : true) {
            setLoading(true)
            const formData = new FormData();
            formData.append("token", localStorage.getItem("auth_token"));
            formData.append("user_id", localStorage.getItem("user_id") ?? false);
            formData.append("name", partnerDetails.name);
            formData.append("phone", partnerDetails.phone);
            formData.append("email", partnerDetails.email);
            formData.append("password", partnerDetails.password);
            formData.append("bank_name", partnerDetails.bank_name);
            formData.append("holder_name", partnerDetails.holder_name);
            formData.append("account", partnerDetails.account);
            formData.append("ifsc", partnerDetails.ifsc);
            dispatch(deliveryParnterUpdate(formData)).then((response) => {
                console.log(response.payload.data, 'dd')
                if (response.payload.success) {
                    setPartnerDetails({ ...partnerDetails, password: null, confirm_password: null });
                    setMsg(true)
                    setTimeout(() => {
                        setMsg(false)
                    }, 2000);
                    setLoading(false)
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


    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div style={{ minHeight: "100vh" }} className='bg-slate-50'>
            {loading ?
                <div className='pt-32'>
                    <Lottie
                        options={defaultOptions}
                        height={100}
                        width={100}
                    />
                </div>
                :
                <>
                    <BackButtonName title="Edit Profile" />
                    <div className=' w-100 pt-3 mt-3' style={{ bottom: '0px' }}>
                        <Form onSubmit={(e) => submitSignupData(e)}>
                            <div className='px-3'>
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
                                        className="b-r-10  mobile-signup-input "
                                        style={{ boxSizing: "border-box" }} >
                                        <FormControl
                                            type="password"
                                            placeholder="Enter Password"
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
                                        <div className='flex  items-center text-red-600 text-xs'>
                                            <div>Passwords do not match</div>  <div className='ms-1'><BsExclamationCircle color='red' size={12} /></div>
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

                            </div>
                            <hr style={{ color: "#a1a1a1" }} />

                            {/* ****************** Bank details***************************** */}

                            <div className='flex justify-center' style={{ margin: '40px 0 40px 0' }}>
                                <div style={{ color: "#070648", fontWeight: "700" }}>Bank Details</div>
                            </div>
                            <div className='px-3'>
                                <div style={{ color: "#070648", fontWeight: "600" }}>
                                    Bank Name
                                </div>
                                <div className="mt-2">
                                    <InputGroup
                                        hasValidation
                                        className="b-r-10  mobile-signup-input "
                                        style={{ boxSizing: "border-box" }} >
                                        <FormControl
                                            type="text"
                                            placeholder="Enter Bank Name"
                                            required
                                            name="bank_name"
                                            value={partnerDetails.bank_name ?? null}
                                            onChange={(e) => {
                                                let data = e.target.value;
                                                setPartnerDetails({ ...partnerDetails, bank_name: data });
                                            }}
                                            className="mobile-signup-with-icon mb-3"
                                        />
                                    </InputGroup>
                                </div>


                                <div style={{ color: "#070648", fontWeight: "600" }}>
                                    Holder Name
                                </div>

                                <div className="mt-2">
                                    <InputGroup
                                        hasValidation
                                        className="b-r-10  mobile-signup-input "
                                        style={{ boxSizing: "border-box" }} >
                                        <FormControl
                                            type="text"
                                            placeholder="Enter Holder Name"
                                            required
                                            name="holder_name"
                                            value={partnerDetails.holder_name ?? null}
                                            onChange={(e) => {
                                                let data = e.target.value;
                                                setPartnerDetails({ ...partnerDetails, holder_name: data });
                                            }}
                                            className="mobile-signup-with-icon mb-3"
                                        />
                                    </InputGroup>
                                </div>

                                <div style={{ color: "#070648", fontWeight: "600" }}>
                                    Account number
                                </div>
                                <div className="mt-2">
                                    <InputGroup
                                        hasValidation
                                        className="b-r-10  mobile-signup-input "
                                        style={{ boxSizing: "border-box" }} >
                                        <FormControl
                                            type="number"
                                            placeholder="Enter Account Number"
                                            required
                                            name="account"
                                            value={partnerDetails.account ?? null}
                                            onChange={(e) => {
                                                let data = e.target.value;
                                                setPartnerDetails({ ...partnerDetails, account: data });
                                            }}
                                            className="mobile-signup-with-icon mb-3"
                                        />
                                    </InputGroup>
                                </div>

                                <div style={{ color: "#070648", fontWeight: "600" }}>
                                    IFSC Code
                                </div>

                                <div className="mt-2">
                                    <InputGroup
                                        hasValidation
                                        className="b-r-10  mobile-signup-input "
                                        style={{ boxSizing: "border-box" }} >
                                        <FormControl
                                            type="text"
                                            placeholder="Enter IFSC Code"
                                            required
                                            name="ifsc"
                                            value={partnerDetails.ifsc ?? null}
                                            onChange={(e) => {
                                                let data = e.target.value;
                                                setPartnerDetails({ ...partnerDetails, ifsc: data });
                                            }}
                                            className="mobile-signup-with-icon mb-3"
                                        />
                                    </InputGroup>
                                </div>
                                <button type="submit" className='get-start-button mt-3 mb-6'>
                                    Update
                                </button>
                            </div>
                        </Form>
                    </div>
                </>
            }
            {msg ?
                <div className='fixed bottom-10 flex items-center justify-center w-100'>
                    <div className='bg-black px-3 py-2 rounded-lg text-white text-sm'>
                        Update Successfully!
                    </div>
                </div>
                : null}
        </div>
    )
}

export default EditProfile
