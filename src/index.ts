import Fastify from 'fastify'
import cors from '@fastify/cors'
import { initDatabase, checkDatabaseHealth, initTables } from './database'
import { success, errorResponse} from "./utils/response";
import v1Routes from './routes/v1'
import { errorHandler, notFoundHandler} from './utils/ErrorHandler'
import fastifyCors from '@fastify/cors';

// Create a Fastify server instance with logging enabled
const server = Fastify({
  logger: true
})
server.register(cors, {
origin: '*'

})

// Start the server
const start = async () => {
  try {
    // Initialize database and tables before starting the server
    initDatabase()
    if (!checkDatabaseHealth()) {
      console.error('Database integrity check failed')
      process.exit(1)
    }
    initTables()
    // Listen on port 3000, accessible from any network interface
    await server.listen({ port: 3000, host: '0.0.0.0' })
    console.log('🚀 Server started on http://localhost:3000')
  } catch (err) {
    // Log error and exit if server fails to start
    server.log.error(err)
    process.exit(1)
  }
}

server.register(v1Routes, { prefix: '/api/v1' })
server.setErrorHandler(errorHandler) // si fastify catch une erreur il utilise mon handler

server.setNotFoundHandler(notFoundHandler) //catch les erreurs route inexistante
// Execute the start function
start()