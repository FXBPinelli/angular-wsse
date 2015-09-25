# angular-Wsse

This is an angular service to help generate a WSSE Header for API calls.

## Installation

1. bower : `bower install angular-wsse`
2. Modify your application to include `wsseservice` in your application dependencies.

This Service uses CryptosJS (https://code.google.com/p/crypto-js/) to encode and decode things (SHA1, SHA512, Base64, Utf8).


## How to use it

To generate a wsse header you will need the encoded password and the username.
You can generate the encoded password with :
`wsseservice.generateEncodedPassword(password, salt, iteration);`

* password : the plain password given by the user.
* salt : the salt used to encode the password.
* iteration : the number of iteration needed to encode the password (set in the parameters in Symfony2 for instance).

When you have the encoded password you just need to do :
`wsseservice.getWSSEHeader(username, password);`

This will give you a string looking like this : `UsernameToken Username="admin", PasswordDigest="u/TRqCu7nXjZRA5sX7bC5NZodsQ=", Nonce="NDM2YTYxZjVkMTA2YmE3MQ==", Created="2015-06-10T15:07:47Z"`

You will need so set in the X-WSSE header.


## Using

### Methods

1. `wsseservice.generateCreatedDate()` - Return current date in ISO format.
2. `wsseservice.generateNonce()` - Return a random Nonce.
3. `wsseservice.generateEncodedPassword(password, salt, iteration)` - Return the encoded password. Based on SymfonY2 password encoding.
4. `wsseservice.generatePasswordDigest(nonce, createdDate, encodedPassword)` - Return the SHA1 encoded password digest created with the Nonce and the createdDate.
5. `wsseservice.getWSSEHeader(username, password)` - Return the WSSE string you need for the header.


## License

This project is released over MIT License