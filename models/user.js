import { Schema, model, models } from "mongoose";

// The "models" object is provided by the mongoose library and stores all the registered models

const userSchema = new Schema({
	email: {
		type: String,
		unique: [true, "Email already exists!"],
		required: [true, "Email is required!"],
	},
	username: {
		type: String,
		required: [true, "Username must be inputed!"],
		match: [
			/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
			"Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
		],
	},
	image: {
		type: String,
	},
});

const User = models.User || model("User", userSchema);
// to check if the user is already a model in the models if not then to import the new schema created

export default User;
