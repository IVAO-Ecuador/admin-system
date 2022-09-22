import { adminPage, adminSection, optionSection, staffInfoSection, titleSection } from "./adminPage.js"
import { popUpAlert } from "./popAlert.js";

const regionalDivision = ["XA","XC","XO","XR","XG","XN","XE","XU","XB","XS", "XY", "XM","XZ", "AN"];

export const findUser = async (userToFind = "", staffInfo) => {

    /* Main change */
    titleSection.innerHTML = `<h1>Buscar usuario</h1>
    <button class='goBackButton'>Volver atrás</button>`;
    optionSection.remove();

    const goBackButton = document.querySelector(".goBackButton");
    goBackButton.addEventListener("click", () => {
        adminPage(staffInfo);
    })

    /** Variables */
    let usersArray = [], fetchURL, countUsers;


    /* Removing the previous table if it exists. */
    const findUserBox = document.querySelector(".findUserSection")
    if(findUserBox != undefined){
        findUserBox.remove();    
    }
    
    /* A ternary operator. It is a shorthand for an if/else statement. */
    (userToFind != "") ? fetchURL = `/users/${userToFind}` : fetchURL = "/users";

    /* A fetch request to the server. */
    await fetch(fetchURL)
    .then(response => response.json())
    .then(data => usersArray = data);

    /* A ternary operator. It is a shorthand for an if/else statement. */
    (usersArray != "NoResults") ? countUsers = usersArray.length : countUsers = 0;
    
    /**
     * If the fetchURL is not equal to "/users", then return a div with a button inside of it.
     * Otherwise, return an empty string
     * @returns A string.
     */
    const createButton = () => {
        if(fetchURL != "/users"){
            return `<div id='showAllButton'>
                        <button class='showAllButton'>Mostrar todo</button>
                    </div>`
        }
        return "";
    }

    /* Creating a div element, giving it a class name, and then adding some HTML to it. */
    const findUserSection = document.createElement("div");
    findUserSection.className = "findUserSection"
    findUserSection.innerHTML = `
    
    <div class='findInput'> 
        <label>Buscar usuario por VID:</label>
        <input type='number' min='0' max='1000000' id='filterInput'>
        <button id='filterButton'><img src='./src/assets/lupa.png'></button>
    </div>

    <p class='totalUsers'>Se encontraron ${countUsers} usuarios registrados en IVAO Ecuador</p>

    <table id='results'>
        <tr>
            <th class='adjustWidth firstTD' style='--aw: 200px; --aw1440: 100px'>VID</th>
            <th class='adjustWidth' style='--aw: 450px; --aw1440: 250px'>Nombre</th>
            <th class='adjustWidth' style='--aw: 150px; --aw1440: 150px'>Division</th>
            <th class='adjustWidth' style='--aw: 150px; --aw1440: 150px'>País</th>
            <th class='adjustWidth' style='--aw1440: 150px'>Correo electronico</th>
            <th class='lastTD adjustWidth' style='--aw1440: 150px'>Eliminar</th>
        </tr>
    </table>
   
    ${createButton()}

    `;

    /* Inserting the `findUserSection` element before the `staffInfoSection` element. */
    adminSection.insertBefore(findUserSection, staffInfoSection);

    /* Selecting the elements from the DOM. */
    const userTable = document.querySelector("#results > tbody");
    const filterInput = document.querySelector("#filterInput")
    const filterButton = document.querySelector("#filterButton");
    const showAllButton = document.querySelector(".showAllButton")

    /* Adding an event listener to the filterButton and filterInput elements. When the user clicks on
    the filterButton element, or presses the enter key while the filterInput element is focused, the
    findUser function is called. */
    filterButton.addEventListener('click', () => {
        if(filterInput.value != ""){
            const vidToFind = filterInput.value;
            findUser(vidToFind);
        }
    });

    filterInput.addEventListener('keyup', function(e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13 && filterInput.value != "") {
            const vidToFind = filterInput.value;
            findUser(vidToFind);
        }
    });

    /* Adding an event listener to the showAllButton element. When the user clicks on the showAllButton
    element, the findUser function is called. */
    if(fetchURL != "/users"){
        showAllButton.addEventListener("click", () => {
            findUser();
        })
    }
    
    /* Creating a table with the users information. */
    if(usersArray != "NoResults"){
        usersArray.forEach(user => {

            const fullName = `${user.nombre} ${user.apellido}`;
            const userCountry = user.pais;
            const userDivision = user.division;
            let email = "";
    
            const getFlag = (element) =>{
                if(regionalDivision.includes(element)){
                    return `<p class='txtDivision'> ${element}</p>`
                }else{
                    return `<img 
                    src="https://flagcdn.com/w40/${element.toLowerCase()}.png" 
                    srcset="https://flagcdn.com/w80/${element.toLowerCase()}.png"
                    width="40"
                    alt="${element}"
                    class='imgFix'>
                    <p class='txtFlag'> ${element}</p>`
                }
            }
    
    
            (user.correo_electronico != null) ? email = user.correo_electronico : email = "No registra correo";
            
            const rowElement = document.createElement('tr');
            rowElement.className = "userRow";
            rowElement.innerHTML = `
            
            <td class='firstTD'>${user.vid}</td>
            <td>${fullName}</td>
            <td>${getFlag(user.division)}</td>
            <td>${getFlag(user.pais)}</td>
            <td>${email}</td>
            <td class='lastTD'><button id='${user.vid}' class='deleteUserButton'>Eliminar</button></td>
            
            `
    
            userTable.appendChild(rowElement);
    
        });

        const deleteButton = document.querySelectorAll(".deleteUserButton");
        deleteButton.forEach(button => {
            button.addEventListener("click", () => {
                const userVID = button.id;
                fetch(`/users/delete/${userVID}`)
                .then(response => response.json())
                .then(data => {
                    popUpAlert("El usuario fue eliminado", `El usuario con VID ${userVID} fue eliminado`, "success");
                    findUser();
                })
            })
        });


    }
}