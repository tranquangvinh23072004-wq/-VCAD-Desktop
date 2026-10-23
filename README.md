# VC@D Desktop v1.2.9.1

Ứng dụng CAD 2D/3D (Electron + Three.js), giao diện tối, lệnh gần AutoCAD/Rhino cơ bản.

**Repo:** https://github.com/tranquangvinh23072004-wq/-VCAD-Desktop

---

## Tính năng chính (1.2.9.1)

| Nhóm | Lệnh / chức năng |
|------|------------------|
| Vẽ 2D | Line, Polyline, Spline, Rectangle, Circle, Arc |
| Hiệu chỉnh | Trim, Extend, Fillet, Join, Offset, PointsOn, Close, Explode |
| Biến đổi | Move, Rotate, Scale, Mirror, Array, Copy |
| 3D | Extrude (đường hở → tấm, kín → khối), Box, Sphere, Cylinder… |
| Hệ thống | OSNAP (Endpoint/Midpoint/Center/Face), Ortho, Gumball, Layers |
| Phím tắt | **Space** lặp lệnh · **Delete** xóa · **Esc** hủy · **C** đóng Polyline |
| Giao diện | Dock panel Trái / **Trên** / Dưới, theme tối, prompt kiểu Rhino |

**Luồng lệnh:** chọn lệnh trước → chọn đối tượng (Join, Mirror, Extrude, Offset, Fillet).

---

## Cấu trúc thư mục

```
-VCAD-Desktop/
├── main.js              # Electron main
├── preload.js
├── package.json         # version = 1.2.9.1
├── app/
│   ├── index.html       # UI + logic CAD
│   └── vendor/          # three, OrbitControls, tailwind, fontawesome
├── .github/workflows/   # (tuỳ chọn) auto build Release
├── build-windows.ps1
├── download-vendor.ps1
└── README.md
```

> **Bắt buộc:** giữ `app/vendor/`. Thiếu vendor thì viewport 3D / CSS không chạy.

---

## Chạy thử (máy dev)

Yêu cầu: [Node.js LTS](https://nodejs.org), Windows khuyến nghị.

```bash
npm install
npm start
```

---

## Build file cài Windows (Setup .exe)

```bash
npm install
npm run dist
```

File cài nằm tại:

```text
dist/VCAD-Setup-1.2.9.1.exe
```

- Gửi **một file .exe** này cho máy khác → double-click → cài như app thường.
- Máy người dùng **không** cần Node.js hay GitHub.

Chi tiết: xem `HUONG-DAN-BUILD-VA-CAI-DAT.txt` (nếu có trong gói phát hành).

---

## Đổi số phiên bản

1. Sửa trong `package.json`: `"version": "1.3.0"`
2. (Tuỳ chọn) Cập nhật badge/version trên UI trong `app/index.html`
3. Cập nhật tiêu đề README này
4. `npm run dist` → `VCAD-Setup-1.3.0.exe`
5. GitHub Release: tạo tag **`v1.3.0`** (khớp version) và đính kèm file Setup

---

## GitHub Release & nút Cập nhật trong app

1. Build ra `VCAD-Setup-x.y.z.exe`
2. **Releases → Draft a new release**
3. Tag: `v1.2.9.1` (đúng số `package.json`)
4. Upload: `.exe` (+ `.blockmap`, `latest.yml` nếu có)
5. Publish

Bản đã cài từ Release có thể dùng nút **Cập nhật** trong app khi có version mới hơn.

Nếu repo có `.github/workflows`, push `main` có thể tự build Release (kiểm tra tab **Actions**).

---

## Script hỗ trợ (Windows)

| File | Mục đích |
|------|----------|
| `download-vendor.ps1` | Tải lại thư viện vendor nếu thiếu |
| `build-windows.ps1` | Script build (nếu dùng) |
| `START-VCAD-WEB.bat` | Chạy dạng web (nếu còn hỗ trợ) |

---

## Lưu ý

- Đây là tool CAD **cơ bản** trên Three.js, không thay thế AutoCAD/Rhino đầy đủ.
- Boolean solid thật / DWG native / NURBS phức tạp chưa có.
- App chưa code-sign: Windows SmartScreen có thể cảnh báo lần đầu → *More info → Run anyway*.

---

## License

UNLICENSED (theo `package.json`).
