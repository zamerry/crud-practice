import mongoose from "mongoose";

const student_posts = new mongoose.Schema({
    name: {type: String, required: true},
    age: {type: String, required: true},
    russian_grade: {type: Number, required: true},
    math_grade: {type: Number, required: true},
    english_grade: {type: Number, required: true},
    picture: {type: String}
})

export default mongoose.model('Students', student_posts)