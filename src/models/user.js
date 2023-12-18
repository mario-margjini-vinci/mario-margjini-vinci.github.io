async function register(options) {
    const response = await fetch('http://localhost:3000/auths/register', options);
    if (!response.ok) return null;
    const authenticatedUser = await response.json();
    return authenticatedUser;
};



async function login(options){
    const response = await fetch('http://localhost:3000/auths/login', options );
    if (!response.ok) return null;
    const authenticatedUser = await response.json()
    return authenticatedUser
};

async function deleteAuthenticatedUser(id, options){
    const response = await fetch(`http://localhost:3000/auths/${id}`, options);
    if (!response.ok) return null;
    return response;
};


export {register, login, deleteAuthenticatedUser};