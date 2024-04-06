// import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./assets/css/custom.css";
// import "react-spring-bottom-sheet/dist/style.css";

/*======================Customer App Start=========================*/

import GetStarted from "./components/Mobile/GetStarted";
import Login from "./components/Mobile/Login";
import Signup from "./components/Mobile/Signup";
import Home from "./components/Mobile/Home";
import SingleOrder from "./components/Mobile/SingleOrder";
import AcceptedOrders from "./components/Mobile/AcceptedOrders";
import PickedUpOrders from "./components/Mobile/PickedUpOrders";
import OrderPickup from "./components/Mobile/OrderPickup";
import OrderDelivered from "./components/Mobile/OrderDelivered";
import EditProfile from "./components/Mobile/Profile/EditProfile";
import OrderHistory from "./components/Mobile/OrderHistory";
import OrderHistoryDetails from "./components/Mobile/OrderHistoryDetails";
import NoOrdersPage from "./components/Mobile/NoOrdersPage";
import Profile from "./components/Mobile/Profile";
import Calender from "./components/Mobile/Calender";
import SingleOrderReturned from "./components/Mobile/SingleOrderreturned";
/*======================Customer App End=========================*/

const App = () => {
    return (
        <Router>
            <Routes> 
                <Route path="/" element={<GetStarted />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element={<Home />} />
                <Route path="/single-order/:order_id" element={<SingleOrder />} />
                <Route path="/single-order-returned/:order_id" element={<SingleOrderReturned />} />

                <Route path="/accepted-orders" element={<AcceptedOrders />} />
                <Route path="/order-pickup" element={<OrderPickup />} />
                <Route path="/pickedup-orders" element={<PickedUpOrders />} />
                <Route path="/order-delivered" element={<OrderDelivered />} />
                <Route path="/my-profile" element={<Profile />} />
                <Route path="/edit-profile/:id" element={<EditProfile />} />
                <Route path="/order-history" element={<OrderHistory />} />
                <Route path="/order-history-details" element={<OrderHistoryDetails />} />
                <Route path="/no-orders" element={<NoOrdersPage />} />
                <Route path="/calender" element={<Calender />} />
            </Routes>
        </Router>
    );
};
export default App;
