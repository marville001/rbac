const express = require("express");
const usersRoute = require("./routes/users");

const app = express();

app.use("/api/users", usersRoute);
app.get("/",(req,res)=>{
    res.send("Welcome...........")
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App running on port ${PORT}`));
