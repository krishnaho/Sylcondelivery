import React, { useEffect } from 'react'
import limitzoYellowLogo from '../../../assets/images/sylconpic.png'

function GetStarted() {
    useEffect(() => {
        if (localStorage.getItem('userLogin') == 'true') {
            setTimeout(() => {
                window.location.replace("/home")
            }, 2000);
        } else {
            setTimeout(() => {
                window.location.replace("/login")
            }, 2000);
        }
    });
    return (
        <div style={{ minHeight: '100vh' }}>
            <div className='flex justify-center item-center'>
                <img src={limitzoYellowLogo} className='absolute top-1/2 ' alt="limitzo" />
            </div>
        </div>
    )
}

export default GetStarted
