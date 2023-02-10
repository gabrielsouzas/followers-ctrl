const Octokit = require("@octokit/core").Octokit

const octokit = new Octokit({
    auth: 'gabrielsouzas'
  })
  
const fetchFollowers = async () => {
    const response = await octokit.request('GET /user/followers', {});

    console.log(response);
}