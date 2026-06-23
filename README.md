# E-Catalog - Quản lý bán trang sức

Một ứng dụng e-commerce hiện đại để quản lý bán hàng trang sức, xây dựng dựa trên thiết kế Figma.

## 🎯 Flow chính của ứng dụng

```
1. Chọn khách hàng (modal)
   ↓
2. Xem danh sách sản phẩm & tìm kiếm
   ↓
3. Xem chi tiết sản phẩm (modal)
   ↓
4. Thêm vào giỏ hàng (liên kết với đặt hàng được chọn)
   ↓
5. Klik "Xem giỏ hàng" (button sticky ở góc dưới phải)
   ↓
6. Điều chỉnh số lượng & xóa sản phẩm
   ↓
7. Tạo đơn hàng (nhập thông tin vận chuyển)
   ↓
8. Xem lịch sử đơn hàng ở trang khách hàng
```

## 📋 Các tính năng chính

### 1. **Danh sách sản phẩm** (`index.html`)
- ✅ Grid hiển thị sản phẩm đáp ứng
- ✅ Sidebar lọc theo danh mục
- ✅ Thanh tìm kiếm nhanh
- ✅ Lọc theo loại (Mới, Bán chạy, Có sẵn)
- ✅ **Modal chọn khách hàng** (tìm kiếm & lọc)
- ✅ Modal xem chi tiết sản phẩm
- ✅ Thêm nhanh vào giỏ hàng
- ✅ **Button sticky "Xem giỏ hàng"** ở góc dưới phải
- ✅ Quản lý nhiều đơn hàng (tags)

### 2. **Giỏ hàng** (`cart.html`)
- ✅ Danh sách sản phẩm đã chọn (theo đơn hàng)
- ✅ Điều chỉnh số lượng
- ✅ Tính tổng giá trị đơn hàng
- ✅ Xóa sản phẩm
- ✅ Hiển thị khách hàng được chọn
- ✅ Tóm tắt đơn hàng bên phải
- ✅ Nút "Tạo đơn hàng" → đi tới checkout

### 3. **Tạo đơn hàng chi tiết** (`checkout.html`)
- ✅ Hiển thị thông tin khách hàng (read-only)
- ✅ Danh sách sản phẩm trong đơn
- ✅ Nhập địa chỉ giao hàng
- ✅ Chọn ngày dự kiến & loại vận chuyển
- ✅ Ghi chú đơn hàng (tùy chọn)
- ✅ Tóm tắt đơn hàng & tính tiền
- ✅ Tạo đơn hàng → quay về trang khách hàng

### 4. **Thông tin khách hàng** (`customer.html`)
- ✅ Thẻ thông tin khách hàng chi tiết
- ✅ Cài đặt đơn hàng (lọc theo ngày, loại, trạng thái)
- ✅ Lịch sử đơn hàng
- ✅ Thống kê khách hàng
- ✅ Tìm kiếm đơn hàng nâng cao

## 🎨 Thiết kế & Màu sắc

```css
-- Xanh lam chính: #0052CC
-- Hồng: #FFB3D9
-- Vàng/Gold: #FFB800
-- Xám nhạt: #F9FAFB
-- Xám đường kẻ: #E5E7EB
```

## 📁 Cấu trúc thư mục

```
e-catalog-app/
├── start.html           # 🚀 Trang chủ - điều hướng
├── index.html           # Trang danh sách sản phẩm
├── cart.html            # Trang giỏ hàng
├── checkout.html        # Trang tạo đơn hàng chi tiết
├── customer.html        # Trang thông tin khách hàng
├── styles.css           # CSS chung cho toàn ứng dụng
├── script.js            # JavaScript cho tương tác (index.html)
└── README.md            # Tệp hướng dẫn này
```

## 🚀 Cách sử dụng

### Mở ứng dụng
1. Mở file `index.html` trong trình duyệt web
2. Hoặc dùng Live Server (nếu dùng VS Code):
   ```bash
   # Cài đặt Live Server extension
   # Klik chuột phải trên index.html > Open with Live Server
   ```

### Điều hướng giữa các trang
- **Trang danh sách sản phẩm**: `index.html`
- **Giỏ hàng**: Klik nút giỏ hàng trên header hoặc truy cập `cart.html`
- **Thông tin khách hàng**: Klik nút khách hàng hoặc truy cập `customer.html`

## 💻 Tính năng JavaScript

### 1. Modal sản phẩm
```javascript
// Mở modal xem chi tiết sản phẩm
detailButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    openProductModal(parseInt(btn.dataset.productId));
  });
});
```

### 2. Tìm kiếm sản phẩm
```javascript
// Tìm kiếm theo tên hoặc danh mục
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  // Lọc sản phẩm...
});
```

### 3. Quản lý số lượng
```javascript
// Tăng/giảm số lượng
quantityBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Cập nhật số lượng và tính toán lại giá
    updateTotalPrice();
  });
});
```

### 4. Thêm/Xóa tags
```javascript
// Thêm đơn hàng mới
tagAddButton.addEventListener('click', () => {
  const newTagName = prompt('Nhập tên đặt hàng mới:');
  // Tạo tag mới...
});
```

## 🎯 Hướng phát triển (TODO)

- [ ] Kết nối backend API
- [ ] Xác thực người dùng
- [ ] Lưu giỏ hàng vào LocalStorage
- [ ] Tính năng thanh toán thực tế
- [ ] Dashboard thống kê chi tiết
- [ ] Responsive trên mobile (optimize)
- [ ] Export đơn hàng (PDF/Excel)
- [ ] Notification real-time
- [ ] Dark mode
- [ ] Multi-language support

## 📱 Tương thích trình duyệt

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 📐 Responsive Design

- **Desktop**: Grid 3-4 cột sản phẩm
- **Tablet** (768px-1024px): Grid 2-3 cột, sidebar chuyển thành horizontal scroll
- **Mobile** (< 768px): 1 cột, sidebar ẩn, drawer menu

## 🔧 Tùy chỉnh

### Thay đổi màu sắc
Chỉnh sửa các CSS variables ở đầu file `styles.css`:

```css
:root {
  --primary-blue: #0052CC;      /* Màu xanh chính */
  --pink: #FFB3D9;               /* Màu hồng */
  --gold: #FFB800;               /* Màu vàng */
  /* ... */
}
```

### Thêm sản phẩm
Chỉnh sửa mảng `products` trong `script.js`:

```javascript
const products = [
  { id: 1, name: 'Sản phẩm 1', price: 450000, category: 'Nhân', variants: 5 },
  // Thêm sản phẩm mới tại đây
];
```

### Tùy chỉnh danh mục
Chỉnh sửa HTML trong `index.html`:

```html
<div class="category-item">
  <div class="category-icon">🎨</div>
  <span>Tên danh mục</span>
</div>
```

## 📖 Hướng dẫn chi tiết

### Step 1: Trang Danh sách sản phẩm (index.html)
1. **Klik "Chọn khách hàng"** → Mở modal chọn khách hàng
   - Tìm kiếm khách hàng theo tên hoặc SĐT
   - Klik vào khách hàng để chọn
2. **Header**: Tìm kiếm, chọn khách hàng, giỏ hàng, thông báo
3. **Filter Tags**: Quản lý nhiều đơn hàng cùng lúc (Đặt hàng 1, 2, 3...)
4. **Sidebar**: Lọc theo danh mục sản phẩm
5. **Content Header**: Lọc và sắp xếp sản phẩm
6. **Product Grid**: Hiển thị tất cả sản phẩm với:
   - Ảnh sản phẩm
   - Tên & mô tả
   - Giá tiền
   - Nút "Xem chi tiết"
   - Nút "+" thêm nhanh
7. **Button sticky dưới phải**: "Xem giỏ hàng" (hiển thị khi có sản phẩm)

### Step 2: Modal xem chi tiết sản phẩm
1. **Klik "Xem chi tiết"** → Mở modal sản phẩm
2. **Chọn màu sản phẩm** (Rose Gold, Silver, Gold...)
3. **Chọn màu đá** (Red, Blue, Cyan...)
4. **Điều chỉnh số lượng** (−/+)
5. **Thêm ghi chú** (tùy chọn)
6. **Klik "Thêm vào giỏ"** → Sản phẩm được thêm vào đơn hàng hiện tại
   - Nếu chưa chọn khách hàng → hiển thị warning

### Step 3: Giỏ hàng (cart.html)
1. **Klik button sticky "Xem giỏ hàng"** hoặc klik icon giỏ trong header
2. **Danh sách sản phẩm**: Hiển thị từng item với:
   - Ảnh
   - Tên & chi tiết (màu, đá)
   - Giá
   - Điều chỉnh số lượng (−/+)
   - Nút xóa (🗑)
3. **Tóm tắt**: Bên phải hiển thị:
   - Tổng sản phẩm
   - Tiền hàng
   - Phí vận chuyển
   - Giảm giá
   - Tổng cộng
4. **Nút hành động**:
   - "Tạo đơn hàng" → đi tới trang checkout
   - "Tiếp tục mua sắm" → quay về danh sách sản phẩm

### Step 4: Tạo đơn hàng (checkout.html)
1. **Thông tin khách hàng** (read-only):
   - Tên, điện thoại, email
2. **Danh sách sản phẩm**: Preview từng item
3. **Thông tin vận chuyển**:
   - Địa chỉ giao hàng
   - Ngày dự kiến giao
   - Loại vận chuyển (Tiêu chuẩn, Nhanh, Tự lấy)
4. **Ghi chú đơn hàng** (tùy chọn)
5. **Đồng ý với điều khoản** (bắt buộc)
6. **Klik "Tạo đơn hàng"** → Đơn hàng được lưu → Quay về trang khách hàng

### Step 5: Trang Thông tin khách hàng (customer.html)
1. **Thẻ thông tin**: Bên trái hiển thị:
   - Avatar & tên
   - Thông tin liên hệ
   - Thống kê
   - Nút chỉnh sửa
2. **Cài đặt đơn hàng**: Giữa/phải:
   - Lọc theo ngày
   - Loại đơn hàng
   - Trạng thái
   - Nút tìm kiếm
3. **Lịch sử đơn hàng**: Danh sách tất cả đơn hàng với:
   - Ngày
   - Số hiệu đơn hàng
   - Số sản phẩm
   - Tổng tiền
   - Nút xem chi tiết

## 🐛 Khắc phục sự cố

### Modal không mở
- Kiểm tra console xem có lỗi JavaScript không
- Đảm bảo file `script.js` được load đúng

### Css không hiển thị đúng
- Xóa cache trình duyệt (Ctrl+Shift+Delete)
- Kiểm tra đường dẫn file `styles.css`

### Responsive không hoạt động
- Thêm meta viewport tag (đã có sẵn)
- Kiểm tra media queries trong CSS

## 📝 Ghi chú

- Tất cả ảnh sản phẩm hiện là placeholder SVG, cần thay bằng hình thực
- Dữ liệu sản phẩm đang được hardcode, nên kết nối API thực tế
- LocalStorage chưa được triển khai, cần thêm để lưu giỏ hàng
- Chưa có backend, cần xây dựng API để xử lý thanh toán

## 👥 Liên hệ & Hỗ trợ

- Email: support@ecatalog.vn
- Hotline: 1900 XXXX XXX
- Website: www.ecatalog.vn

---

**Version**: 1.0  
**Last Updated**: 21/06/2024  
**License**: MIT
