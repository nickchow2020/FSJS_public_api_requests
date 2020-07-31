/** 
 * Global Variable use In this Project
*/
const generateAPIUrl = "https://randomuser.me/api/?results=12";
const gallery = document.getElementById("gallery");
const searchDiv = document.querySelector(".search-container")


/**
 * Function that request the date from the server
 * @param {URL} a request APIs URL address
 */
 async function getJSON(url){
     try{
        const twelveUser = await fetch(url);
        const twelveUserJson = await twelveUser.json();
        return twelveUserJson;
     }catch(err){
         throw err
     }
}

/**
 * Function that request the date from the server 
 * and generate gallery markup HTML and retrun as string
 * @param {JSON} a request APIs URL address
 */
function galleryMarkup(date){
    const allUser = date.map(user => {
        const galleryHTML = 
        `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${user.picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name class="card-name cap">${user.name.first}</h3>
                <p class="card-text">${user.email}</p>
                <p class="card-text">${user.location.city}, ${user.location.state}</p>
            </div>
        </div>
        `
        return galleryHTML;
    })
    return allUser.join("");
}

/**
 * function that allow to generate multiple attribute at one single step,
 * by using for in loops
 * @param {element}  element needs set attribute
 * @param {object}  object of attribute in key-value pair
 */
function setAttributes(element,object){
    for(let key in object){
        element.setAttribute(key,object[key])
    }
}



/**
 * function that is going to create search bar and it's functionality.
 * @param {} date 
 */
function searchBar(date){
    const results = date.results;
    const form = document.createElement("form");
    const search = document.createElement("input");
    const submit = document.createElement("input");

    const attributesForm = {
        action : "#",
        method : "get"
    }

    const attributesSearch = {
        type : "search",
        id : "search-input",
        class: "search-input",
        placeholder: "Search..."
    }

    const attributesSubmit = {
        type : "submit",
        value : "Search",
        id : "search-submit",
        class : "search-submit"
    }

    setAttributes(form,attributesForm);
    setAttributes(search,attributesSearch);
    setAttributes(submit,attributesSubmit);

    searchDiv.appendChild(form);
    form.appendChild(search);
    form.appendChild(submit);

    search.addEventListener("keyup",(e)=>{
       const searchValue = search.value.toLowerCase();
       for(let i = 0; i < results.length; i ++){
           const firstName = results[i].name.first.toLowerCase();
           if(firstName.includes(searchValue)){
               console.log("YES")
           }
       }
    })

    return results
}






/**
 * Function that print the gallery markup to index.html 
 * @param {String} a request APIs URL address
 */
function printGellery(date){
    gallery.innerHTML = date;
}


getJSON(generateAPIUrl)
.then(searchBar)
.then(date => console.log(date))
// .then(galleryMarkup)
// .then(printGellery)




