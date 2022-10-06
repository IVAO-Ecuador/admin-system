import { adminPage, adminSection, optionSection, staffInfoSection, titleSection } from "./adminPage.js";
import { createLog } from "./createLog.js";
import { popUpAlert } from "./popAlert.js";

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

    let eventsArray = [], fetchURL;

    /* A ternary operator. It is a shorthand for an if/else statement. */
    (eventToFind != "") ? fetchURL = `/events/${eventToFind}` : fetchURL = "/events";

    await fetch(fetchURL)
    .then(response => response.json())
    .then(data => eventsArray = data);

    eventsArray.reverse();

    const editEventSection = document.createElement("div");
    editEventSection.className = "editEventSection";
    editEventSection.innerHTML = `
    
    <div class='findInput'> 
        <label>Buscar evento:</label>
        <input type='text' id='filterInput'>
        <button id='filterButton'><img src='./src/assets/lupa.png'></button>
    </div>
    
    <div class='eventList'></div>`

    adminSection.insertBefore(editEventSection, staffInfoSection);
    const eventList = document.querySelector(".eventList");

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