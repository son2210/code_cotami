import { ControlLabel, FormGroup, Tag, TagGroup } from 'rsuite'
import styled from 'styled-components'

export const Wrapper = styled(FormGroup)``

export const Label = styled(ControlLabel)`
  font-size: 1rem;
  font-weight: 500 !important;
  margin-bottom: 10px !important;
  display: flex !important;
  color: ${({ theme }) => theme.colors.secondary[1]};
`

export const TagItem = styled(Tag)`
  margin: 0 10px 5px 0 !important;
`
export const TagGroupWrapper = styled(TagGroup)`
  margin: 10px;
`
