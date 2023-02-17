/*(async() => {
    const response = await fetch('./followers.json');
    const data = await response.json();

    // formatar os dados para enviar para o html
    //const htmlList = data.map( image => `<li><img src="${image.src}"></li>`).join('')
    const htmlList = data.map( ({login}) => `<li><ul>${login}</ul></li>`).join('') // .join('') - separador das strings

    // colocar no html
    document.querySelector('.container').innerHTML = htmlList;
})();*/

const userName = document.querySelector('.user-name');

const followers = document.querySelector('#followers');
const following = document.querySelector('#following');

const arrayUsersRed = [];

function addElement(tag, parent, innerHtml = '', src = '', className = '') {
    var element = document.createElement(tag);
    if (className != '') {
        element.classList.add(className);
    }
    if (innerHtml != '') {
        element.innerHTML = innerHtml;
    }
    if (src != '') {
        element.src = src;
    }
    parent.appendChild(element);
    
    return element;
}

const loadFollowers = async (value, element, filter = '') => {
    const response = await fetch(`./github-api-fetch/${value}.json`);
    const data = await response.json();

    // formatar os dados para enviar para o html
    //const htmlList = data.map( image => `<li><img src="${image.src}"></li>`).join('')

    var html;
    if (filter != '') {
        html = data.map( dt => `<li><ul>${dt[`${filter}`]}</ul></li>`).join('') // .join('') - separador das strings
    } else {
        /*html = data.map( dt => `<div class="user">
                                    <img src="${dt.avatar_url}">
                                    <span class="login">${dt.login}</span>
                                </div>`).join('')*/
        html = data.map( dt => {
            let user = addElement('div', element, '', '', 'user');
            addElement('img', user, '', dt.avatar_url, '');
            addElement('span', user, dt.login, '', `login`);
        })
    }

    // colocar no html
    //element.innerHTML = html;
}

function compareFollowersFollowing(){
    const login = document.querySelectorAll('.login');
    const arrayNodesLogin = [...login];
    
    //console.log(login)
    var arrayLogin = [];
    arrayNodesLogin.forEach(element => {
        arrayLogin.push(element.innerHTML)
    });

    const filteredLogin = arrayLogin.filter((item, index) => arrayLogin.indexOf(item) !== index);
    
    login.forEach(element => {
        if (!filteredLogin.includes(element.innerHTML)) {
            element.style.color = 'red'
            arrayUsersRed.push(element.innerHTML)
        }
    });
}

const loadProperties = async () => {
    const prop = await fetch(`./github-api-fetch/properties.json`);
    const propData = await prop.json();

    userName.innerHTML+= propData.login;
}

const select = document.querySelector('select');

function selectChangeState(){
    if (select.value == 'not_following') {
        const loginFollowers = document.querySelectorAll('#following .login');
        loginFollowers.forEach(el => {
            if (!arrayUsersRed.includes(el.innerHTML)) {
                el.parentNode.remove();
            }
        });
    } else {
        clear();
        load();
    }
}

const clear = () => {
    followers.innerHTML = ''
    following.innerHTML = ''
}

const load = async () => {
    (async () => {
        await loadFollowers('followers', followers);
        await loadFollowers('following', following);
        
        await loadProperties();
    
        compareFollowersFollowing(); 
    })();
}

load();