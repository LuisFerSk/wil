import { alpha, styled } from '@mui/material/styles'
import { Card } from '@mui/material'
import { ColorThemeType } from 'interfaces'

export function CustomCard(color: ColorThemeType) {
  return styled(Card)(({ theme }) => ({
    boxShadow: 'none',
    textAlign: 'center',
    padding: theme.spacing(5, 0),
    color: theme.palette[color].darker,
    backgroundColor: theme.palette[color].lighter,
  }))
}

export function IconWrapper(color: ColorThemeType) {
  return styled('div')(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
    color: theme.palette[color].dark,
    backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${alpha(
      theme.palette[color].dark,
      0.24
    )} 100%)`
  }))
}
