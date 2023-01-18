window.__RUNTIME_CONFIG__ = window.location.host.includes('local')
  ? {
      REACT_APP_BACKEND_URL: 'http://localhost:3001',
      NODE_ENV: 'local',
    }
  : {
      REACT_APP_BACKEND_URL: 'https://apis.getmontara.com/bff/graphql',
      NODE_ENV: 'prod',
    };
