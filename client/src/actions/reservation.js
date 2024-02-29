import { useState } from 'react';
import fetchData from './utils/fetchData';
import { loadStripe } from '@stripe/stripe-js';

const url = process.env.REACT_APP_SERVER_URL + '/reservation';

export const createReservation = async (reservation, currentUser,formattedPaymentMethod, dispatch) => {
    dispatch({ type: 'START_LOADING' });
    //const {paymentMethod} = useState();
    console.log("gear id inside the createReservation" , reservation.gearId)

    try {
        // Create a payment intent on the server
        const response = await fetch('http://localhost:5000/reservation/create-payment-intent', {
           // token: currentUser?.token,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.REACT_APP_STRIPE_SC_KEY}`
            },
            body: JSON.stringify({
                paymentMethod: formattedPaymentMethod, //formattedPaymentMethod.id
                amount: reservation.totalPrice,
                token: currentUser?.token,
            }),
        });
        console.log('createReservation Payment method in res',formattedPaymentMethod)

        if (!response.ok) {
            throw new Error('Failed to create payment intent');
        }

        const { clientSecret } = await response.json();

        // Confirm the payment on the client side
        const stripe = await loadStripe(process.env.REACT_APP_STRIPE_PL_KEY);
        const { error } = await stripe.confirmCardPayment(clientSecret);
        console.log("Secrete",clientSecret);

        if (error) {
            console.error('Payment confirmation failed:', error);
            // Handle payment confirmation failure
            dispatch({ type: 'END_LOADING' });
            return;
        }

        // If payment confirmed successfully, proceed with creating the reservation
        const result = await fetchData({
            url,
            body: reservation,
            token: currentUser?.token,
        });

        if (result) {
            dispatch({
                type: 'UPDATE_ALERT',
                payload: {
                    open: true,
                    severity: 'success',
                    message: 'Reservation created successfully.',
                },
            });
        }
    } catch (error) {
        console.error('Error creating reservation:', error);
        dispatch({
            type: 'UPDATE_ALERT',
            payload: {
                open: true,
                severity: 'error',
                message: 'Failed to create reservation.',
            },
        });
    }

    dispatch({ type: 'END_LOADING' });
};
