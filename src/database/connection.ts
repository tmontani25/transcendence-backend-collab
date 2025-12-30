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

//Fonction 2 gets the database
export const getDatabase = (): Database.Database => {
  if (!db) {
    return initDatabase()
  }
  return db
}

//Fonction 3 : check the database
export const checkDatabaseHealth = (): boolean => {
  //check if the database is ok : sqlite responds, db is accesible, structure ok
  const dbtemp = getDatabase();
  // on a la db
  
  try {
    const raw = dbtemp.pragma("integrity_check");
    console.log(raw);

  const value = raw as {integrity_check: string}[]
  if (value.length <= 0)
      return false;
  if (value[0].integrity_check !== "ok")
    return false;
} catch(err){
  if(err instanceof Error)
    console.log(err.message)
  else
    console.log("Unknown error during DB health check", err);
  return false;
}

  return true;
}
