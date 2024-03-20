# Movie App

Movie App là một ứng dụng web cho phép người dùng tìm kiếm, xem thông tin và đánh giá các bộ phim.

Dự án này bao gồm cả Frontend và Backend.

## Cài đặt

Đầu tiên, clone repository này về máy của bạn:

```bash
git clone https://github.com/lppduy/movie-app.git
```

### Cài đặt Frontend

```bash
cd Frontend
npm install
```

### Cài đặt Backend

```bash
cd Backend
npm install
```

## Chạy ứng dụng

### Chạy Frontend

```bash
cd Frontend
npm start
```

Ứng dụng Frontend sẽ chạy ở địa chỉ [http://localhost:3000](http://localhost:3000).

### Chạy Backend

```bash
cd Backend
npm start
```

Ứng dụng Backend sẽ chạy ở địa chỉ [http://localhost:8000](http://localhost:5000).

## Chức năng

- Tìm kiếm phim theo từ khóa, thể loại, loại media, ngôn ngữ và năm phát hành.
- Xem thông tin chi tiết về một bộ phim, bao gồm tiêu đề, mô tả, ngôn ngữ, ngày phát hành, thể loại và đánh giá.

## Test API với Postman

Dự án này cung cấp một file Postman để giúp bạn test API. Để sử dụng nó, hãy làm theo các bước sau:

1. Tải và cài đặt [Postman](https://www.postman.com/downloads/).
2. Mở Postman và chọn `File > Import...`.
3. Trong tab `Link`, dán link tới file Postman trong repository này, hoặc chọn tab `File` và chọn file Postman từ máy của bạn.
4. Sau khi file đã được import, bạn sẽ thấy một collection mới trong Postman với tất cả các request để test API.

