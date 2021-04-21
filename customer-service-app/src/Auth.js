class Auth{
    constructor(){
        this.authenticated=localStorage.getItem("access_token")!=null? true: false;
    }
    login(cb){
        this.authenticated = true;
        cb();
    }
    logout(cb){
        console.log("logging out")
        this.authenticated = false;
        cb();
    }
    isAuthenticated(){
        return this.authenticated;
    }
}
export default new Auth();