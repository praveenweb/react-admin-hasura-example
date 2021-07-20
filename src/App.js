import React, {useState, useEffect} from 'react';

// admin
import { Admin, Resource } from 'react-admin';
import buildHasuraProvider from 'ra-data-hasura';

// components
import Dashboard from './components/Dashboard';
import LoginPage from './pages/login';
import { ProductList, ProductCreate } from "./pages/products";

// utils
import authProvider from './utils/authProvider';
import { auth0 } from "./utils/authProvider";

import { ApolloClient, InMemoryCache } from '@apollo/client';

// browser history
import { createBrowserHistory as createHistory } from 'history';
const history = createHistory();

const createApolloClient = async (token) => {
    return new ApolloClient({
        uri: 'https://offline-first.hasura.app/v1/graphql',
        cache: new InMemoryCache(),
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
}

const App = () => { 
    const [dataProvider, setDataProvider] = useState({});
    useEffect(() => {

        const buildDataProvider = async () => {

          const token = await auth0.getIdTokenClaims();
          const idToken = token.__raw;
          const apolloClient = await createApolloClient(idToken);
          const dataProvider = await buildHasuraProvider({
            client: apolloClient
          });

          setDataProvider(() => dataProvider);

        };
        buildDataProvider();
      }, []);
    
    if(typeof dataProvider !== 'function') {
        return <div>Loading...</div>
    }
    return (
        <Admin authProvider={authProvider} dataProvider={dataProvider} loginPage={LoginPage} history={history} dashboard={Dashboard}>
            <Resource name="products" list={ProductList} create={ProductCreate}></Resource>
        </Admin>
    );
};
export default App;
