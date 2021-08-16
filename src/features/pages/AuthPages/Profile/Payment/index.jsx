import React, { useState } from 'react'
import {
  ColWrapperPayment,
  WrapperHeader,
  WrapperNumber,
  Image,
  Number,
  WrapperPaymentMethod,
  Text,
  Icon,
  WrapperBottom,
  WrapperButton
} from './styled'
import { WrapperRowText } from 'molecules/ProfileChange'
import { IMAGES } from 'assets'

const Payment = () => {
  const [togglePayment, setTogglePayment] = useState(false)
  return (
    <ColWrapperPayment xs={24} sm={16} md={16} lg={8}>
      <WrapperRowText
        textLeft='Payment information'
        textRight='View transaction history'
        noneBorder
        header
        mgBottom={35}
      />
      <WrapperHeader>
        <WrapperRowText
          textLeft='Payment method'
          textLeftBold
          noneBorder
          icon='edit'
          onClick={() => setTogglePayment(!togglePayment)}
        />
        <WrapperNumber>
          {togglePayment ? (
            <>
              <Image source={IMAGES.MASTERCARD} width={60} />
              <Number>**** **** **** 6789</Number>
            </>
          ) : (
            <>
              <Image source={IMAGES.PAYMENT} width={60} />
              <WrapperPaymentMethod>
                <Text bold>Add A Payment Method</Text>
                <Text>You need add a payment method for Cotami service.</Text>
              </WrapperPaymentMethod>
              <Icon icon='chevron-right' />
            </>
          )}
        </WrapperNumber>
      </WrapperHeader>
      <WrapperBottom>
        <WrapperRowText
          textLeft='Subscription info'
          textLeftBold
          mg
          textRight='Price Listing'
          button
        />
        <WrapperRowText textLeft='Total users' textRight='6' />
        <WrapperRowText textLeft='Price / a user' textRight='$50' />
        <WrapperRowText textLeft='Next billing amount' textRight='$120' />
        <WrapperRowText
          textLeft='Next billing on'
          textRight='2021/02/09'
          noneBorder={true}
        />
        <WrapperButton>Cancel subscription</WrapperButton>
      </WrapperBottom>
    </ColWrapperPayment>
  )
}

export default Payment
