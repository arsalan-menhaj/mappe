// This file contains a function that contains helper functions
// for user authentication/authorization. Receives knex database
// connection object as argument

const bcrypt = require('bcrypt');

module.exports = function(knex) {

  function find(id) {
    return new Promise((resolve, reject) => {
      knex('users')
      .select('*')
      .where({id: id})
      .limit(1)
      .then((rows) => {
        user = rows[0]
        if (user) {
          return resolve(user)
        }
        else {
          return reject()
        }
      })
      .catch((error) => reject(error));
    })
  }


  function findByUser(username) {
    return new Promise((resolve, reject) => {
      knex('users')
      .select('*')
      .where({username: username})
      .limit(1)
      .then((rows) => {
        user = rows[0]
        return resolve(user)
      })
      .catch((error) => reject(error));
    })
  }


  // Checks username uniqueness. Triggers .catch if username exists
  // (In essence it's the opposite of findByUser)
  function checkUserUniqueness(username) {
    return new Promise((resolve, reject) => {
      findByUser(username)
      .then((user) => {
        if (user) {
          console.log('user already exists');
          return reject({
            type: 409,
            message: 'username has already been used'
          })
        }
        else {
          return resolve(username)
        }
      })
    })
  }


  function authenticate(username, password) {
    return new Promise((resolve, reject) => {
      findByUser(username)
      .then((user) => {
        if (!user) {
          return reject({
            type: 409,
            message: 'bad credentials'
          })
        }
        bcrypt.compare(password, user.password_digest)
        .then((passwordsMatch) => {
          if (passwordsMatch) {
            return resolve(user)
          }
          else {
            // If the passwords don't match, return a rejected promise with an
            // error.
            return reject({
              type: 409,
              message: 'bad credentials'
            })
          }
        })
      })
      .catch((error) => reject(error));
    })
  }


  function add(username, password) {
    return (
      checkUserUniqueness(username) // First check if username already exists
      .then((username) => {
        return bcrypt.hash(password, 10);
      })
      .then((passwordDigest) => {
        return knex('users').insert({
          username: username,
          password: passwordDigest
        })
      })
    )
  }


  function update(id, newUser, newPassword) {
    // We have multiple promises running here, so we'll use a slightly
    // different tecnique with Promise.all
    let promises = []

    // If the username needs to be updated, we need to check for uniqueness
    if (newUser) {
      promises.push(checkUserUniqueness(newUser))
    }
    else {
      promises.push(Promise.resolve(false))
    }

    // If the password needs to be updated, we must encrypt it
    if (newPassword) {
      promises.push(bcrypt.hash(newPassword, 10))
    }
    else {
      promises.push(Promise.resolve(false))
    }

    // Now we run all promises and get .then results in an array
    // If anything breaks, .catch will be called
    return Promise.all(promises).then((usernameAndPasswordDigest) => {
      const username = usernameAndPasswordDigest[0]
      const passwordDigest = usernameAndPasswordDigest[1]

      const updatedUser = {}
      if (username) updatedUser.username = username
      if (passwordDigest) updatedUser.password_digest = passwordDigest

      return knex('users')
      .update(updatedUser)
      .where({id: id})
    })
  }


  return {
    find: find,
    findByUser: findByUser,
    authenticate: authenticate,
    add: add,
    update: update,
    checkUserUniqueness: checkUserUniqueness
  }
}