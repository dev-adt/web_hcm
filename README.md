# TTHCM AI Platform

Nền tảng học Tư tưởng Hồ Chí Minh với đăng nhập tài khoản/Google, chatbot Dify, flashcard, quiz, sơ đồ tư duy, bài học, NotebookLM và flip book.

## Thành Phần

- Frontend tĩnh trong `public/`
- Backend Express trong `server.js` và `server/`
- Database LowDB dạng JSON
- JWT auth
- Google OAuth 2.0
- Dify chatbot proxy
- PM2 production config trong `ecosystem.config.cjs`

## Yêu Cầu VPS

- Ubuntu 22.04/24.04 hoặc tương đương
- Node.js 18 trở lên, khuyến nghị Node.js 20 LTS
- Nginx
- PM2
- Domain đã trỏ DNS về IP VPS
- SSL bằng Certbot/Let's Encrypt

## Chuẩn Bị Trước Khi Đẩy

Không đẩy các file này lên Git/VPS qua repo:

- `.env`
- `node_modules/`
- `server.local.log`
- `server.local.err.log`
- `server/database/tthcm.json`

Các file này đã được đưa vào `.gitignore`. Production database nên đặt ngoài repo, ví dụ:

```bash
/var/www/tthcm-ai/data/tthcm.json
```

## Cấu Hình Google OAuth

Trong Google Cloud Console, tạo OAuth Client loại Web application.

Authorized JavaScript origins:

```text
https://your-domain.com
```

Authorized redirect URIs:

```text
https://your-domain.com/api/auth/google/callback
```

Nếu test local thì thêm:

```text
http://localhost:3000
http://localhost:3000/api/auth/google/callback
```

## Cấu Hình Dify

Trong Dify, lấy API key của app chatbot. `DIFY_API_URL` thường là:

```text
https://api.dify.ai/v1
```

Nếu dùng self-host Dify, thay bằng URL API của bạn và giữ hậu tố `/v1`.

## Deploy Lên VPS

Ví dụ dùng thư mục `/var/www/tthcm-ai`.

1. Cài Node.js, Nginx, PM2

```bash
sudo apt update
sudo apt install -y nginx git curl

curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

sudo npm install -g pm2
node -v
npm -v
pm2 -v
```

2. Clone hoặc upload source

```bash
sudo mkdir -p /var/www
sudo chown -R $USER:$USER /var/www
cd /var/www
git clone <YOUR_REPO_URL> tthcm-ai
cd tthcm-ai
```

Nếu bạn không dùng Git, upload toàn bộ source trừ `node_modules`, `.env`, log và database local.

3. Cài dependencies

```bash
npm ci --omit=dev
```

4. Tạo thư mục data/log

```bash
mkdir -p /var/www/tthcm-ai/data
mkdir -p /var/www/tthcm-ai/logs
```

5. Tạo `.env`

```bash
cp .env.example .env
nano .env
```

Ví dụ production:

```env
NODE_ENV=production
PORT=3000
TRUST_PROXY=true
APP_URL=https://your-domain.com
ALLOWED_ORIGINS=https://your-domain.com
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=7d
DB_PATH=/var/www/tthcm-ai/data/tthcm.json
SEED_DEMO_USER=false
DIFY_API_URL=https://api.dify.ai/v1
DIFY_API_KEY=replace-with-dify-key
DIFY_CONVERSATION_MODE=chat
GOOGLE_CLIENT_ID=replace-with-google-client-id
GOOGLE_CLIENT_SECRET=replace-with-google-client-secret
```

Tạo `JWT_SECRET`:

```bash
openssl rand -base64 48
```

6. Kiểm tra app trước khi chạy PM2

```bash
npm run check
NODE_ENV=production node server.js
```

Mở terminal khác:

```bash
curl http://127.0.0.1:3000/api/health
```

Nếu OK, dừng server bằng `Ctrl+C`.

7. Chạy bằng PM2

```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

Lệnh `pm2 startup` sẽ in ra một lệnh `sudo env ...`; copy và chạy lệnh đó, sau đó chạy lại:

```bash
pm2 save
```

Kiểm tra:

```bash
pm2 status
pm2 logs tthcm-ai
curl http://127.0.0.1:3000/api/health
```

## Cấu Hình Nginx

Tạo file:

```bash
sudo nano /etc/nginx/sites-available/tthcm-ai
```

Nội dung, thay `your-domain.com`:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    client_max_body_size 10m;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;

        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";

        proxy_read_timeout 120s;
        proxy_send_timeout 120s;
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/tthcm-ai /etc/nginx/sites-enabled/tthcm-ai
sudo nginx -t
sudo systemctl reload nginx
```

## Cài SSL

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

Kiểm tra tự gia hạn:

```bash
sudo certbot renew --dry-run
```

Sau khi có SSL, cập nhật `.env`:

```env
APP_URL=https://your-domain.com
ALLOWED_ORIGINS=https://your-domain.com,https://www.your-domain.com
```

Restart:

```bash
pm2 restart tthcm-ai --update-env
```

## Kiểm Tra Production

```bash
curl https://your-domain.com/api/health
```

Trong trình duyệt:

- Mở `https://your-domain.com`
- Đăng ký tài khoản mới
- Đăng nhập Google
- Gửi chatbot và xem trong response có dùng Dify
- Vào Bài học, thử NotebookLM, flip book
- Bấm Ôn flashcard ở từng chương
- Bấm Làm quiz ở từng chương
- Làm quiz xong kiểm tra lưu kết quả

## Backup Database

LowDB lưu toàn bộ dữ liệu người dùng trong file `DB_PATH`. Hãy backup file này định kỳ.

Backup thủ công:

```bash
mkdir -p /var/backups/tthcm-ai
cp /var/www/tthcm-ai/data/tthcm.json /var/backups/tthcm-ai/tthcm-$(date +%F-%H%M).json
```

Cron backup mỗi ngày 02:30:

```bash
crontab -e
```

Thêm:

```cron
30 2 * * * mkdir -p /var/backups/tthcm-ai && cp /var/www/tthcm-ai/data/tthcm.json /var/backups/tthcm-ai/tthcm-$(date +\%F-\%H\%M).json
```

## Cập Nhật Phiên Bản Mới

```bash
cd /var/www/tthcm-ai
git pull
npm ci --omit=dev
npm run check
pm2 restart tthcm-ai --update-env
```

Nếu có thay đổi `.env`, sửa `.env` rồi restart PM2.

## Lưu Ý Bảo Mật

- Không commit `.env`.
- Không commit file database production.
- Dùng `JWT_SECRET` dài và ngẫu nhiên.
- `SEED_DEMO_USER=false` trong production.
- Nếu dùng Google OAuth, redirect URI phải đúng domain production.
- Nếu đổi domain, cập nhật cả `.env`, Google Cloud Console và Nginx.
- LowDB phù hợp giai đoạn nhỏ/vừa. Khi nhiều người dùng thật và ghi dữ liệu đồng thời cao, nên nâng cấp sang PostgreSQL/MySQL.

## Lệnh Hữu Ích

```bash
pm2 status
pm2 logs tthcm-ai
pm2 restart tthcm-ai --update-env
pm2 stop tthcm-ai
sudo nginx -t
sudo systemctl reload nginx
curl http://127.0.0.1:3000/api/health
```
