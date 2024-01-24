export const getCookie = (key) => {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].split('=');
      if (cookie[0] === key) {
        return cookie[1];
      }
    }
    return '';
};

export const getToken = () => {
  return getCookie('access_token');
}

export const getScopes = () => {
  let scopes = getCookie('user_scopes');
  const arScopes = scopes.split(',');
  return arScopes;
}

export const getUserName = () => {
  let userName = getCookie('user_name');
  return userName;
}