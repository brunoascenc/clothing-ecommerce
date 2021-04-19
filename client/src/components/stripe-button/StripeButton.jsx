import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const StripeButton = ({price}) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_51HSKkOGiY20xWn7q37BDBkyBwyzdkjUCZlDaLTuc5KZG44vZpco0q9PLszLRwmoX2vTEBGGBbhDZEgKSRyfUGkzq007qWGkDWS'
    
    const onToken = token => {
        console.log(token)
        alert('Payment Successful')
    }

    return (
        <StripeCheckout
        label='Pay now'
        name='CRWN Clothing Ltd.'
        billingAddress
        shippingAddress
        image="https://sendeyo.com/en/f3eb2117da"
        description={`Your total is $${price}`}
        amount={priceForStripe}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishableKey}
        />
    )
}

export default StripeButton
