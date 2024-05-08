import { model, Schema } from "mongoose";

const roleSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    
    description: {
        type: String,
        required: false,
    }
});


const Role = model("Role", roleSchema);
export default Role;