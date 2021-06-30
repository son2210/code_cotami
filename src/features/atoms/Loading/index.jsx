import React from 'react'
import { LoadingSpinner, LoadingBox, LoadingWrapper } from './styled'

const Loading = () => {
  return (
    <>
      <LoadingWrapper>
        <LoadingBox>
          <LoadingSpinner size={15} />
        </LoadingBox>
      </LoadingWrapper>
    </>
  )
}

export default React.memo(Loading)
