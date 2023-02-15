import { PayPalButtons } from '@paypal/react-paypal-js';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './paypalCheckout.css'

const PaypalCheckout = (props) => {
    const { product } = props
    const [paidFor, setPaidFor] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    // CALL BACKEND FUNCTION TO FULFILL ORDER
    const handleApprove = (orderID) => {
        setPaidFor(true)
    }

    if (paidFor) {
        navigate("/success", { replace: true })
    }

    if (error)
        alert(error)

    return (
        <PayPalButtons
            createOrder={(data, actions) => {
                return actions.order.create({
                    purchase_units: [
                        {
                            amount: {
                                value: product
                            }
                        }
                    ]
                })
            }}

            onApprove={async (data, actions) => {
                const order = await actions.order.capture()
                console.log("order", order);

                handleApprove(data.orderID)
            }}

            onError={(err) => {
                setError(err)
                console.log("Paypal checkout onError", err);
            }}
        />
    )
};

export default PaypalCheckout;