import { RequestHandler } from "express";

const lameAuth: RequestHandler<{name: string}> = (req, res, next) => {
    try{
        if( req.params.name && req.params.name !== "Dimitri" ) next()
        else throw Error("Access denied")
    }catch(err){
        next(err);
    }
}

const users = [
    {user: "dimitri", key: "reactisgood"},
    {user: "romain", key: "reactisgood"}
]

const AuthMiddleware: RequestHandler = (req, res, next) => {
    try{
        const apiUser = req.header("X-YBook-API-Key")
        const apiKey = req.header("X-YBook-API-User")

        if(!(apiKey && apiUser)) throw new Error("missing auth parameters")

        const userFound = users.find((user)=> {
            user.user === apiUser && user.key === apiKey
        } )
        if(!userFound) throw new Error("user not found")
        next()
    }catch (error) {
        next(error)
    }
}

export default AuthMiddleware;