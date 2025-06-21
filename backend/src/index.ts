import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import express, { Request } from 'express'
import jwt from 'jsonwebtoken'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'
import { Server as SocketServer } from 'socket.io'
import { typeDefs } from './schema'
import { resolvers } from './resolvers'
import { prisma } from './context'

const PORT = 4000
const JWT_SECRET = 'secret'

function decodeToken(token: string): string | undefined {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string }
    return decoded.userId
  } catch {
    return undefined
  }
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })

;(async () => {
  await apolloServer.start()

  const app = express()
  app.use(cors())
  app.use(bodyParser.json())

  app.use(
    '/graphql',
    expressMiddleware(apolloServer, {
      context: async ({ req }: { req: Request }) => {
        const authHeader = req.headers.authorization || ''
        const userId = decodeToken(authHeader.replace('Bearer ', ''))
        return { prisma, userId }
      },
    })
  )

  const httpServer = http.createServer(app)
  const io = new SocketServer(httpServer, {
    cors: { origin: '*' },
  })

  io.on('connection', (socket) => {
    console.log('✅ Client connected')

    socket.on('join-event', async (eventId: string) => {
      try {
        const event = await prisma.event.findUnique({
          where: { id: eventId },
          include: { attendees: true },
        })

        io.emit(`event-updates-${eventId}`, event?.attendees || [])
      } catch (err) {
        console.error('Socket error:', err)
      }
    })

    socket.on('disconnect', () => {
      console.log('❌ Client disconnected')
    })
  })

  httpServer.listen(PORT, () => {
    console.log(`🚀 Server listening at http://localhost:${PORT}/graphql`)
  })
})()
