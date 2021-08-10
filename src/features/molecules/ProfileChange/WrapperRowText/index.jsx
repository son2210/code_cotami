import React from 'react'
import { WrapperRowTexthi, WrapperCol ,Text,WrapperButton,Icon,Link,WrapperColHeader} from './styled'

import PropTypes from 'prop-types'


const WrapperRowText = ({ textLeft , textRight , noneBorder ,button ,textLeftBold,icon ,mg,mgBottom,header}) => {
    return (
        <WrapperRowTexthi noneBorder={noneBorder} mg={mg} mgBottom={mgBottom}>
            <WrapperCol >
                <Text bold={textLeftBold}>{textLeft}</Text>
            </WrapperCol>
            {header
            ? 
            <WrapperColHeader floatRight={true} icon={icon}>
                <Link bold={true}>{textRight}</Link>
                <Icon icon='chevron-right' />
            </WrapperColHeader>
            : 

            <WrapperCol floatRight={true} icon={icon}>
                {button ? <WrapperButton>{textRight}</WrapperButton> : <Text bold={true}>{textRight}</Text>}
                {icon!='' && <Icon icon={icon} />}
            </WrapperCol>
            
            }
            
        </WrapperRowTexthi>
    )
}
WrapperRowText.PropTypes= {
    textLeft: PropTypes.string,
    textRight: PropTypes.string,
    noneBorder: PropTypes.Boolean,
    button: PropTypes.any,
    textLeftBold: PropTypes.any,
    icon: PropTypes.string,
    mg : PropTypes.Boolean,
    mgBottom : PropTypes.number,
    header : PropTypes.Boolean
  }
  


export default React.memo(WrapperRowText)
