import jwt from 'jsonwebtoken'
// Middleware function to authenticate user using JWT tokens
function auth(req,res,next) {
    //Grab the 'Authorization' header from the incoming request 
    const header = req.headers.authorization
    // Check if the header exists and starts with 'Bearer ' (standard for JWT tokens)
    if(!header?.startsWith('Bearer ')){
        // if not, return an error response
        return res.status(401).json({error: "No Token"})
    }
// Extract the token from the header(everything after 'Bearer ')
    const token = header.split(' ')[1]
 
    try {
        // Verify the token using the secret key from environment variables
        // If the token is valid, jwt returns the decoded payload(user, info, etc)
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        // Attach the decoded user information to the request object for use in the next middleware or route handler
        req.user = decoded
        // Proceed to the next middleware or route handler
        next()
    }
    catch (err){
        // If the token verification fails(expired, invalid, tampered), log the error and return an unauthorized response
       console.error(err.message)
       return res.status(401).json({error: "Invalid Token"})
    }
}

export default auth