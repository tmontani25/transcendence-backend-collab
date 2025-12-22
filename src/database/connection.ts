import Database from 'better-sqlite3' //import class and functions from this package
import { config } from '../config/env' //import general config
import { existsSync, mkdirSync } from 'fs'
import { dirname } from 'path'

// Variable globale qui stocke la connexion
let db: Database.Database | null = null

export const initDatabase = (): Database.Database => {
  if (db) {
    return db
  }
    //creates data folder if it doesn't exist 
    const folder = dirname(config.database.path)
  if (!existsSync(folder)){
    mkdirSync(folder, { recursive: true })
  }
    db = new Database(config.database.path)
    db.pragma('foreign_keys = ON')
    return db
}

//Fonction 2 : Récupérer la DB
export const getDatabase = (): Database.Database => {
  if (!db) {
    return initDatabase()
  }
  return db

}

//Fonction 3 : Vérifier la santé de la DB
export const checkDatabaseHealth = (): boolean => {
  try {
    const database = getDatabase()
    const res = database.pragma('integrity_check')

    // Normalize result to a single string value
    let val: string | null = null
    if (Array.isArray(res)) {
      const first = res[0]
      if (first && typeof first === 'object') {
        const values = Object.values(first)
        val = values.length ? String(values[0]) : null
      } else {
        val = first != null ? String(first) : null
      }
    } else if (res && typeof res === 'object') {
      const values = Object.values(res)
      val = values.length ? String(values[0]) : null
    } else {
      val = res != null ? String(res) : null
    }

    return val === 'ok'
  } catch (err) {
    return false
  }
}