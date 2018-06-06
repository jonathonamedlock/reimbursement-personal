export function postData(url:string, data) {
    console.log(data);
    
    return fetch('http://localhost:3000/user' + url, {
        
        body: JSON.stringify(data), // must match 'Content-Type' header
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
      })
      .then(response => response.json());
}