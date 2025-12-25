let accessToken = null

export const AuthStore = {

    setAccessToken(token){
        accessToken = token;
    },

    getAccessToken() {
        return accessToken;
    },
    
    clearAccessToken() {
        accessToken = null;
    }

};