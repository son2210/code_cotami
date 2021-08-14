import styled from 'styled-components'
import { BaseButton, BaseText, BaseIcon, BaseItemGrid, BaseImage } from 'atoms'

export const ColWrapperPayment = styled(BaseItemGrid)`
  margin-left: 50px;
`

export const WrapperButton = styled(BaseButton)`
  width: 208px;
`
export const WrapperBottom = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e0e0e0;
  padding: 17px;
  border-radius: 4px;
  align-items: space-around;
  box-sizing: border-box;
  align-items: center;
`
export const WrapperHeader = styled.div`
  border: 1px solid #e0e0e0;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 30px;
`
export const WrapperNumber = styled.div`
  display: flex;
  align-items: center;
`
export const Number = styled(BaseText)`
  font-size: 18px;
  font-weight: 500;
  margin-left: 20px;
`
export const WrapperPaymentMethod = styled.div`
  margin-left: 20px;
`
export const Text = styled(BaseText)``
export const Icon = styled(BaseIcon)``
export const Image = styled(BaseImage)``
