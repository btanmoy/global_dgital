const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const subscriptionRoutes = require("./routes/subscriptionRoutes");

app.use("/api", subscriptionRoutes);

app.listen(3000, () => console.log("listening 3000"));
