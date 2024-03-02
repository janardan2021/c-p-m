import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
         type: String,
         required: true,
         unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true})

// userSchema.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password)
// }
// // This pre middleware will run every time before a user document is saved in th db.
// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) {
//         next()
//     }
//     const salt = await bcrypt.genSalt(10)
//     this.password = await bcrypt.hash(this.password, salt)
// })

// static signup method
userSchema.statics.signup = async function(email, password, name) {
    // Validation
   try {
    if (!email || !password ) {
        throw Error ('All fields must be filled')
    }
      
    const exists = await this.findOne({email})

    if (exists) {
        throw Error ('Email already exists')
    }

    const salt = await bcrypt.genSalt(10)

    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({email, password: hash, name})
    return user
   } catch (error) {
      throw Error('User sign up failed')
   }

    // const signedUpUser = {name: user.name, email: user.email, id: user._id}

    // return signedUpUser
}


// static login method
userSchema.statics.login = async function(email, password) {
    // Validaton
    try {
        if (!email || !password) {
            throw Error ('All fields must be filled')
          }
    
        const user = await this.findOne({email})
    
        if (!user) {
              throw Error('Incorrect email')
          } 
          
        const match = await bcrypt.compare(password, user.password)
    
        if (!match) {
            throw Error('Incorrect password')
        }
        return user
    } catch (error) {
        throw Error ('User log in failed')
    }
    // const loggedInUser = {name: user.name, email: user.email, id: user._id}

    // return loggedInUser
}

const User = mongoose.model("User", userSchema)

export default User;
