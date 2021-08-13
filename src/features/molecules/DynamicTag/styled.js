import { ControlLabel, FormGroup, Tag, TagGroup } from 'rsuite'
import styled from 'styled-components'

export const Wrapper = styled(FormGroup)``

export const Label = styled(ControlLabel)`
  font-weight: 500 !important;
  margin-bottom: 10px !important;
  display: flex !important;
`

export const TagItem = styled(Tag)`
  margin: 0 10px 5px 0 !important;
`
export const TagGroupWrapper = styled(TagGroup)`
  margin: 10px;
`
