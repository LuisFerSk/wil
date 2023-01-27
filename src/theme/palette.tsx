import { alpha } from '@mui/material/styles'

function createGradient(color1: string, color2: string): string {
  return `linear-gradient(to bottom, ${color1}, ${color2})`
}

const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8),
}

const PRIMARY = {
  lighter: '#0BE6B4',
  light: '#0CE4F0',
  main: '#0095d9',
  dark: '#0C6CF0',
  darker: '#0B2EE6',
  contrastText: '#fff'

}
const SECONDARY = {
  lighter: '#09ADB8',
  light: '#0AC29A',
  main: '#00AB55',
  dark: '#0AC232',
  darker: '#17B809',
  contrastText: '#fff'
}
const INFO = {
  lighter: '#0BE6B4',
  light: '#0CE4F0',
  main: '#0095d9',
  dark: '#0C6CF0',
  darker: '#0B2EE6',
  contrastText: '#fff'
}
const SUCCESS = {
  lighter: '#CAE825',
  light: '#8CF227',
  main: '#49DB2F',
  dark: '#27F248',
  darker: '#25E87C',
  contrastText: GREY[800]
}
const WARNING = {
  lighter: '#FFF305',
  light: '#E8C605',
  main: '#FFC107',
  dark: '#E89805',
  darker: '#FF8A05',
  contrastText: GREY[800]
}
const ERROR = {
  lighter: '#FF7736',
  light: '#E85231',
  main: '#FF4842',
  dark: '#E83177',
  darker: '#FF36E8',
  contrastText: '#fff'
}

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main)
}

export default {
  common: { black: '#000', white: '#fff' },
  primary: { ...PRIMARY },
  secondary: { ...SECONDARY },
  info: { ...INFO },
  success: { ...SUCCESS },
  warning: { ...WARNING },
  error: { ...ERROR },
  grey: GREY,
  gradients: GRADIENTS,
  divider: GREY[500_24],
  text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
  background: { paper: '#fff', default: '#fff', neutral: GREY[200] },
  action: {
    active: GREY[600],
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48
  }
}
