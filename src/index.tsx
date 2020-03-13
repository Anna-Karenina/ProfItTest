import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { default as Navibar } from './components/Navibar/Navibar';
import PageWrapper  from './components/PageWrapper';
import Footer from './components/Footer/Footer';
import { ThemeProvider } from '@material-ui/core/styles';
import { themeSwitcher } from './theme';

const App: React.FC = () => {
  const [theme, setTheme] = React.useState('dark')
  return (
    <div className="App">
      <Navibar theme = {theme} setTheme={setTheme} />
      <PageWrapper theme = {theme}/>
      <Footer theme = {theme}/>
    </div>
  );
}

ReactDOM.render(
  <ThemeProvider theme={themeSwitcher}>
    <App />
  </ThemeProvider>, 
  document.getElementById('root'));

