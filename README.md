# My Portfolio

A modern web portfolio built with React, TypeScript, and Vite.

## 🚀 Features

- Fast and optimized performance with Vite
- Type-safe development using TypeScript
- Modern React practices with hooks and functional components
- Responsive design for all devices
- Component-driven architecture
- ESLint and Prettier for code quality

## 🛠️ Tech Stack

- React 18
- TypeScript
- Vite
- ESLint
- Prettier
- [Other major dependencies you're using]

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/my-portfolio.git
cd my-portfolio
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## 🔧 Available Scripts

- `dev` - Starts the development server
- `build` - Creates a production build
- `preview` - Previews the production build locally
- `lint` - Runs ESLint for code quality checks
- `test` - Runs the test suite

## 📁 Project Structure

```
my-portfolio/
├── src/
│   ├── components/
|   |──── data/
|   |──── models/
│   ├── pages/
│   ├── assets/
│   ├── styles/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
├── public/
├── tests/
└── [config files]
```

## 🔍 ESLint Configuration

The project uses a comprehensive ESLint setup for maintaining code quality:

- Type-aware linting enabled
- React-specific rules
- Strict TypeScript checks

For development, the following ESLint configurations are recommended:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  settings: { react: { version: '18.3' } },
  plugins: { react },
  rules: {
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

My Data
- GitHub: [@alejandrobolano](https://github.com/alejandrobolano/)
- LinkedIn: [Alejandro Bolaño](https://www.linkedin.com/in/alejandro-bolano/)
- Forked from [@isandeepmakwana](https://github.com/isandeepmakwana)

---

Built with ❤️ using React + TypeScript + Vite
