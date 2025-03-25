# 📚 Slack English Learning Bot

A **Slack bot** that helps team members improve their **English skills** by sending random questions at scheduled times. Users can interact with the bot by responding to messages or using Slack buttons. The bot is built using **Bun Runtime** and **ElysiaJS** for high performance and scalability.

---

## 🚀 Features

- **Random English Questions**: Sends questions at scheduled intervals.
- **Interactive Slack Integration**: Users can respond via messages or buttons.
- **Admin Panel**: Manage questions and track user progress.
- **Fast & Efficient**: Built with **Bun** and **ElysiaJS** for optimal performance.
- **Clean Code Structure**: Follows best practices for scalability.

---

## 📂 Project Structure

```
📦 english-slack-bot
├── 📂 src
│   ├── 📂 api             # API handlers for Slack and Admin panel
│   ├── 📂 controllers     # Business logic handlers
│   ├── 📂 services        # Core logic for Slack and Question management
│   ├── 📂 repositories    # Database access layer
│   ├── 📂 middlewares     # Middleware for security and validation
│   ├── 📂 routes          # Route definitions for Slack and Admin APIs
│   ├── 📂 database        # Database connection and migrations
│   ├── app.ts            # ElysiaJS application setup
│   ├── server.ts         # Server entry point
├── 📂 tests              # Unit and integration tests
├── 📂 documents          # Business specifications and diagrams
├── .env                  # Environment variables
├── .eslintrc.js          # ESLint configuration
├── .prettierrc.js        # Prettier configuration
├── bun.lockb             # Bun package lock file
├── package.json          # Project dependencies
├── README.md             # Project documentation
```

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/your-repo/english-slack-bot.git
cd english-slack-bot
```

### 2️⃣ Install Dependencies

```sh
bun install
```

### 3️⃣ Set Up Environment Variables

Create a **.env** file and add your Slack credentials:

```
SLACK_BOT_TOKEN=your-slack-bot-token
SLACK_SIGNING_SECRET=your-slack-signing-secret
DATABASE_URL=your-database-url
```

### 4️⃣ Run the Development Server

```sh
bun run dev
```

---

## 🎯 API Endpoints

### Slack Bot

| Method | Endpoint          | Description                     |
| ------ | ----------------- | ------------------------------- |
| `GET`  | `/slack/question` | Sends a random English question |
| `POST` | `/slack/answer`   | Submits an answer to a question |

### Admin Panel

| Method   | Endpoint              | Description                     |
| -------- | --------------------- | ------------------------------- |
| `GET`    | `/admin/questions`    | Fetch all stored questions      |
| `POST`   | `/admin/question`     | Add a new English question      |
| `DELETE` | `/admin/question/:id` | Remove a question from database |

---

## ✅ Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m "Add new feature"`
4. Push to branch: `git push origin feature-name`
5. Open a Pull Request 🚀

---

## 📜 License

This project is licensed under the MIT License.

---

## 🔗 Contact

- **Author**: Dang Do Quang Bao
- **Email**: ddquangbao@gmail.com
- **GitHub**: [quangpao](https://github.com/quangpao)

🚀 Happy Learning! 🎉
