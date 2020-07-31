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
        return twelveUserJson.results;
     }catch(err){
         throw err
     }
}

/**
 * Function that request the date from the server 
 * and generate gallery markup HTML and retrun as string
 * @param {JSON} a array of object that container employee information
 */
function galleryMarkupAppend(date){
    const resultDate = date;
    for(let i=0; i<resultDate.length; i++){

    const cardDiv = document.createElement("div");
    const imgDiv = document.createElement("div");
    const infoDiv = document.createElement("div");
    const img = document.createElement('img');
    const h3Name = document.createElement("h3");
    const emailP = document.createElement("p")
    const cityStateP = document.createElement("p")

    cardDiv.classList.add("card");
    imgDiv.classList.add("card-img-container");
    infoDiv.classList.add("card-info-container");
    emailP.classList.add("card-text");
    cityStateP.classList.add("card-text","cap");
    const imgAttributes = {
        class: "card-img",
        src: resultDate[i].picture.large,
        alt: "profile picture"
    }

    const firstAttributes = {
        id:"name",
        class:"card-name cap"
    }
    h3Name.textContent = resultDate[i].name.first;
    emailP.textContent = resultDate[i].email;
    cityStateP.textContent = `${resultDate[i].location.city} ${resultDate[i].location.state}`;

    setAttributes(img,imgAttributes);
    setAttributes(h3Name,firstAttributes)
    gallery.appendChild(cardDiv);
    cardDiv.appendChild(imgDiv);
    cardDiv.appendChild(infoDiv);
    imgDiv.appendChild(img)
    infoDiv.appendChild(h3Name)
    infoDiv.appendChild(emailP)
    infoDiv.appendChild(cityStateP)

    cardDiv.addEventListener("click",(e)=>{
        console.log(e.target)
    })
    }
    return resultDate
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
 * @param {JSON} date that retrieve from the fetch() request
 */
function searchBar(date){
    const results = date;
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

    search.addEventListener("keyup",()=>{
       const searchValue = search.value.toLowerCase();
       const searchResults = [];
       for(let i = 0; i < results.length; i ++){
           const firstName = results[i].name.first.toLowerCase();
           if(firstName.includes(searchValue)){
               searchResults.push(results[i])
           };
       };
       gallery.innerHTML = "";
       galleryMarkupAppend(searchResults);
    })
}


getJSON(generateAPIUrl)
.then(galleryMarkupAppend)
.then(searchBar)




