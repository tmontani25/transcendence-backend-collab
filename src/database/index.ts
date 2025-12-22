import { initDatabase, getDatabase, checkDatabaseHealth } from './connection'
import { initTables } from './init'

export { initDatabase, getDatabase, checkDatabaseHealth, initTables }

export default {
  initDatabase,
  getDatabase,
  checkDatabaseHealth,
  initTables,
}
