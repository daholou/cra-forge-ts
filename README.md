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
2. Run the auto-installer script with `yarn run auto-installer`. Keep in mind that you need to have `node` and `git` installed for the script to function properly.

---
3. Simply follow the instructions given during the installation. You will need to provide a GitHub Personal Access Token (with at least repo scope), as well as a valid name for your project.

---
4. When the installation is complete, your project should be ready to go. It should have its own GitHub repository, and be deployed on its own GitHub Pages. Don't forget to make `develop` the default branch.
