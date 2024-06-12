const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('users.db');

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  age INTEGER NOT NULL
)`)

module.exports = {
  async getUsers() {
    const users = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) reject(err)
        else resolve(rows)
      })
    })
    
    return users
  },

  async getUser(id) {
    const user = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE id = ?', [id], (err, rows) => {
        if (err) reject(err)
        else resolve(rows)
      })
    })

    return user
  },

  async deleteUser(id) {
    const changes = await new Promise((resolve, reject) => {
      db.run('DELETE FROM users WHERE id = ?', [id], function (err) {
        if (err) reject(err)
        else resolve(this.changes)
      })
    })

    return changes > 0
  },

  async createUser(user) {
    const lastID = await new Promise((resolve, reject) => {
      db.run('INSERT INTO users (name, age) VALUES (?, ?)', [user.name, user.age], function (err) {
        if (err) reject(err)
        else resolve(this.lastID)
      })
    })

    return {id: lastID, ...user}
  },

  async updateUser(id, updatedData) {
    const changes = await new Promise((resolve, reject) => {
      db.run('UPDATE users SET name = ?, age = ? WHERE id = ?', [updatedData.name, updatedData.age, id], function (err) {
        if (err) reject(err)
        else resolve(this.changes)
      })
    })

    if (changes === 0) return null
    return this.getUser(id)
  }

}