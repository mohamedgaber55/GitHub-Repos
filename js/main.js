
let username = document.getElementById("username");
let getRepos = document.querySelector(".get-repos");
let reposContainer = document.querySelector(".repos");
let languages = document.querySelector(".language");
let searchTerm = document.querySelector(".search-term");

window.onload  = function(){
    username.focus()
}

function fetchUsername(){

    fetch(`https://api.github.com/users/${username.value}/repos`)
    .then((repos) =>{
        return repos.json()
    })
    .then((repos) => {
        if(repos.length === 0){
            Swal.fire({
                icon: "error",
                title: "Sorry...",
                text: "Unvalid Username!",
            });
            searchTerm.innerHTML = '';
    }
        for(let i = 0; i < repos.length; i++){
                let repo = document.createElement("div");
                repo.className = "repo";
                let repoText = document.createTextNode(repos[i].name);
                let repoStarsText = document.createTextNode("visit");

                let repoSpanName = document.createElement("span");
                repoSpanName.className = "name";

                let repoStars = document.createElement("a");
                repoStars.className = "name";
                repoStars.href = `https://github.com/${username.value}/${repos[i].name}`;
                repoStars.target = "_blank";

                repoSpanName.appendChild(repoText);
                repoStars.appendChild(repoStarsText);
                repo.appendChild(repoSpanName);
                repo.appendChild(repoStars);
                reposContainer.appendChild(repo);
            }

            username.value = '';
    })

}

function handleLanguageClick(e){
    let SearchContent = e.target.getAttribute('data-language');
    searchTerm.innerHTML = `${SearchContent}`;
    fetch(`https://api.github.com/search/repositories?q=${SearchContent}`)
    .then((repos) =>{
        return repos.json()
        }
    )
    .then((repos) => {
        reposContainer.innerHTML = '';
        for(let i = 0; i < repos.items.length; i++){
            let repo = document.createElement("div");
            repo.className = "repo";
            let repoText = document.createTextNode(repos.items[i].name);
            let repoStarsText = document.createTextNode("visit");

            let repoSpanName = document.createElement("span");
            repoSpanName.className = "name";

            let repoStars = document.createElement("a");
            repoStars.className = "name";
            repoStars.href = `https://github.com/search?q=${repos.items[i].name}`;
            repoStars.target = "_blank";

            repoSpanName.appendChild(repoText);
            repoStars.appendChild(repoStarsText);
            repo.appendChild(repoSpanName);
            repo.appendChild(repoStars);
            reposContainer.appendChild(repo);
        }
    })
}

languages.addEventListener('click', handleLanguageClick);

getRepos.onclick =  function(){
    reposContainer.innerHTML = '';
    if(username.value === ''){
        Swal.fire({
            icon: "error",
            title: "Sorry..",
            text: "Username Can't Be Empty!",
        });
    }else {
        fetchUsername();
        searchTerm.innerHTML = username.value
    }
}
