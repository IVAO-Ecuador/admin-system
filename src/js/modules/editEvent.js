import { adminPage, adminSection, optionSection, staffInfoSection, titleSection } from "./adminPage.js";
import { createLog } from "./createLog.js";
import { popUpAlert } from "./popAlert.js";

/***************************************************************
 *                     Edit event
***************************************************************/

export const editEvent = async (staffInfo, eventToFind = "") =>{

    /* Main change */
    titleSection.innerHTML = `<h1>Editar un evento</h1></h1>
    <button class='goBackButton'>Volver atrás</button>`;
    optionSection.remove();

    /* Adding an event listener to the button. */
    const goBackButton = document.querySelector(".goBackButton");
    goBackButton.addEventListener("click", () => {
        adminPage(staffInfo);
    });

    /* Removing the previous table if it exists. */
    const editEventBox = document.querySelector(".editEventSection")
    if(editEventBox != undefined){
        editEventBox.remove();    
    }

    let eventsArray = [], fetchURL;

    /* A ternary operator. It is a shorthand for an if/else statement. */
    (eventToFind != "") ? fetchURL = `/events/${eventToFind}` : fetchURL = "/events";

    await fetch(fetchURL)
    .then(response => response.json())
    .then(data => eventsArray = data);

    eventsArray.reverse();

    const createButton = () => {
        if(fetchURL != "/events"){
            return `<div id='showAllButton'>
                        <button class='showAllButton'>Mostrar todo</button>
                    </div>`
        }
        return "";
    }

    const editEventSection = document.createElement("div");
    editEventSection.className = "editEventSection";
    editEventSection.innerHTML = `
    
    <div class='findInput'> 
        <label>Buscar evento:</label>
        <input type='text' id='filterInput'>
        <button id='filterButton'><img src='./src/assets/lupa.png'></button>
    </div>
    
    <div class='eventList'></div>
    
    ${createButton()}`

    adminSection.insertBefore(editEventSection, staffInfoSection);
    const eventList = document.querySelector(".eventList");

    const filterButton = document.querySelector("#filterButton");

    filterButton.addEventListener('click', () => {
        if(filterInput.value != ""){
            const eventToFind = filterInput.value;
            editEvent(staffInfo, eventToFind);
        }
    });

    filterInput.addEventListener('keyup', function(e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13 && filterInput.value != "") {
            const eventToFind = filterInput.value;
            editEvent(staffInfo, eventToFind);
        }
    });

    const showAllButton = document.querySelector(".showAllButton")
    if(fetchURL != "/events"){
        showAllButton.addEventListener("click", () => {
            editEvent(staffInfo,"");
        })
    }

    if(eventsArray != "NoResults"){
        eventsArray.forEach(event => {

            const eventCard = document.createElement("div");
            eventCard.className = "eventCard"
            eventCard.innerHTML = `
            
            <img src='${event.link_imagen}'>
            <h3>${event.titulo}</h3>
            <div class='eventInfo'>
                <span>${event.hora}</span>
                <span>${event.lugares}</span>
                <span>${event.estado}</span>
            </div>`

            eventList.appendChild(eventCard);


        });
    }

}