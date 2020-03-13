import * as React from 'react';
import { makeStyles, Theme, createStyles, AppBar } from '@material-ui/core';
import { NaviType } from 'src/types';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapfooter:{
      position: 'fixed',
      left: 0, 
      bottom: 0,
      width:'100vw',
      height: '10vh',
      margin: 0,
      padding: 0,
      marginTop: '3vh'
    },
    footer:{
      height: '100%'
    }
  }),
);

const Footer:React.FC<NaviType> = ({theme}) => {
  const classes = useStyles();
  return (
    <footer className={classes.wrapfooter} >
    <AppBar className={classes.footer} position="static" color={theme === 'dark' ? 'primary' : 'secondary'}>
     best footer in the word
    </AppBar>
    </footer>
  );
}
export default Footer
