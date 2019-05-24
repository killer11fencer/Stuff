const bcrypt = require('bcryptjs')
module.exports = {
    register: async (req,res)=>{
        const db = req.app.get('db')
        const {username,password} = req.body
        const {session} = req
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password,salt)
        const user_login = await db.registerUser({
            username,
            hash
        })
    },
    login:()=>{},
    getPost: ()=>{},
    createPost: ()=>{},
    getUser:()=>{}

}