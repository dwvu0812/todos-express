import express, { Express } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import cors from "cors";
import todoRoutes from "./routes";

const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(cors());
app.use(todoRoutes);

const uri: string = `mongodb+srv://alphavu12:x2COQQS3giGHaCZk@cluster0.6sksnnm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
// mongoose.set("useFindAndModify", false)

mongoose
  .connect(uri, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  } as ConnectOptions)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => {
    throw error;
  });
