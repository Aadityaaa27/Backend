const jwt=require("jsonwebtoken");

async function identifyUser(req,res,next){
    // Try cookie first (used by browser). Fall back to Authorization header for API clients.
    let token = null;
    if(req.cookies && req.cookies.token){
      token = req.cookies.token;
    }

    if(!token && req.headers && req.headers.authorization){
      const parts = req.headers.authorization.split(' ');
      if(parts.length===2 && parts[0].toLowerCase()==='bearer'){
        token = parts[1];
      }
    }

    if(!token){
      return res.status(401).json({ message: "token is not provided" });
    }

    let decoded=null;
    try{
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    }catch(err){
      return res.status(401).json({ message: "user is not authenticated" });
    }

    req.user = decoded;
    next();
};

module.exports = identifyUser;