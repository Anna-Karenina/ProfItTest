import * as React from 'react';

import { getUsers } from './../../api/axios';

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import { IUsers, NaviType } from 'src/types';

const TableApp = React.lazy(() => import('./../AppTable/'));

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      margin: '3vh 5vw'
    },
    paper:{ 
      width: '100%'
    }
  }),
);

const  Wrapper: React.FC<NaviType> = ({theme}) => {  
  const classes = useStyles();
  const [usersOnPage, setUsersOnPage]  = React.useState(null)
  const [hasError, setErrors] = React.useState(false);

  const fetchData = async () => {
    const response = await getUsers()
    const result =  response.filter((sameId:IUsers , index:number,self:any)=>
      index === self.findIndex((t:IUsers) => (
        t.id === sameId.id
      ))
    )
    setUsersOnPage(result)
  }

  React.useEffect(() => {
    fetchData();
  }, [setUsersOnPage,setErrors ]);

  return (
   <main className={classes.root}>
    <Paper className={classes.paper}>
    <React.Suspense fallback={<div>Loading...</div>}>
      <TableApp 
          theme = {theme}
          usersOnPage={usersOnPage}
        /> 
    </React.Suspense>
    </Paper>
  </main>
  );
}
export default Wrapper