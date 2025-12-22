import Fastify from 'fastify'
import { initDatabase, checkDatabaseHealth, initTables } from './database'

// Create a Fastify server instance with logging enabled
const server = Fastify({
  logger: true
})

// Health check route - returns "pong" when pinged
server.get('/ping', async (request, reply) => {
  return { message: 'pong' }
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

// Execute the start function
start()
