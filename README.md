## Screenshots

### 1. File Upload Form
<img width="897" height="439" alt="image" src="https://github.com/user-attachments/assets/544bf5b4-c551-4c4e-a7eb-050fc5ab6979" />

This page is served at `http://localhost:3000/`.  
It provides a simple HTML form where users can choose a file from their local system and submit it to the server. The file input is handled by **Multer middleware** in the backend.

---

### 2. Upload Success
<img width="1115" height="349" alt="image" src="https://github.com/user-attachments/assets/36c1a438-f5c0-47bc-ba1e-f0ec90ff9970" />

After selecting a file and clicking **Upload**, the file is stored inside the server’s `uploads/` folder.  
The success page (`/upload` route) confirms the upload and displays the newly generated filename (timestamp + original extension).
