import store from "store";

const USER_KEY = 'user_key'
const storageUtils = {
    saveUser (User) {
        store.set(USER_KEY,User)
    },
    getUser () {
        return  store.get(USER_KEY) || {}
    },
    removeUser () {
        store.remove(USER_KEY)
    }
}

export default storageUtils