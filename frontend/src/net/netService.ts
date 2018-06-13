const PROXY = 'http://localhost:3000/';

export function postLogin(url:string, data) {
    console.log(data);
    
    return fetch(PROXY + url, {
        body: JSON.stringify(data), // must match 'Content-Type' header
        credentials: 'include',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
      })
      .then((response) => {
        console.log(response);
          
        return response.json()
      });
}

export function postData(url:string, data) {
    console.log(data);
    
    return fetch(PROXY + url, {
        body: JSON.stringify(data), // must match 'Content-Type' header
        credentials: 'include',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
      })
      .then((response) => {
        console.log(response);
          
        return response.json()
      });
}

export function getData(url:string) {

    return fetch(PROXY + url, {
        credentials: 'include',
        headers: {
            'Accept': 'application/json, text/plain, */*',
        },
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
      })
      .then((response) => response.json());
}

export function delData(url:string) {

    return fetch(PROXY + url, {
        credentials: 'include',
        headers: {
            'Accept': 'application/json, text/plain, */*',
        },
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      });
}