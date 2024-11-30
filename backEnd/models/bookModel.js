import mongoose from 'mongoose'

const bookeSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String,
    },
    autor: {
        type: String,
        required: true
    }
})

export default mongoose.model('Book', bookeSchema);