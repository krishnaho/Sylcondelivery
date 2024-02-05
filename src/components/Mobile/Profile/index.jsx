import React, { useEffect, useState } from 'react'
import { BsToggle2Off } from 'react-icons/bs'
import { FaChevronRight } from 'react-icons/fa'
import { Drawer } from 'vaul'
import { AiOutlineExclamationCircle } from 'react-icons/ai'
import { ImCancelCircle } from 'react-icons/im'
import { Link } from 'react-router-dom'
import pictur from '../../../assets/images/avatar.jpg'
import Footer from '../Footer'
import { useDispatch, useSelector } from 'react-redux'
import Earnings from './Earnings'
import { getPartnerProfile, logoutUser } from '../../../redux/store/profileReducer'
import editProfile from '../../../assets/svg/edityellow-svg.svg'
import orderHistory from '../../../assets/svg/order-svg.svg'
import logout from '../../../assets/images/logoff-svg.png'
import DeliveryEarnings from './DeliveryEarnings'
import Lottie from 'react-lottie'
import animationData from '../../../assets/lottie/track-order-loading.json'
import { WEBSITE_API_URL } from '../../../config'
import axios from 'axios'
import sylcon from '../../../assets/images/sylconpic.png'

function Profile() {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const profile = useSelector((state) => state.profile?.profile_data?.user);
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(false);


    useEffect(() => {
        if (localStorage.getItem("userLogin") && localStorage.getItem("auth_token")) {
            setLoading(true)
            const formData = new FormData();
            formData.append("token", localStorage.getItem("auth_token"));
            formData.append("user_id", localStorage.getItem("user_id"));
            dispatch(getPartnerProfile(formData)).then((response) => {
                if (response.payload.success) {
                    setLoading(false)
                    setActive(response.payload.user.is_active)
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

    const __logoutUser = () => {
        setLoading(true)
        localStorage.removeItem("user_id")
        localStorage.removeItem("userLogin")
        localStorage.removeItem("auth_token")
        localStorage.removeItem("is_location")
        localStorage.removeItem("address")
        localStorage.removeItem("geoLocation")
        localStorage.removeItem("userSetAddress")
        localStorage.removeItem("userLng")
        localStorage.removeItem("userLat")
        dispatch(logoutUser())
        window.location.replace("/login")
    }

    const userToggle = () => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            setActive(!active)
            axios.post(WEBSITE_API_URL + "/toggle-user", {
                token: token,
                user_id: localStorage.getItem("user_id"),
            })
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
        <div className='bg-slate-50' style={{ minHeight: "100vh" }}>
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
                    <div className='flex justify-center items-center px-3 bg-white pb-3 sticky top-0' style={{ padding: '15px 0 0 0', boxShadow: "0px 0px 20px #99999938" }}>
                        <div className='text-green-800 font-bold text-lg'>Profile</div>
                    </div>
                    <div className='px-3 w-100 pt-3 mt-3'>
                        <div className='bg-white pt-3 rounded-xl' style={{ boxShadow: "0px 0px 20px #99999915" }}>
                            <div className='flex flex-row px-3'>
                                <div className='profile-picture'>
                                    <img src={pictur} alt='profile picture' style={{ width: "5rem", height: "5rem", objectFit: 'cover' }} />
                                </div>
                                <div className='flex flex-col grow px-2'>
                                    <div className='text-lg font-bold'>{profile?.user?.name}</div>
                                    <div className='text-muted'>{profile?.user?.phone}</div>
                                </div>
                                <div className="form-check form-switch">
                                    <input className="form-check-input" onChange={() => { userToggle() }} type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={active} />
                                </div>
                            </div>

                            <div className='pt-8 px-3' style={{ fontWeight: "600" }}>
                                <Link to={'/edit-profile/' + profile?.user?.id} style={{ textDecoration: "none" }}>
                                    <div className='flex'>
                                        <img src={editProfile} alt='profile picture' />
                                        <div style={{ color: " #070648 " }} className='pl-3'>Edit Profile</div>
                                        <div className='grow flex justify-end' style={{ color: " #070648 " }}><FaChevronRight /></div>
                                    </div>
                                </Link>
                            </div>
                            <hr style={{ color: "#a1a1a1" }} />
                            <div className=' px-3' style={{ fontWeight: "600" }}>
                                <Link to={'/order-history'} style={{ textDecoration: "none" }}>
                                    <div className='flex'>
                                        <img src={orderHistory} alt='profile picture' />
                                        <div style={{ color: " #070648 " }} className='pl-3'>Order History</div>
                                        <div className='grow flex justify-end' style={{ color: " #070648 " }}><FaChevronRight /></div>
                                    </div>
                                </Link>
                            </div>
                            <hr style={{ color: "#a1a1a1" }} />

                            <Drawer.Root onOpenChange={() => setOpen(!open)}>
                                <Drawer.Trigger asChild>
                                    <div className='flex px-3 pb-3'>
                                        <img src={logout} alt='profile picture' />
                                        <div style={{ color: " #070648 " }} className='pl-3'>
                                            <div> Logout</div>
                                        </div>
                                        <div className='grow flex justify-end' >
                                            <div>
                                                <FaChevronRight />
                                            </div>
                                        </div>
                                    </div>
                                </Drawer.Trigger>
                                <Drawer.Portal>
                                    <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                                    <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0 h-56" >
                                        <div className=" bg-white rounded-t-[10px] flex-1  pt-4" >
                                            <div className='flex justify-end px-3 w-100'>
                                                <Drawer.Trigger>
                                                    <ImCancelCircle size={20} />
                                                </Drawer.Trigger>
                                            </div>
                                            <div className='fixed bottom-0 w-100 ' >
                                                <div className='px-3 pb-4 flex items-center'>
                                                    <div className="w-100">
                                                        <div className='text-center font-semibold text-lg pb-4 px-5'>Are you sure to want logout !</div>
                                                        <button type="submit" className='get-start-button w-100 text-xl' onClick={() => {
                                                            __logoutUser()
                                                            setOpen(false)
                                                        }}>
                                                            Logout
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Drawer.Content>
                                </Drawer.Portal>
                            </Drawer.Root>
                        </div>
                    </div>
                    <div className='flex justify-center items-center' style={{ padding: "5rem 0 10rem 0" }}>
                        <img src={sylcon} alt="item category" style={{ width: '8rem' }} />
                    </div>

                    {/* <Earnings />

                    <DeliveryEarnings /> */}

                    {open ? null :
                        <Footer activeProfile={true} />
                    }
                </>
            }

        </div>
    )
}

export default Profile
