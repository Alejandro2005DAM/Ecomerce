import express, { response } from 'express'
import Users from '../models/Users.js'
import { User } from 'lucide-react'
import hashing from 'bcrypt'


const router= express.Router()



router.post('/register', async (req,res)=>{
    const {username,email,password}= req.body


  

    try {
    if(!username || !email || !password ){
        return res.status(400).json({
            message: 'Yo must complete de fields'
        })
    }

    const repeateduser= await Users.findOne({email})

    if(repeateduser){
        return res.status(400).json({
            message: 'this email exist'
        })
    }

    const newuser= Users.create({username,email,password}) 
        res.status(200).json({
            id: newuser._id,
            email: newuser.email,
            username: newuser.username
        })     

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'error'
        })
    }
    
})



router.post('/login', async(req,res)=>{

const {email,password}= req.body



try {
    if ( !email || !password ){
        return res.status(400).json({
            message: 'Yo must complete de fields'
        })
    }

    const user= await Users.findOne({email})

    if(!(await user.matchpassword(password))){
        return res.status(400).json({
            message: 'password doesn`t match'
        })
    }

    res.status(200).json({
        id: user._id,
        email: user.email,
        username:  user.username
    })
} catch (error) {
    console.log(error)
     return res.status(500).json({
        message: 'error'
    })
}

})


router.delete('/delete',async function(req,res){


    try {
    const{email}=req.body

    // if(!email){
    //     res.status(400).json({
    //         message: 'not authenticathed'
    //     }
    //     )
    // }

    const removeuser= await Users.findOne({email})
    if(!(removeuser.matchemail(email))){
        return res.status(400).json({
            message: 'email not found'
        })
    }
    const quit= await Users.deleteOne({email})
    
    res.status(200).json({
        email: quit.email
    })
        
    } catch (error) {
        console.log(error)    
        return res.status(500).json({
            message: 'an error has ocurred'
        })
    
    }
    

})

router.post('/payment', async(req,res)=>{



    try {
        const {orderID}= req.body

        

        res.status(200).json({
            message: 'payment susccefull'
        })
        
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            message : 'error to execute the payment'

            
        })
    }
    





})

router.put('/newpassword',async(req,res)=>{


    try {
        const {email,currentpwd,newpwd}= req.body

        
        if(!currentpwd || !newpwd){
            return res.status(400).json({
                message: 'Yo must complete de fields'
            })
        }
        const user=await Users.findOne({email})
        if(!(await user.matchpassword(currentpwd))){
            return res.status(400).json({
                message: 'password doesn`t match'
            })
        }
        const salt = await hashing.genSalt(10)
        const encryptedpwd= await hashing.hash(newpwd,salt)
        const update= await Users.findOneAndUpdate(
            {email: email},
            {password: encryptedpwd},
            {new :true}
        )
        if(!update){
            return res.status(400).json({
                message: 'user not found'
            })
        }
        res.status(200).json({
            message: 'password updated'
        })


    } catch (error) {
        console.log(error)
    }
})

export default router


// Con el postman para recuperar el nombre de usuario
router.get('/getusername/:email', async(req,res)=>{

try {
    const {email}= req.params
    if(!email){
       return res.status(400).json({
            message : 'fill the email' 
        })
    }

    const user= await Users.findOne({email})
 
    // if(!(user.matchemail(email))){
    //     return res.status(400).json({
    //         message: 'email doesn`t exist'
    //     })
    // }

    if(!user){
        return res.status(400).json({
            message : 'user does not exist'
        })
    }

    res.status(200).json({
        username: user.username
    })

} catch (error) {
  console.log(error)   
}

})


router.get('/getallusers', async(req, res)=>{


try {
    const users= await Users.find({})
    res.status(200).json(users)
    
} catch (error) {
    return res.status(400).json({
        message: error
    })
}
   
})