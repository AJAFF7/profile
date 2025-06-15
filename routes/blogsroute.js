// import express from "express";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";

// import path from "path";
// import multer from "multer";
// import { fileURLToPath } from "url";
// import { dirname } from "path";

// const app = express();
// import http from "http";
// import { Server as SocketIOServer } from "socket.io";
// const server = http.createServer(app);
// const io = new SocketIOServer(server);

// // import cron from 'node-cron';

// const router = express.Router();

// import { BlogPost_Model1 } from "../models/blogsmodel.js";
// import { Auth_Model1 } from "../models/authormodel.js";
// import { Geo_Model1 } from "../models/geomodel.js";

// router.post("/blogs", async (req, res) => {
//   const { title, content, author } = req.body;

//   try {
//     const post = new BlogPost_Model1({ title, content, author });
//     await post.save();
//     res.status(201).json(post);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// router.post("/blogs/:id/like", async (req, res) => {
//   const postId = req.params.id;
//   try {
//     const post = await BlogPost_Model1.findById(postId);
//     if (!post) {
//       return res.status(404).json({ error: "Post not found" });
//     }
//     post.likes += 1;
//     await post.save();
//     res.json({ message: "Like updated successfully", likes: post.likes });
//   } catch (error) {
//     console.error("Error updating likes:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// router.get("/blogs", async (req, res) => {
//   try {
//     const posts = await BlogPost_Model1.find();
//     res.json(posts);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.patch("/blogs/:postId", async (req, res) => {
//   const { postId } = req.params;
//   const updatedData = req.body;

//   try {
//     const updatedPost = await BlogPost_Model1.findByIdAndUpdate(
//       postId,
//       updatedData,
//       { new: true },
//     );
//     res.json({ data: updatedPost, message: "Post updated successfully" });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.delete("/blogs/:postId", async (req, res) => {
//   try {
//     const result = await BlogPost_Model1.deleteOne({ _id: req.params.postId });

//     if (result.deletedCount === 0) {
//       return res.status(404).json({ message: "Blog not found" });
//     }

//     res.json({ message: "Blog deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// router.post("/auth-login", async (req, res) => {
//   const { username, password } = req.body;

//   const user = await Auth_Model1.findOne({ username });

//   if (!user) {
//     return res
//       .status(400)
//       .json({ message: "Username or password is incorrect" });
//   }

//   // Check if the provided password matches the hashed password in the database
//   const isPasswordValid = await bcrypt.compare(password, user.password);
//   if (!isPasswordValid) {
//     return res
//       .status(400)
//       .json({ message: "Username or password is incorrect" });
//   }

//   // Generate JWT token
//   const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);

//   // Set JWT token in a cookie
//   res.cookie("token", token, { httpOnly: true });

//   // Send response with token and user ID
//   res.json({ token, userID: user._id });

//   console.log("Logged In successfully");
// });

// router.post("/auth-regis", async (req, res) => {
//   const { username, password } = req.body;
//   const user = await Auth_Model1.findOne({ username });

//   if (user) {
//     return res.status(400).json({ message: "Username already exists" });
//   }

//   // Hash the password
//   const hashedPassword = await bcrypt.hash(password, 10);

//   // Create a new user with hashed password
//   const newUser = new Auth_Model1({ username, password: hashedPassword });
//   await newUser.save();

//   // Create JWT token
//   const token = jwt.sign(
//     { username: newUser.username },
//     process.env.SECRET_KEY,
//     {
//       expiresIn: "20s",
//     },
//   );

//   // Set the JWT token in a cookie
//   res.cookie("token", token, { httpOnly: true });

//   // Send response with success message and token
//   res.json({ message: "User registered successfully", token });
// });

// // Route for user logout
// router.post("/logout", (req, res) => {
//   try {
//     // Clear token cookie
//     res.clearCookie("token").json({ message: "Logged out successfully" });

//     // Log successful logout
//     console.log("Logged out successfully");
//   } catch (error) {
//     // Handle any errors that occur during logout
//     console.error("Error during logout:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// router.delete("/auths/:id", async (req, res) => {
//   try {
//     if (!mongoose.isValidObjectId(req.params.id)) {
//       return res.status(400).json({ message: "Invalid ObjectId format" });
//     }

//     const result = await Auth_Model1.deleteOne({ _id: req.params.id });

//     if (result.deletedCount === 0) {
//       return res.status(404).json({ message: "Item not found" });
//     }

//     res.json({ message: "Item deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Route to get all locations
// router.get("/geolocation", async (req, res) => {
//   try {
//     const locations = await Geo_Model1.find();
//     res.json(locations);
//   } catch (error) {
//     console.error("Error fetching locations:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// export { router as userRouter };

//////////
//////////
import express from "express";
import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import { BlogPost_Model1 } from "../models/blogsmodel.js";
import { Auth_Model1 } from "../models/authormodel.js";
import { Geo_Model1 } from "../models/geomodel.js";

const router = express.Router();

// Create a new blog post
router.post("/blogs", async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const post = new BlogPost_Model1({ title, content, author });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Like a blog post
router.post("/blogs/:id/like", async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await BlogPost_Model1.findById(postId);
    if (!post) return res.status(404).json({ error: "Post not found" });

    post.likes += 1;
    await post.save();
    res.json({ message: "Like updated successfully", likes: post.likes });
  } catch (error) {
    console.error("Error updating likes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all blog posts
router.get("/blogs", async (req, res) => {
  try {
    const posts = await BlogPost_Model1.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a blog post
router.patch("/blogs/:postId", async (req, res) => {
  const { postId } = req.params;
  const updatedData = req.body;

  try {
    const updatedPost = await BlogPost_Model1.findByIdAndUpdate(
      postId,
      updatedData,
      { new: true },
    );
    res.json({ data: updatedPost, message: "Post updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a blog post
router.delete("/blogs/:postId", async (req, res) => {
  try {
    const result = await BlogPost_Model1.deleteOne({ _id: req.params.postId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login route
router.post("/auth-login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Auth_Model1.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res
      .status(400)
      .json({ message: "Username or password is incorrect" });
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.SECRET_KEY || "defaultsecret",
  );
  res.cookie("token", token, { httpOnly: true });
  res.json({ token, userID: user._id });
  console.log("Logged In successfully");
});

// Register route
router.post("/auth-regis", async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await Auth_Model1.findOne({ username });

  if (existingUser) {
    return res.status(400).json({ message: "Username already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new Auth_Model1({ username, password: hashedPassword });
  await newUser.save();

  const token = jwt.sign(
    { username: newUser.username },
    process.env.SECRET_KEY || "defaultsecret",
    {
      expiresIn: "20s",
    },
  );

  res.cookie("token", token, { httpOnly: true });
  res.json({ message: "User registered successfully", token });
});

// Logout route
router.post("/logout", (req, res) => {
  try {
    res.clearCookie("token").json({ message: "Logged out successfully" });
    console.log("Logged out successfully");
  } catch (error) {
    console.error("Error during logout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Delete an Auth user by ID
router.delete("/auths/:id", async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid ObjectId format" });
    }

    const result = await Auth_Model1.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all geo locations
router.get("/geolocation", async (req, res) => {
  try {
    const locations = await Geo_Model1.find();
    res.json(locations);
  } catch (error) {
    console.error("Error fetching locations:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export { router as userRouter };
