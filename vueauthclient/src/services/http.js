import axios from 'axios'
import storage from './storage'
class http {
    constructor() {
        this.instance = axios.create({baseURL:"http://localhost:3000"})
        this.instance.defaults.headers.common['Authorization'] = 'Bearer ' + storage.getToken('token');
    }
    setHeader() {
        this.instance.defaults.headers.common['Authorization'] = 'Bearer ' + storage.getToken('token');
    }
    verify(status) {
        if (status == 401) {
            return false
        }
        return true;
    }
    
}
export default new http;