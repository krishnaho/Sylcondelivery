import React, { useEffect, useState } from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import sylconLogo from "../../../assets/images/sylconpic.png";
import login from "../../../assets/images/delivery-login.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Lottie from "react-lottie";
import onboadingImage from "../../../assets/images/BOARD.png";
import animationData from "../../../assets/lottie/track-order-loading.json";
import { loginDeliveryPartner } from "../../../redux/store/userReducer";
import GetStarted from "../GetStarted";

const Login = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    if (localStorage.getItem("userLogin")) {
      window.location.replace("/home");
    }
  }, []);

  const __login = (e) => {
   
    setLoading(true);
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    dispatch(loginDeliveryPartner(formData))
      .then((response) => {
        if (response.payload.success && response.payload.data.deliveryGuy) {
            window.location.replace("/home")
        } else if (response.payload.success) {
            localStorage.setItem('email',email)
            window.location.replace("/signup")
        } else {
            setLoading(false)
            setErrorMsg(response.payload.message)
        }
        setLoading(false);
        console.log(response, "ssss");
      })
      .catch((error) => {
        console.error("send OTP failed", error);
      });
      e.preventDefault();
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div>
      {loading ? (
        <div>
          {/* <GetStarted /> */}
          {/* <div className='pt-3'>
            <div style={{ backgroundColor: "rgba(17, 137, 69, 0.10)" }} className='mx-3 rounded-3xl '>
              <div className='flex justify-center pt-16'>
                <img src={sylconLogo} alt='sylcon' style={{ width: "259px", height: "26px" }} />
              </div>
              <div className='flex justify-center items-center' style={{ marginTop: "-45px" }}>
                <img src={onboadingImage} alt='onboding' />
              </div>
            </div>
          </div>
          <div className='font-normal w-screen px-3 mt-5'>
            <div className='flex justify-center' style={{ fontWeight: '500', fontSize: "28px", lineHeight: "34px", letterSpacing: "0.14px" }}>
              Welcome to Sylcon
            </div>
            <div className=' text-center   mt-2 tracking-wide leading-6 ' style={{ fontSize: "18px", fontWeight: '450', color: "#6B6E78" }}>
              Transforming your<br /> experience with a tap.<br /> Welcome to the<br /> future.
            </div>
          </div> */}
          <div className="pt-32">
            <Lottie options={defaultOptions} height={100} width={100} />
          </div>
        </div>
      ) : (
        <>
          <div className="pt-3">
            <div
              style={{ backgroundColor: "rgba(17, 137, 69, 0.10)" }}
              className="mx-3 pb-3 rounded-3xl "
            >
              <div className="flex justify-center pt-16">
                <img
                  src={sylconLogo}
                  alt="sylcon"
                  style={{ width: "259px", height: "26px" }}
                />
              </div>
              <div
                className="flex justify-center items-center"
                style={{ marginTop: "-45px" }}
              >
                <img src={onboadingImage} alt="onboding" />
              </div>
            </div>
          </div>
          {/* <div className='font-normal w-screen px-3 mt-5'>
            <div className='flex justify-center' style={{ fontWeight: '500', fontSize: "28px", lineHeight: "34px", letterSpacing: "0.14px" }}>
              Welcome to Sylcon
            </div>
            <div className=' text-center   mt-2 tracking-wide leading-6 ' style={{ fontSize: "18px", fontWeight: '450', color: "#6B6E78" }}>
              Transforming your<br /> experience with a tap.<br /> Welcome to the<br /> future.
            </div>
          </div> */}
          <div className="pb-10 w-100 mt-4">
            <Form
              onSubmit={(e) => {
                __login(e);
              }}
            >
              <div style={{ paddingBottom: "6rem" }}>
                <div className="text-muted px-3">Email</div>
                <div className="mt-2 px-3">
                  <InputGroup
                    hasValidation
                    className="b-r-10  mobile-signup-input "
                    style={{
                      boxSizing: "border-box",
                    }}
                  >
                    <FormControl
                      type="email"
                      placeholder="Enter Email"
                      required
                      name="email"
                      onChange={(val) => {
                        let data = val.target.value;
                        setEmail(data);
                      }}
                      className="mobile-signup-with-icon mb-3"
                    />
                  </InputGroup>
                </div>
                <div className="text-muted px-3">Password</div>
                <div className="mt-2 px-3">
                  <InputGroup
                    hasValidation
                    className="b-r-10 mobile-signup-input"
                    style={{
                      boxSizing: "border-box",
                    }}
                  >
                    <FormControl
                      type="password"
                      placeholder="Enter Password"
                      required
                      name="password"
                      onChange={(val) => {
                        let data = val.target.value;
                        setPassword(data);
                      }}
                      className="mobile-signup-with-icon"
                    />
                  </InputGroup>
                </div>
                <div className="font-12 text-red-500 text-center leading-3 pb-2 mt-3">
                  {errorMsg}
                </div>
              </div>
              <div className="fixed bottom-0 w-100 px-3 pb-4 bg-white">
                <button type="submit" className="get-start-button mt-3">
                  Login
                </button>
                <div className="flex justify-center relative top-4 gap-2 mb-3">
                  Don't have an account
                  <Link to="/signup" className="text-green-800 no-underline">
                    Signup
                  </Link>{" "}
                </div>
              </div>
            </Form>
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
