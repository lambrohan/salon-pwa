import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import VueApollo from 'vue-apollo'
import Vue from 'vue'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { split } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'

const getHeaders = () => {
  const headers = {}
  const token = window.localStorage.getItem('jwt')
  if (token) {
    headers.Authorization = `Bearer ${token}`
  }
  return headers
}

Vue.use(VueApollo)

const httpLink = createHttpLink({
  uri: 'http://192.168.29.71:8080/v1/graphql',
  headers: getHeaders(),
})

const wsLink = new WebSocketLink({
  uri: 'ws://192.168.29.71:8080/v1/graphql',
  options: {
    reconnect: true,
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
  connectToDevTools: true,
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

export default function apolloPlugin(ctx, inject) {
  ctx.app.apolloProvider = apolloProvider
}
