cara pemakaian : 
- clone repo
- npm install
- buat database mysql = nama database nya bebas
- buat file .env
- isi file .env seperti ini = DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE" (sesuaikan dengan database masing masing) dan PORT=4000 (boleh bebas)
- npx prisma migrate dev --name init
- npm run dev 

api bisa di tes menggunakan postman dll
