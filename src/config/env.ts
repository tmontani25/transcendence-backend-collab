//general config file contains general information (works like a .h file in c)
export const config = {
    database: {
        path: process.env.DB_PATH || './data/transcendence.db' 
    }
} as const

