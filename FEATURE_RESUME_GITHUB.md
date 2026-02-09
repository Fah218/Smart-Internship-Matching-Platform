# Feature Update: Resume Upload & GitHub Link

## ✅ New Features Added

### 1. Resume Upload
- **Frontend**: Added file input for PDF/DOCX files.
- **Backend**: Implemented `multer` for secure file uploads to `uploads/resumes/` directory.
- **Storage**: Files are stored locally and paths saved in MongoDB.
- **Access**: Uploaded resumes are accessible via static route `/uploads/...`.

### 2. GitHub Profile Link
- **Frontend**: Added input field for GitHub URL.
- **Backend**: Updated `Student` schema to store `githubLink`.
- **UI**: Added "Your Links" section in dashboard to view/access these resources.

## 🔧 Technical Details

- **Database**: Updated `Student` schema with `resume` (String) and `githubLink` (String).
- **Middleware**: Created `upload.js` for handling file storage.
- **API**: Updated `PUT /api/students/:id` to accept `multipart/form-data`.
- **Static Serving**: `backend/src/app.js` now serves contents of `/uploads` publicly.

## 🧪 How to Test

1. **Go to Student Dashboard**: `/student/dashboard`
2. **Scroll to Profile Settings**: You will see "GitHub Profile" and "Resume / CV" fields.
3. **Add GitHub Link**: Enter a valid URL.
4. **Upload Resume**: Click "Upload Resume" and select a PDF file.
5. **Save**: Click "Save Changes".
6. **Verify**:
   - Check "Your Links" section on the left.
   - Click "View Uploaded Resume" to see the file.
   - Click GitHub link to open profile.
