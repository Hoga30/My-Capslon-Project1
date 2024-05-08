import {model, Schema} from 'mongoose';

const bookSchema = new Schema(
    {
        bookName:{
            type: String,
            require:true
        },
        authorName:{
            type: String,
            require:true
        },
        description:{
            type: String,
            require:false
        },
        category: {
            type: String,
            required: true,
            enum: {
                values: ["Novels","History", "Science", "Poetry", "Recipe", "Comic"],
                message: "{values} is not a valid book category",
            },
            default: "Novels"
        },
        link:
        {
            type: String,
            required: false
        },

        checkBook:{
            completed:{
                type: Boolean,
                require:false
            },
        }
    });
 const book = model('book', bookSchema);
 export default book;
