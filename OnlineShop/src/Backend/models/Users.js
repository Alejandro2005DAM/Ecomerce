import mongoose from "mongoose"
import hashing from 'bcrypt'
const structure= new mongoose.Schema({
      
    username: {
        type : String , 
        required: true, 
        unique: true
    },

    email: {
        type : String, 
        required: true, 
        unique: true },
    
    password: {
        type : String ,
        required: true,
        unique: true}
    
    // orderId: {
    //     type: String,
    //     unique: true,
    // }
    
},
    {timestamps: true}
)
// Para encriptar la contraseña

structure.pre('save',async function () {
    if(!this.isModified('password')) return
    const encrypt= await hashing.genSalt(10)
    this.password = await hashing.hash(this.password,encrypt)
    
})



structure.methods.matchpassword= async function (pwd){

    return await hashing.compare(pwd,this.password)

}
structure.methods.matchemail= function(dir){

    return dir===this.email
}


const Users= mongoose.model('User',structure)


export default Users