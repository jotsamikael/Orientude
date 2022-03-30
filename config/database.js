const crypto = require('crypto').randomBytes(64).toString('hex');
//const crypto = Buffer.from("mysecret").toString('base64');
     


module.exports = {
    uri: 'mongodb://localhost:27017/db-orientude',
    secret: crypto,
    db: 'db-orientude'
}