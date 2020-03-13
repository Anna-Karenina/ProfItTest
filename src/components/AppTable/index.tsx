import * as React from 'react';
import MaterialTable, {MTableToolbar, MTablePagination} from 'material-table'
import { NaviType, IUsers } from 'src/types';
import { blueGrey } from '@material-ui/core/colors';

type TableProps = {
  theme: NaviType["theme"]
  usersOnPage: IUsers[]
}

const styled = {

}
const  TableApp:React.FC<TableProps > = ({theme ,usersOnPage }) => {
  const [selectedRow, setSelctedRow] = React.useState(null)
  const [localUsersState,setLocalUsersState ] = React.useState(null)

  React.useEffect(()=>{
    setLocalUsersState(usersOnPage)
  },[usersOnPage])

  const setColorOfSelctedRow = (rowData:any , color: number) =>{
    if(selectedRow === null) {
      return blueGrey[color]
    }
    else{
      if(selectedRow.selectedRow.tableData.id === rowData.tableData.id){
        return blueGrey[color]
      }
      else {blueGrey[color -200]}
    }
  }


function keyPress(event){
  if(event.key === 27 || 'Escape'){
    setSelctedRow(null)
  }
  document.removeEventListener('keydown', keyPress)
}
function checkRow(selectedRow){
  document.addEventListener('keydown', keyPress)
  setSelctedRow( {selectedRow} )
  
}

  return (
    usersOnPage === undefined || usersOnPage === null || usersOnPage.length === 0 ? <div>Loading</div> :
    <MaterialTable
      title="Табличный компонент на базе react"
      components={{
        Toolbar: props => (
        <div style = {theme === 'dark'? {
          backgroundColor: blueGrey[800],
          color: '#fafafa' }: { backgroundColor: blueGrey[100]}
          }>
        <MTableToolbar {...props} />
        </div>
        ),
        Pagination:props=>(
          <div style = {theme === 'dark'? {
            backgroundColor: blueGrey[800],
            color: '#fafafa' }: { backgroundColor: blueGrey[100]}
            }>
              <MTablePagination {...props} />
          </div>
        )
        }}
      columns={[
        { title: 'id', field: 'id' },
        { title: 'First name', field: 'firstName' },
        { title: 'Last name', field: 'lastName' },
        { title: 'Email', field: 'email' },
        { title: 'Phone', field: 'phone' },
      ]}
      data={localUsersState === null  ? undefined : localUsersState }        
      options={{
        headerStyle: {
          backgroundColor: theme === 'dark' ? blueGrey[700] : blueGrey[200],
          color: '#FFF'
        },
        
        rowStyle: rowData =>({ 
          backgroundColor: theme === 'dark' ? setColorOfSelctedRow(rowData , 600) : setColorOfSelctedRow(rowData , 200),
          color: '#FFF' 
        }),
        searchFieldStyle:{
          fontStyle: 'italic',
          color: theme === 'dark' ? '#fafafa' : '#333',
          backgroundColor: blueGrey[200]
        },
        paginationType:'stepped',
        addRowPosition: 'first'
      }}
      onRowClick={((evt, selectedRow) =>  checkRow(selectedRow)  )}
      editable={{
        onRowAdd: newData =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve()
                newData.id = +newData.id
                const data = localUsersState;
                data.push(newData);
                console.log(data)
                console.log(newData)
                setLocalUsersState([...data]);
            }, 1000)
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              {
                const data = localUsersState;
                const index = data.indexOf(oldData);
                data[index] = newData;
                setLocalUsersState([...data]);
              }
              resolve()
            }, 1000)
          }),
        onRowDelete: oldData =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve()
                let data = localUsersState;
                data.splice(data.indexOf(oldData), 1);
                setLocalUsersState([...localUsersState ]);
            }, 1000)
          }),
      }}
      localization={{
        body:{
          emptyDataSourceMessage: 'Нету данных',
          addTooltip:'Добавить',
          deleteTooltip:'Удалить',
          editTooltip:'Редактировать',
          editRow:{
            deleteText:'Удалить эту строчку',
            cancelTooltip:'Отменить',
            saveTooltip:'Сохранить'
          },
        },
        toolbar:{
          searchTooltip:'Найти',
          searchPlaceholder:'Найти'
        },
        pagination:{
          labelDisplayedRows: '{from}-{to} из {count}'
        }
      }}
    />
  )
}




export default TableApp