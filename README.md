# Create React App Forge (TypeScript)

This project is a blank slate from which to start a new React TypeScript
application with ease. The idea is to benefit from the base [CRA](https://create-react-app.dev/) template, while
having the following available from the beginning:
- [i18next](https://www.i18next.com/) integration
- [gh-pages](https://github.com/tschaub/gh-pages) integration
- [craco](https://github.com/dilanx/craco) integration to enable webpack aliases with CRA
- a few React components to give a common basic layout between all applications
- a basic project structure that can be expanded on as needed

# Getting Started
Here are the steps to follow to begin development on a new application:

---
1. Clone this repository and rename it with `git clone https://github.com/daholou/cra-forge-ts.git my-new-ts-app`. Run `yarn install`.

---
2. Edit the following variables with more suitable values:

In `package.json`:
```
{
    "name": "my-new-ts-app",
    "homepage": "https://daholou.github.io/my-new-ts-app"
}
```
In `public/index.html`:
```
   <title>my-new-ts-app</title>
```
In `public/manifest.json`:
```
{
    "short_name": "my-new-ts-app",
    "name": "my-new-ts-app"
}
```

---
3. Run the usual commands:
```
git init
git add .
git commit -am "Go :)"
git branch -M main
git remote add origin https://github.com/daholou/my-new-ts-app.git
git push -u origin main
```

---
4. Deploy to GitHub Pages
```
yarn run deploy
```

---
5. Rename the folder `.github.sample` into `.github`, then commit and push your changes. This will set up an automatic GitHub Action to redeploy GitHub Pages whenever a push happens on the `main` branch.

---
6. Create a new branch called `develop` with `git checkout -b develop`. Make `develop` the default branch on GitHub.
