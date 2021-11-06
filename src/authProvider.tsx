import { AuthProvider } from 'react-admin';
import api from './api/axios';

const authProvider: AuthProvider = {
    login: async ({ email, password }) => {
        console.log('Email:' + email)
        console.log('Pass: ' + password)
        try {
          const response = await api.post('/users/login', { email, password })
    
          console.log(response);
          if (response && response.data && response.data.logged) {
            localStorage.setItem('email', email);
            return response.data;
          } else {
            return Promise.reject();
          }
        } catch (error) {
          console.log(error)
        }
        return Promise.resolve();
    },
    logout: () => {
        localStorage.removeItem('email');
        return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () =>
        localStorage.getItem('email') ? Promise.resolve() : Promise.reject(),
    getPermissions: () => Promise.reject('Unknown method'),
    getIdentity: () =>
        Promise.resolve({
            id: 'email',
            fullName: 'Admin',
        }),
};

export default authProvider;
