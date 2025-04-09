# Zustand, Redux, or React Contexts
✅ Khái niệm "slice" là gì?
Một slice = 1 mảnh (phân vùng) của global state + logic liên quan.

Ví dụ: authSlice
Chứa state: user, token, isAuthenticated

Chứa actions: login, logout, setUser, refreshToken

📦 Trong từng slice bạn thường có:
Thành phần	Mô tả
State	Dữ liệu domain-local (e.g., auth: { user, token, isLoading })
Actions	Hàm update state (sử dụng trong UI)
Selector	(Tùy chọn) – Hàm đọc state đã được format trước
Async logic	Gọi API, xử lý lỗi, dispatch async

🧠 Khi nào nên dùng slices/?
Tình huống	Có nên dùng slices/?
App nhỏ, state đơn giản	❌ Không cần, dùng local state hoặc 1 file global
Forum app, state có auth, thread, user, v.v.	✅ Nên chia slice
Cần logic async, optimistic update	✅ Slice giúp rõ ràng & maintainable
Multi-dev team	✅ Mỗi dev phụ trách 1 slice

# Mục đích là:

## Tách state management logic của từng domain (auth, thread, post, user...) thành các mô-đun độc lập, dễ mở rộng, dễ test, dễ debug.

# 📁 Tóm lại:

src/
├── features/
│   ├── auth/
│   │   └── pages/Register.tsx
│   └── threads/
│       └── pages/ThreadList.tsx
|
├── store/
| |--- index.ts               # hợp các slice lại thành 1 store
| |--- slices/
    ├── authSlice.ts       # State: user, token...
    ├── threadSlice.ts     # State: threads list, selectedThread...
    └── postSlice.ts       # State: comments, likes...