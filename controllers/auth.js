const db = require("../db/db");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const generateToken = require("../helpers/generateToken");
const _ = require("lodash");

module.exports = {
  loginUser: async (req, res) => {
    const {email, password}= req.body;
    const {recordset} = await db.query(`select * from users where email='${email}'`);
    const user = recordset[0];

    if (!user)
      return res.status(404).send({ message: "Account does not exist" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(404).send({ message: "Invalid email or password" });

    const token = generateToken({ email: user.email, role: user.role, id:user.id });

    res.send({
      message: "Login successfully",
      user: _.pick(user, [
        "id",
        "name",
        "email",
        "gender",
        "age",
        "role",
      ]),

      token,
    });
  },

  registerUser: async (req, res) => {
    const { name, email, gender, age, role } = req.body;
    try {
      const { recordset } = await db.query(
        "select * from users where email='" + email + "'"
      );

      const user = recordset[0];
      if (user)
        return res
          .status(404)
          .send({ message: "Account exists with the given email" });

      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(req.body.password, salt);
      const id = uuidv4();

      await db.query(`insert into users (id,name,email,gender,age,password,role) 
                    values 
                    ('${id}', '${name}','${email}', '${gender}','${age}', '${password}', '${role}')`);

      const token = generateToken({ email, role, id });
      const result = await db.query(
        "select * from users where email='" + email + "'"
      );
      const registeredUser = result.recordset[0];

      res.send({
        message: "User registered successfully",
        user: registeredUser,
        token,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .send({ error: error.message, message: "Internal Server Error" });
    }
  },
  updateUser: (res, req) => {
    res.send("Updating user");
  },
};
