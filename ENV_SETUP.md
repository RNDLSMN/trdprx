# ✅ Environment Variables Setup untuk Vercel

## 🔴 Environment Variables yang HARUS ditambahkan di Vercel:

### **1. NEXT_PUBLIC_BASE_URL**
```
http://api.empathymorning.com
```
- Ini adalah URL untuk backend API
- **PENTING:** Pastikan TIDAK ada trailing slash (/) di akhir

### **2. NEXT_PUBLIC_SECRET_KEY**
```
h0vWu6MkInNlWHJVfIXmHbIbC66cQvlbSUQI09Whbp
```
- API secret key untuk otentikasi

### **3. NEXT_PUBLIC_HOST_SOCKET**
```
api.empathymorning.com
```
- WebSocket server host

### **4. NEXT_PUBLIC_WSS_PORT**
```
6006
```
- WebSocket server port (dari BROADCAST_PORT di backend)

---

## 📝 Cara Menambahkan di Vercel:

1. Buka: https://vercel.com/dashboard
2. Klik project: **trdprx**
3. Klik: **Settings** → **Environment Variables**
4. Klik: **Add New**
5. Tambahkan setiap variabel di atas
6. **Environments:** Centang semua (Production, Preview, Development) ✅
7. Klik: **Save**
8. **Redeploy** setelah semua variabel ditambahkan!

---

## ⚠️ Catatan Penting:

- API URL: `http://api.empathymorning.com` sudah ada subdomain
- Backend API belum fully deployed (belum ada endpoint apapun)
- Aplikasi frontend akan otomatis menampilkan pesan error yang user-friendly jika API tidak tersedia
- Pastikan backend Laravel sudah running dan accessible sebelum menambahkan env vars
