
import { createTheme } from '@mui/material/styles';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';
import { withStyles } from '@mui/styles';
import { TextField } from '@mui/material';




//setting ti right to left
export const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});


export const theme = createTheme({
  direction: 'rtl',
  palette: {
    primary: {
      main: '#b71c1c',
    },
    secondary: {
      main: '#b71c1c',
    },
  },

  colors: {
    bgColor: '#3e3e3e',
    bgLightColor: '#888',
    bgLighterColor: '#DADADA',
    mainAccentColor: '#fecc01'
  },
  typography: {
    fontFamily: "YekanBakh"
  },
  Button: {
    fontFamily: "YekanBakh"
  },
  FormControlLabel: {
    fontFamily: "YekanBakh",
  },
  TextField: {
    color: "red"
  },

});






export const CssTextField = withStyles(theme => ({
  root: {
    '& > *': {
      color: 'black',
      textAlign: 'center',
      fontSize: '1.2rem',
      fontFamily: 'YekanBakh',
    },
    '& label': {
      color: theme.palette.primary.main,
      fontFamily: 'YekanBakh',
    },
    '& label.Mui-focused': {
      color: theme.palette.primary.main,
      fontFamily: 'YekanBakh',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: theme.palette.primary.main,
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        color: 'white',
        borderColor: theme.palette.primary.main,
        fontFamily: 'YekanBakh',
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.main,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
      },

    },
  },
}))(TextField);


