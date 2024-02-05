import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { Drawer } from 'vaul'
import { TiTickOutline } from 'react-icons/ti'
import { ImCancelCircle } from 'react-icons/im'

function OrderDelivered() {
    return (
        <div style={{ minHeight: "100vh" }} className='bg-slate-50'>


            <div className='flex justify-between px-3 bg-white pb-3' style={{ padding: '15px 0 0 0' }}>
                <div className='pl-3'><IoIosArrowBack /></div>
            </div>
            <div className='px-3 w-100 pt-3' style={{ bottom: '0px' }}>
                <div className='bg-white py-3 rounded-md'>
                    <div style={{ color: "#070648", fontWeight: "700" }} className='px-3'>#OD-01-28-3073-2417</div>
                    <hr></hr>
                    {/* <p style={{textDecoration:"underline"}}></p> */}
                    <div className='leading-loose text-muted px-3 tracking-tighter'>
                        <div className='flex justify-between'>
                            <div>Store</div>
                            <div className='font-bold'>Arabian Grills, Ottappalam</div>
                        </div>
                        <div className='flex justify-between'>
                            <div>Store</div>
                            <div className='font-bold'>Ottappalam, Kerala</div>
                        </div>
                        <div className='flex justify-between'>
                            <div>Payment mode</div>
                            <div className='font-bold'>COD</div>
                        </div>
                    </div>


                    <div className='flex gap-x-3'>
                        <button type="submit" className='order-cancel-button mt-3 '>
                            Call
                        </button>
                        <button type="submit" className='order-accept-button mt-3 '>
                            Direction
                        </button>
                    </div>
                </div>

            </div>
            {/* <Footer/> */}



            {/* *****************CustomerDetails******************** */}





            <div className='px-3 w-100 pt-3' style={{ bottom: '0px' }}>
                <div className='bg-white py-3 rounded-md'>
                    <div style={{ color: "#070648", fontWeight: "700" }} className='px-3'>Customer details</div>
                    <hr></hr>
                    <div className='leading-loose text-muted px-3 tracking-tighter'>
                        <div className='flex justify-between'>
                            <div>Customer</div>
                            <div className='font-bold'>Deepak</div>
                        </div>
                        <div className='flex justify-between'>
                            <div>Customer number</div>
                            <div className='font-bold'>884877 7591</div>
                        </div>
                        <div className='flex justify-between'>
                            <div>Address</div>
                            <div className='font-bold '>Bypass road, Ottappalam<br />(Landmark , Near Bridge)</div>
                        </div>
                    </div>


                    <div className='flex gap-x-3'>
                        <button type="submit" className='order-details-call-button mt-3 '>
                            Call
                        </button>
                        <button type="submit" className='order-details-direction-button mt-3 '>
                            Direction
                        </button>
                    </div>
                </div>

            </div>
            {/* <Footer/> */}

            {/* ***********item details*************** */}


            <div className='px-3 w-100 pt-3' style={{ bottom: '0px' }}>
                <div className='bg-white py-3 rounded-md'>
                    <div style={{ color: "#070648", fontWeight: "700" }} className='px-3'>Item details</div>
                    <hr></hr>
                    <div className='leading-loose text-muted px-3 tracking-tighter'>
                        <div className='flex justify-between'>
                            <div>Porotta</div>
                            <div className='font-bold'>*10</div>
                        </div>
                        <div className='flex justify-between'>
                            <div>Item value</div>
                            <div className='font-bold'>Rs 100</div>
                        </div>
                    </div>

                </div>
            </div>


            {/* Price details */}

            <div className='px-3 w-100 pt-3' style={{ bottom: '0px' }}>
                <div className='bg-white py-3 rounded-md'>
                    <div className='flex justify-between' style={{ color: "#070648", fontWeight: "700" }}>
                        <div className='px-3'>Price details</div>
                        <div>Total Rs 130</div>
                    </div>
                    <hr></hr>
                    <div className='leading-loose text-muted px-3 tracking-tighter'>
                        <div className='flex justify-between'>
                            <div>Sub total</div>
                            <div className='font-bold'>Rs 100</div>
                        </div>
                        <div className='flex justify-between'>
                            <div>Tax</div>
                            <div className='font-bold'>Rs 0</div>
                        </div>
                        <div className='flex justify-between'>
                            <div>Delivary charge</div>
                            <div className='font-bold '>Rs 30</div>
                        </div>
                    </div>

                </div>
            </div>


            {/* *******************button ******************* */}

            {/* <div className='px-3 w-100 mt-3 pb-8' style={{ bottom: '0px' }}>

                <button type="submit" className='get-start-button mt-3'>
                       Order Delivered
                       </button>
                </div> */}


            <div className='px-3 w-100  mt-3 pb-8  bg-slate-50' style={{ bottom: '0px' }}>

                <Drawer.Root>
                    {/* <div className='flex gap-x-3'> */}
                    <Drawer.Trigger asChild>
                        <button
                            type="submit"
                            className='order-accept-button mt-3 '
                        >
                            Order Delivered
                        </button>
                    </Drawer.Trigger>
                    {/* </div> */}


                    <Drawer.Portal>
                        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                        <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] h-[30%] mt-24 fixed bottom-0 left-0 right-0">
                            <div className=" bg-white rounded-t-[10px] flex-1 pt-4" >
                                <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-zinc-300 mb-8" />
                                <div className='fixed bottom-0 w-100 ' >
                                    <div className='flex justify-end px-3 pb-3'><ImCancelCircle /></div>
                                    <div className='px-3 pb-4 flex items-center'>
                                        <div className="w-100 ">
                                            <div className='flex flex-row w-100 pb-10 px-6' >
                                                <div className='text-4xl'><TiTickOutline /></div>
                                                <div className='text-center pt-2 text-lg' > Orders Delivered Successfully</div>
                                            </div>
                                            <button type="submit" className='get-start-button w-100 text-xl'>
                                                Go to Picked-up orders
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
    )
}

export default OrderDelivered