const jwt = require('jsonwebtoken')

const auth = async(req,res,next)=>{
  // ! here we are intercepting the headers being sent from the frontend along with the JWT(token)
    const authHeader = req.headers.authorization;
    console.log(authHeader)

    if(!authHeader || !authHeader.startsWith('Bearer')){
      //  throw new Error('Authentication invalid')
      return res.status(500).json({message:"auth header not found"})
    }

    // ! this is to just extract the token and remove the word Bearer
    
    const token = authHeader.split(' ')[1]
    
    try {
        // ! this is the verification part.
        
    
        
        const payload = jwt.verify(token,process.env.JWT_SECRET);
        console.log(payload);
        

        // ! here we create a new property user on the request object. Although I have not used it in this project.
        // ! this will open great possibilities for us when we want to show the current logged in user
        // ! or let's say we are making a blog application and we want to separate persmissions between the admin and the normal user
        req.user = {userId:payload.userId,name:payload.user.name}
        
        // ! the interesting part here is that this req.user will be available to the sales route!
        // ! like we are persisting our token across routes. this fascinates me so much!
        next() // ! move on to the next middleware
    } catch (error) {

      // throw new Error('invalid token');

       return res.status(500).json({message:error.message})
    }
}

module.exports = auth;