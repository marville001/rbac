
module.exports = {
    loginUser: (req, res)=>{
        res.send("Logging in user")
    },
    addUser: (res, req)=>{
        res.send("Adding user")
    },
    updateUser: (res, req)=>{
        res.send("Updating user")
    }
}
