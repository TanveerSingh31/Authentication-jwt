import atob from 'atob';




const fetchTokenData = () => {
    let token = window.localStorage.getItem('token');

    if(!token) return null;

    let tokenData = JSON.parse(atob(token.split('.')[1]));
    return tokenData;
}

export default fetchTokenData;