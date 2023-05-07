import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { createServer } from 'http'
import express from 'express'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import { PubSub } from 'graphql-subscriptions'
import { resolvers } from './graphql/resolvers'
import { typeDefs } from './graphql/typeDefs'
import * as dotenv from 'dotenv'
import { GraphQLContext, SubscriptionContext } from './utils/types'

///////////////////////////////////////////////////////////////////////////////////////

const main = async () => {
  // Create the schema, which will be used separately by ApolloServer and
  // the WebSocket server.
  const schema = makeExecutableSchema({ typeDefs, resolvers })

  // variales de entorno
  dotenv.config()

  // Create an Express app and HTTP server; we will attach both the WebSocket
  // server and the ApolloServer to this HTTP server.
  const app = express()

  const httpServer = createServer(app)

  // Create our WebSocket server using the HTTP server we just set up.
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql/subscriptions',
  })

  // Context parameters
  const prisma = new PrismaClient()
  const pubsub = new PubSub()

  const serverCleanup = useServer(
    {
      schema,
      context: async (ctx: SubscriptionContext): Promise<GraphQLContext> => {
        // ctx is the graphql-ws Context where connectionParams live
        const token = ctx.connectionParams.authToken
        return { token, prisma, pubsub }
      },
    },
    wsServer
  )

  // Set up ApolloServer.
  const server = new ApolloServer({
    schema,
    // csrfPrevention: true,
    plugins: [
      // Proper shutdown for the HTTP server.
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  await server.start()

  const corsOptions = {
    origin: process.env.BASE_URL,
    credentials: true,
  }

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(corsOptions),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }): Promise<GraphQLContext> => {
        let token = null
        const bearer = req?.headers?.authorization
        console.log("🚀 ~ file: index.ts:90 ~ context: ~ bearer", bearer)
        
        if (bearer.length > 10) {
          token = bearer.split(' ')[1]
        }
        return { token, prisma, pubsub }
      },
    })
  )

  // Now that our HTTP server is fully set up, we can listen to it.
  const port = process.env.PORT || 3003
  httpServer.listen( port, () => {
    console.log(
      `🚀 Server is now running on http://localhost:${port}/graphql 👍 💯 🇦🇷`
    )
  })
}
main()
