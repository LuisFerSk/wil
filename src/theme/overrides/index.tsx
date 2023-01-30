import { merge } from 'lodash'
import Card from './Card'
import Lists from './Lists'
import Paper from './Paper'
import Button from './Button'
import Tooltip from './Tooltip'
import Typography from './Typography'
import IconButton from './IconButton'
import Autocomplete from './Autocomplete'

import { Theme } from '@mui/material/styles'


export default function ComponentsOverrides(theme: Theme) {
  return merge(
    Card(theme),
    Lists(theme),
    Paper(theme),
    Button(theme),
    Tooltip(theme),
    Typography(theme),
    IconButton(theme),
    Autocomplete(theme)
  )
}
