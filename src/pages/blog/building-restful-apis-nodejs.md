> In the end, your final year project is more than just a job or a degree. It’s a chance to showcase your skills, creativity, and passion. So, **don’t be afraid to take risks, experiment, and learn along the way**.

---
# Building RESTful APIs with Node.js: Complete Tutorial"
> Author: "Backend Developer" | Date: "2024-01-03" | Read Time: "20 min read" | Category: "Web Development" 

---

In today’s modern web, **RESTful APIs** are the backbone of scalable, maintainable, and high-performance applications. Whether you're building a full-stack product, mobile app backend, or microservices architecture, mastering API development is a must-have skill for every **backend developer**.

This comprehensive guide will walk you through building a **RESTful API** using **Node.js**, **Express**, and **MongoDB**—from project setup to production deployment.

> 🚀 By the end, you’ll be able to:
> - Create CRUD operations with Express
> - Use MongoDB for persistent storage
> - Implement JWT-based authentication
> - Validate data with middleware
> - Secure, test, and deploy your API

---

## 🧰 Prerequisites

Before we start, make sure you have:
- **Node.js** (v14 or higher)
- **MongoDB** (local or Atlas)
- Basic understanding of **JavaScript** and **HTTP methods**
- Postman or Insomnia for API testing

---

## 📁 Step 1: Project Setup

```bash
mkdir node-rest-api
cd node-rest-api
npm init -y
npm install express mongoose dotenv cors body-parser jsonwebtoken bcryptjs
````

Create a file structure:

```
node-rest-api/
├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
├── .env
├── server.js
```

### server.js

```js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Sample route
app.get("/", (req, res) => res.send("API is running"));

// Connect DB and start server
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() =>
    app.listen(process.env.PORT || 5000, () =>
      console.log("Server started on port 5000")
    )
  )
  .catch((err) => console.error(err));
```

---

## 🗃️ Step 2: MongoDB Model

Let’s build a simple `User` model.

```js
// models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", UserSchema);
```

---

## 🔐 Step 3: User Authentication (JWT)

### Registration Controller

```js
// controllers/auth.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ msg: "User already exists" });

    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hash });

    await newUser.save();
    res.status(201).json({ msg: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
```

### Login Controller

```js
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
```

---

## 🛡️ Step 4: Protect Routes with Middleware

```js
// middleware/auth.js
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch {
    res.status(400).json({ msg: "Token is not valid" });
  }
};
```

---

## 🧪 Step 5: Testing with Postman

1. Register a user: `POST /api/auth/register`
2. Login user: `POST /api/auth/login`
3. Use the `x-auth-token` from login response to test protected routes like `GET /api/user/profile`.

---

## 🧼 Step 6: Validation & Error Handling

Use [express-validator](https://express-validator.github.io/docs/) for input validation:

```bash
npm install express-validator
```

Add checks in your route:

```js
const { check, validationResult } = require("express-validator");

app.post(
  "/api/auth/register",
  [
    check("email", "Valid email required").isEmail(),
    check("password", "Password min 6 chars").isLength({ min: 6 }),
  ],
  register
);
```

---

## 🚀 Step 7: Deployment with Render / Railway / Vercel

### Use `.env` variables:

```
PORT=5000
MONGO_URI=your_mongo_url
JWT_SECRET=your_jwt_secret
```

### Deployment Steps:

* Push to GitHub
* Connect repo to [Render](https://render.com) or [Railway](https://railway.app)
* Set environment variables
* Auto-deploy on push

---

## 🔍 API Best Practices in 2024

✅ Use versioning (`/api/v1/resource`)
✅ Return consistent JSON responses
✅ Use proper HTTP status codes
✅ Apply rate limiting for public APIs
✅ Write API documentation using Swagger/OpenAPI

---

## 📚 Useful Tools & Resources

| Tool              | Use                         |
| ----------------- | --------------------------- |
| **Postman**       | Test APIs easily            |
| **MongoDB Atlas** | Free cloud database         |
| **Swagger UI**    | API docs generation         |
| **Jest**          | Unit testing                |
| **PM2**           | Process manager for Node.js |

---

## 📈 Final Thoughts

Building REST APIs with **Node.js and Express** is one of the most efficient and scalable ways to create backends in 2024. With added tools like MongoDB, JWT authentication, and validation, your APIs will be production-ready and secure.

Whether you're building your own SaaS, preparing for interviews, or contributing to open-source—**RESTful API design remains a core skill for backend engineers**.

---

🛠️ **Next Steps**:

* Add more models (e.g., products, tasks, blogs)
* Implement role-based access control (RBAC)
* Add Swagger docs
* Write automated tests

Happy building! 🔧

---

*Want to see the full source code? Drop a comment or email us to get access!*

