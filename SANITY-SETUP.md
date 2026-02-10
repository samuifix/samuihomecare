# ระบบหลังบ้านด้วย Sanity

เว็บดึงเนื้อหาและ SEO จาก **Sanity** ตอน build (หรือตอน request ในโหมด dev)

## 1. สร้างโปรเจกต์ Sanity

- ไปที่ [sanity.io](https://sanity.io) → สร้างโปรเจกต์ (หรือใช้ของเดิม)
- จำ **Project ID** (เช่น `xxxxxx`) จาก Manage → API

## 2. ตั้งค่า Environment (เว็บหลัก)

ใน `.env.local` ที่รากโปรเจกต์:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=   # ไม่บังคับ ถ้า dataset เป็น public
```

## 3. ตั้งค่า Sanity Studio

ในโฟลเดอร์ `studio/`:

```powershell
cd studio
cp .env.example .env
```

แก้ `studio/.env`:

```
SANITY_STUDIO_PROJECT_ID=your_project_id
SANITY_STUDIO_DATASET=production
```

จากนั้นรัน Studio:

```powershell
npm install
npm run dev
```

### นำข้อมูล Mock เข้า Sanity (ครั้งแรก)

จากรากโปรเจกต์ รัน (ต้องมี `SANITY_API_TOKEN` ใน `.env.local`):

```powershell
npm run seed:sanity
```

สคริปต์จะอัปโหลดข้อมูลตัวอย่างทั้งหมด (Site settings, SEO, Services, Why Us, Reviews, Portfolio, Categories) เข้า Sanity จากนั้นเปิด Studio แล้วแก้ไขได้ตามต้องการ

### เนื้อหาใน Studio

- **Site settings** — ชื่อเว็บ, ติดต่อ, หัวข้อส่วนบริการ, Stats
- **SEO Settings** — เอกสาร `pageSlug` = `home` (Meta Title, Description, OG Image ฯลฯ)
- **Service** — รายการบริการ (มี sort order)
- **Why Us**, **Review**, **Portfolio item**, **Category** — แก้ไขได้ทั้งหมด

หลังแก้ใน Studio ให้ **Publish** เอกสารที่เปลี่ยน แล้วรีเฟรชหน้าเว็บ (F5)

## 4. Build เว็บหลัก

จากรากโปรเจกต์:

```powershell
npm run build
```

ข้อมูลจะดึงจาก Sanity ตอน build; ถ้าใช้ `output: "export"` จะได้โฟลเดอร์ `out/` สำหรับอัปโหลดไปโฮสต์
