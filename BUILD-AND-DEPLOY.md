# คู่มือ Build และ Deploy (สำหรับมือใหม่)

ถ้า Vercel แจ้งว่า **"Page /blog/[slug] is missing generateStaticParams()"** ให้ทำตามขั้นตอนด้านล่างทีละขั้น

---

## ขั้นที่ 1: บันทึกไฟล์ในโปรเจกต์

1. ใน Cursor (หรือ VS Code) กด **Ctrl + S** เพื่อบันทึกไฟล์ที่แก้ไขทั้งหมด  
2. หรือไปที่เมนู **File** → **Save All**

---

## ขั้นที่ 2: เปิด Terminal / Command Line

1. ใน Cursor: กด **Ctrl + `** (ปุ่ม backtick) หรือไปที่เมนู **Terminal** → **New Terminal**  
2. หรือเปิด **PowerShell** / **Command Prompt** จาก Windows แล้วไปที่โฟลเดอร์โปรเจกต์ (ขั้นที่ 3)

---

## ขั้นที่ 3: ไปที่โฟลเดอร์โปรเจกต์

ใน Terminal พิมพ์คำสั่งนี้แล้วกด Enter (แก้ path ให้ตรงกับที่เก็บโปรเจกต์ของคุณ):

```powershell
cd "c:\Users\samui\OneDrive\Desktop\newweb"
```

ถ้าโปรเจกต์อยู่ที่อื่น ให้เปลี่ยน path ตามนั้น เช่น  
`cd "D:\my-project\newweb"`

---

## ขั้นที่ 4: ทดสอบ Build ในเครื่องก่อน (สำคัญมาก)

ก่อน push ขึ้น Vercel ควรลอง build ในเครื่องก่อนว่าไม่มี error:

1. ใน Terminal ที่โฟลเดอร์โปรเจกต์ พิมพ์:

```powershell
npm run build
```

2. รอจนจบ  
   - ถ้าเห็นข้อความประมาณ **"Export successful"** หรือ **"✓ Generating static pages"** แปลว่า build ผ่าน  
   - ถ้ามีข้อความสีแดง **"Failed to compile"** หรือ **"Error"** แปลว่ายังมีปัญหา ต้องแก้ให้ build ผ่านในเครื่องก่อน

3. ถ้า build ผ่านในเครื่องแล้ว ค่อยทำขั้นที่ 5–6 เพื่อส่งโค้ดขึ้น GitHub และให้ Vercel build ใหม่

---

## ขั้นที่ 5: ส่งโค้ดขึ้น GitHub (Git add, commit, push)

ทำทีละคำสั่งใน Terminal (ที่โฟลเดอร์โปรเจกต์):

**5.1 เพิ่มไฟล์ที่เปลี่ยน:**

```powershell
git add .
```

**5.2 สร้าง commit:**

```powershell
git commit -m "Fix blog generateStaticParams for static export"
```

**5.3 ส่งขึ้น GitHub:**

```powershell
git push
```

- ถ้าขึ้นว่า **"Everything up-to-date"** แปลว่าส่งครบแล้ว  
- ถ้าขอ username/password ให้ใส่บัญชี GitHub และ **Personal Access Token** (ไม่ใช่รหัสผ่านปกติ)

---

## ขั้นที่ 6: ตั้งค่า Environment Variables บน Vercel

ถ้าไม่ตั้งค่าเหล่านี้ Vercel จะดึงข้อมูลจาก Sanity ไม่ได้ และอาจมี error ตอน build หรือหน้าเว็บว่าง:

1. เปิดเบราว์เซอร์ ไปที่ **https://vercel.com** แล้วล็อกอิน  
2. เลือก **โปรเจกต์** (เช่น samuihomecare)  
3. คลิก **Settings** (แท็บด้านบน)  
4. คลิก **Environment Variables** (เมนูด้านซ้าย)  
5. เพิ่มตัวแปรทีละตัวดังนี้:

| Name (ชื่อ) | Value (ค่า) | หมายเหตุ |
|-------------|-------------|----------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ค่า Project ID จาก Sanity | ดูจาก https://manage.sanity.io → เลือก project → API |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | พิมพ์ว่า production |
| `NEXT_PUBLIC_SITE_URL` | `https://ชื่อโปรเจกต์.vercel.app` | ใช้ URL จริงของเว็บคุณ |
| `SANITY_API_TOKEN` | (ถ้ามี) Token จาก Sanity | ไม่บังคับ ถ้า dataset เป็น Public |

6. แต่ละตัวเลือก **Production**, **Preview**, **Development** ตามที่ต้องการ (อย่างน้อยเลือก Production)  
7. กด **Save**

---

## ขั้นที่ 7: ให้ Vercel Build ใหม่ (Redeploy)

1. อยู่ใน Vercel → โปรเจกต์ของคุณ  
2. ไปที่แท็บ **Deployments**  
3. ที่ deployment ล่าสุด (แถวบนสุด) คลิก **⋯** (จุดสามจุด)  
4. เลือก **Redeploy**  
5. เลือก **Redeploy** อีกครั้ง (หรือ **Redeploy without cache** ถ้าอยากให้ build ใหม่ทั้งหมด)  
6. รอจนสถานะเป็น **Ready**  
7. เปิด URL ของเว็บตรวจดูว่าหน้า blog เปิดได้

---

## สรุปลำดับที่ทำ

1. บันทึกไฟล์ (Ctrl + S)  
2. เปิด Terminal → ไปที่โฟลเดอร์โปรเจกต์ (`cd ...`)  
3. รัน `npm run build` ในเครื่อง → ต้องผ่านก่อน  
4. รัน `git add .` → `git commit -m "..."` → `git push`  
5. ตั้งค่า Environment Variables บน Vercel  
6. Redeploy บน Vercel  

ถ้าทำครบแล้วแต่ Vercel ยัง error อยู่ ให้ copy ข้อความ error ทั้งก้อนจาก **Build Logs** ใน Vercel ส่งมา จะช่วยไล่ต่อให้ได้ครับ
