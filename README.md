# Webpack Template

A basic starter Webpack template to ease project setup and streamline your workflow.

---

## Features

- **Webpack 5**: Modern module bundling and asset management.
- **Environment-Specific Configurations**: Separate development and production setups using `webpack-merge`.
- **Live Development**: Includes a dev server with live reloading.
- **Optimized Production Builds**: Minified JavaScript, optimized assets, and automatic cleanup.
- **Asset Handling**: Supports CSS, HTML, images, and font files by default.
- **GitHub Pages Deployment**: Deploy your project to GitHub Pages with a single command.
- **ESLint**: Integrated ESLint configuration for maintaining code quality and consistency.
- **Prettier**: Pre-configured Prettier to automatically format your code.

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/webpack-starter-template.git
cd webpack-starter-template
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

This will open your project in the default browser with live reloading.

### 4. Build for Production

```bash
npm run build
```

Your production-ready files will be output to the `dist` folder.

### 5. Deploy to GitHub Pages

```bash
npm run deploy
```

This command will build your project, create a `gh-pages` branch if it doesn't exist, push the project to the branch, and deploy it to GitHub Pages.

---

## Running ESLint and Prettier

In order to lint and format your code, you can use the following npm scripts:

- **`npm run lint`**: This will run ESLint on all the JavaScript files in the `src` directory and automatically fix any fixable issues.
- **`npm run pretty`**: This will format the JavaScript, HTML, CSS, JSON, and Markdown files in the `src` directory using Prettier.

- **`npm run lint-all`**: This will run ESLint on all files in the project (not just in the `src` folder) and automatically fix any fixable issues.

- **`npm run pretty-all`**: This will format all JavaScript, HTML, CSS, JSON, and Markdown files in the project using Prettier.

---

## Folder Structure

```
webpack-starter-template/
├── src/                 # Where all your main files go
│   ├── index.js         # Entry point JavaScript file
│   ├── style.css        # Sample stylesheet
│   └── template.html    # Base HTML template
├── dist/                # Production build output (generated by Webpack)
├── webpack.common.js    # Shared Webpack configuration
├── webpack.dev.js       # Development-specific Webpack configuration
├── webpack.prod.js      # Production-specific Webpack configuration
├── package.json         # Project dependencies and scripts
├── .gitignore           # Files to exclude from version control
├── .eslintrc.js         # ESLint configuration
├── .prettierrc          # Prettier configuration
└── README.md            # Documentation
```

---

## How to Customize

1. **Update `src/` Files**:

    - Replace `index.js`, `style.css`, and `template.html` with your project's assets.

2. **Add New Loaders/Plugins**:

    - Extend Webpack functionality by installing and configuring additional loaders/plugins (e.g., Babel, Sass).

3. **Modify Webpack Configuration**:

    - Adjust settings in `webpack.common.js`, `webpack.dev.js`, or `webpack.prod.js` as needed.

4. **ESLint & Prettier Customization**:

    - If you need to modify ESLint or Prettier settings, you can adjust the `.eslintrc.js` or `.prettierrc` files.
    - To lint and prettify the files in your `src` folder, run `npm run lint` and `npm run pretty` respectively.
    - To lint and prettify files in your root folder as well, run `npm run lint-all` and `npm run pretty-all` respectively. You may need to modify the `.prettierignore` and `.eslintignore` files to control which files are included in the linting and formatting process.
