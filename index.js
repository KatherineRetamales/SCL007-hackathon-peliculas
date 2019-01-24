
 

document.addEventListener("DOMContentLoaded", event => {
    window.M.AutoInit();
    let instance = M.Dropdown.init(document.querySelectorAll('.dropdown-trigger'),
        {
                hover: true,
                constrainWidth: false,
                coverTrigger: false,
                closeOnClick: false
            }
    )
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

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          database.ref("users/"+firebase.auth().currentUser.uid).once('value', function(snapshot) {
            if(snapshot.val() === null) {
                saveNewUser();
            }
        })
        document.getElementById("nav-logout").style.display = "none";
        document.getElementById("nav-login").style.display = "block";
        document.getElementById("new-user-mail").value = "";
        document.getElementById("new-user-password").value = "";
        document.getElementById("user-mail").value = "";
        document.getElementById("user-password").value = "";
        document.getElementById("root").innerHTML = `<p>Hola ${user.email}</p>
    
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
        document.getElementById("nav-logout").style.display = "block";
        document.getElementById("nav-login").style.display = "none";
        document.getElementById("new-user-mail").value = "";
        document.getElementById("new-user-password").value = "";
        document.getElementById("user-mail").value = "";
        document.getElementById("user-password").value = "";
        document.getElementById("root").innerHTML = ""
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
            alert(errorCode+ " " + errorMessage)
            
        });
        
        
    })

    function saveNewUser(){
        database.ref("users/"+firebase.auth().currentUser.uid).set({
            email: firebase.auth().currentUser.email,
        })
        database.ref("users/"+firebase.auth().currentUser.uid).update({
            movieLists: false
        })
    }
   
    
        fetch("https://api.themoviedb.org/3/discover/movie?api_key=48819a4f88e3d597df63bebab6723d0f&primary_release_year=2019")
        .then(data => data.json())
        .then(data => {
            let promises = [];
                let dataMovies = data.results;
                dataMovies.forEach(movie => {
                    let title = movie.title;
                    moviesShown = [];
                    promises.push(fetch("https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?t="+title+"&plot=full&y=2019&apikey=8b8cc00a") //9513ffad //c39cba8d  // 8b8cc00a
                        .then(data => data.json())
                        .then(data => {
                            if (data.Response === "False"){
                                return;
                            }
                            if (data.Poster === "N/A"){
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
            .then(()=>{
                console.log("cargo")
                createLinks(movieLinks);
            })
            
            
            

    

    document.getElementById("search").addEventListener("click", ()=> {
        let promises = [];
        document.getElementById("legend").style.display = "none";
        document.getElementById("movies").innerHTML = "";        
        document.getElementById("movies").style.display = "block";
        document.getElementById("movies-individual").style.display = "none";
        let userSearch = document.getElementById("search-input").value;
        function displaySearch(){
            promises.push(fetch("https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?t="+userSearch+"&plot=full&apikey=8b8cc00a") // 9513ffad //c39cba8d // 8b8cc00a
                            .then(data => data.json())
                            .then(data => {
                                // console.log("oli")
                                if (data.Response === "False"){
                                    return;
                                }
                                if (data.Poster === "N/A"){
                                    return;
                                }
                                moviesShown = [];
                                moviesShown.push(data)
                                document.getElementById("movies").innerHTML += `
                                    <div class="col s12 m4 movie-card">
                                        <div class="card small center-align white">
                                            <div class="card-content white-text">
                                                <img class="responsive-img card-poster" src="${data.Poster}">
                                            </div>
                                            <div class="card-action">
                                                <a class="individual-movie-search" href="#">${data.Title}</a>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    `
    
                                }))
                                return Promise.all(promises);

        }
        displaySearch().then(()=>{
            console.log("cargo")
            let searchLinks = document.getElementsByClassName("individual-movie-search");
            createLinks(searchLinks);
        })
                            

                            
                            
                        

    })
    

    

    let moviesShown = [];


    let movieLinks = document.getElementsByClassName("individual-movie-link");
    function createLinks(movieLinks) {
    
        for(let i = 0; i<movieLinks.length; i++) {
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

    document.getElementById("create-list").addEventListener("click", ()=> {
        document.getElementById("legend").style.display = "none";
        document.getElementById("movies").style.display = "none";
        document.getElementById("movies-individual").style.display = "none";
        document.getElementById("list-create-section").innerHTML = `
        <div class="col s12">
        <input id="list-name" type="text" placeholder="Nombre de la Lista..">
        <button class="btn red" id="new-list">Crear</button>
        </div>
        `

        document.getElementById("new-list").addEventListener("click", ()=> {
            console.log("funciona boton listas")
            let listName = document.getElementById("list-name").value
            let saveList = [(database.ref("users/"+firebase.auth().currentUser.uid+"/movieLists").update({
                [listName]: "a"
            }))]
            Promise.all(saveList).then(()=>{
            document.getElementById("list-create-section").innerHTML = "Lista creada."
        })
        })
        
    })


    







})


