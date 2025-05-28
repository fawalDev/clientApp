enum ServerUrl {
    base = 'http://localhost:5000',
    ver = '/v1',
    login = base + '/api' + ver + '/auth/login',
    signup = base + '/api' + ver + '/auth/signup',

    post = base + '/api' + ver + '/post',

}

export default ServerUrl;