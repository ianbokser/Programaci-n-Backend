import { Router } from "express"
import User from "../models/User.js"

const router = Router()

router.get('/', async (req,res)=>{
    try {
        const users = await User.find({first_name:"Celia"}).explain('executionStats')
        console.log(users)
        res.status(200).json(users)
    } catch (error) {
        res.json(error)
    }

})

export default router