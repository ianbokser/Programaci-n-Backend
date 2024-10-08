import mongoose from "mongoose"

const CourseSchema = new mongoose.Schema({
  title:String,
  description:String,
  difficulty:Number,
  topics:{
    type:Array,
    default:[]
  },
  professor:String,
  students:{
    type:Array,
    default:[]
  }

})

export default mongoose.model('Course',CourseSchema)