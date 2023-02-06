const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const FoodModel = require('./models/foodModel');

const app = express();

//middleware
app.use(express.json());
app.use(cors());

// DB Connect
mongoose.set('strictQuery', false);
mongoose.connect("");

// app route
app.post('/insert', async (req, res)=>{
	const foodName = req.body.foodName;
	const food = new FoodModel({
		foodName
	});
	try {
		await food.save();
		res.send("Inserted data");
	} catch (error) {
		console.log(error);
	}
});

app.get('/foods', async (req, res)=>{
	try {
		const foods = await FoodModel.find();
		res.send(foods);
	} catch (error) {
		res.status(401).json({message: error.message});
	}
})

app.delete("/delete/:id", async (req, res)=>{
	const id = req.params.id;
	console.log(id);
	try {
		const updatedFood = await FoodModel.findByIdAndRemove(id).exec();
		res.send(updatedFood);
	} catch (error) {
		res.status(401).json({message: error.message});
	}
})

app.listen(3001, ()=>{
	console.log("Server running at port 3001");
});
