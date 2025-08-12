import jwt from 'jsonwebtoken'

function auth(req,res,next) {
    const header = req.headers.authorization
    if(!header?.startsWith('Bearer ')){
        return res.status(401).json({error: "No Token"})
    }

    const token = header.split(' ')[1]
 
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    }
    catch (err){
       console.error(err.message)
       return res.status(401).json({error: "Invalid Token"})
    }
}

export default auth