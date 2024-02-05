const Octokit = require('@octokit/core').Octokit;
const fs = require('fs');
const properties = require('./properties.json');

const octokit = new Octokit();

/* const fetchFollowers = async (value, user, filter = '', per_page = '100') => {
  const response = await octokit.request(
    `GET /users/{username}/${value}?per_page=${per_page}&page=${page}`,
    {
      username: user,
    }
  );

  var data = response.data;

  if (filter != '') {
    data = data.map((dt) => ({
      filter: dt[`${filter}`],
    }));
  }

  return data;
}; */

const fetchFollowers = async (
  value,
  user,
  filter = '',
  per_page = '100',
  max_pages = 4
) => {
  let response = {};
  for (let i = 1; i <= max_pages; i++) {
    let responsePage = await octokit.request(
      `GET /users/{username}/${value}?per_page=${per_page}&page=${i}`,
      {
        username: user,
      }
    );

    if (responsePage.length === 0) {
      return;
    }

    response = {
      ...response,
      responsePage,
    };

    await aguardarSegundos(2);
  }

  var data = response.data;

  if (filter != '') {
    data = data.map((dt) => ({
      filter: dt[`${filter}`],
    }));
  }

  return data;
};

function awaitSeconds(seconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}

const fetchDetails = async (user) => {
  const response = await octokit.request(`GET /users/${user}`, {
    //username: user
  });

  var data = response.data;

  /*if (filter != '') {
    data = data.map( dt => ({
      filter: dt[`${filter}`]
    }))
  }*/

  /*
    data = data.map( ({login}) => ({
      login
    }))
  */

  return data;
};

// escrever os dados em um arquivo local (json)
function writeJsonFile(fileName, fileData) {
  fs.writeFile(`${fileName}.json`, JSON.stringify(fileData, null, 2), (err) => {
    if (err) throw new Error('Erro: ' + err);

    console.log(`${fileName} fetched successfully!`);
  });
}

async function verifyUsersFollowing() {
  var arrayRobots = [];
  let followingLogins = await fetchFollowers('following', properties.login);
  followingLogins.forEach(async (el) => {
    let userFollowing = await fetchFollowers(
      'following',
      el.login,
      'login',
      '5'
    );
    console.log(el.login);
    console.log(userFollowing.length);
  });
}

async function fetchAll(res, user, per_page = '100') {
  let allItens = [];
  let page = 1;

  try {
    while (true) {
      const url = `GET /users/{username}/${res}?per_page=${per_page}&page=${page}`;
      const response = await octokit.request(url, {
        username: user,
      });
      var data = response.data;

      if (data.length === 0) {
        break;
      }

      allItens = allItens.concat(data);
      page++;
    }

    return allItens;
  } catch (erro) {
    console.error('Erro ao obter dados:', erro);
    throw erro;
  }
}

(async () => {
  const following = await fetchAll('following', properties.login);
  const followers = await fetchAll('followers', properties.login);

  //const followers = await fetchFollowers('followers', properties.login);
  //const following = await fetchFollowers('following', properties.login);

  writeJsonFile('followers', followers);
  writeJsonFile('following', following);

  //fetchDetails();
  //fetchFollowers('followers', properties.login);

  //verifyUsersFollowing();
})();
