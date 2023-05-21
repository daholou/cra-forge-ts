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
In `src/i18next/index.ts`:
```
i18nInstance
    .use(...)
    .init({
        backend: {
            loadPath: '/my-new-ts-app/locales/{{lng}}/{{ns}}.json'
        }
    })
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


### NEW PLAN

rename that thing
"config": {
    "name": "cra-forge-ts"
},

npm run do-it-all --name=hello-world-app
    1. script1 ==> alter package.json 
        "config": { "name": "hello-world-app" }
        Now we can pass the name to each of our scripts as follows
        "my-script": "command --name process.env.npm_package_config_name || 'nope'"
    2. script2 ==> `rm -rf .git`
    3. script3 ==> `yarn install`
    4. script4 ==> edit some files using process.env.npm_package_config_name
        `node replaceWord.js`
    5. script5 ==> `git init`
    6. script6 ==> `git add .`
    7. script7 ==> `git commit -am 'Forging project...'`
    8. script8 ==> `git branch -M main`
    9. script9 ==> `git remote add origin https://github.com/daholou/$npm_package_config_name.git`
    10. script10 ==> `git push -u origin main`
    11. script11 ==> `yarn run deploy`
    12. script12 ==> create .github/workflows/github-pages.yml
        `node copyFile.js`
    13. script13 ==> `git checkout -b develop`
    14. script14 ==> `git commit -am 'Setting up GitHub Actions...'`
    15. script15 ==> `git push`
    16. go to github.com, make develop the default branch
