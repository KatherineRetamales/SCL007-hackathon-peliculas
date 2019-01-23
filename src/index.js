document.addEventListener("DOMContentLoaded", event => {
    window.M.AutoInit();
    let config = {
        apiKey: "AIzaSyBTscKCGyacpck5Wdb7qpKySQ_6qR-ppBk",
        authDomain: "primera-hackaton-17f7d.firebaseapp.com",
        databaseURL: "https://primera-hackaton-17f7d.firebaseio.com",
        projectId: "primera-hackaton-17f7d",
        storageBucket: "",
        messagingSenderId: "289210816015"
      };
      firebase.initializeApp(config);
    const app = firebase.app();

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
        document.getElementById("new-user-mail").value = "";
        document.getElementById("new-user-password").value = "";
        document.getElementById("user-mail").value = "";
        document.getElementById("user-password").value = "";
        document.getElementById("root").innerHTML = `<p>Hola ${user.email}</p>
          <button id="logout" type="button">Log Out</button>
          `
        document.getElementById("logout").addEventListener("click", ()=> {
            firebase.auth().signOut().then(function() {
                // Sign-out successful.
              }).catch(function(error) {
                // An error happened.
              });
          })
        } else {
          // No user is signed in.
        document.getElementById("new-user-mail").value = "";
        document.getElementById("new-user-password").value = "";
        document.getElementById("user-mail").value = "";
        document.getElementById("user-password").value = "";
        document.getElementById("root").innerHTML = ``
        }
      });
    
    document.getElementById("login-btn").addEventListener("click", ()=> {
        const userMail = document.getElementById("user-mail").value;
        const userPassword = document.getElementById("user-password").value;


        firebase.auth().signInWithEmailAndPassword(userMail, userPassword).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
          });
    })

    document.getElementById("sign-up-btn").addEventListener("click", ()=> {
        let newUserMail = document.getElementById("new-user-mail").value;
        let newUserPassword = document.getElementById("new-user-password").value;
        firebase.auth().createUserWithEmailAndPassword(newUserMail, newUserPassword).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
        
    })

    let pageCounter = 0;
    do {
        pageCounter++;
        console.log(document.getElementsByClassName("movie-card").length)
        fetch("https://api.themoviedb.org/3/discover/movie?api_key=48819a4f88e3d597df63bebab6723d0f&primary_release_year=2019&page="+pageCounter)
            .then(data => data.json())
            .then(data => {
                let dataMovies = data.results;
                console.log(data)
                dataMovies.forEach(movie => {
                    let title = movie.title;
                    fetch("http://www.omdbapi.com/?t="+title+"&y=2019&apikey=9513ffad")
                        .then(data => data.json())
                        .then(data => {
                            if (data.Response === "False"){
                                return;
                            }
                            if (data.Poster === "N/A"){
                                return;
                            }
                            document.getElementById("movies").innerHTML += `
                            <div class="col s12 m4 movie-card">
                                <div class="card small center-align white">
                                    <div class="card-content white-text">
                                        <img class="responsive-img" src="${data.Poster}">
                                    </div>
                                    <div class="card-action">
                                        <a href="#">${data.Title}</a>
                                    </div>
                                </div>
                            </div>
                            
                            `
    
                            
                        })
                })
            })
    } while (pageCounter < 10)





    















})