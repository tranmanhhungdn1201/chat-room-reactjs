let users = [];

const addUser = ({id, user, roomId}) => {
    const isUserExsited = users.find(ur => ur.user.name === user.name);
    if(isUserExsited) return;
    users.push({id, user, roomId});
    return { user }
}

const removeUser = (id) => {
    const index = users.findIndex(ur => ur.id === id);
    if(index === -1) return;
    users.splice(index, 1);
    return true;
}

const getUsersInRoom = (roomId) => {
    return users.filter(ur => ur.roomId === roomId);
}

module.exports = {addUser, removeUser, getUsersInRoom};