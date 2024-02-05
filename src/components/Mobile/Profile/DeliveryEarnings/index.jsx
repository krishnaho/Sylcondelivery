import React from 'react'
import Charts from './Charts'

const DeliveryEarnings = () => {
    return (

        <div className='px-3 w-100 pt-3' style={{
            paddingBottom: '8rem', boxShadow: "0px 0px 20px #99999915"
        }} >
            <div className='bg-white pt-3 rounded-xl' >
                <div style={{ color: "#070648", fontWeight: "700" }} className='px-3'>Delivery Earnings</div>
                <hr style={{ color: "#a1a1a1" }} />
                <div className='leading-loose text-muted tracking-tighter'>
                    <Charts />
                </div>
            </div>
        </div>
    )
}

export default DeliveryEarnings
