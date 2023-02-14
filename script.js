const Octokit = require("@octokit/core").Octokit
const fs = require('fs');

const octokit = new Octokit();
const user = 'gabrielsouzas';

const fetchFollowers = async () => {
  const response = await octokit.request('GET /users/{username}/followers', {
    username: user
  })

  const data = response.data;

  const followersLogin = data.map( ({login}) => ({
    login
  }))

  // escrever os dados em um arquivo local (json)
  fs.writeFile('followers.json', JSON.stringify(followersLogin, null, 2), err => {
    if(err) throw new Error('Erro: '+ err)

    console.log('Sucesso ao buscar seguidores!')
  })

  return followersLogin;
};

const fetchFollowing = async () => {
  const response = await octokit.request('GET /users/{username}/following', {
    username: user
  });

  const data = response.data;
  const followingLogins = data.map( ({login}) => ({
    login
  }))

  fs.writeFile('following.json', JSON.stringify(followingLogins, null, 2), err => {
    if(err) throw new Error('Erro: '+ err)

    console.log('Sucesso ao buscar seguidos!')
  })

  return followingLogins;
};

// Comparar followers e following
const compareFollowes = async () => {
  const followers = await fetchFollowers();
  const following = await fetchFollowing();

}

compareFollowes();