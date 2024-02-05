import React from 'react'

const Earnings = () => {
    return (
        <div className='px-3 w-100 pt-3' >
            <div className='bg-white pt-3 rounded-xl' style={{ boxShadow: "0px 0px 20px #99999915" }}>
                <div style={{ color: "#070648", fontWeight: "700" }} className='px-3'>Earnings</div>
                <hr style={{ color: "#a1a1a1" }} />
                <div className='leading-loose text-muted px-3 tracking-tighter pb-3'>
                    <div className='flex justify-between'>
                        <div>Today Earnings</div>
                        <div className='font-bold'>₹ 190.00</div>
                    </div>
                    {/* <div className='flex justify-between'>
                        <div>Total distance</div>
                        <div className='font-bold'>25.00 km</div>
                    </div> */}
                    <div className='flex justify-between'>
                        <div>Ongoing Orders</div>
                        <div className='font-bold'>02</div>
                    </div>
                    <div className='flex justify-between'>
                        <div>Completed Count</div>
                        <div className='font-bold'>90.00</div>
                    </div>
                    <div className='flex justify-between'>
                        <div>Cash on hand</div>
                        <div className='font-bold'>₹ 190.00</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Earnings
