Dưới đây là ảnh chụp nhanh các chức năng hiện có ở client (dùng dữ liệu JSON/localStorage) và gợi ý API bạn cần khi chuyển sang backend.
Các màn chính & luồng hiện có
Trang Shop:
Danh sách sản phẩm với lọc theo giá, tag (sale 50/30%, “New”), tìm kiếm (trong navbar MiddleNav).
Random product highlight trong sidebar.
Product Details: hiển thị thông tin sản phẩm, điều chỉnh số lượng, Add to Cart, Add to Wish List, thông tin delivery/returns/payment…, mô tả chi tiết & specs.
Cart:
Xem cart, cập nhật số lượng, xóa item, tính subtotal + taxes, tiếp tục Checkout.
Wishlist:
(link có sẵn trên navbar; hiện đang lưu localStorage giống cart).
Checkout:
Trang checkout có sẵn (chưa xem logic thanh toán server).
Account:
Link “Account” trong menu (chưa thấy logic auth thực).
Blogs:
Danh sách blog từ Blogs.json, nút “Read More” sang Blog Detail.
Blog Detail hiển thị nội dung và sidebar 5 bài mới.
Navbar/MiddleNav:
Search sản phẩm (lọc client từ các JSON gộp).
Badge đếm Cart/Wishlist (localStorage + sự kiện storageUpdate).
Deals/Banner/BestSales/New Arrivals/OrganicFood/Recommends/...:
Các section trang chủ/khác dùng nhiều JSON (BestDeals, BestSales, HotDeals, Arrivals, OrganicFood, Recommend, ShortProducts).
Pages khác trong menu:
Contact Us, Checkout, Wishlist, Cart, Account (UI links).
Static styles: globals.css, icon-based ratings, offers, badges.
Hiện dữ liệu lấy từ:
Nhiều file JSON: BestDeals, BestSales, HotDeals, Arrivals, OrganicFood, Recommend, ShortProducts (Featured/TopSelling/OnSale/TopRated), Blogs.json.
Trạng thái Cart/Wishlist lưu localStorage (cart, wishlist), phát sự kiện storageUpdate/wishlist/cartUpdate.
Đề xuất API cần có khi bỏ JSON và localStorage
Sản phẩm & danh mục
GET /products?priceMax=&saleTag=&isNew=&search= : list + filter (giá, tag, new, search).
GET /products/:id : chi tiết sản phẩm (title, price, lessprice, sale, review, sold, images, specs, description).
GET /products/random (hoặc /products/highlight) : lấy 1–n sản phẩm cho sidebar “random”.
GET /categories (nếu cần lọc theo category/brand).
GET /deals/banners/sections : trả về các block như BestDeals, BestSales, HotDeals, Arrivals, OrganicFood, Recommend, ShortProducts (featured/top-selling/on-sale/top-rated).
Blog
GET /blogs : danh sách (id, title, tag, date, comment count, excerpt, image).
GET /blogs/:id : chi tiết.
(Optional) GET /blogs/latest?limit=5 : cho sidebar.
Cart & Wishlist (hiện localStorage)
Authenticated:
GET /cart, POST /cart (add), PATCH /cart/:itemId (update qty), DELETE /cart/:itemId.
GET /wishlist, POST /wishlist, DELETE /wishlist/:itemId.
Nếu guest cần: có thể dùng cart_id token hoặc session để lưu tạm.
Checkout/Orders
POST /checkout (tạo order từ cart, shipping info, payment method).
GET /orders, GET /orders/:id (lịch sử).
(Optional) POST /payments/intent (nếu tích hợp cổng thanh toán).
Người dùng / Auth
POST /auth/register, POST /auth/login, POST /auth/logout.
GET /me (profile), PATCH /me (cập nhật thông tin, địa chỉ).
GET /addresses, POST /addresses, PATCH /addresses/:id, DELETE /addresses/:id.
Search
GET /search?q= (trả về sản phẩm, có thể kèm blog nếu cần).
Review / Rating (nếu muốn hiện thực hóa phần review/sold)
GET /products/:id/reviews
POST /products/:id/reviews
Khác (tùy nhu cầu)
Inventory/availability cho sản phẩm.
Shipping methods / delivery estimation.
Taxes/fees config.
Mapping nhanh UI → API
Shop list/filter/search/random → GET /products (filters) + GET /products/random.
Product detail + description/specs → GET /products/:id.
Cart badge/flow → cart APIs.
Wishlist badge/flow → wishlist APIs.
Blog list/detail + sidebar → blog APIs.
Deals/banners/home sections → section/deals API hoặc dùng field “section” trong products.
Navbar search → /search hoặc /products?search=.
Nếu cần thêm chi tiết về payload mẫu cho từng API, mình có thể phác thảo nhanh theo cấu trúc dữ liệu hiện có.

Dưới đây là bộ bảng tối thiểu, bám sát các chức năng hiện có (shop/cart/wishlist/checkout/blog) và mở rộng để hỗ trợ backend thật. Tên field gợi ý, bạn có thể điều chỉnh kiểu/enum cho phù hợp (PostgreSQL/SQL):

1. users
   id (PK, uuid/serial)
   email (unique), password_hash
   full_name, phone
   role (enum: user, admin)
   created_at, updated_at
2. addresses
   id (PK)
   user_id (FK users.id)
   full_name, phone
   line1, line2, city, state, country, postal_code
   is_default (bool)
   created_at, updated_at
3. categories
   id (PK)
   name (unique), slug (unique)
   parent_id (FK categories.id, nullable)
   created_at, updated_at
4. products
   id (PK)
   title, slug (unique)
   description (text)
   price (numeric/decimal)
   less_price (numeric, nullable) — giá gốc/giảm
   sale_tag (text/enum: "50%", "30%", "New", etc.)
   review_count (int), average_rating (numeric)
   sold (int)
   stock (int) — tồn kho
   category_id (FK categories.id, nullable)
   created_at, updated_at, is_active (bool)
5. product_images
   id (PK)
   product_id (FK products.id)
   url
   sort_order (int)
6. product_specs (tùy nhu cầu mô tả chi tiết)
   id (PK)
   product_id (FK products.id)
   label, value
7. inventory_logs (optional để theo dõi nhập/xuất)
   id (PK)
   product_id (FK products.id)
   delta_qty (int, + nhập / - xuất)
   note, created_at
8. carts (tùy chọn: nếu muốn lưu cart server-side cho guest với cart_token)
   id (PK)
   user_id (FK users.id, nullable)
   cart_token (unique, nullable) — cho guest
   created_at, updated_at
9. cart_items
   id (PK)
   cart_id (FK carts.id)
   product_id (FK products.id)
   quantity (int)
   unit_price_snapshot (numeric) — giá tại thời điểm cho vào
   created_at, updated_at
10. wishlists (tùy chọn, hoặc chỉ cần wishlist_items gắn user)
    id (PK)
    user_id (FK users.id, nullable)
    wishlist_token (nullable, nếu hỗ trợ guest)
    created_at, updated_at
11. wishlist_items
    id (PK)
    wishlist_id (FK wishlists.id)
    product_id (FK products.id)
    created_at
12. orders
    id (PK, dạng code)
    user_id (FK users.id, nullable nếu guest checkout)
    status (enum: pending, paid, shipped, completed, canceled)
    subtotal, tax, shipping_fee, discount, total (numeric)
    currency
    shipping_address_id (FK addresses.id, nullable; hoặc lưu snapshot)
    billing_address_id (FK addresses.id, nullable)
    payment_method (text/enum), delivery_method (text/enum)
    created_at, updated_at
13. order_items
    id (PK)
    order_id (FK orders.id)
    product_id (FK products.id)
    product_title_snapshot, product_image_snapshot
    quantity (int)
    unit_price_snapshot (numeric)
    total_price (numeric)
14. payments (nếu cần tách)
    id (PK)
    order_id (FK orders.id)
    provider (stripe/cod/etc.), status (pending/succeeded/failed)
    amount, currency
    transaction_ref, payload (jsonb)
    created_at, updated_at
15. shipping_methods (tùy chọn cấu hình phí ship)
    id (PK)
    name, description
    base_fee, extra_fee_rule (jsonb), active (bool)
16. blog_posts
    id (PK)
    title, slug (unique)
    tag (text/enum), excerpt, content (text)
    cover_image
    published_at, created_at, updated_at
    author_id (FK users.id, nullable)
    comments_count (int) — nếu cần hiển thị nhanh
17. blog_latest_cache (tùy chọn, hoặc view)
    hoặc chỉ dùng SELECT LIMIT 5 ORDER BY published_at desc.
18. (optional) blog_comments
    id (PK)
    post_id (FK blog_posts.id)
    user_id (FK users.id, nullable for guest)
    content, created_at, status (approved/pending)
19. search_index (optional nếu cần tách, hoặc dùng full-text trên products/blog_posts)
    Mapping nhanh với UI hiện có
    Shop list/filter/random: products (+ category/sale_tag/price), product_images.
    Product detail: products, product_images, product_specs.
    Cart/Wishlist: carts/cart_items, wishlists/wishlist_items (hoặc gắn user + token guest).
    Checkout: orders/order_items (+ payments, shipping_methods, addresses).
    Blogs/list/detail + sidebar 5 bài: blog_posts (ORDER BY published_at DESC LIMIT 5).
    Navbar search: full-text trên products (title/description) và có thể cả blog_posts.
    Nếu muốn đơn giản hoá:
    Bỏ carts/wishlists table nếu luôn gắn user và lưu client -> nhưng để backend thật, nên có carts/wishlists.
    Bỏ inventory_logs nếu chưa cần audit.

Gợi ý bộ field cho product để thay thế JSON hiện dùng:
Bắt buộc (phục vụ tất cả UI hiện có)
id: string/uuid
title: string
price: number (đã format tiền ở client)
lessprice: number | null (giá gốc để gạch ngang)
sale: string | enum ("50%", "30%", "New", …)
image: string (ảnh chính)
images: string[] (gallery cho Product Detail)
reviewCount: number
averageRating: number
sold: number
stock: number (để kiểm tra hết hàng)
categoryId / categoryName: string (nếu cần lọc)
Nội dung chi tiết (cho Product Detail / mô tả)
description: string (đoạn văn dài)
specs: { label: string; value: string }[] (để hiển thị bảng thông số)
badges/tags: string[] (ví dụ “Organic”, “Best Seller”)
Hỗ trợ giỏ/wishlist
qtyStep/minQty (nếu cần)
isActive (ẩn/hiện sản phẩm)
Nếu muốn giữ tương thích với code hiện tại (đang dùng):
sale, lessprice, review, sold, image, title, price
Id (ghi hoa/chuẩn hóa thành id nhưng vẫn map được cho client)
review có thể đổi thành reviewCount; rating → averageRating.
API response mẫu (rút gọn):

{
"id": "123",
"title": "Organic Avocado",
"price": 12.5,
"sale": "30%",
"image": "/images/avo.png",
"images": ["/images/avo.png", "/images/avo-2.png"],
"reviewCount": 120,
"averageRating": 4.6,
"sold": 540,
"stock": 50,
"categoryName": "Fruits",
"description": "...",
"specs": [{ "label": "Weight", "value": "1kg" }]
}
