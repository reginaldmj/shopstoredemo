# Auth and Profile API Testing

## 1) Environment
Create a local env file from [.env.example](.env.example) and set a strong JWT secret.

## 2) Start server
```bash
npm start
```

## 3) Register
```bash
curl -X POST http://127.0.0.1:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Smith","email":"jane@example.com","password":"SuperSecure123!"}'
```

## 4) Login
```bash
curl -X POST http://127.0.0.1:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"jane@example.com","password":"SuperSecure123!"}'
```

Copy the `token` from the response.

## 5) Get current user
```bash
curl http://127.0.0.1:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 6) Get profile
```bash
curl http://127.0.0.1:5000/api/profile \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 7) Update profile
```bash
curl -X PUT http://127.0.0.1:5000/api/profile \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"name":"Jane A. Smith","bio":"I love minimal design.","avatarUrl":"https://example.com/avatar.jpg"}'
```

## Optional: VS Code REST Client
Use [auth-api.http](auth-api.http) if you have the REST Client extension.
