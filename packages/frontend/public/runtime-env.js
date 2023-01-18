window.__RUNTIME_CONFIG__ = window.location.host.includes('local')
  ? {
      REACT_APP_BACKEND_URL: 'http://localhost:3012',
      REACT_APP_AUTH_SERVICE_URL: 'https://local.getmontara.com',
      NODE_ENV: 'local',
    }
  : {
      REACT_APP_BACKEND_URL: 'https://apis.getmontara.com/bff/graphql',
      REACT_APP_AUTH_SERVICE_URL: 'https://apis.getmontara.com',
      NODE_ENV: 'prod',
    };
