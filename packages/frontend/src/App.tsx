import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { ThemeProvider } from 'styled-components';
import Main from './components/Main/Main';
import { BACKEND_URL } from './consts';

import GlobalStyle from './styles/globalStyles';
import { theme } from './styles/Theme';

const App = () => {
  const errorLink = onError(
    ({ graphQLErrors }) =>
      graphQLErrors && graphQLErrors.forEach((err) => console.error(err))
  );

  const httpLink = createHttpLink({
    uri: BACKEND_URL,
    credentials: 'include',
  });

  const getApolloClient = () => {
    const link = ApolloLink.from([errorLink, httpLink]);
    const client = new ApolloClient({
      uri: BACKEND_URL,
      cache: new InMemoryCache(),
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'no-cache',
        },
      },
      link,
    });

    return client;
  };

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ApolloProvider client={getApolloClient()}>
          <GlobalStyle />
          <Main />
        </ApolloProvider>
      </ThemeProvider>
    </div>
  );
};

export default App;
