import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import VueApollo from 'vue-apollo'
import Vue from 'vue'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
const prodConfig = {
  GQL_URL: 'https://hasura.ubuapp.in/v1/graphql',
  WS_GQL_URL: 'wss://hasura.ubuapp.in/v1/graphql',
}

const testConfig = {
  GQL_URL: 'http://localhost:8080/v1/graphql',
  WS_GQL_URL: 'ws://localhost:8080/v1/graphql',
}

const getHeaders = () => {
  const headers = {}
  const token = window.localStorage.getItem('jwt')
  const role = window.localStorage.getItem('salon_role')
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  if (role) {
    headers.role = role
  }
  return headers
}

Vue.use(VueApollo)

const httpLink = createHttpLink({
  uri:
    process.env.NODE_ENV == 'production'
      ? prodConfig.GQL_URL
      : testConfig.GQL_URL,
  headers: getHeaders(),
})

const wsLink = new WebSocketLink({
  uri:
    process.env.NODE_ENV == 'production'
      ? prodConfig.WS_GQL_URL
      : testConfig.WS_GQL_URL,

  options: {
    reconnect: false,
    reconnectionAttempts: 5,
    connectionParams: {
      headers: getHeaders(),
    },
  },
})

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  httpLink
)

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  connectToDevTools: process.env.NODE_ENV !== 'production',
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

export default function apolloPlugin(ctx, inject) {
  ctx.app.apolloProvider = apolloProvider
  inject('apollo', apolloProvider)
}
