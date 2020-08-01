/** 
 * Global Variable use In this Project
*/
const generateAPIUrl = "https://randomuser.me/api/?results=12"; //API URL
const gallery = document.getElementById("gallery");// gallery display area
const searchDiv = document.querySelector(".search-container");//searchbar wrapper
const body = document.querySelector("body");//target body tags
const searchResults = [];//stored searches employee object
let index;//initial index varialbe
/**
 * Function that request the date from the server and convert it to JSON Date
 * Used Try and catch to handle the error.
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
 * function that recalled modalMarup() itself;
 * @param {object} employee current object 
 */

 function calledModalMarkUp(data){
     return modalMarkup(data);
 }


/**
 * Function that generate modal markup structure and it's click events on "prev" and "next" buttons. 
 * @param {object} current employees object
 */
function modalMarkup(date){
    // start created modal components
    const modalContainer = document.createElement("div");
    const modalDiv = document.createElement("div");
    const closeBtn = document.createElement("button");
    const modalInfoDiv = document.createElement("div");

    const modalBtnDiv = document.createElement("div");
    const prevBtn = document.createElement("button");
    const nextBtn = document.createElement("button");

    const prevBtnAttributes = {
        type:"button",
        id:"modal-prev",
        class:"modal-prev btn"
    }

    const nextBtnAttributes = {
        type:"button",
        id: "modal-next",
        class:"modal-next btn"
    }
    modalBtnDiv.classList.add("modal-btn-container");
    setAttributes(prevBtn,prevBtnAttributes);
    setAttributes(nextBtn,nextBtnAttributes);
    prevBtn.textContent = "Prev";
    nextBtn.textContent = "Next";

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
    modalBtnDiv.appendChild(prevBtn)
    modalBtnDiv.appendChild(nextBtn)
    modalContainer.appendChild(modalBtnDiv);
    // end created modal components

    //close the modal when close button click
    closeBtn.addEventListener("click",()=>{
        body.removeChild(modalContainer);
    })

    //restore the employees date,12 employee data.
    const noSearchResult = results;

    //add event handler to Prev Button
    prevBtn.addEventListener("click",()=>{
         if(index > 0){
            index -= 1;
         }
            if(searchResults.length > 0){
                const data = searchResults[index];
                if(data){
                   body.removeChild(modalContainer);
                   calledModalMarkUp(data);
                }
            }else{
                const data = noSearchResult[index];
                if(data){
                   body.removeChild(modalContainer);
                   calledModalMarkUp(data);
                }
            }
    })
    //add event handler to Next Button
    nextBtn.addEventListener("click",()=>{
            if(searchResults.length > 0){
                if(index < searchResults.length - 1){
                    index += 1;
                }
                const data = searchResults[index];
                if(data){
                   body.removeChild(modalContainer);
                   calledModalMarkUp(data);
                }
            }else{  
                if(index < noSearchResult.length - 1){
                    index += 1;
                }
                const data = noSearchResult[index];
                if(data){
                   body.removeChild(modalContainer);
                   calledModalMarkUp(data);
                }
            }
   })
}

/**
 * Function that generate the gallery markup components and click events on card Div.
 * @param {JSON} a array of object that container employees information.
 */
function galleryMarkupAppend(date){
    //stored employee date
    const resultDate = date;
    //start generated employees components
    for(let i=0; i<resultDate.length; i++){

    const cardDiv = document.createElement("div");
    const imgDiv = document.createElement("div");
    const infoDiv = document.createElement("div");
    const img = document.createElement('img');
    const h3Name = document.createElement("h3");
    const emailP = document.createElement("p");
    const cityStateP = document.createElement("p");

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

    // event handler on cardDiv
    cardDiv.addEventListener("click",(e)=>{
        const targetName = h3Name.textContent;
        let targetObject;
        for(let i = 0; i < resultDate.length; i ++){
           if(targetName === resultDate[i].name.first){
               targetObject = resultDate[i];
               index = i;
           }
        }
        modalMarkup(targetObject);
    })
    }
    //end generated employees components

    //return employees date
    return resultDate;
}

/**
 * function that allow to generate multiple attributes at one single step,
 * by using for in loops,
 * @param {element}  element needs set attribute,
 * @param {object}  object of attributes in key-value pair,
 */
function setAttributes(element,object){
    for(let key in object){
        element.setAttribute(key,object[key])
    }
}



/**
 * function that is going to create search bar and it's functionality.
 * @param {JSON} date of employees object
 */
function searchBar(date){
    //globalize variable: results
    window.results = date;

    //start generate searchBar componentes
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
    //end generate searchBar componentes

    /**
     * add search event handler,sorts the matches employee's object into "searchResults" array
     * and display the results in real time.
     */
    search.addEventListener("keyup",()=>{
       gallery.innerHTML = "";
       searchResults.splice(0,searchResults.length)
       const searchValue = search.value.toLowerCase();
       for(let i = 0; i < results.length; i ++){
           const firstName = results[i].name.first.toLowerCase();
           if(firstName.includes(searchValue)){
            searchResults.push(results[i]);
           };
       };
       galleryMarkupAppend(searchResults);
    })
}


//executed getJSON function with then and catch;
getJSON(generateAPIUrl)
.then(galleryMarkupAppend)
.then(searchBar)
.catch(err => console.log(err))