import mongoose from 'mongoose'

const bookeSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String,
    },
    author: {
        type: String,
        required: true
    }
})

export default mongoose.model('Book', bookeSchema);