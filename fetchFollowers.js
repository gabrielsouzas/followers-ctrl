const Octokit = require("@octokit/core").Octokit
const fs = require('fs');

const octokit = new Octokit();

const fetchFollowers = async (value, user, filter = '') => {
  const response = await octokit.request(`GET /users/{username}/${value}`, {
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

  // escrever os dados em um arquivo local (json)
  fs.writeFile(`${value}.json`, JSON.stringify(data, null, 2), err => {
    if(err) throw new Error('Erro: '+ err)

    console.log(`${value} fetched successfully!`)
  })

  //return data;
};

fetchFollowers('followers', 'gabrielsouzas');
fetchFollowers('following', 'gabrielsouzas');