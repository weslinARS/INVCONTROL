import { Schema , model} from "mongoose";


const CategorySchema = new Schema({
  categoryName: {
    type: String,
    required: true,
  },
});

export default model("Category", CategorySchema);