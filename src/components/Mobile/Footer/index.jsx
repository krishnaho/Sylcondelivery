
import React, { useEffect, useState } from 'react'
// import { LuSearch } from 'react-icons/lu';
// import { PiHandbagSimpleBold } from 'react-icons/pi';
// import { RiHomeLine, RiUser6Fill } from 'react-icons/ri';

import home from '../../../assets/svg/home.svg';
import activeHomeImg from '../../../assets/svg/activeHome.svg';

import activeAcceptedOrderImg from '../../../assets/svg/activeAcceptOrder.svg';
import acceptedOrder from '../../../assets/svg/accepted-order.svg';

import activePickupOrderImg from '../../../assets/svg/activePickupOrder.svg';
import pickupOrder from '../../../assets/svg/pickup-order.svg';

import activeProfileImg from '../../../assets/svg/activeProfile.svg';
import profile from '../../../assets/svg/profile.svg';
import { Link } from 'react-router-dom';

const Footer = (props) => {
    const [activeHome, setActiveHome] = useState(false);
    const [activeAcceptedOrder, setActiveAcceptedOrder] = useState(false);
    const [activePickedupOrder, setActivePickedupOrder] = useState(false);
    const [activeProfile, setActiveProfile] = useState(false);

    useEffect(() => {
        if (props.activeHome === true) {
            setActiveHome(true)
        }
        if (props.activeAcceptedOrder === true) {
            setActiveAcceptedOrder(true)
        }
        if (props.activePickedupOrder === true) {
            setActivePickedupOrder(true)
        }
        if (props.activeProfile === true) {
            setActiveProfile(true)
        }
    }, [])


    return (
        <div className="fixed bottom-0 start-50 translate-middle-x w-100 user-select-none Vendor-fixed py-2 px-4 mobile-footer-container flex items-center">
            <div className='flex flex-row justify-between items-center  grow'>
                <Link to="/home" className='relative b-r-10 p-2'>
                    <div className="flex flex-col justify-center items-center h-100 ">
                        {activeHome ? (
                            <img src={activeHomeImg} className="" alt="limitzo" />

                        ) : (
                            <img src={home} className="" alt="limitzo" />
                        )}
                    </div>
                </Link>

                <Link to="/accepted-orders" className='relative b-r-10 p-2'>
                    <div className="flex flex-col justify-center items-center  h-100">
                        {activeAcceptedOrder ? (
                            <img src={activeAcceptedOrderImg} className="" alt="limitzo" />
                        ) : (
                            <img src={acceptedOrder} className="" alt="limitzo" />
                        )}
                    </div>
                </Link>
                <Link to="/pickedup-orders" className='relative b-r-10 p-2'>
                    <div className="flex flex-col justify-center items-center  h-100">
                        {activePickedupOrder ? (
                            <img src={activePickupOrderImg} className="" alt="limitzo" />
                        ) : (
                            <img src={pickupOrder} className="" alt="limitzo" />
                        )}
                    </div>
                </Link>

                <Link to="/my-profile" className='relative b-r-10 p-2'>
                    <div className="flex flex-col justify-center items-center  h-100">
                        {activeProfile ? (
                            <img src={activeProfileImg} className="" alt="limitzo" />

                        ) : (
                            <img src={profile} className="" alt="limitzo" />
                        )}
                    </div>
                </Link>

            </div>
        </div>
    )
}

export default Footer
