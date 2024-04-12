import "dotenv/config"

const PORT = process.env.PORT || 3000
const DB_URI = process.env.DB_URI || 'localhost'
const DB_USER = process.env.DB_USER || 'root'
const DB_PASS = process.env.DB_PASSWORD || '123'
const DB_PORT = process.env.DB_PORT || 5432

export default {
  DB: {
    URI: DB_URI,
    PORT: DB_PORT,
    USER: DB_USER,
    PASS: DB_PASS
  },
  PORT: PORT
}