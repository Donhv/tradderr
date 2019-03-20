import mongoose from 'mongoose';

const schema = mongoose.Schema({
   id: {
       type: Number,
       index: true
   },
    title: {
       type: String,
        require: true
    },
    content: {
       type: String
    },
    url: {
        type: String
    },
    time: {
        type: Date,
        default: Date.now()
    }
},
{
    timestamps: true
});

export default mongoose.model('News', schema);