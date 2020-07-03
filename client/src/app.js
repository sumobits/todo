/**
 * @format
 */
import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
import Config from 'react-native-config';
import MainContainer from './containers/main';
import { NavigationContainer } from '@react-navigation/native';

const endpoint = (Config.GRAPHQL_ENDPOINT || 'http://127.0.0.1:3000/graphql');

const client = new ApolloClient({ uri: endpoint });

const App = () => {
  return (
    <ApolloProvider client={client}>
        <NavigationContainer>
          <MainContainer />
        </NavigationContainer>
    </ApolloProvider>
  );
};

export default App;
