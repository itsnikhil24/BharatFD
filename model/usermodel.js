const mongoose =require ("mongoose");

// mongoose.connect("mongodb://localhost:27017/floodmanagement");
// mongoose.connect(`mongodb://localhost:27017/floodmanagement`); 


const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone_number: { type: String, required: true }, // Change this to String
   
});

module.exports =mongoose.model('user', userSchema);
