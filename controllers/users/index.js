const signup = require('./signup');
const verify = require('./verify');
const login = require('./login');
const logout = require('./logout');
const current = require('./current');
const uploadAvatars = require('./uploadAvatars');
const resendEmail = require('./resendEmail');

module.exports = {
    signup,
    login,
    logout,
    current,
    uploadAvatars,
    resendEmail,
    verify
}