const express = require("express");
const cors = require("cors");
const gTTS = require("gtts");

const app = express();

app.use(cors(
  {
    origin: ["https://word-drop-waves.vercel.app"],
    method: ["POST", "GET"],
    credentials:true
  }
));
app.use(express.json());
app.get('/', (req, res) => {
  res.json("hello")
})
// TTS endpoint without OpenAI
app.post("/api/notes-to-voice", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).send("Text is required");

    const gtts = new gTTS(text, "en");
    res.setHeader("Content-Type", "audio/mpeg");

    gtts.stream().pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating voice");
  }
});

app.listen(3001, () => {
  console.log(`Server running at http://localhost:3001`);
});
