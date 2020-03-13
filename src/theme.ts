import {
  createMuiTheme,
} from '@material-ui/core/styles';
import {blueGrey } from '@material-ui/core/colors';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    status: {
      danger: string;
    };
  }
  interface ThemeOptions {
    status?: {
      danger?: string;
    };
  }
}
export const themeSwitcher = createMuiTheme({
  palette: {
    primary:{
      main:blueGrey[800]
    },
    secondary: {
      main: blueGrey[200]
    },
  },
});