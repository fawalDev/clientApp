enum ServerUrl {
    base = 'http://localhost:5000',
    ver = '/v1',
    login = base + '/api' + ver + '/login',
    signup = base + '/api' + ver + '/signup',
}

export default ServerUrl;