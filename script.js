'use strict';

// ═══════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════
const CUSTOMERS = [
  { id: 1, name: 'Anh Hoàng – Sài Gòn',     code: 'KH-00024', type: 'Giá sỉ A', discount: -5,  phone: '0901 234 567', email: 'hoang@email.com' },
  { id: 2, name: 'PNJ – Quận 5',             code: 'KH-00102', type: 'Giá sỉ B', discount: -3,  phone: '0912 345 678', email: 'pnj@email.com' },
  { id: 3, name: 'Tiệm Vàng Ngọc Loan',      code: 'KH-00214', type: 'Khách sỉ VIP', discount: -8, phone: '0987 654 321', email: 'ngocloan@email.com' },
  { id: 4, name: 'Nguyễn Thị Lan',           code: 'KH-00056', type: 'Giá sỉ A', discount: 0,   phone: '0911 222 333', email: 'lan@email.com' },
  { id: 5, name: 'Shop Trang Sức Hà Nội',    code: 'KH-00318', type: 'Giá sỉ B', discount: -3,  phone: '0922 333 444', email: 'hanoi@email.com' },
];

const COLOR_META = {
  'Bạc':          { dot: '#C0C0C0', border: '#A0A0A0' },
  'Mạ Vàng':      { dot: '#FFD700', border: '#DAA520' },
  'Mạ Vàng Hồng': { dot: '#E8A598', border: '#C98070' },
  'Vàng 18K':     { dot: '#FFB800', border: '#D49000' },
  'Vàng Trắng':   { dot: '#E8E8E8', border: '#B0B0B0' },
};

const CUSTOMER_REQUIREMENTS = [
  { id: 'dap-lacquer',    name: 'Đắp lacquer → Móc máy' },
  { id: 'danh-bong',      name: 'Đánh bóng → Móc máy' },
  { id: 'khoa',           name: 'Khóa', details: ['Khóa hộp', 'Khóa kín', 'Khóa button', 'Khóa tôm', 'Khóa chốt', 'Khóa xoắn'] },
  { id: 'kich-thuoc-day', name: 'Kích thước Dây', details: ['1.0mm', '1.2mm', '1.5mm', '1.8mm', '2.0mm', '2.5mm', '3.0mm'] },
  { id: 'kieu-bao-ball',  name: 'Kiểu bào Ball', details: ['Ball trơn', 'Ball xoắn', 'Ball kim cương', 'Ball cắt'] },
  { id: 'khong-khoen',    name: 'Không lấy khoen rơi + tag' },
  { id: 'loai-day',       name: 'Loại dây', details: ['Dây xích', 'Dây mì', 'Dây lụa', 'Dây rắn', 'Dây bi', 'Dây xoắn', 'Dây cable'] },
  { id: 'mau-day',        name: 'Màu dây', details: ['Vàng', 'Vàng hồng', 'Trắng', 'Đen', 'Bạc'] },
  { id: 'thay-mau-da',    name: 'Thay màu đá tấm', details: ['Trắng CZ', 'Hồng CZ', 'Xanh dương', 'Xanh lá', 'Đỏ Ruby', 'Vàng Citrine', 'Tím Amethyst', 'Đen Onyx'] },
];

const MATERIALS = [
  { id: 'bac',      name: 'Bạc',      icon: '🥈', desc: 'Bạc 925 · Tinh tế, bền màu',     color: '#C0C0C0', bg: '#F5F5F5', border: '#A0A0A0' },
  { id: 'vang',     name: 'Vàng',     icon: '🥇', desc: 'Vàng 18K · Sang trọng, phổ biến', color: '#FFB800', bg: '#FFF8E1', border: '#D49000' },
  { id: 'bachkim',  name: 'Bạch Kim', icon: '💎', desc: 'Platinum · Quý hiếm, cao cấp',    color: '#E8E8E8', bg: '#FAFAFA', border: '#BDBDBD' },
  { id: 'kimcuong', name: 'Kim Cương',icon: '💠', desc: 'Diamond · Đỉnh cao xa xỉ',        color: '#A5F3FC', bg: '#ECFEFF', border: '#67E8F9' },
];


// Chủng loại: Vòng tay=BE, Nhẫn=RG, Dây chuyền=NE, Bông tai=ER, Mặt dây nữ=PT
// SPU (DrawingNo): {chủng loại 2}{số 6}{A00}                    → BT000001A00
// Version code:    {chủng loại 2}{số 6}{B01/B02/B03}             → BT000001B01
// SKU (ItemNo):    {nguyên liệu+màu 3}{chủng loại 2}{số 6}{routing 3}{BOM 3}{phụ liệu chính+màu 5}{phụ liệu phụ+màu 5}{kích thước 2-3}
const PRODUCTS = [
  {
    id: 1, name: 'Nhẫn Bạc Nữ Đính Đá CZ Hoa Cổ',
    drawingNo: 'RG000001A00',
    badge: 'Bán chạy', category: 'nhan', priceRange: '450.000đ – 490.000đ',
    image: 'ring_v1',
    specs: { group: 'Nhẫn', purity: '925', material: 'Diamond', metal: 'Bạc 925', weight: '2.1-2.4g', materialId: 'bac', purityId: '925' },
    versions: [
      { id: 'v1', name: 'Hoa Cổ Điển', code: 'RG000001B01', image: 'ring_v1', desc: 'Kiểu đá đơn cổ điển' },
      { id: 'v2', name: 'Hoa Hiện Đại', code: 'RG000001B02', image: 'ring_v2', desc: 'Kiểu hoa cách điệu' },
      { id: 'v3', name: 'Đơn Giản',     code: 'RG000001B03', image: 'ring_v3', desc: 'Kiểu trơn tối giản' },
    ],
    variants: [
      { sku:'SS0RG000001A00A00CZWH1-----06', color:'Bạc',          size:6,  weight:'2.1g', stone:'Trắng', stock:42, price:450000, wholesalePrice:450000 },
      { sku:'SS0RG000001A00A00CZWH1-----07', color:'Bạc',          size:7,  weight:'2.2g', stone:'Trắng', stock:38, price:450000, wholesalePrice:450000 },
      { sku:'SS0RG000001A00A00CZWH1-----08', color:'Bạc',          size:8,  weight:'2.3g', stone:'Trắng', stock:30, price:450000, wholesalePrice:450000 },
      { sku:'SS0RG000001A00A00CZWH1-----09', color:'Bạc',          size:9,  weight:'2.4g', stone:'Trắng', stock:15, price:450000, wholesalePrice:450000 },
      { sku:'SY0RG000001A00A00CZWH1-----07', color:'Mạ Vàng',      size:7,  weight:'2.2g', stone:'Trắng', stock:25, price:480000, wholesalePrice:480000 },
      { sku:'SY0RG000001A00A00CZWH1-----08', color:'Mạ Vàng',      size:8,  weight:'2.3g', stone:'Trắng', stock:20, price:480000, wholesalePrice:480000 },
      { sku:'SR0RG000001A00A00CZRO1-----07', color:'Mạ Vàng Hồng', size:7,  weight:'2.2g', stone:'Hồng',  stock:18, price:490000, wholesalePrice:490000 },
      { sku:'SR0RG000001A00A00CZRO1-----08', color:'Mạ Vàng Hồng', size:8,  weight:'2.3g', stone:'Hồng',  stock:12, price:490000, wholesalePrice:490000 },
      { sku:'SY0RG000001A00A00CZYE1-----07', color:'Mạ Vàng',      size:7,  weight:'2.2g', stone:'Vàng',  stock:14, price:470000, wholesalePrice:470000 },
      { sku:'SY0RG000001A00A00CZTM1-----07', color:'Mạ Vàng',     size:7,  weight:'2.2g', stone:'Tím',   stock:10, price:475000, wholesalePrice:475000 },
    ],
  },
  {
    id: 2, name: 'Lắc Tay Vàng 18K Charm Đính Đá',
    drawingNo: 'BE000002A00',
    badge: 'Bán chạy', category: 'vong-tay', priceRange: '2.650.000đ – 3.000.000đ',
    image: 'bracelet_v1',
    specs: { group: 'Lắc tay', purity: '75Y', material: 'CZ / Kim cương', metal: 'Vàng 18K', weight: '3.8-4.2g', materialId: 'vang', purityId: '18k' },
    versions: [
      { id: 'v1', name: 'Nón Lá & Vespa', code: 'BE000002B01', image: 'bracelet_v1', desc: 'Charm nón lá, vespa, đèn lồng',
        photos: { 'Vàng 18K': 'images/nonla&vespa/bracelet-v2-vang.png', 'Vàng Trắng': 'images/nonla&vespa/bracelet-v2-tim.png' } },
      { id: 'v2', name: 'Ghế & Cà Phê', code: 'BE000002B02', image: 'bracelet_v2', desc: 'Charm ghế nhựa, cà phê phin',
        photos: { 'Vàng 18K': 'images/ghe&caphe/vang.png', 'Vàng Trắng': 'images/ghe&caphe/do.png' } },
    ],
    variants: [
      { sku:'GY0BE000002A00A00CZGO1DI00114', color:'Vàng 18K',    size:14, weight:'3.8g', stone:'Xanh',  stock:56, price:2650000, wholesalePrice:2517500 },
      { sku:'GY0BE000002A00A00CZGO1DI00115', color:'Vàng 18K',    size:15, weight:'4.0g', stone:'Xanh',  stock:34, price:2750000, wholesalePrice:2612500 },
      { sku:'GY0BE000002A00A00CZGO1DI00116', color:'Vàng 18K',    size:16, weight:'4.2g', stone:'Xanh',  stock:20, price:2900000, wholesalePrice:2755000 },
      { sku:'GY0BE000002A00A00CZTM1DI00114', color:'Vàng 18K',    size:14, weight:'3.8g', stone:'Tím',   stock:18, price:2700000, wholesalePrice:2565000 },
      { sku:'GY0BE000002A00A00CZTM1DI00115', color:'Vàng 18K',    size:15, weight:'4.0g', stone:'Tím',   stock:12, price:2800000, wholesalePrice:2660000 },
      { sku:'GW0BE000002A00A00DI001CZGO114', color:'Vàng Trắng',  size:14, weight:'3.8g', stone:'Trắng', stock:12, price:3000000, wholesalePrice:2850000 },
      { sku:'GW0BE000002A00A00DI001CZGO115', color:'Vàng Trắng',  size:15, weight:'4.0g', stone:'Trắng', stock:8,  price:3200000, wholesalePrice:3040000 },
    ],
  },
  {
    id: 3, name: 'Dây Chuyền Vàng 18K Mặt Bướm',
    drawingNo: 'NE000003A00',
    badge: 'Mới', category: 'day-chuyen', priceRange: '3.200.000đ – 3.600.000đ',
    image: 'chain_v1',
    specs: { group: 'Dây chuyền', purity: '75Y', material: 'Ruby', metal: 'Vàng 18K', weight: '5.1-5.6g', materialId: 'vang', purityId: '18k' },
    versions: [
      { id: 'v1', name: 'Mặt Bướm', code: 'NE000003B01', image: 'chain_v1', desc: 'Mặt dây hình bướm' },
      { id: 'v2', name: 'Mặt Hoa',  code: 'NE000003B02', image: 'chain_v2', desc: 'Mặt dây hình hoa' },
    ],
    variants: [
      { sku:'GY0NE000003A00A00RBRD1-----40', color:'Vàng 18K',    size:40, weight:'5.1g', stone:'Đỏ',  stock:22, price:3200000, wholesalePrice:3040000 },
      { sku:'GY0NE000003A00A00RBRD1-----42', color:'Vàng 18K',    size:42, weight:'5.3g', stone:'Đỏ',  stock:18, price:3350000, wholesalePrice:3182500 },
      { sku:'GY0NE000003A00A00RBRD1-----45', color:'Vàng 18K',    size:45, weight:'5.6g', stone:'Đỏ',  stock:10, price:3600000, wholesalePrice:3420000 },
      { sku:'GW0NE000003A00A00RBRD1-----40', color:'Vàng Trắng',  size:40, weight:'5.1g', stone:'Đỏ',  stock:14, price:3400000, wholesalePrice:3230000 },
    ],
  },
  {
    id: 4, name: 'Bông Tai Bạc Đính Đá Ngọc Trai',
    drawingNo: 'ER000004A00',
    badge: 'Có sẵn', category: 'bong-tai', priceRange: '320.000đ – 380.000đ',
    image: 'earring_v1',
    specs: { group: 'Bông tai', purity: '925', material: 'Ngọc Trai', metal: 'Bạc 925', weight: '1.5g', materialId: 'bac', purityId: '925' },
    versions: [
      { id: 'v1', name: 'Giọt Nước', code: 'ER000004B01', image: 'earring_v1', desc: 'Kiểu giọt nước' },
      { id: 'v2', name: 'Tròn',      code: 'ER000004B02', image: 'earring_v2', desc: 'Kiểu tròn cổ điển' },
    ],
    variants: [
      { sku:'SS0ER000004A00A00PLWH1-----00', color:'Bạc',          size:0,  weight:'1.5g', stone:'Trắng Ngọc', stock:64, price:320000, wholesalePrice:320000 },
      { sku:'SY0ER000004A00A00PLWH1-----00', color:'Mạ Vàng',      size:0,  weight:'1.5g', stone:'Trắng Ngọc', stock:45, price:360000, wholesalePrice:360000 },
      { sku:'SR0ER000004A00A00PLWH1-----00', color:'Mạ Vàng Hồng', size:0,  weight:'1.5g', stone:'Trắng Ngọc', stock:38, price:380000, wholesalePrice:380000 },
    ],
  },
  {
    id: 5, name: 'Nhẫn Đôi Bạc Khắc Tên',
    drawingNo: 'RG000005A00',
    badge: 'Nhận đôi', category: 'cap-nhan', priceRange: '550.000đ / cặp',
    image: 'pair_v1',
    specs: { group: 'Cặp nhẫn', purity: '925', material: 'Không', metal: 'Bạc 925', weight: '3.2-3.6g', materialId: 'bac', purityId: '925' },
    versions: [
      { id: 'v1', name: 'Trơn Khắc Tên', code: 'RG000005B01', image: 'pair_v1', desc: 'Nhẫn trơn khắc tên' },
      { id: 'v2', name: 'Đính Đá',       code: 'RG000005B02', image: 'pair_v2', desc: 'Nhẫn đính đá CZ' },
    ],
    variants: [
      { sku:'SS0RG000005A00A00----------06', color:'Bạc',          size:6,  weight:'3.2g', stone:'Không',   stock:30, price:550000, wholesalePrice:522500 },
      { sku:'SS0RG000005A00A00----------07', color:'Bạc',          size:7,  weight:'3.4g', stone:'Không',   stock:28, price:550000, wholesalePrice:522500 },
      { sku:'SS0RG000005A00A00----------08', color:'Bạc',          size:8,  weight:'3.6g', stone:'Không',   stock:22, price:550000, wholesalePrice:522500 },
      { sku:'SY0RG000005A00A00----------07', color:'Mạ Vàng',      size:7,  weight:'3.4g', stone:'Không',   stock:15, price:580000, wholesalePrice:551000 },
    ],
  },
  {
    id: 6, name: 'Mặt Dây Chuyền Bạc Hoa Sen',
    drawingNo: 'PT000006A00',
    badge: 'MOQ thấp', category: 'mat-day', priceRange: '180.000đ – 220.000đ',
    image: 'pendant_v1',
    specs: { group: 'Mặt dây', purity: '925', material: 'Không', metal: 'Bạc 925', weight: '1.2g', materialId: 'bac', purityId: '925' },
    versions: [
      { id: 'v1', name: 'Hoa Sen',  code: 'PT000006B01', image: 'pendant_v1', desc: 'Mặt hoa sen' },
      { id: 'v2', name: 'Lá Bồ Đề', code: 'PT000006B02', image: 'pendant_v2', desc: 'Mặt lá bồ đề' },
      { id: 'v3', name: 'Chữ Phúc', code: 'PT000006B03', image: 'pendant_v3', desc: 'Mặt chữ Phúc' },
    ],
    variants: [
      { sku:'SS0PT000006A00A00----------00', color:'Bạc',          size:0,  weight:'1.2g', stone:'Không',    stock:80, price:180000, wholesalePrice:180000 },
      { sku:'SY0PT000006A00A00----------00', color:'Mạ Vàng',      size:0,  weight:'1.2g', stone:'Không',    stock:60, price:200000, wholesalePrice:200000 },
      { sku:'SR0PT000006A00A00----------00', color:'Mạ Vàng Hồng', size:0,  weight:'1.2g', stone:'Không',    stock:50, price:220000, wholesalePrice:220000 },
    ],
  },
  // ── VÀNG ──────────────────────────────────────────
  {
    id: 7, name: 'Nhẫn Vàng 18K Đính Đá Ruby',
    drawingNo: 'RG000007A00',
    badge: 'Bán chạy', category: 'nhan', priceRange: '3.800.000đ – 4.200.000đ',
    image: 'ring_v1',
    specs: { group: 'Nhẫn', metal: 'Vàng 18K', weight: '2.8-3.2g', materialId: 'vang' },
    versions: [
      { id: 'v1', name: 'Ổ Đơn', code: 'RG000007B01', image: 'ring_v1', desc: 'Một viên ruby trung tâm' },
      { id: 'v2', name: 'Hoa 5 Cánh', code: 'RG000007B02', image: 'ring_v2', desc: 'Năm viên tạo hình hoa' },
    ],
    variants: [
      { sku:'GY0RG000007A00A00RBRD1-----06', color:'Vàng 18K',   size:6,  weight:'2.8g', stone:'Đỏ', stock:20, price:3800000, wholesalePrice:3610000 },
      { sku:'GY0RG000007A00A00RBRD1-----07', color:'Vàng 18K',   size:7,  weight:'3.0g', stone:'Đỏ', stock:18, price:4000000, wholesalePrice:3800000 },
      { sku:'GY0RG000007A00A00RBRD1-----08', color:'Vàng 18K',   size:8,  weight:'3.2g', stone:'Đỏ', stock:12, price:4200000, wholesalePrice:3990000 },
      { sku:'GW0RG000007A00A00RBRD1-----07', color:'Vàng Trắng', size:7,  weight:'3.0g', stone:'Đỏ', stock:10, price:4100000, wholesalePrice:3895000 },
    ],
  },
  {
    id: 8, name: 'Bông Tai Vàng 18K Ngọc Trai',
    drawingNo: 'ER000008A00',
    badge: 'Mới', category: 'bong-tai', priceRange: '2.200.000đ – 2.600.000đ',
    image: 'earring_v1',
    specs: { group: 'Bông tai', metal: 'Vàng 18K', weight: '2.0g', materialId: 'vang' },
    versions: [
      { id: 'v1', name: 'Tròn Classic', code: 'ER000008B01', image: 'earring_v1', desc: 'Ngọc trai tròn cổ điển' },
      { id: 'v2', name: 'Giọt Nước',   code: 'ER000008B02', image: 'earring_v2', desc: 'Ngọc trai giọt nước' },
    ],
    variants: [
      { sku:'GY0ER000008A00A00PLWH1-----00', color:'Vàng 18K',   size:0, weight:'2.0g', stone:'Trắng Ngọc', stock:35, price:2200000, wholesalePrice:2090000 },
      { sku:'GW0ER000008A00A00PLWH1-----00', color:'Vàng Trắng', size:0, weight:'2.0g', stone:'Trắng Ngọc', stock:20, price:2600000, wholesalePrice:2470000 },
    ],
  },
  {
    id: 9, name: 'Vòng Tay Vàng 18K Trơn',
    drawingNo: 'BE000009A00',
    badge: 'Có sẵn', category: 'vong-tay', priceRange: '5.500.000đ – 6.200.000đ',
    image: 'bracelet_v1',
    specs: { group: 'Vòng tay', metal: 'Vàng 18K', weight: '6.0-7.0g', materialId: 'vang' },
    versions: [
      { id: 'v1', name: 'Trơn Bóng',  code: 'BE000009B01', image: 'bracelet_v1', desc: 'Mặt bóng gương' },
      { id: 'v2', name: 'Xước Nhám',  code: 'BE000009B02', image: 'bracelet_v2', desc: 'Mặt xước chống trầy' },
    ],
    variants: [
      { sku:'GY0BE000009A00A00----------14', color:'Vàng 18K',   size:14, weight:'6.0g', stone:'Không', stock:25, price:5500000, wholesalePrice:5225000 },
      { sku:'GY0BE000009A00A00----------16', color:'Vàng 18K',   size:16, weight:'7.0g', stone:'Không', stock:18, price:6200000, wholesalePrice:5890000 },
      { sku:'GW0BE000009A00A00----------14', color:'Vàng Trắng', size:14, weight:'6.0g', stone:'Không', stock:12, price:5800000, wholesalePrice:5510000 },
    ],
  },
  // ── BẠCH KIM ──────────────────────────────────────
  {
    id: 10, name: 'Nhẫn Bạch Kim Đính CZ',
    drawingNo: 'RG000010A00',
    badge: 'Mới', category: 'nhan', priceRange: '8.500.000đ – 9.500.000đ',
    image: 'ring_v2',
    specs: { group: 'Nhẫn', metal: 'Bạch Kim Pt950', weight: '4.0-4.5g', materialId: 'bachkim' },
    versions: [
      { id: 'v1', name: 'Ổ Pavé',  code: 'RG000010B01', image: 'ring_v2', desc: 'Đá pavé quanh ổ' },
      { id: 'v2', name: 'Halo',    code: 'RG000010B02', image: 'ring_v1', desc: 'Viên lớn + halo' },
    ],
    variants: [
      { sku:'PT0RG000010A00A00CZWH1-----06', color:'Bạch Kim', size:6, weight:'4.0g', stone:'Trắng', stock:10, price:8500000, wholesalePrice:8075000 },
      { sku:'PT0RG000010A00A00CZWH1-----07', color:'Bạch Kim', size:7, weight:'4.2g', stone:'Trắng', stock:8,  price:9000000, wholesalePrice:8550000 },
      { sku:'PT0RG000010A00A00CZWH1-----08', color:'Bạch Kim', size:8, weight:'4.5g', stone:'Trắng', stock:6,  price:9500000, wholesalePrice:9025000 },
    ],
  },
  {
    id: 11, name: 'Dây Chuyền Bạch Kim Mặt Oval',
    drawingNo: 'NE000011A00',
    badge: 'Có sẵn', category: 'day-chuyen', priceRange: '12.000.000đ – 14.000.000đ',
    image: 'chain_v2',
    specs: { group: 'Dây chuyền', metal: 'Bạch Kim Pt950', weight: '7.0-8.0g', materialId: 'bachkim' },
    versions: [
      { id: 'v1', name: 'Mặt Oval',   code: 'NE000011B01', image: 'chain_v2', desc: 'Mặt hình oval thanh lịch' },
      { id: 'v2', name: 'Mặt Tròn',   code: 'NE000011B02', image: 'chain_v1', desc: 'Mặt hình tròn cổ điển' },
    ],
    variants: [
      { sku:'PT0NE000011A00A00----------40', color:'Bạch Kim', size:40, weight:'7.0g', stone:'Không', stock:8,  price:12000000, wholesalePrice:11400000 },
      { sku:'PT0NE000011A00A00----------42', color:'Bạch Kim', size:42, weight:'7.5g', stone:'Không', stock:6,  price:13000000, wholesalePrice:12350000 },
      { sku:'PT0NE000011A00A00----------45', color:'Bạch Kim', size:45, weight:'8.0g', stone:'Không', stock:4,  price:14000000, wholesalePrice:13300000 },
    ],
  },
  // ── KIM CƯƠNG ─────────────────────────────────────
  {
    id: 12, name: 'Nhẫn Kim Cương Solitaire',
    drawingNo: 'RG000012A00',
    badge: 'Cao cấp', category: 'nhan', priceRange: '45.000.000đ – 80.000.000đ',
    image: 'ring_v1',
    specs: { group: 'Nhẫn', metal: 'Vàng Trắng 18K + Kim Cương', weight: '3.5-4.0g', materialId: 'kimcuong' },
    versions: [
      { id: 'v1', name: '0.3 Carat', code: 'RG000012B01', image: 'ring_v1', desc: 'Kim cương 0.3ct GIA' },
      { id: 'v2', name: '0.5 Carat', code: 'RG000012B02', image: 'ring_v2', desc: 'Kim cương 0.5ct GIA' },
      { id: 'v3', name: '1.0 Carat', code: 'RG000012B03', image: 'ring_v3', desc: 'Kim cương 1.0ct GIA' },
    ],
    variants: [
      { sku:'GW0RG000012A00A00DI001-----06', color:'Vàng Trắng', size:6, weight:'3.5g', stone:'Kim cương', stock:5,  price:45000000, wholesalePrice:42750000 },
      { sku:'GW0RG000012A00A00DI001-----07', color:'Vàng Trắng', size:7, weight:'3.7g', stone:'Kim cương', stock:4,  price:55000000, wholesalePrice:52250000 },
      { sku:'GW0RG000012A00A00DI001-----08', color:'Vàng Trắng', size:8, weight:'4.0g', stone:'Kim cương', stock:3,  price:80000000, wholesalePrice:76000000 },
      { sku:'GY0RG000012A00A00DI001-----07', color:'Vàng 18K',   size:7, weight:'3.7g', stone:'Kim cương', stock:3,  price:50000000, wholesalePrice:47500000 },
    ],
  },
  {
    id: 13, name: 'Dây Chuyền Kim Cương Tennis',
    drawingNo: 'NE000013A00',
    badge: 'Cao cấp', category: 'day-chuyen', priceRange: '120.000.000đ – 200.000.000đ',
    image: 'chain_v1',
    specs: { group: 'Dây chuyền', metal: 'Vàng Trắng 18K + Kim Cương', weight: '10.0-14.0g', materialId: 'kimcuong' },
    versions: [
      { id: 'v1', name: '2 Carat Total', code: 'NE000013B01', image: 'chain_v1', desc: 'Tổng 2ct kim cương thiên nhiên' },
      { id: 'v2', name: '3 Carat Total', code: 'NE000013B02', image: 'chain_v2', desc: 'Tổng 3ct kim cương thiên nhiên' },
    ],
    variants: [
      { sku:'GW0NE000013A00A00DI001-----40', color:'Vàng Trắng', size:40, weight:'10.0g', stone:'Kim cương', stock:3, price:120000000, wholesalePrice:114000000 },
      { sku:'GW0NE000013A00A00DI001-----42', color:'Vàng Trắng', size:42, weight:'12.0g', stone:'Kim cương', stock:2, price:160000000, wholesalePrice:152000000 },
      { sku:'GW0NE000013A00A00DI001-----45', color:'Vàng Trắng', size:45, weight:'14.0g', stone:'Kim cương', stock:2, price:200000000, wholesalePrice:190000000 },
    ],
  },
  {
    id: 14, name: 'Bông Tai Kim Cương Stud',
    drawingNo: 'ER000014A00',
    badge: 'Cao cấp', category: 'bong-tai', priceRange: '30.000.000đ – 60.000.000đ',
    image: 'earring_v2',
    specs: { group: 'Bông tai', metal: 'Vàng Trắng 18K + Kim Cương', weight: '1.5g', materialId: 'kimcuong' },
    versions: [
      { id: 'v1', name: '0.2ct/viên', code: 'ER000014B01', image: 'earring_v2', desc: 'Mỗi bông 0.2ct GIA' },
      { id: 'v2', name: '0.5ct/viên', code: 'ER000014B02', image: 'earring_v1', desc: 'Mỗi bông 0.5ct GIA' },
    ],
    variants: [
      { sku:'GW0ER000014A00A00DI001-----00', color:'Vàng Trắng', size:0, weight:'1.5g', stone:'Kim cương', stock:6, price:30000000, wholesalePrice:28500000 },
      { sku:'GY0ER000014A00A00DI001-----00', color:'Vàng 18K',   size:0, weight:'1.5g', stone:'Kim cương', stock:4, price:35000000, wholesalePrice:33250000 },
    ],
  },
  {
    id: 15, name: 'Lắc Tay Kim Cương Eternity',
    drawingNo: 'BE000015A00',
    badge: 'Cao cấp', category: 'vong-tay', priceRange: '85.000.000đ – 130.000.000đ',
    image: 'bracelet_v2',
    specs: { group: 'Lắc tay', metal: 'Bạch Kim Pt950 + Kim Cương', weight: '8.0-10.0g', materialId: 'kimcuong' },
    versions: [
      { id: 'v1', name: 'Full Eternity',  code: 'BE000015B01', image: 'bracelet_v2', desc: 'Kim cương vòng quanh trọn vẹn' },
      { id: 'v2', name: 'Half Eternity',  code: 'BE000015B02', image: 'bracelet_v1', desc: 'Kim cương nửa vòng' },
    ],
    variants: [
      { sku:'PT0BE000015A00A00DI001-----14', color:'Bạch Kim', size:14, weight:'8.0g',  stone:'Kim cương', stock:3, price:85000000,  wholesalePrice:80750000 },
      { sku:'PT0BE000015A00A00DI001-----16', color:'Bạch Kim', size:16, weight:'10.0g', stone:'Kim cương', stock:2, price:130000000, wholesalePrice:123500000 },
    ],
  },
];

// ═══════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════
let selectedCustomer = null;
let selectedMaterial = null;
let cart = [];

// Multi-order state
let orders = [
  { id: 1, cart: [], material: null },
];
let activeOrderId = 1;
let orderSeq = 1;

function getActiveOrder() { return orders.find(o => o.id === activeOrderId); }

function saveOrderState() {
  const o = getActiveOrder();
  if (!o) return;
  o.cart = cart;
  o.material = selectedMaterial;
}

function loadOrderState(order) {
  cart = order.cart;
  selectedMaterial = order.material;
}

function switchOrder(id) {
  saveOrderState();
  activeOrderId = id;
  loadOrderState(getActiveOrder());
  renderSubHeader();
  updateStickyBtn();
  renderProducts(getFilteredProducts());
}

function addNewOrder() {
  saveOrderState();
  orderSeq++;
  const newOrder = { id: orderSeq, cart: [], material: null, customName: null };
  orders.push(newOrder);
  activeOrderId = orderSeq;
  loadOrderState(newOrder);
  renderSubHeader();
  openMaterialModal();
}

function duplicateOrder(id, e) {
  e.stopPropagation();
  saveOrderState();
  const source = orders.find(o => o.id === id);
  if (!source) return;
  orderSeq++;
  const srcName = source.customName || `Đặt hàng ${orders.indexOf(source) + 1}`;
  const newOrder = {
    id: orderSeq,
    cart: source.cart.map(item => ({ ...item })),
    material: source.material,
    customName: srcName + ' (bản sao)',
  };
  orders.push(newOrder);
  activeOrderId = orderSeq;
  loadOrderState(newOrder);
  renderSubHeader();
  updateStickyBtn();
  renderProducts(getFilteredProducts());
  showNotification(`✓ Đã nhân đôi Đặt hàng ${source.id} → Đặt hàng ${orderSeq}`);
}

function removeOrder(id, e) {
  e.stopPropagation();
  if (orders.length <= 1) return;
  orders = orders.filter(o => o.id !== id);
  if (activeOrderId === id) {
    activeOrderId = orders[0].id;
    loadOrderState(getActiveOrder());
  }
  renderSubHeader();
  updateStickyBtn();
  renderProducts(getFilteredProducts());
}

// ── ORDER TAB CONTEXT MENU ──
let ctxMenuOrderId = null;

function showOrderContextMenu(e, orderId) {
  e.preventDefault();
  e.stopPropagation();
  ctxMenuOrderId = orderId;
  const menu = document.getElementById('orderContextMenu');
  const order = orders.find(o => o.id === orderId);

  // Position
  menu.style.left = e.clientX + 'px';
  menu.style.top = e.clientY + 'px';
  menu.style.display = 'block';

  // Disable delete if only 1 order
  const delBtn = document.getElementById('ctxDeleteOrder');
  delBtn.style.opacity = orders.length <= 1 ? '.4' : '1';
  delBtn.style.pointerEvents = orders.length <= 1 ? 'none' : '';
}

function hideOrderContextMenu() {
  document.getElementById('orderContextMenu').style.display = 'none';
  ctxMenuOrderId = null;
}

function ctxDuplicate() {
  const id = ctxMenuOrderId;
  hideOrderContextMenu();
  if (id === null) return;
  duplicateOrder(id, { stopPropagation: () => {} });
}

function ctxRename() {
  const id = ctxMenuOrderId;
  hideOrderContextMenu();
  const order = orders.find(o => o.id === id);
  if (!order) return;
  const currentName = order.customName || `Đặt hàng ${orders.indexOf(order) + 1}`;
  const newName = prompt('Đổi tên đặt hàng:', currentName);
  if (newName?.trim()) {
    order.customName = newName.trim();
    renderSubHeader();
  }
}

function ctxDelete() {
  const id = ctxMenuOrderId;
  hideOrderContextMenu();
  if (orders.length <= 1) return;
  removeOrder(id, { stopPropagation: () => {} });
}

function onTabClick(e, orderId) {
  e.stopPropagation();
  if (orderId === activeOrderId) {
    // Already active → show context menu below the tab
    showOrderContextMenu(e, orderId);
  } else {
    // Switch to this order
    hideOrderContextMenu();
    switchOrder(orderId);
  }
}

// Close context menu on click/touch anywhere
document.addEventListener('click', e => {
  const menu = document.getElementById('orderContextMenu');
  if (menu && menu.style.display === 'block' && !menu.contains(e.target)) hideOrderContextMenu();
});

function getFilteredProducts() {
  if (!selectedMaterial) return PRODUCTS;
  // Filter by material only — show all products of selected material type
  return PRODUCTS.filter(p => p.specs.materialId === selectedMaterial.id);
}

function renderSubHeader() {
  const el = document.getElementById('subHeader');
  if (!el || !selectedCustomer) { if (el) el.style.display = 'none'; return; }
  el.style.display = '';

  const tabsHtml = orders.map(o => {
    const isActive = o.id === activeOrderId;
    const itemCount = o.cart.length;
    const matIcon = o.material?.icon || '';
    const label = o.customName || `Đặt hàng ${orders.indexOf(o) + 1}`;
    return `
      <button onclick="onTabClick(event, ${o.id})" class="sub-tab${isActive ? ' active' : ''}">
        <span>${label}</span>
        ${itemCount > 0 ? `<span class="sub-tab-badge">${itemCount}</span>` : ''}
        ${matIcon ? `<span class="sub-tab-meta">${matIcon}</span>` : ''}
      </button>`;
  }).join('');

  const matPurHtml = selectedMaterial ? `
    <div class="sub-chips">
      <button class="sub-chip" onclick="openMaterialModal()" title="Đổi nguyên liệu">
        ${selectedMaterial.icon} ${selectedMaterial.name}
        <span style="margin-left:4px;opacity:.5;font-size:10px;">✎</span>
      </button>
    </div>` : '';

  el.innerHTML = `
    <div class="sub-header-left">
      <div class="sub-tabs">${tabsHtml}</div>
      <button class="sub-add-btn" onclick="addNewOrder()" title="Thêm đặt hàng mới">+ Thêm</button>
    </div>
    ${matPurHtml}`;
}

// Returns true if product has real selectable sizes (size > 0)
function productHasSizes(product) {
  return product.variants.some(v => v.size > 0);
}

// Product modal state
let pmCurrentProduct = null;
let pmCurrentTab     = 'retail';
let pmRetailColor    = null;
let pmRetailSize     = null;
let pmRetailQty      = 1;
let pmWholesaleQtys  = {}; // synced from quick rows for footer calc
let pmCustomerNote   = '';
let pmCustomerReqs   = [];   // ['khoa', 'loai-day', ...]
let pmReqDetails     = {};   // { 'khoa': 'Khóa hộp', 'loai-day': 'Dây xích', ... }
let pmQuickRows      = []; // [{id, color, size, qty}]
let pmQuickSeq       = 0;
let pmActiveVersion  = null; // selected version object

// ═══════════════════════════════════════════════════
// UTILS
// ═══════════════════════════════════════════════════
const fmt = n => new Intl.NumberFormat('vi-VN').format(n) + 'đ';
const getColorDot = color => (COLOR_META[color] || { dot: '#9CA3AF' }).dot;

const STONE_COLOR_MAP = {
  'Trắng':       { bg: '#F8F8F8',  border: '#D1D5DB' },
  'Hồng':        { bg: '#F9A8D4',  border: '#EC4899' },
  'Đỏ':          { bg: '#EF4444',  border: '#B91C1C' },
  'Xanh':        { bg: '#93C5FD',  border: '#3B82F6' },
  'Tím':         { bg: '#C4B5FD',  border: '#7C3AED' },
  'Vàng':        { bg: '#FDE68A',  border: '#F59E0B' },
  'Trắng Ngọc':  { bg: '#FEF9C3',  border: '#FDE047' },
  'Kim cương':   { bg: '#E0F2FE',  border: '#7DD3FC' },
};
function getStoneColor(stone) {
  if (STONE_COLOR_MAP[stone]) return STONE_COLOR_MAP[stone];
  if (stone.includes('Xanh') || stone.includes('xanh')) return { bg: '#6EE7B7', border: '#059669' };
  if (stone.includes('Đỏ')   || stone.includes('Ruby'))  return { bg: '#FCA5A5', border: '#EF4444' };
  if (stone.includes('Tím')  || stone.includes('tím'))   return { bg: '#C4B5FD', border: '#7C3AED' };
  if (stone.includes('Vàng') || stone.includes('vàng'))  return { bg: '#FDE68A', border: '#F59E0B' };
  if (stone.includes('Hồng') || stone.includes('hồng'))  return { bg: '#F9A8D4', border: '#EC4899' };
  if (stone.includes('Trắng'))                            return { bg: '#F3F4F6', border: '#D1D5DB' };
  return { bg: '#E0E7FF', border: '#6366F1' };
}

// Color palettes for metal rendering
const METAL_COLORS = {
  'Bạc':          { main: '#C0C0C0', light: '#E8E8E8', dark: '#909090', bg: '#f5f5f5' },
  'Mạ Vàng':      { main: '#FFD700', light: '#FFF0A0', dark: '#DAA520', bg: '#FFFDE7' },
  'Mạ Vàng Hồng': { main: '#E8A598', light: '#FFD5CC', dark: '#C98070', bg: '#FFF5F5' },
  'Vàng 18K':     { main: '#FFB800', light: '#FFE066', dark: '#D49000', bg: '#FFF8E1' },
  'Vàng Trắng':   { main: '#E0E0E0', light: '#F5F5F5', dark: '#BDBDBD', bg: '#FAFAFA' },
};

// SVG generators per product type — each returns an SVG string colored by metal
const SVG_GENERATORS = {
  // Bracelet v1: chain with 3 charms (hat, vespa, lantern)
  bracelet_v1: (m) => `<svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="100" cy="70" rx="85" ry="45" stroke="${m.main}" stroke-width="4" fill="none"/>
    <ellipse cx="100" cy="70" rx="85" ry="45" stroke="${m.light}" stroke-width="1.5" fill="none" opacity=".3"/>
    <!-- chain links -->
    ${[30,60,90,120,150].map(x => `<ellipse cx="${x}" cy="${70-Math.sin((x-30)*0.03)*20}" rx="10" ry="6" stroke="${m.main}" stroke-width="2.5" fill="none"/>`).join('')}
    <!-- charm 1: triangle hat -->
    <polygon points="45,85 55,85 50,65" fill="${m.main}" stroke="${m.dark}" stroke-width="1"/>
    <line x1="45" y1="85" x2="55" y2="85" stroke="${m.dark}" stroke-width="1.5"/>
    <!-- charm 2: vespa -->
    <rect x="90" y="82" width="20" height="12" rx="3" fill="#CC3333" stroke="${m.dark}" stroke-width="1"/>
    <circle cx="93" cy="97" r="4" fill="${m.main}" stroke="${m.dark}" stroke-width="1"/>
    <circle cx="107" cy="97" r="4" fill="${m.main}" stroke="${m.dark}" stroke-width="1"/>
    <line x1="100" y1="82" x2="100" y2="76" stroke="${m.main}" stroke-width="2"/>
    <!-- charm 3: lantern -->
    <rect x="138" y="78" width="14" height="18" rx="2" fill="${m.main}" stroke="${m.dark}" stroke-width="1"/>
    <rect x="140" y="80" width="10" height="3" fill="${m.light}" opacity=".5"/>
    <line x1="145" y1="78" x2="145" y2="73" stroke="${m.main}" stroke-width="1.5"/>
    <!-- clasp -->
    <path d="M15 55 Q10 70 15 85" stroke="${m.main}" stroke-width="3" fill="none"/>
  </svg>`,

  // Bracelet v2: snake chain with stool + coffee charms
  bracelet_v2: (m) => `<svg viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
    <!-- snake chain -->
    <path d="M20 70 Q30 40 60 50 Q90 60 100 45 Q110 30 140 50 Q170 70 180 55" stroke="${m.main}" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M20 70 Q30 40 60 50 Q90 60 100 45 Q110 30 140 50 Q170 70 180 55" stroke="${m.light}" stroke-width="1.5" fill="none" opacity=".4"/>
    <!-- infinity clasp -->
    <path d="M15 70 Q8 60 15 55 Q22 50 22 60 Q22 70 15 70Z" fill="${m.main}" stroke="${m.dark}" stroke-width="1"/>
    <!-- charm: stool -->
    <rect x="75" y="65" width="16" height="3" rx="1" fill="${m.main}" stroke="${m.dark}" stroke-width=".8"/>
    <line x1="77" y1="68" x2="76" y2="80" stroke="${m.main}" stroke-width="1.5"/>
    <line x1="89" y1="68" x2="90" y2="80" stroke="${m.main}" stroke-width="1.5"/>
    <line x1="81" y1="68" x2="81" y2="80" stroke="${m.main}" stroke-width="1"/>
    <line x1="85" y1="68" x2="85" y2="80" stroke="${m.main}" stroke-width="1"/>
    <!-- charm: coffee filter -->
    <path d="M130 58 L125 75 Q130 80 135 75 Z" fill="${m.main}" stroke="${m.dark}" stroke-width="1"/>
    <circle cx="130" cy="62" r="3" fill="#8B4513" opacity=".6"/>
    <rect x="126" y="56" width="8" height="3" rx="1" fill="${m.main}" stroke="${m.dark}" stroke-width=".5"/>
    <!-- CZ stone -->
    <circle cx="160" cy="48" r="4" fill="white" stroke="${m.main}" stroke-width="1.5"/>
    <path d="M157 48 L160 44 L163 48" fill="${m.light}" opacity=".5"/>
  </svg>`,

  // Ring classic
  ring_v1: (m) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="100" cy="120" rx="55" ry="50" stroke="${m.main}" stroke-width="8" fill="none"/>
    <ellipse cx="100" cy="120" rx="55" ry="50" stroke="${m.light}" stroke-width="2" fill="none" opacity=".3"/>
    <!-- stone setting -->
    <circle cx="100" cy="72" r="16" fill="${m.light}" stroke="${m.main}" stroke-width="2"/>
    <circle cx="100" cy="72" r="10" fill="white" stroke="${m.main}" stroke-width="1.5"/>
    <polygon points="100,62 94,72 100,78 106,72" fill="${m.light}" opacity=".6"/>
    <!-- prongs -->
    <line x1="88" y1="80" x2="84" y2="90" stroke="${m.main}" stroke-width="2.5"/>
    <line x1="112" y1="80" x2="116" y2="90" stroke="${m.main}" stroke-width="2.5"/>
  </svg>`,

  // Ring modern flower
  ring_v2: (m) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="100" cy="120" rx="50" ry="48" stroke="${m.main}" stroke-width="7" fill="none"/>
    <ellipse cx="100" cy="120" rx="50" ry="48" stroke="${m.light}" stroke-width="2" fill="none" opacity=".3"/>
    <!-- flower -->
    ${[0,60,120,180,240,300].map(a => {
      const r = 10, cx = 100 + 14*Math.cos(a*Math.PI/180), cy = 72 + 14*Math.sin(a*Math.PI/180);
      return `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="8" ry="5" fill="${m.light}" stroke="${m.main}" stroke-width="1" transform="rotate(${a} ${cx.toFixed(1)} ${cy.toFixed(1)})"/>`;
    }).join('')}
    <circle cx="100" cy="72" r="6" fill="${m.main}"/>
  </svg>`,

  // Ring plain
  ring_v3: (m) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="100" cy="110" rx="50" ry="55" stroke="${m.main}" stroke-width="10" fill="none"/>
    <ellipse cx="100" cy="110" rx="50" ry="55" stroke="${m.light}" stroke-width="3" fill="none" opacity=".3"/>
    <ellipse cx="100" cy="110" rx="42" ry="47" stroke="${m.dark}" stroke-width="1" fill="none" opacity=".2"/>
  </svg>`,

  // Chain necklace butterfly
  chain_v1: (m) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 30 Q100 10 160 30" stroke="${m.main}" stroke-width="3" fill="none"/>
    <path d="M40 30 Q50 100 100 130" stroke="${m.main}" stroke-width="2.5" fill="none"/>
    <path d="M160 30 Q150 100 100 130" stroke="${m.main}" stroke-width="2.5" fill="none"/>
    <!-- butterfly -->
    <ellipse cx="88" cy="148" rx="14" ry="10" fill="${m.light}" stroke="${m.main}" stroke-width="1.5" transform="rotate(-20 88 148)"/>
    <ellipse cx="112" cy="148" rx="14" ry="10" fill="${m.light}" stroke="${m.main}" stroke-width="1.5" transform="rotate(20 112 148)"/>
    <ellipse cx="92" cy="158" rx="8" ry="6" fill="${m.light}" stroke="${m.main}" stroke-width="1" transform="rotate(-15 92 158)"/>
    <ellipse cx="108" cy="158" rx="8" ry="6" fill="${m.light}" stroke="${m.main}" stroke-width="1" transform="rotate(15 108 158)"/>
    <line x1="100" y1="140" x2="100" y2="165" stroke="${m.main}" stroke-width="2"/>
    <circle cx="100" cy="143" r="3" fill="#EF4444"/>
  </svg>`,

  // Chain necklace flower
  chain_v2: (m) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M40 30 Q100 10 160 30" stroke="${m.main}" stroke-width="3" fill="none"/>
    <path d="M40 30 Q50 100 100 130" stroke="${m.main}" stroke-width="2.5" fill="none"/>
    <path d="M160 30 Q150 100 100 130" stroke="${m.main}" stroke-width="2.5" fill="none"/>
    <!-- flower pendant -->
    ${[0,72,144,216,288].map(a => {
      const cx = 100 + 12*Math.cos(a*Math.PI/180), cy = 148 + 12*Math.sin(a*Math.PI/180);
      return `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="9" ry="6" fill="${m.light}" stroke="${m.main}" stroke-width="1.2" transform="rotate(${a} ${cx.toFixed(1)} ${cy.toFixed(1)})"/>`;
    }).join('')}
    <circle cx="100" cy="148" r="5" fill="#EF4444" stroke="${m.main}" stroke-width="1"/>
  </svg>`,

  // Earring drop
  earring_v1: (m) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="40" r="8" fill="${m.main}" stroke="${m.dark}" stroke-width="1.5"/>
    <line x1="100" y1="48" x2="100" y2="90" stroke="${m.main}" stroke-width="2"/>
    <path d="M80 100 Q100 140 120 100" stroke="${m.main}" stroke-width="3" fill="${m.light}"/>
    <circle cx="100" cy="115" r="14" fill="white" stroke="${m.main}" stroke-width="2" opacity=".9"/>
    <circle cx="100" cy="115" r="8" fill="#F0F0F0" opacity=".5"/>
  </svg>`,

  // Earring round
  earring_v2: (m) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="40" r="8" fill="${m.main}" stroke="${m.dark}" stroke-width="1.5"/>
    <line x1="100" y1="48" x2="100" y2="75" stroke="${m.main}" stroke-width="2"/>
    <circle cx="100" cy="110" r="30" stroke="${m.main}" stroke-width="4" fill="none"/>
    <circle cx="100" cy="110" r="30" stroke="${m.light}" stroke-width="1.5" fill="none" opacity=".3"/>
    <circle cx="100" cy="110" r="10" fill="white" stroke="${m.main}" stroke-width="1.5" opacity=".8"/>
  </svg>`,

  // Pair rings
  pair_v1: (m) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="75" cy="110" rx="35" ry="40" stroke="${m.main}" stroke-width="6" fill="none"/>
    <ellipse cx="125" cy="110" rx="35" ry="40" stroke="${m.main}" stroke-width="6" fill="none"/>
    <ellipse cx="75" cy="110" rx="35" ry="40" stroke="${m.light}" stroke-width="2" fill="none" opacity=".3"/>
    <ellipse cx="125" cy="110" rx="35" ry="40" stroke="${m.light}" stroke-width="2" fill="none" opacity=".3"/>
  </svg>`,

  pair_v2: (m) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="75" cy="110" rx="35" ry="40" stroke="${m.main}" stroke-width="6" fill="none"/>
    <ellipse cx="125" cy="110" rx="35" ry="40" stroke="${m.main}" stroke-width="6" fill="none"/>
    <circle cx="75" cy="72" r="6" fill="white" stroke="${m.main}" stroke-width="1.5"/>
    <circle cx="125" cy="72" r="6" fill="white" stroke="${m.main}" stroke-width="1.5"/>
    <polygon points="75,66 72,72 75,76 78,72" fill="${m.light}" opacity=".5"/>
    <polygon points="125,66 122,72 125,76 128,72" fill="${m.light}" opacity=".5"/>
  </svg>`,

  // Pendant lotus
  pendant_v1: (m) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="30" r="10" fill="${m.main}" stroke="${m.dark}" stroke-width="1"/>
    ${[0,1,2,3,4].map(i => {
      const a = -90 + (i-2)*30, cx = 100 + 35*Math.cos(a*Math.PI/180), cy = 120 + 35*Math.sin(a*Math.PI/180);
      return `<ellipse cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" rx="18" ry="10" fill="${m.light}" stroke="${m.main}" stroke-width="1.5" transform="rotate(${a+90} ${cx.toFixed(1)} ${cy.toFixed(1)})"/>`;
    }).join('')}
    <circle cx="100" cy="120" r="8" fill="${m.main}"/>
  </svg>`,

  // Pendant leaf
  pendant_v2: (m) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="30" r="10" fill="${m.main}" stroke="${m.dark}" stroke-width="1"/>
    <path d="M100 60 Q70 100 100 160 Q130 100 100 60Z" fill="${m.light}" stroke="${m.main}" stroke-width="2"/>
    <line x1="100" y1="70" x2="100" y2="150" stroke="${m.main}" stroke-width="1.5"/>
    <line x1="100" y1="90" x2="85" y2="100" stroke="${m.main}" stroke-width="1"/>
    <line x1="100" y1="110" x2="115" y2="120" stroke="${m.main}" stroke-width="1"/>
    <line x1="100" y1="130" x2="88" y2="138" stroke="${m.main}" stroke-width="1"/>
  </svg>`,

  // Pendant fortune
  pendant_v3: (m) => `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="30" r="10" fill="${m.main}" stroke="${m.dark}" stroke-width="1"/>
    <rect x="70" y="55" width="60" height="75" rx="6" fill="${m.light}" stroke="${m.main}" stroke-width="2.5"/>
    <rect x="78" y="63" width="44" height="59" rx="3" fill="${m.bg}" stroke="${m.main}" stroke-width="1"/>
    <text x="100" y="100" text-anchor="middle" font-size="28" font-weight="bold" fill="${m.main}" font-family="serif">福</text>
  </svg>`,
};

function getProductSvg(svgKey, color) {
  const m = METAL_COLORS[color] || METAL_COLORS['Bạc'];
  const gen = SVG_GENERATORS[svgKey];
  return gen ? gen(m) : null;
}

function getProductImageHtml(imageData, color, size = 80) {
  const m = METAL_COLORS[color] || METAL_COLORS['Bạc'];
  // If imageData is an SVG key, render SVG; otherwise fall back to emoji
  if (imageData && SVG_GENERATORS[imageData]) {
    return `<div style="width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;">${getProductSvg(imageData, color)}</div>`;
  }
  // Emoji fallback
  return `<div style="width:${size}px;height:${size}px;border-radius:50%;background:linear-gradient(135deg,${m.bg},${m.light});border:3px solid ${m.main};display:flex;align-items:center;justify-content:center;font-size:${Math.round(size*0.45)}px;box-shadow:0 2px 8px rgba(0,0,0,.08);">${imageData}</div>`;
}


function showNotification(msg, type = 'success') {
  const el = document.createElement('div');
  el.style.cssText = `position:fixed;bottom:24px;left:50%;transform:translateX(-50%);
    background:${type === 'success' ? '#10B981' : '#EF4444'};color:white;padding:12px 24px;
    border-radius:8px;box-shadow:0 4px 16px rgba(0,0,0,0.15);z-index:9999;
    font-size:13px;font-weight:600;white-space:nowrap;animation:notifIn .25s ease-out;`;
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => { el.style.animation = 'notifOut .25s ease-in'; setTimeout(() => el.remove(), 250); }, 2800);
}

document.head.insertAdjacentHTML('beforeend', `<style>
@keyframes notifIn  { from{opacity:0;transform:translateX(-50%) translateY(20px)} to{opacity:1;transform:translateX(-50%) translateY(0)} }
@keyframes notifOut { from{opacity:1;transform:translateX(-50%) translateY(0)} to{opacity:0;transform:translateX(-50%) translateY(20px)} }
</style>`);

/** Add item to cart (or increment if exists) */
function addCartItem(productId, name, drawingNo, variantSku, color, size, qty, price) {
  const existing = cart.find(i => i.variantSku === variantSku);
  if (existing) { existing.qty += qty; }
  else {
    const prod = PRODUCTS.find(p => p.id === productId);
    const matId = prod?.specs?.materialId || selectedMaterial?.id || 'bac';
    const mat = MATERIALS.find(m => m.id === matId);
    cart.push({
      productId, name, drawingNo, variantSku, color, size, qty, price,
      materialId: matId,
      materialName: mat?.name || '', materialIcon: mat?.icon || '🔩',
      orderMaterial: selectedMaterial?.name || mat?.name || '',
    });
  }
}

// ═══════════════════════════════════════════════════
// RENDER PRODUCTS GRID
// ═══════════════════════════════════════════════════
function renderProducts(list) {
  const grid = document.getElementById('productsGrid');
  if (!selectedCustomer) {
    grid.innerHTML = `
      <div style="grid-column:1/-1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:120px 20px;color:#9CA3AF;gap:16px;">
        <div style="width:80px;height:80px;border-radius:50%;background:#EFF6FF;display:flex;align-items:center;justify-content:center;font-size:36px;">👤</div>
        <div style="font-size:20px;font-weight:800;color:#111827;">Chào mừng bạn đến E-Catalog</div>
        <div style="font-size:14px;color:#6B7280;max-width:360px;text-align:center;line-height:1.6;">Vui lòng chọn khách hàng để xem danh sách sản phẩm và bắt đầu tạo đơn hàng</div>
        <button onclick="openCustomerModal()" style="margin-top:8px;background:#0052CC;color:white;border:none;border-radius:12px;padding:14px 32px;font-size:15px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:8px;box-shadow:0 4px 12px rgba(0,82,204,.25);transition:all .2s;" onmouseover="this.style.background='#003D99';this.style.transform='translateY(-1px)'" onmouseout="this.style.background='#0052CC';this.style.transform='none'">👤 Chọn khách hàng</button>
      </div>`;
    return;
  }
  const mat = selectedMaterial;
  const metalTagColor = mat?.id === 'vang' ? { bg: '#FFF8E1', text: '#B45309', border: '#FCD34D' }
    : mat?.id === 'kimcuong' ? { bg: '#ECFEFF', text: '#0891B2', border: '#67E8F9' }
    : mat?.id === 'bachkim'  ? { bg: '#FAFAFA', text: '#374151', border: '#BDBDBD' }
    : { bg: '#F3F4F6', text: '#374151', border: '#D1D5DB' };

  grid.innerHTML = list.map(p => {
    const totalQty = cart.filter(i => i.productId === p.id).reduce((s, i) => s + i.qty, 0);
    const metalLabel = p.specs?.metal || '';
    return `
    <div class="product-card">
      <div class="product-image" style="position:relative;">
        <div style="width:100%;aspect-ratio:1;background:#f9f9f9;display:flex;align-items:center;justify-content:center;padding:20px;">
          ${SVG_GENERATORS[p.image] ? `<div style="width:80%;height:80%;">${getProductSvg(p.image, 'Vàng 18K')}</div>` : `<span style="font-size:64px;">${p.image}</span>`}
        </div>
        ${p.badge ? `<span style="position:absolute;top:10px;left:10px;background:${p.badge==='Bán chạy'?'#F59E0B':p.badge==='Mới'?'#0052CC':p.badge==='Nhận đôi'?'#8B5CF6':'#10B981'};color:white;border-radius:12px;padding:2px 8px;font-size:10px;font-weight:700;">● ${p.badge}</span>` : ''}
        ${totalQty > 0 ? `<span style="position:absolute;top:10px;right:10px;background:#0052CC;color:white;border-radius:50%;width:26px;height:26px;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;">${totalQty}</span>` : ''}
      </div>
      <div class="product-info">
        <p style="font-size:11px;color:#9CA3AF;margin-bottom:3px;">${p.drawingNo}</p>
        <h3 class="product-name">${p.name}</h3>
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:4px;flex-wrap:wrap;">
          <span style="display:inline-flex;align-items:center;gap:3px;background:${metalTagColor.bg};color:${metalTagColor.text};border:1px solid ${metalTagColor.border};border-radius:6px;padding:2px 7px;font-size:10px;font-weight:700;">${mat?.icon||'🔩'} ${metalLabel}</span>
        </div>
        <p class="product-meta">${p.variants.length} biến thể · Tồn ${p.variants.reduce((s,v)=>s+v.stock,0)}</p>
        <p class="product-price" style="color:#0052CC;">${p.priceRange}</p>
        <div class="product-actions">
          <button class="btn-view-detail" onclick="openProductModal(${p.id})">⊞ Xem biến thể</button>
          <button class="btn-add-quick" onclick="quickAdd(${p.id}, event)" title="Thêm nhanh 1 sp">+</button>
        </div>
      </div>
    </div>`;
  }).join('');
}

// ═══════════════════════════════════════════════════
// CUSTOMER MODAL
// ═══════════════════════════════════════════════════
function openCustomerModal() {
  document.getElementById('customerModal').classList.add('active');
  renderCustomerList(CUSTOMERS);
  document.getElementById('customerSearch').focus();
}

function closeCustomerModal() {
  document.getElementById('customerModal').classList.remove('active');
}

function renderCustomerList(list) {
  document.getElementById('customerList').innerHTML = list.length
    ? list.map(c => `
      <div onclick="selectCustomer(${c.id})" style="display:flex;align-items:center;gap:12px;padding:12px 8px;border-bottom:1px solid #F3F4F6;cursor:pointer;border-radius:6px;transition:background .15s;" onmouseover="this.style.background='#F0F7FF'" onmouseout="this.style.background=''">
        <div style="width:40px;height:40px;background:#0052CC;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-weight:700;flex-shrink:0;">${c.name.charAt(0)}</div>
        <div style="flex:1;min-width:0;">
          <div style="font-weight:600;font-size:13px;color:#111827;">${c.name}</div>
          <div style="font-size:11px;color:#9CA3AF;">${c.code} · ${c.type} ${c.discount ? `· ${c.discount}%` : ''}</div>
          <div style="font-size:11px;color:#6B7280;">${c.phone}</div>
        </div>
        ${c.discount ? `<span style="background:#DCFCE7;color:#16A34A;border-radius:12px;padding:2px 8px;font-size:11px;font-weight:700;flex-shrink:0;">${c.discount}%</span>` : ''}
      </div>`).join('')
    : '<p style="text-align:center;color:#9CA3AF;padding:32px;">Không tìm thấy khách hàng</p>';
}

function selectCustomer(id) {
  selectedCustomer = CUSTOMERS.find(c => c.id === id);
  document.getElementById('btnSelectCustomer').style.display = '';
  document.getElementById('btnCustomerLabel').textContent = selectedCustomer.name;
  closeCustomerModal();
  // Reset all orders for new customer
  selectedMaterial = null;
  cart = [];
  orders = [{ id: 1, cart: [], material: null }];
  activeOrderId = 1;
  orderSeq = 1;
  renderSubHeader();
  // Show approval then landing page
  showCustomerApproval();
}

function showCustomerApproval() {
  const overlay = document.createElement('div');
  overlay.id = 'custApprovalOverlay';
  overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:2000;display:flex;align-items:center;justify-content:center;animation:fadeIn .2s;';
  overlay.innerHTML = `
    <div style="background:white;border-radius:16px;padding:40px 48px;text-align:center;max-width:400px;width:90%;box-shadow:0 20px 60px rgba(0,0,0,.2);animation:slideUp .3s ease-out;">
      <div id="custApprovalSpinner" style="margin:0 auto 20px;">
        <svg width="56" height="56" viewBox="0 0 56 56" style="animation:spin 1s linear infinite;">
          <circle cx="28" cy="28" r="24" fill="none" stroke="#E5E7EB" stroke-width="4"/>
          <circle cx="28" cy="28" r="24" fill="none" stroke="#0052CC" stroke-width="4" stroke-dasharray="100 52" stroke-linecap="round"/>
        </svg>
      </div>
      <div id="custApprovalIcon" style="display:none;font-size:48px;margin-bottom:16px;">✅</div>
      <div id="custApprovalTitle" style="font-size:18px;font-weight:800;color:#111827;margin-bottom:8px;">Đang chờ duyệt...</div>
      <div style="font-size:13px;color:#6B7280;line-height:1.6;">
        Khách hàng: <strong>${selectedCustomer.name}</strong><br>
        ${selectedCustomer.code} · ${selectedCustomer.type}
      </div>
      <div id="custApprovalStatus" style="margin-top:16px;font-size:12px;color:#9CA3AF;">Đang xác minh thông tin khách hàng...</div>
    </div>
  `;
  document.body.appendChild(overlay);

  setTimeout(() => {
    document.getElementById('custApprovalStatus').textContent = 'Đang kiểm tra lịch sử đặt hàng...';
  }, 800);

  setTimeout(() => {
    document.getElementById('custApprovalStatus').textContent = 'Đang xác nhận quyền truy cập...';
  }, 1600);

  setTimeout(() => {
    document.getElementById('custApprovalSpinner').style.display = 'none';
    document.getElementById('custApprovalIcon').style.display = '';
    document.getElementById('custApprovalTitle').textContent = 'Đã được duyệt!';
    document.getElementById('custApprovalTitle').style.color = '#059669';
    document.getElementById('custApprovalStatus').innerHTML = '<span style="color:#059669;font-weight:600;">✓ Khách hàng đã được xác nhận</span>';
  }, 2400);

  setTimeout(() => {
    overlay.remove();
    // Show landing page with "choose material" CTA
    renderProducts([]);
    showMaterialLanding();
  }, 3200);
}

function showMaterialLanding() {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = `
    <div style="grid-column:1/-1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:100px 20px;color:#9CA3AF;gap:16px;">
      <div style="width:80px;height:80px;border-radius:50%;background:#FFFBEB;display:flex;align-items:center;justify-content:center;font-size:36px;">🏷</div>
      <div style="font-size:20px;font-weight:800;color:#111827;">Chào ${selectedCustomer?.name || ''}!</div>
      <div style="font-size:14px;color:#6B7280;max-width:400px;text-align:center;line-height:1.6;">Vui lòng chọn nguyên liệu và tuổi vàng để bắt đầu tạo đơn đặt hàng</div>
      <button onclick="openMaterialModal()" style="margin-top:16px;background:#0052CC;color:white;border:none;border-radius:12px;padding:14px 32px;font-size:15px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:8px;box-shadow:0 4px 12px rgba(0,82,204,.25);transition:all .2s;" onmouseover="this.style.background='#003D99';this.style.transform='translateY(-1px)'" onmouseout="this.style.background='#0052CC';this.style.transform='none'">🏷 Chọn nguyên liệu</button>
    </div>`;
}

// ═══════════════════════════════════════════════════
// MATERIAL & PURITY MODAL
// ═══════════════════════════════════════════════════
function quickSelectMaterial(matId) {
  selectedMaterial = MATERIALS.find(m => m.id === matId);
  saveOrderState();
  // Open modal directly at purity step
  openMaterialModal();
  // Auto-select material and show purity
  selectMaterial(matId);
}

function openMaterialModal() {
  const isEdit = selectedMaterial !== null;
  document.getElementById('materialCloseBtn').style.display = isEdit ? '' : 'none';
  document.getElementById('materialStepLabel').textContent = isEdit ? 'Thay đổi nguyên liệu' : 'Chọn nguyên liệu';
  renderMaterialOptions();
  document.getElementById('materialModal').classList.add('active');
}

function closeMaterialModal() {
  document.getElementById('materialModal').classList.remove('active');
}


function renderMaterialOptions() {
  document.getElementById('materialOptions').innerHTML = MATERIALS.map(m => `
    <div onclick="selectMaterial('${m.id}')" style="display:flex;align-items:center;gap:16px;padding:18px;border:2px solid ${selectedMaterial?.id===m.id ? m.border : '#E5E7EB'};border-radius:14px;cursor:pointer;transition:all .15s;background:${selectedMaterial?.id===m.id ? m.bg : 'white'};margin-bottom:12px;"
      onmouseover="this.style.borderColor='${m.border}';this.style.background='${m.bg}'"
      onmouseout="this.style.borderColor='${selectedMaterial?.id===m.id ? m.border : '#E5E7EB'}';this.style.background='${selectedMaterial?.id===m.id ? m.bg : 'white'}'">
      <div style="width:56px;height:56px;border-radius:50%;background:${m.bg};border:2px solid ${m.border};display:flex;align-items:center;justify-content:center;font-size:28px;flex-shrink:0;">${m.icon}</div>
      <div style="flex:1;">
        <div style="font-size:16px;font-weight:700;color:#111827;">${m.name}</div>
        <div style="font-size:12px;color:#6B7280;margin-top:2px;">${m.desc}</div>
      </div>
      <div style="color:#9CA3AF;font-size:20px;">›</div>
    </div>`).join('');
}

function selectMaterial(id) {
  selectedMaterial = MATERIALS.find(m => m.id === id);
  saveOrderState();
  closeMaterialModal();
  renderSubHeader();
  renderCartSidebar();
  renderProducts(getFilteredProducts());
  showNotification(`✓ ${selectedMaterial.icon} ${selectedMaterial.name}`);
}

// CSS for approval modal
document.head.insertAdjacentHTML('beforeend', `<style>
@keyframes fadeIn { from { opacity:0 } to { opacity:1 } }
@keyframes slideUp { from { transform:translateY(30px);opacity:0 } to { transform:translateY(0);opacity:1 } }
@keyframes spin { to { transform:rotate(360deg) } }
</style>`);

// Header customer dropdown
function toggleHeaderCustomerDD(e) {
  e.stopPropagation();
  const dd = document.getElementById('headerCustomerDD');
  const visible = dd.style.display !== 'none';
  dd.style.display = visible ? 'none' : 'block';
  if (!visible && selectedCustomer) {
    document.getElementById('ddHeaderName').textContent = selectedCustomer.name;
    document.getElementById('ddHeaderMeta').textContent =
      [selectedCustomer.code, selectedCustomer.type, selectedCustomer.phone].filter(Boolean).join(' · ');
  }
}

function changeHeaderCustomer() {
  document.getElementById('headerCustomerDD').style.display = 'none';
  selectedMaterial = null;
  selectedPurity   = null;
  openCustomerModal();
}

document.addEventListener('click', () => {
  const dd = document.getElementById('headerCustomerDD');
  if (dd) dd.style.display = 'none';
});

document.getElementById('customerModal').addEventListener('click', e => {
  if (e.target === document.getElementById('customerModal')) closeCustomerModal();
});

document.getElementById('customerSearch').addEventListener('input', e => {
  const q = e.target.value.toLowerCase();
  renderCustomerList(CUSTOMERS.filter(c => c.name.toLowerCase().includes(q) || c.phone.includes(q) || c.code.toLowerCase().includes(q)));
});

// ═══════════════════════════════════════════════════
// PRODUCT DETAIL MODAL
// ═══════════════════════════════════════════════════
function openProductModal(productId) {
  if (!selectedCustomer) { showNotification('Vui lòng chọn khách hàng trước', 'error'); openCustomerModal(); return; }

  pmCurrentProduct = PRODUCTS.find(p => p.id === productId);
  pmCurrentTab     = 'retail';
  pmRetailColor    = null;
  pmRetailSize     = null;
  pmRetailQty      = 1;
  // Auto-select size=0 for products without real sizes
  const _initColors = [...new Set(pmCurrentProduct.variants.map(v => v.color))];
  pmRetailColor = _initColors[0];
  if (!productHasSizes(pmCurrentProduct)) pmRetailSize = 0;
  pmWholesaleQtys  = {};
  pmCustomerNote   = '';
  pmCustomerReqs   = [];
  pmReqDetails     = {};
  pmQuickRows      = [];
  pmQuickSeq       = 0;
  pmActiveVersion  = pmCurrentProduct.versions?.[0] || null;

  document.getElementById('pmBadge').textContent    = pmCurrentProduct.badge;
  document.getElementById('pmSku').textContent       = pmCurrentProduct.drawingNo;
  document.getElementById('pmName').textContent      = pmCurrentProduct.name;
  switchPmTab('retail');
  updateProductImage();
  document.getElementById('productModal').classList.add('active');
}

function closeProductModal() {
  document.getElementById('productModal').classList.remove('active');
}

document.getElementById('productModal').addEventListener('click', e => {
  if (e.target === document.getElementById('productModal')) closeProductModal();
});

function getActiveImage() {
  return pmActiveVersion ? pmActiveVersion.image : pmCurrentProduct.image;
}

function updateProductImage() {
  if (!pmCurrentProduct) return;
  const colors = [...new Set(pmCurrentProduct.variants.map(v => v.color))];
  const activeColor = pmRetailColor || colors[0];
  const img = getActiveImage();

  // Main image — use real photo if available
  const photo = pmActiveVersion?.photos?.[activeColor];
  if (photo) {
    document.getElementById('pmMainImage').innerHTML = `<img src="${photo}" style="max-width:100%;max-height:100%;object-fit:contain;border-radius:8px;">`;
  } else {
    document.getElementById('pmMainImage').innerHTML = getProductImageHtml(img, activeColor, 160);
  }

  // Product specs table
  const s = pmCurrentProduct.specs;
  const specsEl = document.getElementById('pmProductSpecs');
  if (s) {
    const stones = [...new Set(pmCurrentProduct.variants.map(v => v.stone))].filter(s => s !== 'Không');
    const rows = [
      ['DrawingNo (SPU)', pmCurrentProduct.drawingNo],
      ['Nhóm sản phẩm', s.group],
      ['Nguyên liệu', s.metal],
      stones.length > 0 ? ['Màu đá', stones.join(', ')] : null,
      ['Trọng lượng', s.weight],
    ].filter(Boolean);
    specsEl.innerHTML = `
      <table style="width:100%;border-collapse:collapse;font-size:12px;">
        ${rows.map(([label, val]) => `
          <tr>
            <td style="padding:6px 0;color:#9CA3AF;font-weight:500;">${label}</td>
            <td style="padding:6px 0;color:#1F2937;font-weight:700;text-align:right;">${val}</td>
          </tr>`).join('')}
      </table>`;
  } else {
    specsEl.innerHTML = '';
  }
}


function switchPmTab(tab) {
  pmCurrentTab = tab;
  document.getElementById('tabRetail').classList.toggle('active', tab === 'retail');
  document.getElementById('tabWholesale').classList.toggle('active', tab === 'wholesale');
  document.getElementById('pmRetailPanel').style.display    = tab === 'retail' ? '' : 'none';
  document.getElementById('pmWholesalePanel').style.display = tab === 'wholesale' ? 'flex' : 'none';
  document.getElementById('pmTabHint').textContent = tab === 'wholesale' ? 'Thêm nhanh nhiều biến thể' : '';
  if (tab === 'retail') renderRetailPanel();
  if (tab === 'wholesale') renderWholesalePanel();
  updatePmFooter();
}

/* ── RETAIL PANEL ── */
function renderRetailPanel() {
  if (!pmCurrentProduct) return;
  const colors = [...new Set(pmCurrentProduct.variants.map(v => v.color))];
  if (!pmRetailColor) pmRetailColor = colors[0];
  const sizesForColor = pmCurrentProduct.variants.filter(v => v.color === pmRetailColor);
  const stones = [...new Set(pmCurrentProduct.variants.map(v => v.stone))];
  const selectedVariant = pmRetailSize !== null ? pmCurrentProduct.variants.find(v => v.color===pmRetailColor && v.size===pmRetailSize) : null;

  const versions = pmCurrentProduct.versions || [];

  document.getElementById('pmRetailPanel').innerHTML = `
    ${versions.length > 1 ? `
    <div class="pm-retail-section">
      <div class="pm-retail-label">🔀 Biến thể</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;">
        ${versions.map(v => `
          <div onclick="selectVersion('${v.id}')" style="display:flex;align-items:center;gap:10px;padding:8px 14px;border-radius:10px;border:2px solid ${pmActiveVersion?.id===v.id?'#0052CC':'#E5E7EB'};background:${pmActiveVersion?.id===v.id?'#EFF6FF':'white'};cursor:pointer;transition:all .15s;min-width:120px;" onmouseover="this.style.borderColor='#0052CC'" onmouseout="this.style.borderColor='${pmActiveVersion?.id===v.id?'#0052CC':'#E5E7EB'}'">
            <div style="width:44px;height:44px;flex-shrink:0;border-radius:6px;overflow:hidden;background:#F9FAFB;display:flex;align-items:center;justify-content:center;">
              ${v.photos?.[pmRetailColor || colors[0]]
                ? `<img src="${v.photos[pmRetailColor || colors[0]]}" style="width:100%;height:100%;object-fit:cover;">`
                : SVG_GENERATORS[v.image] ? getProductSvg(v.image, pmRetailColor || colors[0]) : `<span style="font-size:24px;">${v.image}</span>`}
            </div>
            <div>
              <div style="font-size:12px;font-weight:700;color:${pmActiveVersion?.id===v.id?'#0052CC':'#374151'};">${v.name}</div>
              ${v.code ? `<div style="font-size:9px;color:#9CA3AF;font-family:monospace;">${v.code}</div>` : ''}
              <div style="font-size:10px;color:#9CA3AF;">${v.desc}</div>
            </div>
          </div>`).join('')}
      </div>
    </div>` : ''}
    <div class="pm-retail-section">
      <div class="pm-retail-label">🎨 Màu sản phẩm</div>
      <div class="pm-color-pills">
        ${colors.map(c => `
          <div class="pm-color-pill ${pmRetailColor===c?'active':''}" onclick="selectRetailColor('${c}')">
            <div class="pm-color-dot" style="background:${getColorDot(c)};border:1px solid ${(COLOR_META[c]||{border:'#ccc'}).border};"></div>
            ${c}
          </div>`).join('')}
      </div>
    </div>
    ${stones.length > 0 && stones[0] !== 'Không' ? `
    <div class="pm-retail-section">
      <div class="pm-retail-label">💎 Màu đá</div>
      <div class="pm-color-pills">
        ${stones.map(s => `
          <div class="pm-color-pill" style="cursor:default;opacity:0.85;">
            <div class="pm-color-dot" style="background:${getStoneColor(s).bg};border:2px solid ${getStoneColor(s).border};"></div>
            ${s}
          </div>`).join('')}
      </div>
    </div>` : ''}
    ${productHasSizes(pmCurrentProduct) ? `
    <div class="pm-retail-section">
      <div class="pm-retail-label">📏 Kích thước</div>
      <div class="pm-size-grid">
        ${sizesForColor.map(v => `
          <button class="pm-size-btn ${pmRetailSize===v.size?'active':''}" onclick="selectRetailSize(${v.size})">
            ${v.size}<span class="size-stock">Còn ${v.stock}</span>
          </button>`).join('')}
      </div>
    </div>` : `
    <div class="pm-retail-section">
      <div class="pm-retail-label" style="color:#9CA3AF;">📏 Kích thước: <span style="font-weight:400;">Free size</span></div>
    </div>`}
    <div class="pm-retail-section">
      <div class="pm-retail-label">🔢 Số lượng</div>
      <div class="pm-retail-qty">
        <button class="pm-qty-btn" onclick="changeRetailQty(-1)">−</button>
        <input class="pm-qty-input" type="number" value="${pmRetailQty}" min="1"
          onchange="pmRetailQty=Math.max(1,parseInt(this.value)||1);updatePmFooter()">
        <button class="pm-qty-btn" onclick="changeRetailQty(1)">+</button>
        ${selectedVariant ? `<span style="font-size:12px;color:#9CA3AF;margin-left:8px;">Còn ${selectedVariant.stock} sản phẩm</span>` : ''}
      </div>
    </div>
    <div class="pm-retail-section">
      <div class="pm-retail-label">📋 Yêu cầu khách hàng</div>
      <div style="display:flex;flex-wrap:wrap;gap:6px;">
        ${CUSTOMER_REQUIREMENTS.map(r => {
          const active = pmCustomerReqs.includes(r.id);
          return `<button onclick="toggleReq('${r.id}')" style="padding:5px 12px;border-radius:20px;font-size:12px;font-weight:600;cursor:pointer;transition:all .15s;border:1.5px solid ${active?'#0052CC':'#E5E7EB'};background:${active?'#EFF6FF':'white'};color:${active?'#0052CC':'#6B7280'};">
            ${active?'✓ ':''}${r.name}
          </button>`;
        }).join('')}
      </div>
    </div>
    <div class="pm-retail-section">
      <div class="pm-retail-label">📝 Chi tiết thay đổi</div>
      ${pmCustomerReqs.filter(id => CUSTOMER_REQUIREMENTS.find(r => r.id === id)?.details).length > 0
        ? `<div style="display:flex;flex-direction:column;gap:8px;margin-bottom:10px;">
            ${pmCustomerReqs.map(id => {
              const req = CUSTOMER_REQUIREMENTS.find(r => r.id === id);
              if (!req?.details) return '';
              const selected = pmReqDetails[id] || '';
              return `<div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:10px;padding:10px 12px;">
                <div style="font-size:11px;font-weight:700;color:#6B7280;margin-bottom:6px;text-transform:uppercase;letter-spacing:.3px;">${req.name}</div>
                <div style="display:flex;flex-wrap:wrap;gap:5px;">
                  ${req.details.map(d => {
                    const isSel = selected === d;
                    return `<button onclick="selectReqDetail('${id}','${d.replace(/'/g,"\\'")}')" style="padding:4px 10px;border-radius:16px;font-size:11px;font-weight:600;cursor:pointer;transition:all .12s;border:1.5px solid ${isSel?'#0052CC':'#D1D5DB'};background:${isSel?'#0052CC':'white'};color:${isSel?'white':'#374151'};">${d}</button>`;
                  }).join('')}
                </div>
              </div>`;
            }).join('')}
          </div>`
        : `<div style="padding:10px;background:#F9FAFB;border:1px solid #E5E7EB;border-radius:8px;font-size:12px;color:#9CA3AF;text-align:center;">Chọn yêu cầu ở trên để xem chi tiết thay đổi</div>`
      }
      <textarea id="pmCustomerNote" style="width:100%;border:1px solid #E5E7EB;border-radius:8px;padding:10px 12px;font-size:13px;font-family:inherit;color:#374151;resize:none;min-height:40px;margin-top:6px;" placeholder="Ghi chú thêm...">${pmCustomerNote || ''}</textarea>
    </div>
    ${productHasSizes(pmCurrentProduct) && pmRetailSize === null
      ? '<div style="padding:12px;background:#FEF3C7;border-radius:8px;font-size:13px;color:#92400E;">← Vui lòng chọn kích thước</div>'
      : selectedVariant ? `<div class="pm-price-box">
          <div>
            <div class="pm-price-label">${pmRetailColor}${pmRetailSize ? ' · Size ' + pmRetailSize : ' · Free size'} · ${selectedVariant.stone}</div>
            <div style="font-size:11px;color:#9CA3AF;margin-top:2px;">ItemNo: ${selectedVariant.sku} · ${selectedVariant.weight}</div>
          </div>
          <div class="pm-price-value">${fmt(selectedVariant.price * pmRetailQty)}</div>
        </div>` : ''}
  `;
  updatePmFooter();
}

function saveCustomerNote() {
  const el = document.getElementById('pmCustomerNote');
  if (el) pmCustomerNote = el.value;
}

function toggleReq(reqId) {
  saveCustomerNote();
  if (pmCustomerReqs.includes(reqId)) {
    pmCustomerReqs = pmCustomerReqs.filter(r => r !== reqId);
    delete pmReqDetails[reqId];
  } else {
    pmCustomerReqs = [...pmCustomerReqs, reqId];
  }
  renderRetailPanel();
}

function selectReqDetail(reqId, detail) {
  saveCustomerNote();
  pmReqDetails[reqId] = pmReqDetails[reqId] === detail ? '' : detail;
  renderRetailPanel();
}

function selectVersion(versionId) {
  saveCustomerNote();
  const v = pmCurrentProduct.versions?.find(v => v.id === versionId);
  if (v) pmActiveVersion = v;
  updateProductImage();
  renderRetailPanel();
}

function selectRetailColor(color) {
  saveCustomerNote();
  pmRetailColor = color;
  pmRetailSize  = productHasSizes(pmCurrentProduct) ? null : 0;
  updateProductImage();
  renderRetailPanel();
}

function selectRetailSize(size) {
  saveCustomerNote();
  pmRetailSize = size;
  renderRetailPanel();
}

function changeRetailQty(delta) {
  saveCustomerNote();
  pmRetailQty = Math.max(1, pmRetailQty + delta);
  renderRetailPanel();
}

/* ── QUICK-BUY PANEL (Mua nhanh) ── */
function renderWholesalePanel() {
  if (!pmCurrentProduct) return;
  const container = document.getElementById('pmQuickRows');
  const colors = [...new Set(pmCurrentProduct.variants.map(v => v.color))];

  const rowsHtml = pmQuickRows.map((row, idx) => {
    const sizesForColor = row.color ? pmCurrentProduct.variants.filter(v => v.color === row.color && v.stock > 0) : [];
    const matched = (row.color && row.size !== null)
      ? pmCurrentProduct.variants.find(v => v.color === row.color && v.size === row.size)
      : null;

    return `
      <div style="background:#F9FAFB;border:1px solid #E5E7EB;border-radius:10px;padding:14px 16px;margin-bottom:10px;${matched ? 'border-left:3px solid #0052CC;' : ''}">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:10px;">
          <span style="font-size:12px;font-weight:700;color:#6B7280;">Dòng ${idx+1}</span>
          ${matched ? `<span style="font-size:11px;color:#9CA3AF;font-family:monospace;">${matched.sku}</span>` : ''}
          ${matched ? `<span style="font-size:11px;color:#059669;font-weight:600;">Còn ${matched.stock}</span>` : ''}
          <button onclick="removeQuickRow(${row.id})" style="margin-left:auto;background:none;border:none;cursor:pointer;color:#D1D5DB;font-size:16px;padding:2px 6px;border-radius:4px;transition:all .15s;" onmouseover="this.style.color='#EF4444';this.style.background='#FEE2E2'" onmouseout="this.style.color='#D1D5DB';this.style.background='none'">✕</button>
        </div>
        <div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">
          <select onchange="updateQuickRow(${row.id},'color',this.value)" style="flex:1;min-width:120px;padding:7px 10px;border:1px solid #E5E7EB;border-radius:6px;font-size:13px;font-family:inherit;color:#374151;background:white;cursor:pointer;">
            <option value="">Chọn màu...</option>
            ${colors.map(c => `<option value="${c}" ${row.color===c?'selected':''}>${c}</option>`).join('')}
          </select>
          <select onchange="updateQuickRow(${row.id},'size',this.value)" style="min-width:90px;padding:7px 10px;border:1px solid #E5E7EB;border-radius:6px;font-size:13px;font-family:inherit;color:#374151;background:white;cursor:pointer;" ${!row.color?'disabled':''}>
            <option value="">Size...</option>
            ${sizesForColor.map(v => `<option value="${v.size}" ${row.size===v.size?'selected':''}>${v.size || 'Free'} (còn ${v.stock})</option>`).join('')}
          </select>
          <div style="display:flex;align-items:center;gap:3px;">
            <button class="tqc-btn" onclick="changeQuickQty(${row.id},-1)" ${!matched?'disabled':''}>−</button>
            <input class="tqc-num ${row.qty>0?'positive':''}" type="number" value="${row.qty}" min="1" ${!matched?'disabled':''} style="width:40px;" onchange="setQuickQty(${row.id},parseInt(this.value)||1)">
            <button class="tqc-btn" onclick="changeQuickQty(${row.id},1)" ${!matched?'disabled':''}>+</button>
          </div>
          <div style="min-width:90px;text-align:right;font-size:13px;font-weight:700;color:${matched?'#0052CC':'#D1D5DB'};">
            ${matched ? fmt(matched.wholesalePrice * row.qty) : '—'}
          </div>
        </div>
        ${matched ? `<div style="margin-top:6px;font-size:11px;color:#9CA3AF;">${matched.weight} · ${matched.stone} · ${fmt(matched.wholesalePrice)}/sp</div>` : ''}
      </div>`;
  }).join('');

  container.innerHTML = `
    ${rowsHtml}
    <button onclick="addQuickRow()" style="width:100%;padding:12px;border:2px dashed #D1D5DB;border-radius:10px;background:none;cursor:pointer;font-size:13px;font-weight:600;color:#9CA3AF;display:flex;align-items:center;justify-content:center;gap:6px;transition:all .15s;" onmouseover="this.style.borderColor='#0052CC';this.style.color='#0052CC';this.style.background='#EFF6FF'" onmouseout="this.style.borderColor='#D1D5DB';this.style.color='#9CA3AF';this.style.background='none'">
      + Thêm biến thể
    </button>
    ${pmQuickRows.length === 0 ? `<div style="text-align:center;padding:30px 0;color:#9CA3AF;"><div style="font-size:28px;margin-bottom:6px;">📦</div><div style="font-size:13px;">Bấm "+ Thêm biến thể" để chọn sản phẩm cần mua</div></div>` : ''}
  `;

  // Sync pmWholesaleQtys for footer calc
  pmWholesaleQtys = {};
  pmQuickRows.forEach(row => {
    if (!row.color || row.size === null) return;
    const v = pmCurrentProduct.variants.find(v => v.color === row.color && v.size === row.size);
    if (v) pmWholesaleQtys[v.sku] = (pmWholesaleQtys[v.sku] || 0) + row.qty;
  });
  updatePmFooter();
}

function addQuickRow() {
  pmQuickRows.push({ id: ++pmQuickSeq, color: '', size: null, qty: 1 });
  renderWholesalePanel();
}

function removeQuickRow(id) {
  pmQuickRows = pmQuickRows.filter(r => r.id !== id);
  renderWholesalePanel();
}

function updateQuickRow(id, field, val) {
  const row = pmQuickRows.find(r => r.id === id);
  if (!row) return;
  if (field === 'color') {
    row.color = val; row.size = null;
    const sizes = pmCurrentProduct.variants.filter(v => v.color === val && v.stock > 0);
    if (sizes.length === 1) row.size = sizes[0].size;
  } else if (field === 'size') {
    row.size = val === '' ? null : (isNaN(Number(val)) ? val : Number(val));
  }
  renderWholesalePanel();
}

function changeQuickQty(id, delta) {
  const row = pmQuickRows.find(r => r.id === id);
  if (!row) return;
  const v = pmCurrentProduct.variants.find(v => v.color === row.color && v.size === row.size);
  row.qty = Math.max(1, Math.min(v ? v.stock : 999, row.qty + delta));
  renderWholesalePanel();
}

function setQuickQty(id, val) {
  const row = pmQuickRows.find(r => r.id === id);
  if (!row) return;
  const v = pmCurrentProduct.variants.find(v => v.color === row.color && v.size === row.size);
  row.qty = Math.max(1, Math.min(v ? v.stock : 999, val));
  renderWholesalePanel();
}

/* ── FOOTER ── */
function updatePmFooter() {
  let variants = 0, totalQty = 0, totalPrice = 0;

  if (pmCurrentTab === 'retail') {
    const v = pmCurrentProduct?.variants.find(v => v.color===pmRetailColor && v.size===pmRetailSize);
    if (v && (pmRetailSize !== null || !productHasSizes(pmCurrentProduct))) { variants = 1; totalQty = pmRetailQty; totalPrice = v.price * pmRetailQty; }
  } else {
    Object.entries(pmWholesaleQtys).forEach(([sku, qty]) => {
      if (qty > 0) {
        const v = pmCurrentProduct?.variants.find(v => v.sku === sku);
        if (v) { variants++; totalQty += qty; totalPrice += v.wholesalePrice * qty; }
      }
    });
  }

  document.getElementById('pmFooterMeta').textContent  = `Đã chọn ${variants} biến thể · Tổng số lượng ${totalQty} sản phẩm`;
  document.getElementById('pmFooterPrice').textContent = fmt(totalPrice);
  document.getElementById('pmBtnCreateOrder').disabled = totalQty === 0;
}

/* ── ADD TO CART ── */
function addToCart(goToOrder = false) {
  saveCustomerNote();
  if (!selectedCustomer) { showNotification('Vui lòng chọn khách hàng', 'error'); return; }

  let added = 0;
  const p = pmCurrentProduct;

  if (pmCurrentTab === 'retail') {
    const v = p.variants.find(v => v.color===pmRetailColor && v.size===pmRetailSize);
    if (!v) {
      showNotification(productHasSizes(p) ? 'Vui lòng chọn màu và size' : 'Vui lòng chọn màu', 'error');
      return;
    }
    addCartItem(p.id, p.name, p.drawingNo, v.sku, v.color, v.size, pmRetailQty, v.price);
    added = pmRetailQty;
  } else {
    Object.entries(pmWholesaleQtys).forEach(([sku, qty]) => {
      if (qty <= 0) return;
      const v = p.variants.find(v => v.sku === sku);
      if (!v) return;
      addCartItem(p.id, p.name, p.drawingNo, sku, v.color, v.size, qty, v.wholesalePrice);
      added += qty;
    });
  }

  if (added === 0) { showNotification('Chưa chọn sản phẩm nào', 'error'); return; }

  closeProductModal();
  updateStickyBtn();
  renderProducts(getFilteredProducts());
  showNotification(`✓ Đã thêm ${added} sản phẩm vào giỏ`);

  if (goToOrder) setTimeout(() => openCartSidebar(), 300);
}

function quickAdd(productId, e) {
  e.stopPropagation();
  if (!selectedCustomer) { showNotification('Vui lòng chọn khách hàng trước', 'error'); openCustomerModal(); return; }
  const p = PRODUCTS.find(p => p.id === productId);
  const v = p.variants[0];
  addCartItem(p.id, p.name, p.drawingNo, v.sku, v.color, v.size, 1, v.wholesalePrice);
  updateStickyBtn();
  renderProducts(getFilteredProducts());
  showNotification(`✓ Đã thêm ${p.name} vào giỏ`);
}

// ═══════════════════════════════════════════════════
// CART SIDEBAR
// ═══════════════════════════════════════════════════
function openCartSidebar() {
  renderCartSidebar();
  document.getElementById('cartSidebar').classList.add('open');
  document.getElementById('cartBackdrop').classList.add('open');
}

function closeCartSidebar() {
  document.getElementById('cartSidebar').classList.remove('open');
  document.getElementById('cartBackdrop').classList.remove('open');
}

function renderCartSidebar() {
  const o = getActiveOrder();
  const orderIdx = orders.indexOf(o) + 1;
  const matLabel = selectedMaterial ? `${selectedMaterial.icon} ${selectedMaterial.name}` : '';
  const purLabel = selectedPurity ? selectedPurity.tag : '';

  document.getElementById('csTitle').textContent = o?.customName || `Đặt hàng ${orderIdx}`;
  document.getElementById('csBadge').textContent = cart.length;

  // Customer + Material/Purity info
  const custArea = document.getElementById('csCustomerArea');
  const matPurBadge = matLabel ? `
    <div style="margin:0 12px 8px;padding:8px 12px;background:#FFFBEB;border:1px solid #FCD34D;border-radius:8px;display:flex;align-items:center;gap:8px;">
      <span style="font-size:14px;">${selectedMaterial?.icon || ''}</span>
      <div style="flex:1;">
        <div style="font-size:12px;font-weight:700;color:#92400E;">${selectedMaterial?.name || ''}${purLabel ? ' · ' + purLabel : ''}</div>
      </div>
    </div>` : '';

  custArea.innerHTML = (selectedCustomer
    ? `<div class="cs-customer">
        <div class="cs-customer-avatar">${selectedCustomer.name.charAt(0)}</div>
        <div class="cs-customer-info">
          <div class="cs-customer-name">${selectedCustomer.name}</div>
          <div class="cs-customer-meta">${selectedCustomer.code} · ${selectedCustomer.type}</div>
        </div>
        ${selectedCustomer.discount ? `<div class="cs-discount-badge">${selectedCustomer.discount}%</div>` : ''}
      </div>`
    : `<div class="cs-no-customer" onclick="openCustomerModal()">👤 + Chọn khách hàng</div>`)
    + matPurBadge;

  // Products (grouped by productId)
  const productsEl = document.getElementById('csProducts');
  if (cart.length === 0) {
    productsEl.innerHTML = `<div class="cs-empty">🛒<br>Chưa có sản phẩm nào<br><span style="font-size:11px;">Bấm "Xem biến thể" để thêm sản phẩm</span></div>`;
  } else {
    const groups = {};
    cart.forEach(item => { (groups[item.productId] ??= []).push(item); });

    productsEl.innerHTML = Object.entries(groups).map(([pid, items]) => {
      const p = PRODUCTS.find(p => p.id == pid);
      const totalQty   = items.reduce((s, i) => s + i.qty, 0);
      const totalPrice = items.reduce((s, i) => s + i.price * i.qty, 0);
      return `
        <div class="cs-product-item" onclick="openProductModal(${pid})">
          <div class="cs-product-thumb" style="font-size:24px;">${p?.image || '💍'}</div>
          <div class="cs-product-info">
            <div class="cs-product-name">${p?.name}</div>
            <div class="cs-product-sku">${p?.drawingNo}</div>
            <div class="cs-product-qty">${items.length} BT · ${totalQty} sp · ${fmt(totalPrice)}</div>
          </div>
          <div class="cs-product-arrow">›</div>
        </div>`;
    }).join('');
  }

  // Summary
  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal   = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discount   = selectedCustomer?.discount ? Math.round(subtotal * Math.abs(selectedCustomer.discount) / 100) : 0;
  const total      = subtotal - discount;
  const mauCount   = [...new Set(cart.map(i => i.productId))].length;

  // All-orders summary
  const otherOrders = orders.filter(o => o.id !== activeOrderId && o.cart.length > 0);
  const allOrdersTotal = orders.reduce((s, o) => s + o.cart.reduce((s2, i) => s2 + i.price * i.qty, 0), 0);
  const allOrdersItems = orders.reduce((s, o) => s + o.cart.reduce((s2, i) => s2 + i.qty, 0), 0);
  const allOrdersDiscount = selectedCustomer?.discount ? Math.round(allOrdersTotal * Math.abs(selectedCustomer.discount) / 100) : 0;

  const allOrdersSummaryHtml = otherOrders.length > 0 ? `
    <div style="background:#F0F7FF;border:1px solid #BFDBFE;border-radius:10px;padding:10px 12px;margin-bottom:8px;">
      <div style="font-size:11px;font-weight:700;color:#1D4ED8;margin-bottom:6px;">📦 Tất cả đặt hàng (${orders.filter(o => o.cart.length > 0).length})</div>
      ${orders.filter(o => o.cart.length > 0).map(o => {
        const oTotal = o.cart.reduce((s, i) => s + i.price * i.qty, 0);
        const oQty = o.cart.reduce((s, i) => s + i.qty, 0);
        const matIcon = o.material?.icon || '';
        const purTag = o.purity?.tag || '';
        const oIdx = orders.indexOf(o) + 1;
        const oLabel = o.customName || `Đặt hàng ${oIdx}`;
        const matName = o.material?.name || '';
        return `<div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;color:#374151;padding:3px 0;">
          <span>${o.id === activeOrderId ? '→ ' : ''}${oLabel} <span style="font-size:10px;color:#9CA3AF;">${matIcon} ${matName}${purTag ? ' · '+purTag : ''}</span></span>
          <span style="font-weight:600;">${oQty} sp · ${fmt(oTotal)}</span>
        </div>`;
      }).join('')}
      <div style="display:flex;justify-content:space-between;font-size:13px;font-weight:700;color:#0052CC;padding-top:6px;margin-top:6px;border-top:1px solid #BFDBFE;">
        <span>Tổng tất cả</span>
        <span>${fmt(allOrdersTotal - allOrdersDiscount)}</span>
      </div>
    </div>` : '';

  document.getElementById('csSummary').innerHTML = `
    <div class="cs-summary-meta">${mauCount} mẫu · ${cart.length} biến thể · ${totalItems} sản phẩm</div>
    <div class="cs-summary-row"><span>Tạm tính</span><span>${fmt(subtotal)}</span></div>
    ${discount ? `<div class="cs-summary-row"><span>Chiết khấu (${selectedCustomer.discount}%)</span><span style="color:#EF4444;">-${fmt(discount)}</span></div>` : ''}
    <div class="cs-summary-total"><span>Tổng cộng</span><span>${fmt(total)}</span></div>
    ${allOrdersSummaryHtml}
  `;

  // Show/hide "checkout all" button
  const checkoutAllBtn = document.getElementById('csCheckoutAllBtn');
  if (checkoutAllBtn) {
    const filledOrders = orders.filter(o => o.cart.length > 0);
    checkoutAllBtn.style.display = filledOrders.length > 1 ? '' : 'none';
    checkoutAllBtn.textContent = `📦 Tạo tất cả đơn hàng (${filledOrders.length})`;
  }
}

function goToCheckout(mode = 'single') {
  if (!selectedCustomer) { showNotification('Vui lòng chọn khách hàng', 'error'); return; }
  saveOrderState();

  if (mode === 'all') {
    const allCarts = orders.filter(o => o.cart.length > 0);
    if (allCarts.length === 0) { showNotification('Tất cả giỏ hàng đang trống', 'error'); return; }
    sessionStorage.setItem('cartData', JSON.stringify({
      customer: selectedCustomer,
      orders: allCarts.map(o => ({
        id: o.id,
        cart: [...o.cart],
        material: o.material,
        purity: o.purity,
      })),
    }));
  } else {
    if (cart.length === 0) { showNotification('Giỏ hàng đang trống', 'error'); return; }
    sessionStorage.setItem('cartData', JSON.stringify({
      customer: selectedCustomer,
      cart,
      orders: [{ id: activeOrderId, cart, material: selectedMaterial, purity: selectedPurity }],
    }));
  }
  window.location.href = 'checkout.html';
}

// ═══════════════════════════════════════════════════
// STICKY CART BUTTON
// ═══════════════════════════════════════════════════
function updateStickyBtn() {
  const totalMau = [...new Set(cart.map(i => i.productId))].length;
  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  const total    = cart.reduce((s, i) => s + i.price * i.qty, 0);

  document.getElementById('stickyCartBtn').style.display = totalMau > 0 ? 'flex' : 'none';
  document.getElementById('cartCount').textContent       = totalMau;
  document.getElementById('stickyOrderName').textContent = `Đặt hàng ${activeOrderId}`;
  document.getElementById('stickyCartMeta').textContent  = `${totalMau} mẫu · ${totalQty} sp`;
  document.getElementById('stickyCartTotal').textContent = `Tổng: ${fmt(total)}`;
}

// ═══════════════════════════════════════════════════
// BARCODE SCANNER
// ═══════════════════════════════════════════════════
let barcodeStream = null;

function openBarcodeModal() {
  document.getElementById('barcodeModal').classList.add('active');
  document.getElementById('barcodeManualInput').value = '';
  document.getElementById('barcodeResult').innerHTML = '';
  document.getElementById('barcodeCameraStatus').style.display = 'flex';
  document.getElementById('barcodeCameraStatus').textContent = 'Đang khởi động camera...';
  startBarcodeCamera();
}

function closeBarcodeModal() {
  document.getElementById('barcodeModal').classList.remove('active');
  stopBarcodeCamera();
}

document.getElementById('barcodeModal').addEventListener('click', e => {
  if (e.target === document.getElementById('barcodeModal')) closeBarcodeModal();
});

async function startBarcodeCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
    });
    barcodeStream = stream;
    const video = document.getElementById('barcodeVideo');
    video.srcObject = stream;
    document.getElementById('barcodeCameraStatus').style.display = 'none';

    // Try BarcodeDetector API (supported on Chrome/Safari)
    if ('BarcodeDetector' in window) {
      const detector = new BarcodeDetector({ formats: ['ean_13', 'ean_8', 'code_128', 'code_39', 'qr_code', 'upc_a', 'upc_e'] });
      detectBarcode(video, detector);
    } else {
      document.getElementById('barcodeCameraStatus').style.display = 'flex';
      document.getElementById('barcodeCameraStatus').innerHTML = '⚠️ Trình duyệt chưa hỗ trợ quét tự động<br><span style="font-size:11px;opacity:.7;">Hãy nhập mã thủ công bên dưới</span>';
    }
  } catch (err) {
    document.getElementById('barcodeCameraStatus').style.display = 'flex';
    document.getElementById('barcodeCameraStatus').innerHTML = '📷 Không thể truy cập camera<br><span style="font-size:11px;opacity:.7;">Hãy nhập mã thủ công bên dưới</span>';
  }
}

async function detectBarcode(video, detector) {
  if (!barcodeStream) return;
  try {
    const barcodes = await detector.detect(video);
    if (barcodes.length > 0) {
      const code = barcodes[0].rawValue;
      document.getElementById('barcodeManualInput').value = code;
      if (navigator.vibrate) navigator.vibrate(100);
      submitBarcode();
      return;
    }
  } catch (e) {}
  if (barcodeStream) requestAnimationFrame(() => detectBarcode(video, detector));
}

function stopBarcodeCamera() {
  if (barcodeStream) {
    barcodeStream.getTracks().forEach(t => t.stop());
    barcodeStream = null;
  }
  const video = document.getElementById('barcodeVideo');
  if (video) video.srcObject = null;
}

function submitBarcode() {
  const code = document.getElementById('barcodeManualInput').value.trim();
  if (!code) return;

  // Search by SKU match
  const resultEl = document.getElementById('barcodeResult');
  const product = PRODUCTS.find(p => p.drawingNo.toLowerCase() === code.toLowerCase() || p.variants.some(v => v.sku.toLowerCase() === code.toLowerCase()));

  if (product) {
    resultEl.innerHTML = `
      <div style="background:#D1FAE5;border:1px solid #A7F3D0;border-radius:8px;padding:12px;display:flex;align-items:center;gap:12px;">
        <span style="font-size:24px;">✅</span>
        <div style="flex:1;">
          <div style="font-size:13px;font-weight:700;color:#065F46;">${product.name}</div>
          <div style="font-size:11px;color:#047857;">${product.drawingNo} · ${product.variants.length} biến thể</div>
        </div>
        <button onclick="closeBarcodeModal();openProductModal(${product.id})" style="background:#0052CC;color:white;border:none;border-radius:6px;padding:8px 14px;font-size:12px;font-weight:700;cursor:pointer;">Xem</button>
      </div>`;
    if (navigator.vibrate) navigator.vibrate(100);
  } else {
    resultEl.innerHTML = `
      <div style="background:#FEF2F2;border:1px solid #FECACA;border-radius:8px;padding:12px;display:flex;align-items:center;gap:10px;">
        <span style="font-size:20px;">❌</span>
        <div>
          <div style="font-size:13px;font-weight:600;color:#991B1B;">Không tìm thấy sản phẩm</div>
          <div style="font-size:11px;color:#B91C1C;">Mã "${code}" không khớp với sản phẩm nào</div>
        </div>
      </div>`;
  }
}

// ═══════════════════════════════════════════════════
// SEARCH + FILTER
// ═══════════════════════════════════════════════════
document.getElementById('searchInput').addEventListener('input', e => {
  const q = e.target.value.toLowerCase();
  renderProducts(q
    ? PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.drawingNo.toLowerCase().includes(q) || p.variants.some(v => v.sku.toLowerCase().includes(q)))
    : PRODUCTS);
});

document.querySelectorAll('.tab[data-filter]').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab[data-filter]').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const f = tab.dataset.filter;
    const filters = {
      hot:       p => p.badge === 'Bán chạy',
      available: p => p.badge === 'Có sẵn' || p.variants.some(v => v.stock > 0),
      pair:      p => p.badge === 'Nhận đôi',
      under1m:   p => p.variants.some(v => v.price < 1000000),
      'low-moq': p => p.badge === 'MOQ thấp',
    };
    renderProducts(filters[f] ? PRODUCTS.filter(filters[f]) : PRODUCTS);
  });
});

document.querySelectorAll('.category-item').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('.category-item').forEach(i => i.classList.remove('active'));
    item.classList.add('active');
    const cat = item.dataset.cat;
    renderProducts(cat === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === cat));
  });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeProductModal(); closeCustomerModal(); closeCartSidebar(); }
});

// ═══════════════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════════════
renderProducts(PRODUCTS);
updateStickyBtn();
renderSubHeader();
renderCustomerList(CUSTOMERS);
