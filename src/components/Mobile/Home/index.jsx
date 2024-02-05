import React, { useEffect, useState } from 'react'
import Footer from '../Footer'
import Lottie from 'react-lottie';
import animationData from '../../../assets/lottie/track-order-loading.json'
import { useDispatch, useSelector } from 'react-redux';
import { getNewOrders, newOrderAction } from '../../../redux/store/orderReducer';
import noOrders from '../../../assets/images/no odersss.png'
import { Form, Link } from 'react-router-dom';
import { Drawer } from 'vaul';
import { ImCancelCircle } from 'react-icons/im';
import { Badge, FormControl, InputGroup } from 'react-bootstrap';


const Home = () => {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [cancelOpen, setCancelOpen] = useState(false);
    const [acceptOpen, setAcceptOpen] = useState(false);
    const [cancelReason, setCancelReason] = useState();

    const newOrders = useSelector((state) => state.order?.order_data?.data);

    useEffect(() => {
        if (localStorage.getItem("userLogin") && localStorage.getItem("auth_token")) {
            setLoading(true)
            const formData = new FormData();
            formData.append("token", localStorage.getItem("auth_token"));
            formData.append("user_id", localStorage.getItem("user_id"));
            dispatch(getNewOrders(formData)).then((response) => {
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

    const refreshOrders = () => {
        setLoading(true)
        const formData = new FormData();
        formData.append("token", localStorage.getItem("auth_token"));
        formData.append("user_id", localStorage.getItem("user_id"));
        dispatch(getNewOrders(formData)).then((response) => {
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
    }

    const actionBtn = (orderId, type) => {
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
                dispatch(getNewOrders(form_data)).then((response) => {
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
                    console.error("Orders Get Failed", error);
                })
            } else {
                setLoading(false)
            }
        }).catch(error => {
            console.error("send OTP failed", error);
        })
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
            <div className='flex justify-between items-center px-3 bg-white pb-3 sticky top-0' style={{ padding: '15px 0 0 0', boxShadow: "0px 0px 20px #99999938" }}>
                <div className='text-green-800 font-bold text-lg'>New Orders</div>
                <div className='rounded-xl text-white bg-green-800 px-3 py-1' style={{ fontWeight: '500' }} onClick={() => refreshOrders()} >
                    Refresh
                </div>
            </div>
            {loading ?
                <div className='pt-32'>
                    <Lottie
                        options={defaultOptions}
                        height={100}
                        width={100}
                    />
                </div>
                :
                <div className='px-3 w-100' style={{ paddingBottom: "8rem" }}>
                    {newOrders && newOrders?.newOrders && newOrders?.newOrders?.length > 0 ?
                        newOrders?.newOrders.map((order) => (
                            <div className='bg-white py-3 rounded-xl mt-3' style={{ boxShadow: "0px 0px 20px #99999938" }}>
                                <Link to={"/single-order/" + order.id} className='no-underline'>
                                    <div style={{ color: "#070648", fontWeight: "700" }} className='px-3'>#{order.unique_order_id}</div>
                                    <hr style={{ color: '#989898' }} />
                                    <div className='leading-loose text-muted px-3'>
                                        <div className='flex justify-between'>
                                            <div className='font-medium'>Warehouse</div>
                                            <div className='font-bold'>{order?.warehouse?.name}</div>
                                        </div>
                                        <div className='flex justify-between'>
                                            <div className='font-medium'>Address</div>
                                            <div className='w-75 font-bold text-end'>{order?.warehouse?.address}</div>
                                        </div>
                                        {order?.order_items?.map((item, index) =>
                                            <div className='flex justify-between'>
                                                <div className='font-medium'>{index === 0 ? "Item Details" : null}</div>
                                                <div className='font-bold'>{item.name + '(*' + item.quantity + ')'}</div>
                                            </div>
                                        )}
                                        <div className='flex justify-between'>
                                            <div className='font-medium'>Payment mode</div>
                                            <div className='font-bold'>{order.payment_mode}</div>
                                        </div>
                                    </div>
                                </Link>
                                <div className='flex gap-3 px-3'>
                                    {/* <Drawer.Root onOpenChange={() => {
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
                                                        <form onSubmit={() => actionBtn(order.id, "cancel")}>
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
                                    </Drawer.Root> */}

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
                                                                <button type="submit" className='get-start-button w-100 text-xl' onClick={() => actionBtn(order.id, "accept")}>
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
                            </div>
                        )) :
                        <div className="flex flex-col justify-center items-center pt-32">
                            <div>
                                <img src={noOrders} alt="limitzo" />
                            </div>
                            <div className="text-center mt-3 text-lg">
                                Sorry, No new
                                <br />
                                Orders
                            </div>
                        </div>
                    }
                </div>
            }
            {acceptOpen || cancelOpen ?
                null
                :
                <Footer activeHome={true} />
            }

        </div>
    )
}

export default Home


// .get-start-button {
//   border: none;
//   border-radius: 10px;
//   width: 100%;
//   padding: 14px;
//   background-color: #ffc613 !important;
//   color: #fff;
//   font-weight: 700;
// }
