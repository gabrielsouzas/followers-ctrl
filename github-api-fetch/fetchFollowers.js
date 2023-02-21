const Octokit = require("@octokit/core").Octokit
const fs = require('fs');
const properties = require('./properties.json');

const octokit = new Octokit();
// A FAZER: aumentar paginas recebidas
const fetchFollowers = async (value, user, filter = '', per_page = '100') => {
  const response = await octokit.request(`GET /users/{username}/${value}?per_page=${per_page}`, {
    username: user
  })

  var data = response.data;

  if (filter != '') {
    data = data.map( dt => ({
      filter: dt[`${filter}`]
    }))
  }
  
  /*
    data = data.map( ({login}) => ({
      login
    }))
  */

  return data;
};

// escrever os dados em um arquivo local (json)
function writeJsonFile(fileName, fileData){
  fs.writeFile(`${fileName}.json`, JSON.stringify(fileData, null, 2), err => {
    if(err) throw new Error('Erro: '+ err)

    console.log(`${fileName} fetched successfully!`)
  })
}

async function verifyUsersFollowing(){
  var arrayRobots = [];
  let followingLogins = await fetchFollowers('following', properties.login);
  followingLogins.forEach(async el => {
    let userFollowing = await fetchFollowers('following', el.login, 'login', '5');
    console.log(el.login)
    console.log(userFollowing.length)
  });
}

(async () => {
  const followers = await fetchFollowers('followers', properties.login);
  const following = await fetchFollowers('following', properties.login);

  writeJsonFile('followers', followers);
  writeJsonFile('following', following);

  //verifyUsersFollowing();
})();