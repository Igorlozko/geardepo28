import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import stripeLogo from './stripeLogo.png';

const PaymentField = ({ handleSubmit }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handlePaymentSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        // Use Stripe.js to handle payment processing
        const cardElement = elements.getElement(CardElement);
        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.error(error.message);
        } else {
            // If payment method created successfully, call handleSubmit with paymentMethod
            handleSubmit({
                id: paymentMethod.id, // Adjust based on the structure of paymentMethod
                brand: paymentMethod.card.brand,
                last4: paymentMethod.card.last4,
                exp_month: paymentMethod.card.exp_month,
                exp_year: paymentMethod.card.exp_year,
            }); // passes the payment method 
            console.log('Payment method in field',paymentMethod)
        }
    };

    return (
        <form onSubmit={handlePaymentSubmit} style={styles.form}>
            <label style={styles.label}></label>
            <img src={stripeLogo} alt="Stripe" style={styles.logo} />
            <div style={styles.cardContainer}>
                <CardElement options={cardStyle} />
            </div>
            <button type="submit" style={styles.button} disabled={!stripe}>
                Pay
            </button>
        </form>
    );
};

const styles = {
    form: {
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto',
        textAlign: 'center',
    },
    logo: {
        width: '100px',
        marginBottom: '20px',
    },
    label: {
        display: 'block',
        marginBottom: '10px',
        fontSize: '16px',
        color: '#333',
    },
    cardContainer: {
        borderRadius: '4px',
        border: '1px solid #ddd',
        padding: '10px',
        backgroundColor: '#fff',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
    },
    button: {
        backgroundColor: '#4285F4',
        color: '#fff',
        padding: '12px 24px',
        borderRadius: '5px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        marginTop: '20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s',
    },
};

const cardStyle = {
    base: {
        fontSize: '16px',
        fontFamily: 'Arial, sans-serif',
        color: '#333',
        '::placeholder': {
            color: '#ccc',
        },
    },
};

export default PaymentField;
