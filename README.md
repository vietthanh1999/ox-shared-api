![Project Banner](https://sdmntprnorthcentralus.oaiusercontent.com/files/00000000-a560-622f-b44c-3d5e3b938cfb/raw?se=2025-07-22T20%3A11%3A28Z&sp=r&sv=2024-08-04&sr=b&scid=0a57ee5e-6329-5de2-a6c3-4a9e7570ff67&skoid=add8ee7d-5fc7-451e-b06e-a82b2276cf62&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-07-22T13%3A07%3A01Z&ske=2025-07-23T13%3A07%3A01Z&sks=b&skv=2024-08-04&sig=lWGQL8uhkO4g%2BKzScUaVIgiCN/oo34CEwsSaZkCWURg%3D)

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Shared API - Airdrop Tools

## Mô tả

Shared API là backend service (NestJS + TypeORM + MySQL) dùng để quản lý:
- **Account**: Lưu trữ thông tin tài khoản, các mạng xã hội (gmail, twitter, discord, telegram, ...), mật khẩu, profile, PC, ...
- **Quest**: Quản lý các nhiệm vụ (quest) liên kết với account, trạng thái, metadata, campaign, message/error.
- **Wallet Hold**: Quản lý ví hold coin của account.

API cung cấp các endpoint CRUD cho từng đối tượng trên, hỗ trợ mở rộng cho các hệ thống Airdrop BE/FE.

## Cài đặt

```bash
pnpm install
```

## Cấu hình

Tạo file `.env` ở thư mục gốc với nội dung:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=ox_shared_api
```

## Chạy dự án

```bash
# Development
pnpm run start

# Watch mode
pnpm run start:dev

# Production
pnpm run start:prod
```

## Tài liệu API (Swagger)

Sau khi chạy, truy cập:
```
http://localhost:3000/api
```
để xem tài liệu và thử các API.

## Các module chính
- `Account`: Quản lý thông tin tài khoản, mạng xã hội, mật khẩu, profile, PC, ...
- `Quest`: Quản lý nhiệm vụ, trạng thái, metadata, campaign, ...
- `WalletHold`: Quản lý ví hold coin của account

## Scripts
- `pnpm run test` — Unit test
- `pnpm run test:e2e` — E2E test
- `pnpm run test:cov` — Coverage

## Đóng góp
Pull request, issue, và góp ý đều được chào đón!

## License
MIT
