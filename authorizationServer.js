

const express = require("express")
const app = express()
const { auth } = require('express-oauth2-jwt-bearer');

const ipAddress = "127.0.0.1"

const jwtCheck = auth({
    audience: 'http://localhost:3000',
    issuerBaseURL: 'https://dev-mdivrtu5p55rd76v.us.auth0.com/',
    tokenSigningAlg: 'RS256'
  });

  
  // enforce on all endpoints
//  app.use(jwtCheck);

app.get("/public", (req,res)=>{
   return res.status(200).json({
        data:"this is public"
    })
})

//const scope = requiredScopes('read:profile');

app.get("/private", jwtCheck, (req,res)=>{
  //  res.send("good")
   return res.status(200).send(`
  <div>
  </div><br><br>
  <div>
  PRODUCT1:<br>
  nameOfProduct:  "Orange Shirt"<br>
  price:  "D200"<br>
  imageUrl:  <a href="http://${ipAddress}:5000/images/j1.jpg">orangeshirt</a><br><br>
</div>
<div>
PRODUCT2:<br>
  nameOfProduct:  "Yellow Shirt"<br>
  price:  "D300"<br>
  imageUrl: <a href="http://${ipAddress}:5000/images/j2.jpg">yellowshirt</a><br><br>
</div>
<div>
PRODUCT3:<br>
  nameOfProduct:  "Red Shirt"<br>
  price:  "D400"<br>
  imageUrl: <a href="http://${ipAddress}:5000/images/j3.jpg">redshirt</a><br>
</div>
    `)

})



app.listen(3000,()=>{
    console.log('server is running on port 3000');
})