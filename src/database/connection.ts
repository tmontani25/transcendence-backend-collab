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
  if (!existsSync(folder)) {
    mkdirSync(folder, { recursive: true })
  }
    db = new Database(config.database.path)
    return db
}

// Fonction 2 : Récupérer la DB
//export const getDatabase = (): Database.Database => {
  // TODO: Ton code ici
//}

// Fonction 3 : Vérifier la santé de la DB
//export const checkDatabaseHealth = (): boolean => {
  // TODO: Ton code ici
//}