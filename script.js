/*(async() => {
    const response = await fetch('./followers.json');
    const data = await response.json();

    // formatar os dados para enviar para o html
    //const htmlList = data.map( image => `<li><img src="${image.src}"></li>`).join('')
    const htmlList = data.map( ({login}) => `<li><ul>${login}</ul></li>`).join('') // .join('') - separador das strings

    // colocar no html
    document.querySelector('.container').innerHTML = htmlList;
})();*/

const loadFollowers = async (value, element, filter = '') => {
    const response = await fetch(`./${value}.json`);
    const data = await response.json();

    // formatar os dados para enviar para o html
    //const htmlList = data.map( image => `<li><img src="${image.src}"></li>`).join('')

    var html;
    if (filter != '') {
        html = data.map( dt => `<li><ul>${dt[`${filter}`]}</ul></li>`).join('') // .join('') - separador das strings
    } else {
        html = data.map( dt => `<div class="user">
                                    <img src="${dt.avatar_url}">
                                    <span class="login">${dt.login}</span>
                                </div>`).join('')
    }

    // colocar no html
    element.innerHTML = html;
}

const followers = document.querySelector('.followers');
const following = document.querySelector('.following');

loadFollowers('followers', followers);
loadFollowers('following', following);