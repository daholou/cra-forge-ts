# Create React App Forge (TypeScript)

This project is a blank slate from which to start a new React TypeScript
application with ease. The idea is to benefit from the base
[CRA](https://create-react-app.dev/) template, while having the following 
available from the beginning:
- [i18next](https://www.i18next.com/) integration.
- [gh-pages](https://github.com/tschaub/gh-pages) integration.
- [craco](https://github.com/dilanx/craco) integration to enable webpack 
  aliases with CRA.
- a few React components to give a common basic layout between all applications.
- a basic project structure that can be expanded on as needed.

# Getting Started
Here are the steps to follow to begin development on a new application:

---
1. Clone this repository and rename it locally with `git clone https://github.
   com/daholou/cra-forge-ts.git my-new-ts-app`, where `my-new-ts-app` is 
   your project name.

---
2. Run `yarn install`.

---
2. Run the auto-installer script with `yarn run auto-installer`. Keep in 
   mind that you need to have `node` and `git` installed for the script to 
   function properly.

---
3. Simply follow the instructions given during the installation. You will 
   need to provide a GitHub Personal Access Token (with at least repo scope),
   as well as a valid name for your project (the default would be 
   `my-new-ts-app` for example).

---
4. Once the installer script finishes running without errors, your project 
   should be ready to go, meaning that:
   - A repository named `my-new-ts-app` should now exist on your GitHub 
     account.
   - The repository `my-new-ts-app` should have 3 branches: 
     - `develop`: a branch for works in progress, as usual.
     - `main`: once a feature is ready in `develop`, it can be merged into 
       this branch, as usual.
     - `gh-pages`: you should ignore this branch during development, its 
       only purpose is to ease the deployment to GitHub Pages.
   - The repository `my-new-ts-app` should deploy to GitHub Pages, thanks to 
     the branch `gh-pages`.
   - The following GitHub Action should now exist: whenever a push happens 
     on branch `main`, the branch `gh-pages` automatically updates.

---
5. To protect your branch `main`, don't forget to make `develop` the default 
   branch from github.com.

