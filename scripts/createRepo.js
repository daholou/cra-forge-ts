const { Octokit } = require('octokit');
const prompt = require('prompt-sync')();

const myNewAppName = process.env.npm_package_config_name;

//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
const personalAccessToken = prompt('Enter your GitHub Personal Access Token : ');

const octokit = new Octokit({ auth: personalAccessToken });

const createRepo = async () => {
    await octokit.request('POST /user/repos', {
        name: myNewAppName,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });
};
createRepo().then((response) => {
    console.log(" === Successfully created GitHub repository" + myNewAppName);
    console.log(response);
});
