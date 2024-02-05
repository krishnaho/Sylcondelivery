import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'

const BackButtonName = ({ title }) => {
    return (
        <div className='flex items-center bg-white pb-3 sticky top-0' style={{ padding: '15px 0 0 0', zIndex: '9999', boxShadow: "0px 0px 20px #99999918" }}>
            <div className='pl-3' onClick={() => { window.history.back() }}>   <IoIosArrowBack size={23} /></div>
            <div className='grow flex items-center justify-center '>
                <div className='pe-4' style={{ color: "#070648", fontWeight: "700" }}>{title}</div>
            </div>
        </div>
    )
}

export default BackButtonName
