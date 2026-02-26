import express from 'express'
import request from 'supertest'
import app from '../src/Backend/server'




describe('Authentication testing', ()=>{

it('POST /api/auth/register -success', async()=>{

    const user = {
        username: 'testing72431example',
        email: 'testing3124147@gmail.com',
        password :'testing43241232133243'
    }

    const res= await request(app)
    .post('/api/auth/register')
    .send(user)
    .expect(200)
    expect(res.body).toHaveProperty('message')
    
})


it('POST /api/auth/register -password or username or email repeated', async()=>{
        const user2 = {
        username: 'testing2example',
        email: 'testing2@gmail.com',
        password :''
    }

    const res = await request(app)
    .post('/api/auth/register')
    .send(user2)
    .expect(400)
    expect(res.body).toHaveProperty('message')
})
})
// app.post('/testingregister',async(req,res)=>{

// try {
//     let user = {
//         email: 'example@gmail.com',
//         username: 'exampletesting',
//         password: 'testing123456',
//         reppassword: 'testing123456'


//     }

//     user=req.body
//     if(!user.email || !user.username || !user.password || ! user.reppassword){
//         return res.status(400).json({
//             message :'incomplete fields'
//         })
//     }
// } catch (error) {
//     return res.status(500).json({
//         message: error
//     })
// }


//})




