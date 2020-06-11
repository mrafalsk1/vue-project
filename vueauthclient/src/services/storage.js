class Storage {

    setToken(token) {
        this.token = token
        localStorage.setItem('token',this.token)
    }
    getToken(key) {
        return localStorage.getItem(key)
    }
    remove() {
        localStorage.removeItem('token')
    }
    setItem(key,item) {
        localStorage.setItem(key,item)
    }
    getItem(key) {
        return localStorage.getItem(key)
    }
}
export default new Storage;