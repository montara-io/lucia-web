import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import { createRoot } from 'react-dom/client';
import { IntlProvider } from 'react-intl';
import App from './App';

// In order moment to support multiple languages we need to import them
import English from './lang/en.js';
import reportWebVitals from './reportWebVitals';

const locale = navigator.language;
const lang = English;
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <IntlProvider
    locale={locale}
    messages={lang}
    onError={(e) => console.warn(e)}
  >
    <App />
  </IntlProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
