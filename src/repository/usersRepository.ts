/* ce fichier permet de centraliser toutes les methodes
qu'on peut utilser sur users
exemple getById, getAll, create etc */


import { queryAll, queryOne, queryExecute } from '../database/queryWrapper'
import { User } from '../models/userModel' //importer l'interface user

// Retourne tous les utilisateurs de la table users
export function getAll() {
	return queryAll('SELECT * FROM users')
}

export function getById(id: string | number){
    return queryOne('SELECT * FROM users WHERE id = ?', [id])
}


// Création d'un utilisateur OAuth avec gestion de l'unicité
export async function createUser({ provider, providerId, username }: { provider: string, providerId: string, username: string }): Promise<User> {
    try {
        const result = await queryExecute(
            'INSERT INTO users (provider, providerId, username) VALUES (?, ?, ?)',
            [provider, providerId, username]
        );
        return {
            id: result.lastInsertRowid as number,
            provider,
            providerId,
            username,
        };
    } catch (err: any) {
        console.log(err)
        if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            throw new Error('User with this provider/providerId already exists');
        }
        throw err;
    }
}
