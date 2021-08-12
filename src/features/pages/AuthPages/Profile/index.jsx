import React, { useCallback , useState} from 'react'
import PropTypes from 'prop-types'
import Routers from 'utils/Routers'
import { DisplayField, AvatarBlock, WrapperRowText } from 'molecules/ProfileChange'
import { ContainerWrapper, ColWrapper, ColWrapperPayment, WrapperButton, WrapperBottom ,WrapperHeader,WrapperNumber,Number,WrapperPaymentMethod,Text ,Icon} from './styled'
import { BaseButton ,BaseImage} from 'atoms'
import { useHistory } from 'react-router-dom'
import { useToken } from 'hooks'
import { useRecoilState } from 'recoil'
import { globalUserState } from 'stores/profile/atom'
import { IMAGES } from 'assets'
const Profile = ({ ...others }) => {
  const history = useHistory()
  const goToPage = useCallback(route => history.push(route), [])
  const [userState, setUserState] = useRecoilState(globalUserState)
  const { clearToken } = useToken()
  const [ togglePayment , setTogglePayment ] = useState(false)
  return (
    <ContainerWrapper justify='start' {...others}>
      <ColWrapper colspan={9}>
        <AvatarBlock hasUpload={false} disable={true} />
        <DisplayField title={'Company id'} content={'B0001'} />
        <DisplayField title={'Company name'} content={'Its Global'} />
        <DisplayField title={'Role'} content={'staff'} />
        <DisplayField
          title={'First name'}
          content={userState?.firstName || ''}
        />
        <DisplayField title={'Last Name'} content={userState?.lastName || ''} />
        <DisplayField title={'Email'} content={userState?.email || ''} />
        <br />
        <BaseButton
          primary
          bold
          onClick={() => goToPage(Routers.NORMAL_ADMIN.PROFILE.CHILD[1].URL)}
        >
          Update profile
        </BaseButton>
        <BaseButton
          secondary
          bold
          onClick={() => goToPage(Routers.NORMAL_ADMIN.PROFILE.CHILD[0].URL)}
        >
          Change password
        </BaseButton>
        <BaseButton
          bold
          onClick={async () => {
            setUserState({})
            await clearToken()
            goToPage(Routers.LOGIN)
          }}
        >
          Logout
        </BaseButton>
      </ColWrapper>
      <ColWrapperPayment colspan={9} >
      <WrapperRowText textLeft='Payment infomation' textRight='View transaction history' noneBorder header mgBottom={35} />
        <WrapperHeader>
        <WrapperRowText textLeft='Payment method' textLeftBold noneBorder icon='edit' onClick={()=>setTogglePayment(!togglePayment)}/>
        <WrapperNumber>

          { togglePayment 
          ?
          <>
          <BaseImage source={IMAGES.MASTERCARD} width={60}/>
          <Number>**** **** **** 6789</Number>
          </>
          :
          <>
          <BaseImage source={IMAGES.PAYMENT} width={60}/>
          <WrapperPaymentMethod>
          <Text bold >Add A Payment Method</Text>
          <Text>You need add a payment method for Cotami service.</Text>
          </WrapperPaymentMethod>
          <Icon icon='chevron-right' />
          </>
          }

         
        </WrapperNumber>
        </WrapperHeader>
        <WrapperBottom>
          <WrapperRowText textLeft='Subscription info' textLeftBold mg textRight='Price Listing' button />
          <WrapperRowText textLeft='Total users' textRight='6' />
          <WrapperRowText textLeft='Price / a user' textRight='$50' />
          <WrapperRowText textLeft='Next billing amount' textRight='$120' />
          <WrapperRowText textLeft='Next billing on' textRight='2021/02/09' noneBorder={true} />
          <WrapperButton>Cancel subscription</WrapperButton>
        </WrapperBottom>

      </ColWrapperPayment>
    </ContainerWrapper>
  )
}

Profile.propTypes = {
  children: PropTypes.node
}

export default React.memo(Profile)
