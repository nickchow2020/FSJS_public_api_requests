/** 
 * Global Variable use In this Project
*/
const generateAPIUrl = "https://randomuser.me/api/?results=12";
const gallery = document.getElementById("gallery");
const searchDiv = document.querySelector(".search-container")
const body = document.querySelector("body");
const closeButton = document.getElementById("modal-close-btn");

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
 * @param {object}
 */
function modalMarkup(date){
    const modalContainer = document.createElement("div");
    const modalDiv = document.createElement("div");
    const closeBtn = document.createElement("button");
    const modalInfoDiv = document.createElement("div");

    modalContainer.classList.add("modal-container");
    body.appendChild(modalContainer);
    modalDiv.classList.add("modal");
    modalInfoDiv.classList.add("modal-info-container");

    const btnAttributes = {
        type:"button",
        id:"modal-close-btn",
        class:"modal-close-btn"
    }

    setAttributes(closeBtn,btnAttributes);
    closeBtn.innerHTML = `<strong>X</strong>`;

    const getMonth = date.dob.date.slice(5,7);
    const getDate = date.dob.date.slice(8,10);
    const getYear = date.dob.date.slice(0,4);
    const modalHTML = 
    `
            <img class="modal-img" src="${date.picture.large}" alt="profile picture">
             <h3 id="name" class="modal-name cap">${date.name.first} ${date.name.last}</h3>
            <p class="modal-text">${date.email}</p>
            <p class="modal-text cap">${date.location.city}</p>
            <hr>
            <p class="modal-text">${date.cell}</p>
            <p class="modal-text">${date.location.street.number} ${date.location.street.name} ${date.location.city} ${date.location.state} ${date.location.postcode}</p>
            <p class="modal-text">Birthday: ${getMonth}/${getDate}/${getYear}</p>
    `
    modalContainer.appendChild(modalDiv);
    modalDiv.appendChild(closeBtn);
    modalDiv.appendChild(modalInfoDiv);
    modalInfoDiv.innerHTML = modalHTML;

    closeBtn.addEventListener("click",()=>{
        modalContainer.style.display = "none";
    })
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
        const targetName = h3Name.textContent;
        let targetObject;
        for(let i = 0; i < resultDate.length; i ++){
           if(targetName === resultDate[i].name.first){
               targetObject = resultDate[i];
           }
        }
        modalMarkup(targetObject);
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



