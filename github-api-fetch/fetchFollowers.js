const Octokit = require("@octokit/core").Octokit
const fs = require('fs');
const properties = require('./properties.json');

const octokit = new Octokit();
// aumentar paginas recebidas
const fetchFollowers = async (value, user, filter = '') => {
  const response = await octokit.request(`GET /users/{username}/${value}?per_page=100`, {
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

fetchFollowers('followers', properties.login);
fetchFollowers('following', properties.login);