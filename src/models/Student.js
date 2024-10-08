import mongoose from "mongoose"

const StudentSchema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    email:String,
    gender:String,
    courses:{
        type:[
            {
                course:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"Course"
                }
            }
        ],
        default:[]
    }
})

StudentSchema.pre(['find',"findOne","findById"],function(){
    this.populate('courses.course')
})

export default mongoose.model('Student',StudentSchema)