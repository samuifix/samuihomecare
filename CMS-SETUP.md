# ตั้งค่าระบบหลังบ้าน (CMS แทน Sanity)

เว็บหลักดึงข้อมูลจาก **Supabase** ตอน build (static export ยังใช้ได้)  
แอป **Admin** ใช้สำหรับจัดการเนื้อหา รูปภาพ และ SEO

## 1. สร้างโปรเจกต์ Supabase

- ไปที่ [supabase.com](https://supabase.com) → New Project
- จำ **Project URL** และ **anon public** key (Settings → API)

## 2. รัน Migration

- เปิด **SQL Editor** ใน Supabase Dashboard
- คัดลอกเนื้อหาจาก `supabase/migrations/00001_cms_tables_and_storage.sql`
- กด Run

## 3. สร้าง Storage bucket สำหรับรูป

- ไปที่ **Storage** ใน Dashboard
- New bucket → ชื่อ `media`
- เปิด **Public bucket** (ให้เว็บและ Admin อ้างอิงรูปได้)

(ถ้าต้องการให้เฉพาะคนล็อกอินอัปโหลดได้ ให้ตั้ง RLS ว่า authenticated เท่านั้นที่ insert/update ได้)

## 4. ตัวแปร environment

**เว็บหลัก (รากโปรเจกต์)** — ใส่ใน `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

**แอป Admin** — ใส่ใน `admin/.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

## 5. สร้างผู้ใช้ Admin

- Supabase Dashboard → **Authentication** → **Users** → **Add user**
- ใส่ email + password (ใช้ล็อกอินเข้า Admin)

## 6. รันแอป

- **เว็บหลัก:** `npm run build` แล้ว deploy โฟลเดอร์ `out` (ข้อมูลจะดึงจาก Supabase ตอน build)
- **Admin:** `` → เปิด http://localhost:3001 แล้วล็อกอิน

หลังแก้เนื้อหา/SEO ใน Admin ให้ **รัน build เว็บหลักใหม่** เพื่อให้ static site ได้ข้อมูลล่าสุด (หรือใช้ CI ให้ build อัตโนมัติเมื่อ push)
