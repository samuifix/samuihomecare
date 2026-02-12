# คู่มือ Build และ Deploy (สำหรับมือใหม่)

ถ้า Vercel แจ้งว่า **"Page /blog/[slug] หรือ /portfolio/[slug] is missing generateStaticParams()"** ให้ทำตามขั้นตอนด้านล่างทีละขั้น

---

## หลัง Deploy แล้ว — แก้เว็บ / เพิ่มบทความ / เพิ่ม Portfolio

### 1. แก้ไขเนื้อหาเว็บ หรือเพิ่มบทความ (Blog) / เพิ่ม Portfolio

เนื้อหาพวกนี้อยู่ที่ **Sanity** (ระบบหลังบ้าน) ไม่ได้อยู่ในโค้ดโดยตรง

| สิ่งที่ทำ | วิธีทำ | หลังแก้แล้วต้องทำอะไร |
|-----------|--------|------------------------|
| **เพิ่มหรือแก้บทความ (Blog)** | เปิด **Sanity Studio** → เลือก **Post** → สร้าง/แก้บทความ → กด **Publish** | ถ้าตั้งค่า **Webhook** (ดูด้านล่าง) แล้ว → ไม่ต้องทำอะไร เว็บ build ใหม่อัตโนมัติ. ถ้ายังไม่ตั้ง → ไปที่ Vercel → **Deployments** → กด **Redeploy** |
| **เพิ่มหรือแก้ Portfolio** | เปิด **Sanity Studio** → เลือก **Portfolio item** → สร้าง/แก้โปรเจกต์ → กด **Publish** | เหมือนด้านบน |
| **แก้ Service, Review, ข้อมูลติดต่อ ฯลฯ** | แก้ใน Sanity Studio แล้ว **Publish** | เหมือนด้านบน |

**วิธีเปิด Sanity Studio (ในเครื่องคุณ):**

```powershell
cd "c:\Users\samui\OneDrive\Desktop\newweb\studio"
npm install
npm run dev
```

จากนั้นเปิดเบราว์เซอร์ไปที่ **http://localhost:3333** (หรือพอร์ตที่แสดงใน Terminal) แล้วล็อกอิน Sanity เพื่อเพิ่ม/แก้เนื้อหา

**ไม่ต้องแก้โค้ดเมื่อเพิ่มบทความหรือ Portfolio ใหม่ — ใช้ระบบนี้แทน:**

1. **ตั้งค่า Sanity บน Vercel ให้ครบ**  
   ไปที่ Vercel → โปรเจกต์ → **Settings** → **Environment Variables** แล้วเพิ่ม:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = Project ID จาก [manage.sanity.io](https://manage.sanity.io)
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`

2. **เมื่อเพิ่มบทความหรือ Portfolio ใหม่ใน Sanity**  
   แค่กด **Publish** ใน Sanity Studio จากนั้นไปที่ Vercel → **Deployments** → กด **Redeploy** (ที่ deployment ล่าสุด)  
   ตอน build เว็บจะดึงรายการ slug ล่าสุดจาก Sanity เอง **ไม่ต้องไปเพิ่ม slug ในโค้ด**

ถ้าไม่ได้ตั้งค่า env ของ Sanity บน Vercel โค้ดจะใช้รายการ fallback ในไฟล์แทน (ต้องไปเพิ่ม slug เองในโค้ดถ้ามีของใหม่)

**ไม่ต้องกด Redeploy เองทุกครั้ง — ตั้งค่า Webhook ให้ Vercel build อัตโนมัติเมื่อ Publish ใน Sanity**

ทำครั้งเดียวแล้วต่อไปแค่ Publish ใน Sanity เว็บจะ build ใหม่เอง ไม่ต้องเข้า Vercel กด Redeploy

| ขั้นตอน | ทำที่ไหน | ทำอะไร |
|--------|----------|--------|
| **1. สร้าง Deploy Hook** | **Vercel** | โปรเจกต์ → **Settings** → **Git** → เลื่อนลงถึง **Deploy Hooks** → ช่อง Name ใส่ `Sanity Publish` → Branch เลือก `main` → กด **Create Hook** → **คัดลอก URL** ที่ได้ (รูปแบบ `https://api.vercel.com/v1/integrations/deploy/...`) |
| **2. สร้าง Webhook ใน Sanity** | **Sanity** | เปิด [sanity.io/manage](https://sanity.io/manage) → เลือก **โปรเจกต์** → **API** → **Webhooks** → **Create webhook** → ตั้งค่า:<br>• **Name:** `Trigger Vercel deploy`<br>• **URL:** วาง URL จากขั้นที่ 1<br>• **Trigger on:** เลือก **Create**, **Update**, **Delete** (หรือเฉพาะ **Update** ถ้าอยากให้ยิงเฉพาะตอน Publish)<br>• **Filter (ไม่บังคับ):** ถ้าอยากให้ยิงเฉพาะเมื่อแก้บทความหรือ Portfolio ใส่ `_type in ["post", "portfolioItem", "service", "siteSettings"]`<br>→ กด **Save** |

หลังจากนี้ทุกครั้งที่คุณ **Publish** เอกสารใน Sanity (บทความ, Portfolio, Service ฯลฯ) Sanity จะยิง URL ไปที่ Vercel → Vercel จะ **build และ deploy ใหม่อัตโนมัติ** ไม่ต้องเข้าไปกด Redeploy เองอีก

---

### 2. แก้ไขโค้ดหรือดีไซน์เว็บ (เช่น เปลี่ยนสี, เปลี่ยนข้อความในโค้ด, เพิ่ม section)

ขั้นตอนแบบเดิม:

1. แก้ไฟล์ใน Cursor (หรือ VS Code) แล้ว **บันทึก (Ctrl + S)**
2. เปิด Terminal ที่โฟลเดอร์โปรเจกต์ แล้วรัน:
   ```powershell
   npm run build
   ```
   ถ้า build ผ่านแล้วค่อยทำขั้นต่อไป
3. ส่งโค้ดขึ้น GitHub:
   ```powershell
   git add .
   git commit -m "อธิบายสิ่งที่แก้ เช่น แก้สี header"
   git push
   ```
4. Vercel จะ **build และ deploy อัตโนมัติ** จากโค้ดที่ push ไป รอสักครู่แล้วเข้าไปดูที่ URL เว็บ

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
git commit -m "Fix generateStaticParams for static export"
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
5. เลือก **Redeploy** อีกครั้ง  
   - **ถ้ายัง error เรื่อง generateStaticParams:** เลือก **Redeploy without cache** (ล้าง cache แล้ว build ใหม่ทั้งหมด)  
6. รอจนสถานะเป็น **Ready**  
7. เปิด URL ของเว็บตรวจดูว่าหน้า blog / portfolio เปิดได้

---

## สรุปลำดับที่ทำ

1. บันทึกไฟล์ (Ctrl + S)  
2. เปิด Terminal → ไปที่โฟลเดอร์โปรเจกต์ (`cd ...`)  
3. รัน `npm run build` ในเครื่อง → ต้องผ่านก่อน  
4. รัน `git add .` → `git commit -m "..."` → `git push`  
5. ตั้งค่า Environment Variables บน Vercel  
6. Redeploy บน Vercel  

**ถ้ายัง error อยู่ ให้เช็ค:**

- ว่าได้ **push โค้ดล่าสุด** ขึ้น GitHub จริงหรือยัง (ดูใน GitHub ว่าไฟล์ `app/portfolio/[slug]/page.tsx` มีฟังก์ชัน `generateStaticParams` อยู่หรือไม่)
- ลอง **Redeploy without cache** ใน Vercel (Deployments → ⋯ → Redeploy → เลือกแบบล้าง cache)

ถ้าทำครบแล้วแต่ Vercel ยัง error อยู่ ให้ copy ข้อความ error ทั้งก้อนจาก **Build Logs** ใน Vercel ส่งมา จะช่วยไล่ต่อให้ได้ครับ
