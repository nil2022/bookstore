const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/users.model')
const authConfig = require('../configs/auth.config')
const { userRegistrationValidation, userLoginValidation } = require('../helpers/validation')

const SALT_ROUNDS = 10
// Compared against when the userId doesn't exist, so response time doesn't reveal valid userIds
const DUMMY_HASH = bcrypt.hashSync('timing-attack-protection', SALT_ROUNDS)

/* -------- SIGNUP API----------- */
exports.signup = async (req, res) => {
    const { error, value } = userRegistrationValidation.validate(req.body);
    if (error) return res.status(400).json({
      status : false,
      message: error.details[0].message
    })

    const { username, userId, password, email } = value

    try {
        const userObj = {
            username: username,
            userId: userId,
            password: await bcrypt.hash(password, SALT_ROUNDS),
            email: email
        }

        const userCreated = await User.create(userObj)
        const postResponse = {
            name: userCreated.username,
            userId: userCreated.userId,
            email: userCreated.email,
            createdAt: userCreated.createdAt
        }
        console.log({
            Message: 'User Created Successfully',
            Response: postResponse
          })
        res.status(201).send({
            Message: 'User Registered Success',
            UserData: postResponse
          })
    } catch (error) {
        // Duplicate userId / email (unique index)
        if (error.code === 11000) {
            return res.status(409).send({
                message: 'userId or email is already registered'
            })
        }
        console.log('Something went wrong while saving to DB', `${error.name}:${error.message}`)
        res.status(500).send({
        message: 'Some internal error while inserting the element'
    })
    }
}

/* -------- SIGNIN API----------- */
exports.signin = async (req, res) => {
    const { error, value } = userLoginValidation.validate(req.body)
    if (error) return res.status(400).json({
      status: false,
      message: error.details[0].message
    })

    try {
      const user = await User.findOne({ userId: value.userId })

      // Always run a bcrypt compare and return one generic error,
      // so neither the message nor the timing reveals whether the userId exists
      const passwordIsValid = await bcrypt.compare(
        value.password,
        user ? user.password : DUMMY_HASH
      )

      if (!user || !passwordIsValid) {
        console.log('Failed signin attempt')
        return res.status(401).send({
          message: 'Invalid userId or password'
        })
      }

      const token = jwt.sign({ userId: user.userId }, authConfig.secretKey, {
        algorithm: 'HS256',
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY || '7d' // 7 Days
      })

      const signInResponse = {
        name: user.username,
        userId: user.userId,
        email: user.email,
        role: user.role,
        accessToken: token
      }

      // No auth cookie on purpose: the client sends the token in the `token` header,
      // so there is no ambient credential a third-party site could ride on (no CSRF)
      res.status(201)
      .json({
        message: 'Signed in successfully!',
        Response: signInResponse
      })
    } catch (error) {
      console.log('Something went wrong during signin', `${error.name}:${error.message}`)
      res.status(500).send({
        message: 'Some internal error occured'
      })
    }
  }
