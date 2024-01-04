const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5005;
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.pkfgwas.mongodb.net/test_series`, {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
});

const QuestionSchema = new mongoose.Schema({
    _id: Object,
    category: String,
    question: String,
    imageData: String,
    options: [String],
    correctOption: Number,
});

const DetailsSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  indosNumber: String
});

const Question = mongoose.model("imucet", QuestionSchema, "imucet");
const Details = mongoose.model("userDetails", DetailsSchema, "userDetails");

// API endpoint to get questions
app.get("/api/questions", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post('/api/storeUserData', async (req, res) => {
  try {
    const { firstName, lastName, email, indosNumber } = req.body;

    // Create a new user instance
    const newUser = new Details({
      firstName,
      lastName,
      email,
      indosNumber
    });

    // Save the user to the database
    await newUser.save();

    res.status(200).json({ success: true, message: 'User data stored successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.pkfgwas.mongodb.net/test_series`);
});
