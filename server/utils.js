
// User constructor
// function User (id) {
//   this.id = id;
//   this.x = 0;
//   this.y = 1.6;
//   this.z = 5;
//   this.xrot = 0;
//   this.yrot = 0;
//   this.zrot = 0;
// }

// Create a user given the socket ID
function createUser(socketId) {
  const user = new User(socketId);
  console.log("USER", user);
  return user;
}

// When a user connects, send them a list of all of the existing users (minus themselves)
function getOtherUsers (users, id) {
  console.log("USERS", users);
  return users.filterNot(userData => userData.get('id') === id);
}

module.exports = {
  createUser,
  getOtherUsers
};
