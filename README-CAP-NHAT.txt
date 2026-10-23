VC@D Desktop v1.2.10 (thay cho 1.2.9.1)

Vì sao 1.2.9.1 có thể "không hoạt động":
1) Version 1.2.9.1 KHÔNG phải semver chuẩn (MAJOR.MINOR.PATCH) → electron-builder / updater dễ lỗi.
2) OrbitControls gán mouseButtons.LEFT = -1 gây lỗi trên một số bản three.js.
3) Thiếu app/vendor khi chỉ upload index.html lên GitHub.
4) Khởi tạo khi viewport size = 0.

Sửa trong 1.2.10:
- version = 1.2.10 (semver hợp lệ)
- OrbitControls an toàn khi vẽ
- init bọc try/catch, báo lỗi rõ nếu thiếu vendor
- resize sau 50ms, filter mesh null

Build:
  npm install
  npm run dist
  → dist/VCAD-Setup-1.2.10.exe
