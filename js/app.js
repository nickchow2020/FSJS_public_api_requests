/** 
 * Global Variable use In this Project
*/
const generateAPIUrl = "https://randomuser.me/api/?results=12";
const gallery = document.getElementById("gallery");




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
    const results = date.results;
    const allUser = results.map(user => {
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
 * Function that print the gallery markup to index.html 
 * @param {String} a request APIs URL address
 */
function printGellery(date){
    gallery.innerHTML = date;
}

getJSON(generateAPIUrl)
.then(galleryMarkup)
.then(printGellery)