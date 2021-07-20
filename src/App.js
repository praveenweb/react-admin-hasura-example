import React, {useState, useEffect} from 'react';

import { ApolloClient, InMemoryCache } from '@apollo/client';

// react admin
import { Admin, Resource } from 'react-admin';
import buildHasuraProvider from 'ra-data-hasura';

// pages
import { ProductList, ProductCreate } from './pages/products';
import LoginPage from "./pages/login";

// components
import Dashboard from './components/Dashboard';
import authProvider from './utils/authProvider';

import { auth0 } from "./utils/authProvider";

// browser history
import { createBrowserHistory as createHistory } from 'history';
const history = createHistory();

const apolloClient = async (token) => {
    return new ApolloClient({
        uri: 'https://offline-first.hasura.app/v1/graphql',
        cache: new InMemoryCache(),
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
};

const App = () => { 
    const [dataProvider, setDataProvider] = useState({});
    useEffect(() => {
        const buildDataProvider = async () => {
            const isAuthenticated = await auth0.isAuthenticated();
            if(!isAuthenticated) {
                return;
            } else {
                const token = await auth0.getIdTokenClaims();
                console.log(token.__raw);
                const client = await apolloClient(token.__raw)
                const dataProvider = await buildHasuraProvider({
                    client: client
                });
                console.log(dataProvider)
                setDataProvider(() => dataProvider);
            }
          };
        buildDataProvider();
    },[])

    if(typeof dataProvider !== 'function') {
        // return <div>Loading...</div>
    }

    console.log(dataProvider);

    return (
    <Admin
        authProvider={authProvider}
        dataProvider={dataProvider}
        history={history}
        dashboard={Dashboard}
        loginPage={LoginPage}
    >
        <Resource
          name="products"
          list={ProductList}
          create={ProductCreate}
        />
    </Admin>
)};
export default App;
