//mock database
let USERS = [{
    id: 0,
    username: "Karadoc",
    email: "karadoc@kaamelott.fr",
    location: "Chez tatan"
},{
    id: 1,
    username: "Arthur",
    email: "arthur@kaamelott.fr",
    location: "Chateau"
}]

read = (id = null)=>{
    if(id){
        return USERS.filter(u => u.id == id)[0]
    }else{
        return USERS
    }
}

delete_ = (id)=>{
    const user = read(id)
    if(user){
        USERS.splice(USERS.indexOf(user) ,1)
        return true
    }else{
        return false
    }
}

save = ({id = -1, username, email, location})=>{
    let updatedUser = {
        username,
        email,
        location
    }
    if(id == -1) {
        updatedUser.id = getMaxId() + 1
        USERS.push(updatedUser)
    }else{
        const user = read(id)
        if(user){
            updatedUser = {
                ...user, 
                ...{
                    location : (updatedUser.location ? updatedUser.location : user.location),
                    email : (updatedUser.email ? updatedUser.email : user.email),
                    username : (updatedUser.username ? updatedUser.username : user.username),
                }
            }
            USERS[USERS.indexOf(user)] = updatedUser
        }else{
            return false
        }
    }
    return updatedUser
}

getMaxId = ()=>{
    bigger = 0;
    for(var i=1; i<USERS.length;i++ ) { 
        if(USERS[i].id > bigger) {
            bigger = USERS[i].id;
        }
    }
    return bigger;
}

isUsedEmail = (email)=>{
    return USERS.filter(u => u.email == email).length > 0
}

module.exports = {
    read,
    save,
    delete_,
    tools:{
        getMaxId,
        isUsedEmail
    }
}