class AuthPage {
    constructor() {
        this._init()
    }

    _init() {
        const googleBtn = document.getElementById("google-btn")
        const facebookBtn = document.getElementById("facebook-btn")
        const microsoftBtn = document.getElementById("microsoft-btn")
        const twitterBtn = document.getElementById("twitter-btn")
        const appleBtn = document.getElementById("apple-btn")

        googleBtn.onclick = this.googleAuth.bind(this)
        facebookBtn.onclick = this.facebookAuth.bind(this)
        microsoftBtn.onclick = this.microsoftAuth.bind(this)
        twitterBtn.onclick = this.twitterAuth.bind(this)
        appleBtn.onclick = this.appleAuth.bind(this)
    }

    googleAuth() {
        const provider = new firebase.auth.GoogleAuthProvider();

        console.log("google-ck", firebase)

        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = credential.accessToken;
                // The signed-in user info.
                var user = result.user;

                console.log(credential, token, user)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                console.log(errorCode, errorMessage)
                // ...
            });
    }

    facebookAuth() { }

    microsoftAuth() { }

    twitterAuth() { }

    appleAuth() { }
}

new AuthPage()