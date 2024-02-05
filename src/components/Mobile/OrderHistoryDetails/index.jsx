import React from 'react'
import { Form, FormControl, InputGroup } from "react-bootstrap";
import {IoIosArrowBack} from 'react-icons/io'

function OrderHistoryDetails() {
  return (
    <div className='bg-slate-50' style={{minHeight:"100vh"}}>
         
      <div style={{padding:"15px 0"}} className='bg-white pb-3'>
                <div className='flex items-center'>
                    <div className='pl-3'><IoIosArrowBack/></div>
                    <div className='grow flex items-center justify-center '>
                    <div className='pe-4' style={{color:"#070648",fontWeight:"700"}}>Order History</div> 
                    </div>
                </div> 
      </div>          
                
        <div className='px-3 w-100 pt-3  mt-3' style={{ bottom: '0px' }}>
            <Form >
                    <div style={{color:"#070648",fontWeight:"600"}}>
                        From Date
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
                                type="tel"
                                placeholder="01/01/2023"
                                required
                                minLength="10"
                                maxLength="10"
                                name="phone"
                                className="mobile-signup-with-icon mb-3"
                            />
                        </InputGroup>
                    </div>

                    <div style={{color:"#070648",fontWeight:"600"}}>
                    To Date
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
                                type="tel"
                                placeholder="01/02/2023"
                                required
                                minLength="10"
                                maxLength="10"
                                name="phone"
                                className="mobile-signup-with-icon mb-3"
                            />
                        </InputGroup>
                    </div>
                 
            </Form> 

            <button type="submit" className='get-start-button mt-3 mb-3'>
                        View Orders
            </button>
            


             {/*  */}


             
             <div className=' w-100 bg-slate-50 pt-3' style={{ bottom: '0px' }}>
                    <div className='bg-white py-3 rounded-md' style={{border:"1px solid #070648"}}>

                        <div className='flex justify-between'>     
                            <div style={{color:"#070648",fontWeight:"700"}} className='px-3'>Order details</div>
                            <a href='#' className='pr-3 text-green-400 font-semibold' >Export</a>
                        </div>

                        <hr></hr>
                        <div className='leading-loose text-muted px-3 tracking-tighter'>
                            <div className='flex justify-between'>
                                <div>Total Orders</div>
                                <div className='font-bold'>#73-2417</div>
                            </div>
                            <div className='flex justify-between'>
                                <div>Total Order Value</div>
                                <div className='font-bold'>10.25 AM</div>
                            </div> 
                        
                        </div>     

                    </div>
                </div>   



             {/*  */}


             
             <div className=' w-100 bg-slate-50 pt-3' style={{ bottom: '0px' }}>
                    <div className='bg-white py-3 rounded-md'>
                        <div style={{color:"#070648",fontWeight:"700"}} className='px-3'>Order details</div>
                        <hr></hr>
                        <div className='leading-loose text-muted px-3 tracking-tighter'>
                            <div className='flex justify-between'>
                                <div>ID</div>
                                <div className='font-bold'>#73-2417</div>
                            </div>
                            <div className='flex justify-between'>
                                <div>Time</div>
                                <div className='font-bold'>10.25 AM</div>
                            </div> 
                            <div className='flex justify-between'>
                                <div>Order Value</div>
                                <div className='font-bold'>₹ 190.00</div>
                            </div> 
                            <div className='flex justify-between'>
                                <div>Pickup</div>
                                <div className='font-bold'>Arabian Grills</div>
                            </div> 
                        </div>     

                    </div>
                </div>   



                 {/*  */}


                 <div className=' w-100 bg-slate-50 pt-3 pb-6' style={{ bottom: '0px' }}>
                    <div className='bg-white py-3 rounded-md'>
                        <div style={{color:"#070648",fontWeight:"700"}} className='px-3'>Order details</div>
                        <hr></hr>
                        <div className='leading-loose text-muted px-3 tracking-tighter'>
                            <div className='flex justify-between'>
                                <div>ID</div>
                                <div className='font-bold'>#73-2417</div>
                            </div>
                            <div className='flex justify-between'>
                                <div>Time</div>
                                <div className='font-bold'>10.25 AM</div>
                            </div> 
                            <div className='flex justify-between'>
                                <div>Order Value</div>
                                <div className='font-bold'>₹ 190.00</div>
                            </div> 
                            <div className='flex justify-between'>
                                <div>Pickup</div>
                                <div className='font-bold'>Arabian Grills</div>
                            </div> 
                        </div>     

                    </div>
                </div>   



      



        </div> 
      
    </div>
  )
}

export default OrderHistoryDetails