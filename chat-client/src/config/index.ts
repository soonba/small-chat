const appConfig = {
    env: process.env.NODE_ENV,
    appEnv: process.env.REACT_APP_ENV,
    graphqlUrl: process.env.REACT_APP_GRAPHQL_URL,
    graphqlSubscriptionUrl: process.env.REACT_APP_GRAPHQL_SUBSCRIPTION_URL,
    graphqlApiUrl: process.env.REACT_APP_GRAPHQL_API_URL,
    authApiUrl: process.env.AUTH_API_URL
};

export default appConfig;
