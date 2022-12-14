const dotenv = require('dotenv');
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// Configuring dotenv
dotenv.config();

const userLogin =  async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query("SELECT * FROM user_details WHERE email = $1", 
    [email]
    );

    console.log(user);

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }

    const validPassword = await bcrypt.compareSync(
      password,
      user.rows[0].password
    );

    if (!validPassword) {
      return res.status(403).json("Invalid Credential");
    }
 
    const payload = {
        name: user.rows[0].username,
      };
      const token = jwt.sign(payload, process.env.SECRET, { expiresIn: "30s" });
      const refresh = jwt.sign(payload, process.env.SECRET, { expiresIn: "2days" });
    
      const decoded = jwt.verify(token, process.env.SECRET);
      res.cookie('jwt', refresh, { httpOnly: true, 
        sameSite: 'None', secure: true, 
        maxAge: 24 * 60 * 60 * 1000 });

      // res.json({ token, refresh });
      res.json({"token": user.rows[0].sn, "jwt": refresh})

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
    // req.user = user;
    // next()
  }
}

const isTokenValid = (req, res, next) => {
  const authorization = req.get("authorization");
  let token = 0
  if (!authorization){
    const token = authorization.split(" ")[1];
  } 

  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    next();
  } catch (err) {
    res.status(401).json({ msg: "no" });
  }
};

const verifyToken = async(req, res) => {
  const { username, password, email, firstname, lastname, dob } = req.body;

      const user = await pool.query("SELECT * FROM user_details WHERE email = $1", [
      email
    ]);
  res.json({ msg: "secure", user });
}

const userSignUp = (async(req,res) =>{ 
  const { username, password, email, firstname, lastname, dob } = req.body;
  try{
      const user = await pool.query("SELECT * FROM user_details WHERE email = $1", [
      email
    ]);

    if (user.rows.length > 0) {
      return res.status(401).json("User already exist!");
    }

      const salt = await bcrypt.genSalt(10);
      const bcryptPassword = await bcrypt.hash(password, salt);

      const newUser = await pool.query(
       "INSERT INTO user_details (username, password, email, firstname, lastname) VALUES($1, $2, $3, $4, $5) RETURNING *", 
      [username, bcryptPassword, email, firstname, lastname]
   );
       res.json(newUser.rows[0])
   }catch(err){
       console.log(err.message);
   }
})

const userQuery =  async (req, res) => {
  const { id } = req.params;
  try {
    const user = await pool.query("SELECT * FROM user_details WHERE sn = $1", 
    [id]
    ); 
    
    res.json(user.rows[0])

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");

  }
}

module.exports = {
    userLogin,
    userSignUp,
    userQuery,
    verifyToken,
    isTokenValid
}