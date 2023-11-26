import axios from 'axios';

const userServiceFactory = () => {
    function login(username, password) {
        return axios.post(`/api/auth`, { username, password });
    }
    /*
    function calendar(event) {
        return axios.post(`/api/calendar/index`, { username, password });
    }
    
    */
    

    return {login};
};

module.exports = {
    userServiceFactory
};