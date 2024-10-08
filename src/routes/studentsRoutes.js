import { Router } from "express"
import Student from "../models/Student.js"

const router = Router()

router.get('/:id',async (req,res)=>{
    const {id} = req.params
    const student = await Student.findOne({_id:id})
    res.json(student)
})


router.post('/',async (req,res)=>{
    const student = await Student.create({
        first_name:"Hilda",
        last_name:"Coruño",
        email:"hildacoruño@gmail.com",
        gender:"female"
    })
    res.status(200).json(student)
})
router.put('/',async (req,res)=>{
    const student = await Student.findOne({_id:"66e83fc0be27608a73955080"})
    student.courses.push({course:"66e84242240e5aaee0b9bd1f"})
    await Student.updateOne({_id:"66e83fc0be27608a73955080"},student)
    res.status(200).json(student)
})

export default router