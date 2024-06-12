const users = []
let currentId = 1

module.exports = {
  createUser: (user) => {
    user.id = currentId++
    users.push(user)
  },
  updateUser: (id, updatedData) => {
    const userIndex = users.findIndex(u => u.id === id)
    
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updatedData }
      return users[userIndex]
    }
    
    return null
  },
  deleteUser: (id) => {
    const userIndex = users.findIndex(u => u.id === id)
    
    if (userIndex !== -1) {
      users.splice(userIndex, 1)
      return true
    }
    
    return false
  },
  getUser: (id) => users.find(u => u.id === id),
  getUsers: () => users
}