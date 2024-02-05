import React, { useEffect, useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { Drawer } from 'vaul'
import { TiTickOutline } from 'react-icons/ti'
import { ImCancelCircle } from 'react-icons/im'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSingleOrder, newOrderAction, orderDelivered, pickedupOrder } from '../../../redux/store/orderReducer'
import BackButtonName from '../../Elements/BackButtonName'
import { LiaDirectionsSolid } from 'react-icons/Lia'
import { CiMobile2 } from 'react-icons/ci'
import { FormControl, InputGroup } from 'react-bootstrap'



function SingleOrder() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [cancelOpen, setCancelOpen] = useState(false);
    const [acceptOpen, setAcceptOpen] = useState(false);
    const [pickedup, setPickedup] = useState(false);
    const [delivered, setDelivered] = useState(false);
    const [cancelReason, setCancelReason] = useState();

    let { order_id } = useParams();

    const singleOrder = useSelector((state) => state.order?.single_order?.data);

    useEffect(() => {
        if (localStorage.getItem("userLogin") && localStorage.getItem("auth_token")) {
            setLoading(true)
            const formData = new FormData();
            formData.append("token", localStorage.getItem("auth_token"));
            formData.append("user_id", localStorage.getItem("user_id"));
            formData.append("order_id", order_id);
            dispatch(getSingleOrder(formData)).then((response) => {
                if (response.payload.success) {
                    setLoading(false)
                    setCancelOpen(false)
                    setAcceptOpen(false)
                } else {
                    setLoading(false)
                    setCancelOpen(false)
                    setAcceptOpen(false)
                }
            }).catch(error => {
                console.error("send OTP failed", error);
            })
        } else {
            window.location.replace("/login")
        }

    }, []);

    const AcceptCancelBtn = (orderId, type) => {
        setLoading(true)
        const formData = new FormData();
        formData.append("token", localStorage.getItem("auth_token"));
        formData.append("user_id", localStorage.getItem("user_id"));
        formData.append("order_id", orderId);
        formData.append("type", type);
        formData.append("cancellation_reason", cancelReason);
        dispatch(newOrderAction(formData)).then((response) => {
            if (response.payload.success) {
                const form_data = new FormData();
                form_data.append("token", localStorage.getItem("auth_token"));
                form_data.append("user_id", localStorage.getItem("user_id"));
                dispatch(getSingleOrder(formData)).then((response) => {
                    if (response.payload.success) {
                        setLoading(false)
                        setCancelOpen(false)
                        setAcceptOpen(false)
                        window.location.replace("/home")

                    } else {
                        setLoading(false)
                        setCancelOpen(false)
                        setAcceptOpen(false)
                        window.location.replace("/home")

                    }
                }).catch(error => {
                    console.error("send OTP failed", error);
                })
            } else {
                setLoading(false)
            }
        }).catch(error => {
            console.error("send OTP failed", error);
        })
    }

    const PickedupOrder = (orderId) => {
        setLoading(true)
        setPickedup(false)
        const formData = new FormData();
        formData.append("token", localStorage.getItem("auth_token"));
        formData.append("user_id", localStorage.getItem("user_id"));
        formData.append("order_id", orderId);
        dispatch(pickedupOrder(formData)).then((response) => {
            if (response.payload.success) {
                const form_data = new FormData();
                form_data.append("token", localStorage.getItem("auth_token"));
                form_data.append("user_id", localStorage.getItem("user_id"));
                dispatch(getSingleOrder(form_data)).then((response) => {
                    if (response.payload.success) {
                        setLoading(false)
                        window.location.replace("/home")
                    } else {
                        setLoading(false)
                        window.location.replace("/home")
                    }
                }).catch(error => {
                    console.error("Orders Get Failed", error);
                })
            } else {
                setLoading(false)
            }
        }).catch(error => {
            console.error("send OTP failed", error);
        })
    }

    const DeliveredOrder = (orderId) => {
        setLoading(true)
        setDelivered(false)
        const formData = new FormData();
        formData.append("token", localStorage.getItem("auth_token"));
        formData.append("user_id", localStorage.getItem("user_id"));
        formData.append("order_id", orderId);
        dispatch(orderDelivered(formData)).then((response) => {
            if (response.payload.success) {
                const form_data = new FormData();
                form_data.append("token", localStorage.getItem("auth_token"));
                form_data.append("user_id", localStorage.getItem("user_id"));
                dispatch(getSingleOrder(form_data)).then((response) => {
                    if (response.payload.success) {
                        setLoading(false)
                        window.location.replace("/home")
                    } else {
                        setLoading(false)
                        window.location.replace("/home")
                    }
                }).catch(error => {
                    console.error("Orders Get Failed", error);
                })
            } else {
                setLoading(false)
            }
        }).catch(error => {
            console.error("send OTP failed", error);
        })
    }

    return (
        <div style={{ minHeight: "100vh" }} className='bg-slate-50'>

            <BackButtonName />
            <div className='px-3 w-100'>
                <div className='bg-white py-3 rounded-xl mt-3' style={{ boxShadow: "0px 0px 20px #99999938" }}>
                    <div style={{ color: "#070648", fontWeight: "700" }} className='px-3'>#{singleOrder?.unique_order_id}</div>
                    <hr style={{ color: "#a1a1a1" }} />
                    <div className='leading-loose text-muted px-3'>
                        <div className='flex justify-between'>
                            <div className='font-medium'>Warehouse</div>
                            <div className='font-bold'>{singleOrder?.warehouse?.name}</div>
                        </div>
                        <div className='flex justify-between'>
                            <div className='font-medium'>address</div>
                            <div className='w-75 font-bold text-end'>{singleOrder?.warehouse?.address}</div>
                        </div>
                        <div className='flex justify-between'>
                            <div className='font-medium'>Payment mode</div>
                            <div className='font-bold '>{singleOrder?.payment_mode}</div>
                        </div>
                    </div>
                    <div className='flex gap-3 px-3'>
                        <a className='order-cancel-button text-center mt-3 flex items-center justify-center no-underline'
                            href={`https://maps.google.com/maps?q=${singleOrder?.warehouse?.latitude},${singleOrder?.warehouse?.longitude}`}
                            target={"_blank"}>
                            <LiaDirectionsSolid color='#118A45' size={25} />  <span className='ms-1'>Direction</span>
                        </a>
                        {singleOrder?.warehouse?.phone ?
                            <a href={`tel:${singleOrder?.warehouse?.phone}`} className='order-accept-button text-center mt-3 flex items-center justify-center no-underline' >
                                <CiMobile2 color='#fff' size={24} />  <span className='ms-1'>Call</span>
                            </a>
                            :
                            <a className='order-accept-button-disable text-center mt-3 flex items-center justify-center no-underline' title='Number Not Giver Sorry' >
                                <CiMobile2 color='#fff' size={24} />  <span className='ms-1'>Call</span>
                            </a>
                        }
                    </div>
                </div>
            </div>

            <div className='px-3 w-100  pt-3' >
                <div className='bg-white py-3 rounded-xl ' style={{ boxShadow: "0px 0px 20px #99999938" }}>
                    <div style={{ color: "#070648", fontWeight: "700" }} className='px-3'>Customer details</div>
                    <hr style={{ color: "#a1a1a1" }} />
                    <div className='leading-loose text-muted px-3'>
                        <div className='flex justify-between'>
                            <div className='font-medium'>Customer</div>
                            <div className='font-bold'>{singleOrder?.user?.name}</div>
                        </div>
                        <div className='flex justify-between'>
                            <div className='font-medium'>Customer number</div>
                            <div className='font-bold '>{singleOrder?.user?.phone}</div>
                        </div>
                        <div className='flex justify-between'>
                            <div className='font-medium'>Address</div>
                            <div className='w-75 font-bold text-end'>{singleOrder?.address}</div>
                        </div>
                    </div>
                    <div className='flex gap-3 px-3'>
                        <a className='direction-button text-center mt-3 flex items-center justify-center no-underline'
                            href={`https://maps.google.com/maps?q=${singleOrder?.latitude},${singleOrder?.longitude}`}
                            target={"_blank"}>
                            <LiaDirectionsSolid color='#070648' size={25} />  <span className='ms-1'>Direction</span>
                        </a>
                        {singleOrder?.user?.phone ?
                            <a href={`tel:${singleOrder?.user?.phone}`} className='call-button text-center mt-3 flex items-center justify-center no-underline' >
                                <CiMobile2 color='#fff' size={24} />  <span className='ms-1'>Call</span>
                            </a>
                            :
                            <a className='call-button-disable text-center mt-3 flex items-center justify-center no-underline' title='Number Not Giver Sorry' >
                                <CiMobile2 color='#fff' size={24} />  <span className='ms-1'>Call</span>
                            </a>
                        }
                    </div>
                </div>
            </div>

            <div className='px-3 w-100  pt-3' style={{ bottom: '0px' }}>
                <div className='bg-white py-3 rounded-xl ' style={{ boxShadow: "0px 0px 20px #99999938" }}>
                    <div style={{ color: "#070648", fontWeight: "700" }} className='px-3'>Item details</div>
                    <hr style={{ color: "#a1a1a1" }} />
                    <div className='leading-loose text-muted px-3 tracking-tighter'>
                        <div className='flex justify-between'>
                            <div className='font-bold'>Item</div>
                            <div className='font-bold'>Qty x Price</div>
                        </div>
                        {singleOrder?.order_items?.map((item) =>
                            <div className='flex justify-between'>
                                <div className='font-semibold'>{item.name}</div>
                                <div className='font-semibold'>{item.quantity + ' x ' + parseFloat(item.price)}</div>
                            </div>
                        )}
                        <div className='flex justify-between'>
                            <div className='font-bold'>Total</div>
                            <div className='font-bold'>Rs {parseFloat(singleOrder?.sub_total).toFixed(2)}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='px-3 w-100  pt-3' style={{ bottom: '0px' }}>
                <div className='bg-white py-3 rounded-xl ' style={{ boxShadow: "0px 0px 20px #99999938" }}>
                    <div className='flex justify-between px-3' style={{ color: "#070648", fontWeight: "700" }}>
                        <div className=''>Price details</div>

                    </div>
                    <hr style={{ color: "#a1a1a1" }} />
                    <div className='leading-loose text-muted px-3 tracking-tighter'>
                        <div className='flex justify-between'>
                            <div className='font-bold'>Sub total</div>
                            <div className='font-semibold'>Rs {parseFloat(singleOrder?.sub_total).toFixed(2)}</div>
                        </div>
                        {parseFloat(singleOrder?.tax) > 0 ?
                            <div className='flex justify-between'>
                                <div className='font-bold'>Tax</div>
                                <div className='font-semibold'>+Rs {parseFloat(singleOrder?.tax).toFixed(2)}</div>
                            </div>
                            : null}
                        {parseFloat(singleOrder?.store_charges) > 0 ?
                            <div className='flex justify-between'>
                                <div className='font-bold'>Store charge</div>
                                <div className='font-semibold'>+Rs {parseFloat(singleOrder?.store_charges).toFixed(2)}</div>
                            </div>
                            : null}
                        {parseFloat(singleOrder?.walletamount) > 0 ?
                            <div className='flex justify-between'>
                                <div className='font-bold'>Wallet Redeemed</div>
                                <div className='font-semibold'>-Rs {parseFloat(singleOrder?.walletamount).toFixed(2)}</div>
                            </div>
                            : null}
                        {parseFloat(singleOrder?.coupon_amount) > 0 ?
                            <div className='flex justify-between'>
                                <div className='font-bold'>Coupon Discount</div>
                                <div className='font-semibold'>-Rs {parseFloat(singleOrder?.coupon_amount).toFixed(2)}</div>
                            </div>
                            : null}
                        {parseFloat(singleOrder?.delivery_charge) >0 ?
                            <div className='flex justify-between'>
                                <div className='font-bold'>Delivary charge</div>
                                <div className='font-semibold'>+Rs {parseFloat(singleOrder?.delivery_charge).toFixed(2)}</div>
                            </div>
                            : null}
                        {parseFloat(singleOrder?.payable) > 0 ?
                            <div className='flex justify-between' style={{ color: "#070648" }}>
                                <div className='font-bold'>Payable</div>
                                <div className='font-bold'>Rs {parseFloat(singleOrder?.payable).toFixed(2)}</div>
                            </div>
                            : null}
                        <hr className='my-1 border-dashed' style={{ color: "#a1a1a1" }} />
                        <div className='flex justify-between' style={{ color: "#070648" }}>
                            <div className='font-bold'>Total</div>
                            <div className='font-bold'>Rs {parseFloat(singleOrder?.total).toFixed(2)}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='px-3 w-100  mt-3 pb-8  bg-slate-50' style={{ bottom: '0px' }}>
                {singleOrder?.order_status_id == 2 || singleOrder?.order_status_id == 3 || singleOrder?.order_status_id == 4 ? (
                    <div className='flex gap-x-3'>
                        <Drawer.Root onOpenChange={() => {
                            setCancelOpen(!cancelOpen)
                            setAcceptOpen(false)
                        }}>
                            <Drawer.Trigger asChild>
                                <div className='order-cancel-button text-center mt-3 font-semibold text-lg' >
                                    Cancel
                                </div>
                            </Drawer.Trigger>
                            <Drawer.Portal>
                                <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                                <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0 h-80" >
                                    <div className=" bg-white rounded-t-[10px] flex-1  pt-4" >
                                        <div className='flex justify-end px-3 w-100'>
                                            <Drawer.Trigger>
                                                <ImCancelCircle size={20} />
                                            </Drawer.Trigger>
                                        </div>
                                        <div className='fixed bottom-0 w-100 ' >
                                            <form onSubmit={() => AcceptCancelBtn(singleOrder?.id, "cancel")}>
                                                <div className='px-3 pb-4 w-100 '>
                                                    <div className='text-muted px-3'>
                                                        Cancellation Reason
                                                    </div>
                                                    <div className="mt-2 px-3">
                                                        <InputGroup
                                                            hasValidation
                                                            className="b-r-10  mobile-signup-input "
                                                            style={{
                                                                boxSizing: "border-box",
                                                            }}
                                                        >
                                                            <FormControl
                                                                type="text"
                                                                placeholder="Enter Cancellation Reason"
                                                                required
                                                                name="text"
                                                                onChange={(val) => {
                                                                    let data = val.target.value;
                                                                    setCancelReason(data)
                                                                }}
                                                                className="mobile-signup-with-icon mb-3"
                                                            />
                                                        </InputGroup>
                                                    </div>
                                                    <div className='text-center font-semibold text-lg pb-4 px-5'>Are you sure you want to cancel this order?</div>
                                                    <button type="submit" className='get-start-button w-100 text-xl'  >
                                                        Cancel Order
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </Drawer.Content>
                            </Drawer.Portal>
                        </Drawer.Root>

                        <Drawer.Root onOpenChange={() => {
                            setAcceptOpen(!acceptOpen)
                            setCancelOpen(false)
                        }}>
                            <Drawer.Trigger asChild>
                                <div className='order-accept-button text-center font-semibold text-lg mt-3' >
                                    Accept
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
                                                <div className="w-100 ">
                                                    <div className='text-center font-semibold text-lg pb-4 px-3' >Are you sure you want to accept this order?</div>
                                                    <button type="submit" className='get-start-button w-100 text-xl' onClick={() => AcceptCancelBtn(singleOrder?.id, "accept")}>
                                                        Accept Order
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Drawer.Content>
                            </Drawer.Portal>
                        </Drawer.Root>
                    </div>
                ) : singleOrder?.order_status_id == 5 ? (
                    <Drawer.Root onOpenChange={() => {
                        setPickedup(!pickedup)
                    }}>
                        <Drawer.Trigger asChild>
                            <button type="submit" className='get-start-button font-semibold text-lg mt-3'>
                                Order Pickedup
                            </button>
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
                                                <div className='text-center font-semibold text-lg pb-4 px-5'>Are you sure you want to confirm order pickup?</div>
                                                <button type="submit" className='get-start-button w-100 text-xl' onClick={() => PickedupOrder(singleOrder?.id,)}>
                                                    Order Pickedup
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Drawer.Content>
                        </Drawer.Portal>
                    </Drawer.Root>
                ) : singleOrder?.order_status_id == 6 ? (
                    <Drawer.Root onOpenChange={() => {
                        setDelivered(!delivered)
                    }}>
                        <Drawer.Trigger asChild>
                            <button type="submit" className='get-start-button font-semibold text-lg mt-3'>
                                Order Delivered
                            </button>
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
                                                <div className='text-center font-semibold text-lg pb-4 px-5'>Are you sure you want to confirm order delivery?</div>
                                                <button type="submit" className='get-start-button w-100 text-xl' onClick={() => DeliveredOrder(singleOrder?.id)}>
                                                    Order Delivered
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Drawer.Content>
                        </Drawer.Portal>
                    </Drawer.Root>
                ) : null}
            </div>
        </div>
    )
}

export default SingleOrder

// className='border-4 rounded-full bg-green-500 text-white'
