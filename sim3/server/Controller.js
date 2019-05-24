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
    
        session.user = user_login[0]
         
        res.status(200)

    },
    login: async (req,res)=>{
        const db = req.app.get('db')
        const {username} = req.body
        const {session} = req
        try {
            let user = await db.login({username})
            session.user = user[0]
            const authenticated = bcrypt.compareSync(req.body.password,user[0].password)

            if(authenticated) {
                res.status(200).send({authenticated,username,profile,userId})
            } else {throw new Error (401,'Error on login')}
        }catch(err) {res.sendStatus(401)}

    },
    getPost: ()=>{},
    createPost: ()=>{},
    getUser:()=>{}

}