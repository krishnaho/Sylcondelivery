import React, { useEffect, useState } from 'react'
import BackButtonName from '../../Elements/BackButtonName';
import moment from 'moment';
import { Calendar } from "react-multi-date-picker"
import { Drawer } from 'vaul';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowRight } from 'react-icons/md'
import { useDispatch } from 'react-redux';
import Lottie from 'react-lottie';
import animationData from '../../../assets/lottie/track-order-loading.json'
import { getOrderHistory } from '../../../redux/store/orderReducer';
import { useSelector } from 'react-redux';
import { WEBSITE_API_URL } from '../../../config';


function OrderHistory() {
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false)
    const [fromValue, setFromValue] = useState(moment())
    const [toValue, setToValue] = useState(moment())
    const [fromOpen, setFromOpen] = useState(false)
    const [toOpen, setToOpen] = useState(false)

    const orders = useSelector((state) => state.order?.order_history?.data);

    useEffect(() => {
        if (localStorage.getItem("userLogin") && localStorage.getItem("auth_token")) {
            setLoading(true)
            const formData = new FormData();
            formData.append("token", localStorage.getItem("auth_token"));
            formData.append("user_id", localStorage.getItem("user_id"));
            formData.append("from_date", moment());
            formData.append("to_date", moment());
            dispatch(getOrderHistory(formData)).then((response) => {
                if (response.payload.success) {
                    setLoading(false)
                    setFromOpen(false)
                    setToOpen(false)
                } else {
                    setLoading(false)
                    setFromOpen(false)
                    setToOpen(false)
                }
            }).catch(error => {
                console.error("send OTP failed", error);
            })
        } else {
            window.location.replace("/login")
        }
    }, []);

    const __viewOrder = () => {
        setLoading(true)
        const formData = new FormData();
        formData.append("token", localStorage.getItem("auth_token"));
        formData.append("from_date", fromValue);
        formData.append("to_date", toValue);
        dispatch(getOrderHistory(formData)).then((response) => {
            if (response.payload.success) {
                setLoading(false)
                setFromOpen(false)
                setToOpen(false)
            } else {
                setLoading(false)
                setFromOpen(false)
                setToOpen(false)
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
        
        <div className='bg-slate-50' style={{ minHeight: "100vh" }}>
            {loading ?
                <div className='pt-32'>
                    <Lottie
                        options={defaultOptions}
                        height={100}
                        width={100}
                    />
                </div>
                : <>

                    <BackButtonName title="Order History" />
                    <div className='px-3 w-100 pt-3 mt-3' style={{ bottom: '0px' }}>
                        <div style={{ color: "#070648", fontWeight: "600" }}>
                            From Date
                        </div>
                        <div className="mt-2">
                            <Drawer.Root onOpenChange={() => {
                                setFromOpen(!fromOpen)
                            }}>
                                <Drawer.Trigger asChild>
                                    <div className='date-viewer mt-3  text-lg' >
                                        <div>
                                            {moment(fromValue?.toDate?.().toString()).format('D/M/YYYY')}
                                        </div>
                                        <div>
                                            <MdOutlineKeyboardArrowDown size={24} />
                                        </div>
                                    </div>
                                </Drawer.Trigger>
                                <Drawer.Portal>
                                    <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                                    <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0 h-80" >
                                        <div className=" bg-white rounded-t-[10px] flex-1  pt-4" >
                                            <div className='fixed bottom-0 w-100' >
                                                <Calendar
                                                    value={fromValue}
                                                    defaultValue={fromValue}
                                                    onChange={setFromValue}
                                                    maxDate={moment().toDate()}
                                                    inputClass="custom-input"
                                                    style={{
                                                        backgroundColor: "#fff",
                                                        height: "17rem",
                                                        borderRadius: "8px",
                                                        fontSize: "14px",
                                                        padding: "3px 10px",
                                                        width: '100%'
                                                    }}
                                                />
                                                <div className='pb-4 px-4'>
                                                    <Drawer.Trigger className='w-100'>
                                                        <div className='order-accept-button text-center mt-2 font-semibold text-lg ' >
                                                            Select Date
                                                        </div>
                                                    </Drawer.Trigger>
                                                </div>
                                            </div>
                                        </div>
                                    </Drawer.Content>
                                </Drawer.Portal>
                            </Drawer.Root>
                        </div>

                        <div style={{ color: "#070648", fontWeight: "600" }} className='mt-4'>
                            To Date
                        </div>

                        <div className="mt-2">
                            <Drawer.Root onOpenChange={() => {
                                setToOpen(!toOpen)
                            }}>
                                <Drawer.Trigger asChild>
                                    <div className='date-viewer mt-3  text-lg' >
                                        <div>
                                            {moment(toValue?.toDate?.().toString()).format('D/M/YYYY')}
                                        </div>
                                        <div>
                                            <MdOutlineKeyboardArrowDown size={24} />
                                        </div>
                                    </div>
                                </Drawer.Trigger>
                                <Drawer.Portal>
                                    <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                                    <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0 h-80" >
                                        <div className=" bg-white rounded-t-[10px] flex-1  pt-4" >
                                            <div className='fixed bottom-0 w-100' >
                                                <Calendar
                                                    value={toValue}
                                                    defaultValue={toValue}
                                                    onChange={setToValue}
                                                    minDate={fromValue}
                                                    maxDate={moment().toDate()}
                                                    inputClass="custom-input"
                                                    style={{
                                                        backgroundColor: "#fff",
                                                        height: "17rem",
                                                        borderRadius: "8px",
                                                        fontSize: "14px",
                                                        padding: "3px 10px",
                                                        width: '100%'
                                                    }}
                                                />
                                                <div className='pb-4 px-4'>
                                                    <Drawer.Trigger className='w-100'>
                                                        <div className='order-accept-button text-center mt-2 font-semibold text-lg ' >
                                                            Select Date
                                                        </div>
                                                    </Drawer.Trigger>
                                                </div>
                                            </div>
                                        </div>
                                    </Drawer.Content>
                                </Drawer.Portal>
                            </Drawer.Root>
                        </div>
                        <button type="submit" className='get-start-button mt-5 mb-3' onClick={() => __viewOrder()}>
                            View Orders
                        </button>
                    </div>
                    {orders && orders.orders && orders.orders.length > 0 ? (
                        <div className='mt-5 px-3' style={{ paddingBottom: "4rem" }}>
                            <div className='order-details-listing  bg-white py-3 rounded-xl mt-3' style={{ boxShadow: "0px 0px 20px #99999938" }}>
                                <div className='flex justify-between font-semibold px-3'>
                                    <div style={{ color: "#070648", fontWeight: "700" }} >Orders</div>
                                    <a href={WEBSITE_API_URL + '/export-order-history?token=' + localStorage.getItem("auth_token") + '&user_id=' + localStorage.getItem("user_id") + '&from=' + orders.from_date + '&to=' + orders.to_date} style={{ color: '#4CD964' }}><u>Export</u></a>
                                </div>
                                <hr style={{ color: '#989898' }} />
                                <div className='leading-loose text-muted px-3'>
                                    <div className='flex justify-between'>
                                        <div className='font-medium'>Total Orders</div>
                                        <div className='font-medium'>{orders?.orders?.length}</div>
                                    </div>
                                    <div className='flex justify-between'>
                                        <div className='font-medium'>Total Order Value</div>
                                        <div className='font-medium'>₹ {orders.total_amount ?? 0.00}</div>
                                    </div>
                                </div>
                            </div>
                            {orders && orders.orders && orders.orders.map((order) => (
                                <div className='order-listing   bg-white py-3 rounded-xl mt-3' style={{ boxShadow: "0px 0px 20px #99999938" }}>
                                    <div className='flex justify-between font-semibold px-3'>
                                        <div style={{ color: "#070648", fontWeight: "700" }} >Order Details</div>
                                        {/* <div>
                                             <MdOutlineKeyboardArrowRight color='#ffc613' size={30} />
                                             </div> */}
                                    </div>
                                    <hr style={{ color: '#989898' }} />
                                    <div className='leading-loose text-muted px-3'>
                                        <div className='flex justify-between'>
                                            <div className='font-medium'>ID</div>
                                            <div className='font-medium'>#{order.unique_order_id}</div>
                                        </div>
                                        <div className='flex justify-between'>
                                            <div className='font-medium'>Time</div>
                                            <div className='font-medium'>{order.order_delivered_at ? moment(order.order_delivered_at).format('hh.m A') : "--"}</div>
                                        </div>
                                        <div className='flex justify-between'>
                                            <div className='font-medium'>Order Value</div>
                                            <div className='font-medium'>₹ {order?.total ?? 0.00}</div>
                                        </div>
                                        <div className='flex justify-between'>
                                            <div className='font-medium'>Pickup</div>
                                            <div className='font-medium'>{order?.warehouse?.name}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : null}
                </>
            }
        </div>
    )
}

export default OrderHistory
