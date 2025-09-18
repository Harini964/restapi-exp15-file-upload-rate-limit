// exp15.js
const express = require("express");
const multer = require("multer");
const rateLimit = require("express-rate-limit");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// =============================
// 1) Upload Folder Setup
// =============================
const UPLOAD_DIR = path.join(__dirname, "uploads");

// Create uploads folder automatically if it doesn't exist
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  console.log("✅ Uploads folder created at:", UPLOAD_DIR);
}

// =============================
// 2) Multer Setup for File Upload
// =============================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR); // saves files inside "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
});
const upload = multer({ storage: storage });

// =============================
// 3) Rate Limiting Setup
// =============================
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per minute
  message: "❌ Too many requests, please try again after a minute."
});
app.use(limiter);

// =============================
// 4) Routes
// =============================

// Home route with file upload form
app.get("/", (req, res) => {
  res.send(`
    <h2>File Upload + Rate Limiting Demo</h2>
    <form action="/upload" method="POST" enctype="multipart/form-data">
      <input type="file" name="myfile" required />
      <button type="submit">Upload</button>
    </form>
    <p>Note: You can upload files from ANY folder, 
       but they will be stored in server's <b>uploads/</b> folder.</p>
  `);
});

// Upload route
app.post("/upload", upload.single("myfile"), (req, res) => {
  if (!req.file) return res.send("❌ No file uploaded!");
  res.send(`✅ File uploaded successfully: <b>${req.file.filename}</b>`);
});

// =============================
// 5) Start Server
// =============================
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
