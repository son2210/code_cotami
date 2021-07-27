import React, { useCallback } from 'react'
import {
  Wrapper,
  Title,
  Icon,
  WrapperModule,
  HeaderModule,
  ModuleCount,
  Button
} from './styled'
import PropTypes from 'prop-types'
import { withNumber } from 'exp-value'
const CreateModule = ({
  data,
  onCreateModule,
  onRemoveModule,
  numModule,
  updateModule,
  ...others
}) => {
  const _renderModule = useCallback(
    modules => {
      return (
        <>
          <HeaderModule>
            <Title H2 bold>
              Choose a template
            </Title>
            <ModuleCount>
              {`${withNumber('length', modules)} module`}
              <Button dashed={1} onClick={onCreateModule}>
                <Icon name='feather-plus' size={16} />
                New module
              </Button>
            </ModuleCount>
          </HeaderModule>
          {modules?.map((module, index) => {
            return (
              <WrapperModule
                modules={module}
                onRemoveModule={onRemoveModule}
                index={index}
                key={index}
                updateModule={updateModule}
              />
            )
          })}
        </>
      )
    },
    [data, onCreateModule, numModule]
  )

  return <Wrapper {...others}>{_renderModule(data)}</Wrapper>
}
CreateModule.propTypes = {
  data: PropTypes.array,
  setUpdate: PropTypes.func,
  onCreateModule: PropTypes.func,
  onRemoveModule: PropTypes.func,
  numModule: PropTypes.number,
  updateModule: PropTypes.func
}

export default React.memo(CreateModule)
