# VC@D Desktop v1.2.1

## Tính năng bổ sung
- Nhập bản vẽ DXF dạng ASCII với các entity phổ biến: LINE, LWPOLYLINE, POLYLINE, CIRCLE, ARC và POINT.
- Hiển thị tên bản vẽ trên thanh menu; tên được lấy từ tên file khi mở DXF/JSON và có thể đổi trong Giao diện.
- Tùy chỉnh màu menubar và màu nền vùng làm việc; lựa chọn màu được lưu cục bộ trên máy.
- Giữ cấu hình GitHub Releases auto-update. `electron-updater` nằm trong `dependencies` để được đóng gói cùng ứng dụng.

## Lưu ý về DWG
VC@D chưa đọc trực tiếp DWG. Hãy mở DWG bằng AutoCAD hoặc công cụ CAD tương thích và dùng Save As/Export để lưu thành DXF ASCII trước khi nhập. File DXF có block INSERT, DIMENSION, HATCH, SPLINE hoặc annotation phức tạp có thể bỏ qua entity chưa được hỗ trợ.

## Build trên Windows
1. Cài Node.js LTS.
2. Giải nén ZIP và mở thư mục `VCAD-EXE-Project`.
3. Chạy `build-windows.ps1` bằng PowerShell, hoặc chạy `npm install` rồi `npm run dist`.
4. Bộ cài xuất hiện trong `dist/VCAD-Setup-1.2.1.exe`.

Không tải file cài đặt lên Release GitHub cho tới khi đã cài thử và xác nhận ứng dụng hoạt động. Khi phát hành, tải lên các tệp tạo ra trong `dist`, gồm `VCAD-Setup-1.2.1.exe`, `VCAD-Setup-1.2.1.exe.blockmap` và `latest.yml`.
