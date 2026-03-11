# Shared Hosting Deployment Guide

This project is configured for **Static Site Generation (SSG)**, which is perfect for shared hosting (CPanel, DirectAdmin, etc.).

## 1. Local Build
Run the following command on your computer:
```bash
npm run build
```
This will create an `out` folder containing all the static HTML, CSS, and JS files.

## 2. Prepare PHP Backend
The PHP scripts are located in `public/api/`. These will be included in the `out` folder after the build.

## 3. Uploading to Shared Host
1. Connect to your host via FTP (FileZilla) or use the File Manager.
2. Go to the web root folder (usually `public_html`).
3. Upload everything **inside** the `out` folder to your server's `public_html`.

## 4. File Permissions
Ensure the `public_html/api/` folder has **Write Permissions** (usually `755` or `777`) so the PHP scripts can save data (like `subscribers.csv`).

## 5. Summary of API endpoints
- `newsletter.php`: Handles newsletter signups (saves to CSV).
- `contact.php`: Handles contact form submissions (sends email & logs).

*Note: You may need to update the email address in `api/contact.php` to your business email.*
