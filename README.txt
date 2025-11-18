
Varnam scaffold - README

How to run locally:
1) Install dependencies:
   npm install

2) Create a .env file in the project root with your MongoDB Atlas URI and a port (optional):
   MONGO_URI=<your mongodb atlas connection string>
   PORT=3000

3) Start the server:
   npm start
   (or npm run dev if you have nodemon)

4) Open browser: http://localhost:3000
   - Admin: http://localhost:3000/admin.html

Notes:
- Replace placeholder images in public/assets with your real images.
- The admin endpoint allows uploading images; they will be saved to public/assets.
- For production, add authentication to /api/admin routes and use S3 or CDN for images.
