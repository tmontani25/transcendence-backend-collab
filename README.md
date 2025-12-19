# transcendence-backend-collab

broton and tmontani's work on the backend of the ft_transcendance project

our approach is to start with a minimal and fonctional backend and to add features along the way.

# Backend Transcendence

## Stack
- Node.js
- Fastify
- SQLite
- Docker (Inception)

## Installation
npm install
npm run dev

## Base de données
- SQLite
- Fichier : database.sqlite
- Tables : users, tournaments, tournament_players, matches

## API (MVP)
GET    /api/v1/ping
GET    /api/v1/tournaments/:id/players
GET    /api/v1/tournaments/:id/matches
POST   /api/v1/tournaments/:id/players
DELETE /api/v1/tournaments/:id/players/:userId
POST   /api/v1/matches
POST   /api/v1/matches/:id/result
GET    /api/v1/tournaments/:id/bracket

## Conventions
- Réponses succès : { data: ... }
- Réponses erreur  : { error: { code, message } }

## Dev
- Une feature = une branche
- Validation via Postman

