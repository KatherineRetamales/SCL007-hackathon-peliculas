document.addEventListener("DOMContentLoaded", event => {
    window.M.AutoInit();
    let instance = M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'),
        {
            hover: true,
            constrainWidth: false,
            coverTrigger: false,
            closeOnClick: false
        })
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

    const database = firebase.database();
    let activeUser;
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          // User is signed in.
          database.ref("users/"+firebase.auth().currentUser.uid).once('value', function(snapshot) {
            if(snapshot.val() === null) {
                saveNewUser();
            }
        })
        initialPage();
        document.getElementById("succesful-message").style.display = "none";
        document.getElementById("nav-logout").style.display = "none";
        document.getElementById("nav-login").style.display = "block";
        document.getElementById("new-user-mail").value = "";
        document.getElementById("new-user-password").value = "";
        document.getElementById("user-mail").value = "";
        document.getElementById("user-password").value = "";
        // document.getElementById("root").innerHTML = `<p>Hola ${user.email}</p>
    
        //   `
        document.getElementById("logout").addEventListener("click", ()=> {
            firebase.auth().signOut().then(function() {
                // Sign-out successful.
              }).catch(function(error) {
                // An error happened.
              });
          })
        } else {
          // No user is signed in.
          initialPage();  
        document.getElementById("succesful-message").style.display = "none";
        document.getElementById("legend").style.display = "block";
        document.getElementById("nav-logout").style.display = "block";
        document.getElementById("list-create-section").style.display = "none";
        document.getElementById("nav-login").style.display = "none";
        document.getElementById("new-user-mail").value = "";
        document.getElementById("new-user-password").value = "";
        document.getElementById("user-mail").value = "";
        document.getElementById("user-password").value = "";
        // document.getElementById("root").innerHTML = ""
        }
    });

    document.getElementById("login-btn").addEventListener("click", () => {
        const userMail = document.getElementById("user-mail").value;
        const userPassword = document.getElementById("user-password").value;

        firebase.auth().signInWithEmailAndPassword(userMail, userPassword).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
    })

    document.getElementById("sign-up-btn").addEventListener("click", () => {
        let newUserMail = document.getElementById("new-user-mail").value;
        let newUserPassword = document.getElementById("new-user-password").value;
        firebase.auth().createUserWithEmailAndPassword(newUserMail, newUserPassword).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            alert(errorCode + " " + errorMessage)
        });
    })

    function saveNewUser() {
        database.ref("users/" + firebase.auth().currentUser.uid).set({
            email: firebase.auth().currentUser.email,
        })
        database.ref("users/" + firebase.auth().currentUser.uid).update({
            movieLists: false
        })
    }

    function initialPage() {
        document.getElementById("movies").innerHTML = "";
        fetch("https://api.themoviedb.org/3/discover/movie?api_key=48819a4f88e3d597df63bebab6723d0f&primary_release_year=2019")
            .then(data => data.json())
            .then(data => {
                let promises = [];
                let dataMovies = data.results;
                dataMovies.forEach(movie => {
                    let title = movie.title;
                    moviesShown = [];
                    promises.push(fetch("https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?t=" + title + "&plot=full&y=2019&apikey=8b8cc00a") //9513ffad //c39cba8d  // 8b8cc00a
                        .then(data => data.json())
                        .then(data => {
                            if (data.Response === "False") {
                                return;
                            }
                            if (data.Poster === "N/A") {
                                return;
                            }
                            moviesShown.push(data)
                            document.getElementById("movies").innerHTML += `
                            <div class="col s12 m4 movie-card">
                                <div class="card small center-align white">
                                    <div class="card-content white-text">
                                        <img class="responsive-img card-poster" src="${data.Poster}">
                                    </div>
                                    <div class="card-action">
                                        <a class="individual-movie-link orange-text text-darken-4" href="#">${data.Title}</a>
                                    </div>
                                </div>
                            </div>
                            `
                        }))
                })
                return Promise.all(promises)
            })
            .then(() => {
                console.log("cargo")
                createLinks(movieLinks);
            })
    }
     

    document.getElementById("search").addEventListener("click", mainSearch)
    function mainSearch() {
        document.getElementById("list-create-section").style.display = "none";
        searchMovies("search-input", "movies")
    }
    function searchMovies(searchField, displayDiv) {
        let promises = [];
        document.getElementById("succesful-message").style.display = "none";
        document.getElementById("user-lists-section").style.display = "none";
        document.getElementById("account-settings").style.display = "none";
        document.getElementById("legend").style.display = "none";
        document.getElementById("movies").innerHTML = "";
        document.getElementById("movies").style.display = "block";
        document.getElementById("movies-individual").style.display = "none";
        let userSearch = document.getElementById(searchField).value;
        function displaySearch() {
            promises.push(fetch("https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?t=" + userSearch + "&plot=full&apikey=8b8cc00a") // 9513ffad //c39cba8d // 8b8cc00a
                .then(data => data.json())
                .then(data => {
                    // console.log("oli")
                    if (data.Response === "False") {
                        return;
                    }
                    if (data.Poster === "N/A") {
                        return;
                    }
                    moviesShown = [];
                    moviesShown.push(data)
                    document.getElementById(displayDiv).innerHTML += `
                        <div class="col s12 m4 movie-card">
                            <div class="card small center-align white">
                                <div class="card-content white-text">
                                    <img class="responsive-img card-poster" src="${data.Poster}">
                                </div>
                                <div class="card-action">
                                    <a class="individual-movie-search" href="#">${data.Title}</a>
                                </div>
                            </div>
                        </div> `
                }))
            return Promise.all(promises);

        }
        displaySearch().then(() => {
            console.log("cargo")
            let searchLinks = document.getElementsByClassName("individual-movie-search");
            createLinks(searchLinks);
        })

    }


    document.getElementById("search-list-section").addEventListener("keypress", (e) => {
        if (e.keyCode === 13) {
            document.getElementById("movies2").innerHTML = "";
            searchMovies("search-list-section", "movies2")
            document.getElementById("movies").style.display = "block";
        }
    
    })



    let moviesShown = [];


    let movieLinks = document.getElementsByClassName("individual-movie-link");
    function createLinks(movieLinks) {

        for (let i = 0; i < movieLinks.length; i++) {
            movieLinks[i].addEventListener("click", () => {
                document.getElementById("legend").style.display = "none";
                document.getElementById("movies").style.display = "none";
                document.getElementById("movies-individual").style.display = "block";
                document.getElementById("movies-individual").innerHTML = `
                <div class="col s5">
                <img src=${moviesShown[i].Poster} class="responsive-img">
                </div>
                <div class="col s7">
                <h4 class="sinopsis">Sinopsis</h4>
                <p>${moviesShown[i].Plot}</p>
                </div>
                <div class="col s7">
                <h4 class="sinopsis">Generos</h4>
                <p>${moviesShown[i].Genre}</p>
                </div>
                <div class="col s7">
                <h4 class="sinopsis">Premios</h4>
                <p>${moviesShown[i].Awards}</p>
                </div>
                <div class="col s7">
                <h4 class="sinopsis">IMDb</h4>
                <p><a href="https://www.imdb.com/title/${moviesShown[i].imdbID}" target="_blank">Ficha en IMDb</a></p>
                </div>
                `
            })
        }

    }

    document.getElementById("create-list").addEventListener("click", () => {
        // document.getElementById("add-movie").style.display = "block";
        moviesAddArray = [];
        document.getElementById("legend").style.display = "none";
        document.getElementById("movies").style.display = "none";
        document.getElementById("user-lists-section").style.display = "none";
        document.getElementById("account-settings").style.display = "none";
        document.getElementById("movies-individual").style.display = "none";
        document.getElementById("list-create-section").style.display = "block";
        document.getElementById("list-name").value = "";
        document.getElementById("list-name").blur();
        document.getElementById("search-list-section").value = "";
        document.getElementById("movies2").innerHTML = "";
        document.getElementById("movies-to-add").innerHTML = "";
        document.getElementById("succesful-message").style.display = "none";

        document.getElementById("new-list").addEventListener("click", () => {
            console.log("funciona boton listas")
            let listName = document.getElementById("list-name").value
            let saveList = [(database.ref("users/" + firebase.auth().currentUser.uid + "/movieLists").push({
                [listName]: moviesAddArray
            }))]
            Promise.all(saveList).then(()=>{
            document.getElementById("list-create-section").style.display = "none";
            document.getElementById("succesful-message").style.display = "block";
            document.getElementById("succesful-message").innerHTML = `<h4 class="valign-wrapper justify-content top-margin">Lista creada<i class="material-icons medium green-text">check</i></h4>`
        })
        })

    })

    document.getElementById("settings-btn").addEventListener("click", settingsPage)
    function settingsPage() {
        let promise = [(firebase.database().ref("users/" + firebase.auth().currentUser.uid).once('value', function (snapshot) {
            window.snap = snapshot.val();

        }))]
        Promise.all(promise).then(()=>{
            document.getElementById("succesful-message").style.display = "none";
            document.getElementById("legend").style.display = "none";
            document.getElementById("user-lists-section").style.display = "none";
            document.getElementById("movies").style.display = "none";
            document.getElementById("movies-individual").style.display = "none";
            document.getElementById("list-create-section").style.display = "none";
            document.getElementById("account-settings").style.display = "block";
            document.getElementById("account-settings").innerHTML = `
            <div class="col s12">
            <h3>Información de la Cuenta</h3>
            </div>
            <div class="col s3">
            <p>Email</p>
            </div>
            <div class="col s9">
            <input class="settings-info" disabled value="${firebase.auth().currentUser.email}">
            </div>
            <div class="col s3">
            <p>Nombre de Usuario</p>
            </div>
            <div class="col s9">
            <input id="username" class="settings-info" value="${window.snap.userName ? window.snap.userName : firebase.auth().currentUser.email}">
            </div>
            <div class="col s3">
            <p>Intereses</p>
            </div>
            <div class="col s9">
            <textarea id="hobbies" rows="20" class="settings-info" placeholder="Describenos tus intereses..">${window.snap.userHobbies ? window.snap.userHobbies : ""}</textarea>
            </div>
            <div class="co s12 center">
            <button class="btn red" id="save-settings">Guardar Cambios</button>
            </div>
            `

            document.getElementById("save-settings").addEventListener("click", () => {
                let userName = document.getElementById("username").value;
                let userHobbies = document.getElementById("hobbies").value;
                let promise = [(database.ref("users/" + firebase.auth().currentUser.uid).update({
                    userName: userName,
                    userHobbies: userHobbies
                }))]
                Promise.all(promise).then(() => {
                    document.getElementById("account-settings").innerHTML = `<h4 class="valign-wrapper justify-content top-margin">Información actualizada.<i class="material-icons medium green-text">check</i></h4>`
                })
            })
        })
    }

    document.getElementById("user-lists").addEventListener("click", ()=> {
        
       let promise = [(firebase.database().ref("users/"+firebase.auth().currentUser.uid).once('value', function(snapshot){
            window.snap = snapshot.val();
            
        }))]
        Promise.all(promise).then(()=>{

        

            document.getElementById("succesful-message").style.display = "none";
            document.getElementById("legend").style.display = "none";
            document.getElementById("movies").style.display = "none";
            document.getElementById("movies-individual").style.display = "none";
            document.getElementById("list-create-section").style.display = "none";
            document.getElementById("account-settings").style.display = "none";
            document.getElementById("user-lists-section").style.display = "block";
            document.getElementById("user-lists-section").innerHTML = `
            <div class="col s12">
            <h4>${window.snap.userName},</h4>
            <h5>tienes las siguientes listas creadas:</h5>
            <ul id="lists-here">

            </ul>
    
            </div>
            <button id="view-lists" class="btn red">Pulsa para ver tus listas</button>
            `

            document.getElementById("view-lists").addEventListener("click", userLists)
            
        })

        

            
        

        

        })
    

    
    
    function userLists() {
        document.getElementById("lists-here").innerHTML = "";
        let currentLists = [];
        let promise = [(database.ref("users/"+firebase.auth().currentUser.uid).orderByKey().on("value", function(snapshot) {
            let postIds = Object.keys(snapshot.val().movieLists)
            postIds.forEach(id =>{
                currentLists.push(snapshot.child("movieLists").child([id]).val())
            })
          }))]
          Promise.all(promise).then(
              currentLists.forEach(list => {
                  console.log(list)
                  document.getElementById("lists-here").innerHTML += `
                  <li>${Object.keys(list)}</li>
                  `
              })

          )



    }

    document.getElementById("logo").addEventListener("click", () => {
        window.location.reload();
    })
    document.getElementById("logout").addEventListener("click", () => {
        window.location.reload();
    })
    let moviesAddArray = [];
    // boton agregar pelicula
    document.getElementById("add-movie-btn").addEventListener("click", () => {
        moviesAddArray.push(moviesShown[0].Title)
        document.getElementById("movies-to-add").innerHTML = ""
        console.log(moviesAddArray)
        const titleArray = moviesAddArray.filter(function(item, index, array) {
            return array.indexOf(item) === index;
          })
          console.log(titleArray); 
          titleArray.forEach(movie => {
            document.getElementById("movies-to-add").innerHTML += `
            <li>${movie}</li>
            `
        })
    })






})

let snap;
window.snap = snap;

