//Authetication-identify karna ki user kaun h,kisne request bheji h,authorization-ye identify karne ke baad ye check karna ki user ko ye resource access karne ki permission h ya nhi

//authorization =user kya kya kar skta h
//Validation=data jo h ,uska format check karna

//verification=data to hoga ,but wo shi h ya nhi
//first step-user a data store karna h

require('dotenv').config();
const connectToDB=require('./src/config/database');
const app = require('./src/app');

connectToDB();
app.listen(3000,()=>{
    console.log("server is running on port 3000");
})