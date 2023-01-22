import { ThemeProvider } from 'styled-components';
import Main from './components/Main/Main';

import GlobalStyle from './styles/globalStyles';
import { theme } from './styles/Theme';

const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Main />
      </ThemeProvider>
    </div>
  );
};

export default App;
