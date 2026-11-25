import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.sendFile(import.meta.dirname + "/views/index.html");
});

// Do not change code above this line

app.get("/api{/:date}", (req, res, nxt) => {
  let date = req.params.date;
  
  if (!date) {
    date = new Date();
  } else if (/^\d+$/.test(date)) {
    date = new Date(Number(date));
  } else {
    date = new Date(date);
  }

  if (isNaN(date.getTime())) {
    res.json({ error: "Invalid Date" });
  } else { 
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  }
});

// Do not change code below this line

const PORT = 8000;
const listener = app.listen(PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
