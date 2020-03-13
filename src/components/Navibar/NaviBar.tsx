import * as React from 'react';
import {NaviType} from 'src/types'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Brightness5Icon from '@material-ui/icons/Brightness5';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import  Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import   AppBar  from '@material-ui/core/AppBar';
import brandlogo from './../../public/img/brandlogo.png'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    brandwrapeper:{
      flexGrow: 1,
    },
    brandlogo: {
      width: '18%',
    },
  }),
);



const NaviBar:React.FC<NaviType> = ({theme, setTheme}) =>{
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color={theme === 'dark' ? 'primary' : 'secondary'}>
        <Toolbar>
          <span className={classes.brandwrapeper} >
            <img src={brandlogo} alt="Brand Logo" className={classes.brandlogo} />
          </span> 
          {
            theme === 'dark' ?
            <Tooltip title="Swtich Light Theme">
            <Brightness5Icon 
              color = {theme === 'dark' ? 'secondary' : 'primary'}
              onClick={()=>setTheme('light')}/ >
            </Tooltip> 
            :
            <Tooltip title="Swtich Dark Theme">
              <Brightness7Icon
                color = {theme === 'dark' ? 'secondary' : 'primary'}
                onClick={()=>setTheme('dark')}/ >
            </Tooltip> 
          }
          <Button color= {theme === 'dark' ? 'secondary' : 'primary'}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default NaviBar