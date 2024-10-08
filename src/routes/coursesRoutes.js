import { Router } from "express"
import Course from "../models/Course.js"

const router = Router()

router.post('/',async (req,res)=>{
    const body = req.body
    const course = await Course.create(body)
    res.status(200).json(course)
})

export default router