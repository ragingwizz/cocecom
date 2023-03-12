import React,{useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom"
import {cartEmpty} from "./helper/cartHelper";
import { getmeToken, processPayment } from './helper/paymenthelper';
import { createOrder } from './helper/orderhelper';
import {isAuthenticated,signout} from "../auth/helper";

import DropIn from "braintree-web-drop-in-react"


const PaymentB=({
    products,
    reload = undefined,
    setReload = (f) => f,
  }) => {
        
        const navigate = useNavigate();
        const [info, setInfo] = useState({
            loading : false,
            success: false,
            clientToken: null,
            error: "",
            instance: {}
        })

        const userId = isAuthenticated && isAuthenticated().user.id;
        const token = isAuthenticated && isAuthenticated().token;
        
        const getToken=(userId,token)=>{
            console.log("before loading token: ",info)
            getmeToken(userId, token)
            .then((response)=>{
                if(response.error){
                    const Err = response.error
                    console.log("Err:",Err)
                    setInfo({
                        ...info,
                        error: Err
                    });
                    signout(()=>{
                        return navigate("/")
                    })
                } else {
                    console.log("INFO before loading token: ",info)
                    const NewclientToken = response.clientToken
                    setInfo({
                        ...info,
                        clientToken: NewclientToken
                        })
                    console.log("INFO after loading token: ",info)
                }
            })
        };

        useEffect(() =>{
            getToken(userId,token);
        },[]);

        const getAmount =() =>{
            let amount =0;
            products?.map( (p) =>(
                
                amount = amount + parseInt(p.price)
            ));
            return amount;
        };

        const onPurchase = () => {
            setInfo({ loading: true });
            let nonce;
            let getNonce = info.instance.requestPaymentMethod().then((data) => {
              console.log("MYDATA", data);
              nonce = data.nonce;
              const paymentData = {
                paymentMethodNonce: nonce,
                amount: getAmount(),
              };
            
              processPayment(userId, token, paymentData)
                .then((response) => {
                  console.log("POINT-1", response);
                  if (response.error) {
                    if (response.code === "1") {
                      console.log("PAYMENT Failed!");
                      signout(() => {
                        return navigate("/");
                      });
                    }
                  } else {
                    setInfo({ ...info, success: response.success, loading: false });
                    console.log("PAYMENT SUCCESS");
        
                    let product_names = "";
                    products.forEach(function (item) {
                      product_names += item.name + ", ";
                    });
        
                    const orderData = {
                      products: product_names,
                      transaction_id: response.transaction.id,
                      amount: response.transaction.amount,
                    };
                    createOrder(userId, token, orderData)
                      .then((response) => {
                        if (response.error) {
                          if (response.code === "1") {
                            console.log("Order Failed!");
                            signout(() => {
                                return navigate("/");
                            });
                          }
                        } else {
                          if (response.success === true) {
                            console.log("ORDER PLACED!!");
                          }
                        }
                      })
                      .catch((error) => {
                        setInfo({ loading: false, success: false });
                        console.log("Order FAILED", error);
                      });
                    cartEmpty(() => {
                      console.log("Did we got a crash?");
                    });
        
                    setReload(!reload);
                  }
                })
                .catch((error) => {
                  setInfo({ loading: false, success: false });
                  console.log("PAYMENT FAILED", error);
                });
            });
          };

        const showbtnDropIn=() =>{
            console.log("I am in DropIn INFO: ", info)
            return(
                <div>
                    {
                        info.clientToken !== null && products.length >0 ? (
                            <div>
                                <DropIn
                                    options = {{authorization : info.clientToken}}
                                    onInstance = {(instance) => (this.instance=instance)}
                                >
                                </DropIn>
                                <button onClick={onPurchase} className="btn btn-block btn-success">
                                    Buy Now
                                </button>
                            </div>
                        ) 
                        : (
                            <h3>Please login first or add something in cart</h3>
                        )
                    }
                </div>
            );
        };

        return (
            <div>
                <h3>Your bill is {getAmount()}.</h3>
                {showbtnDropIn()}
            </div>
        )
    };

export default PaymentB; 