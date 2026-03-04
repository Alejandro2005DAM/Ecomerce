import jwt from 'jsonwebtoken'


export function verifytoken(req,res,next){

const authorithation = req.headers['authorithation']
    
const token = authorithation.split(' ')[1]

}