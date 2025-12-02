import mongoose from "mongoose";
const { Schema } = mongoose;

const questionmodel = new Schema({
    questions: [
        {
            id: Number,
            question: String,
            options: [String],
            explanation: { type: String, default: "" },
            questionImage: { type: String, default: "" },
            optionImages: { type: [String], default: [] }
        }
    ],
    answers: { type: Array, default: [] },
    createdat: { type: Date, default: Date.now }
});

const Questions = mongoose.model('Question', questionmodel);
export default Questions;