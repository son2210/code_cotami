import React from 'react'
import PropTypes from 'prop-types'
import { ContainerWrapper, BreadItemWrapper, BreadWrapper } from './styled'

const PrivateHeader = ({ paths, ...others }) => {
  return (
    <ContainerWrapper {...others}>
      <BreadWrapper separator={" > "} >
        {paths.map((path, index) => {
          const href = '/' + paths.slice(0, index + 1).join('/')
          const active = index === paths.length - 1 ? true : false
          let label = path.replace(/-/gi, ' ')
          label = label[0].toUpperCase() + label.substr(1)
          return (
            <BreadItemWrapper
              key={index}
              to={href}
              className={active && 'active'}
            >
              {label}
            </BreadItemWrapper>
          )
        })}
      </BreadWrapper>
    </ContainerWrapper>
  )
}

PrivateHeader.propTypes = {
  others: PropTypes.any,
  paths: PropTypes.arrayOf(PropTypes.string)
}

export default React.memo(PrivateHeader)
