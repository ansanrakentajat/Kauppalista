const apiUrl = 'http://media.mw.metropolia.fi/wbma/';


const login = (username, password) => {
    const settings = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    };
    return fetch(apiUrl + 'login', settings).then(response => {
        return response.json();
    });
};

const checkUser = (username) => {
    return fetch(apiUrl + 'users/username/' + username).then(response => {
        return response.json();
    });
};

const getUser = (token) => {
    const settings = {
        headers: {
            'x-access-token': token,
        },
    };
    return fetch(apiUrl + 'users/user', settings).then(response => {
        return response.json();
    });
};

const getFilesByTag = (tag) => {
    return fetch(apiUrl + 'tags/' + tag).then(response => {
      return response.json();
    });
  };


export { login, checkUser, getUser, getFilesByTag };