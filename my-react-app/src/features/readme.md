├── features/               # Chia theo domain business logic
│   ├── auth/               # login, register, token...
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── services/       # Gọi API auth, schema validation
│   │
│   ├── threads/            # thread list, detail, reply...
│   ├── posts/              # comment/post logic
│   ├── users/              # profile, settings, avatar
│   └── notifications/      # inbox, real-time events (WebSocket?)