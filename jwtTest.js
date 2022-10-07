const { JsonWebTokenError } = require('jsonwebtoken')
const jwt = require('jsonwebtoken')

 //3 parts (header, )

 const jwtTest = () => {
    try{
        // create a jwt payload -- the data that is encoded 
            const payload = {
                // PUBLIC user information
                // DO NOT put the password in the payload.
                name:'weston',
                id: '1234',
                email: 'w@b.com'
            }
        // 'sign' jwt by supplying a secret to hash in the signature
            const secret = 'my super big secret'
        // jwt.sign({ payload to encode}, 'secret to create signature', { options }) options could be {expiresIn: 1000}
            const token = jwt.sign(payload, secret)
            console.log(token)

        // HEAD (specifies encoding standard for the jwt):
            // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9. 
        // PAYLOAD (encoded data) :
            // eyJuYW1lIjoid2VzdG9uIiwiaWQiOiIxMjM0IiwiZW1haWwiOiJ3QGIuY29tIiwiaWF0IjoxNjY1MDgyMzQ5fQ.
        // SIGNATURE (hash of the payload and secret):
            // 9KutjM3oxruOY3kT5dkjFTN2LW8aFLao-Sdn-mjiPl4


        // signing a token will log a user in
        // jwt.verify(token, 'secret') -- throws and error if it cannot verify (otherwise returns decoded data to us)
            const decode = jwt.verify(token, secret)

        // when we decode jwts we will check the signature to make sure the user's login is valid, this authorizes the user
            console.log(decode)
    }catch(err){
        console.log(err)
        //LOG USER OUT
    }
 }

 jwtTest();