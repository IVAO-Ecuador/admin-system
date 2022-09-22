import { findUser } from "./findUser.js";
import { getLogs } from "./getLogs.js";

/* Exporting the variables to be used in other files. */
export let optionSection;
export let titleSection;
export let adminSection;
export let staffInfoSection;
export const adminPage = (staffInfo) => {

    /**
     * This function takes in three parameters, type, message, and image, and then displays a popup
     * alert with the given parameters.
     * @param type - The type of alert you want to display.
     * @param message - The message you want to display in the popup
     * @param image - The image to be displayed in the popup.
     */
    const popUpAlert = (type, message, image) => {
        Swal.fire({
                icon: `${image}`,
                title: `${type}`,
                text: `${message}`,
                background: "#1d204b",
                color: "#FFF",
                customClass: { popup: "swal2-border-radius" }
            } 
        );
    }

    /* Just creating variables to be used in the HTML. */
    const staffName = `${staffInfo.firstname} ${staffInfo.lastname}`
    const staffRole = staffInfo.staff;
    const staffVID = staffInfo.vid;

    /* Just changing the background color of the body. */
    const mainBody = document.querySelector("body");
    mainBody.style.backgroundImage = "none";
    mainBody.style.backgroundColor = "#080c17";

    /* Removing the previous admin section. */
    const adminSectionBox = document.querySelector(".admin-section");
    if(adminSectionBox != undefined){
        adminSectionBox.remove();
    }

    const bodyPage = document.querySelector(".admin-panel");

    /* Creating a div element and then adding the HTML code to it. */
    const adminPanel = document.createElement("div");
    adminPanel.className = "admin-section";
    adminPanel.innerHTML = `
    
    <div class='title-section'>
        <h1>Sistema administrativo de IVAO Ecuador</h1>
    </div>
    
    <div class='options-section'>
        <div class='findOption'>
            <img src='../src/assets/lupa.png'>
            <div class='text-card'>
                <h3>Buscar usuario</h3>
                <p>Encontrar usuario por su VID</p>
            </div>
        </div>
        <div class='eventsOption'>
            <img src='../src/assets/agregar.png'>
            <div class='text-card'>
                <h3>Agregar evento</h3>
                <p>Añadir evento a la división</p>
            </div>
        </div>
        <div class='eventsOption2'>
            <img src='../src/assets/editar.png'>
            <div class='text-card'>
                <h3>Editar evento</h3>
                <p>Modificar información de evento</p>
            </div>
        </div>
        <div class='chartsOption'>
        <img src='../src/assets/vuelo.png'>
            <div class='text-card'>
                <h3>Actualizar las cartas</h3>
                <p>Poner al día las cartas</p>
            </div>
        </div>
        <div class='examOption'>
        <img src='../src/assets/examen.png'>
            <div class='text-card'>
                <h3>Exámenes y entrenamientos</h3>
                <p>Agendar o editarlos</p>
            </div>
        </div>
        <div class='logsOption'>
        <img src='../src/assets/log.png'>
            <div class='text-card'>
                <h3>Registro de actividad</h3>
                <p>Últimos cambios realizados</p>
            </div>
        </div>
    </div>

    <div class='staff-info-section'>
        <div class='staffBox'>
            <div class='staffName'>
            <img src='../src/assets/user.png' width="30" class='imgFix'>
                <p>${staffName}</p>
            </div>
            <div class='staffRole'>
                <img
                src="https://flagcdn.com/w40/ec.png"
                srcset="https://flagcdn.com/w80/ec.png 2x"
                width="40"
                alt="Ecuador"
                class='imgFix'>
                <p>${staffRole}</p>
            </div>
            <div class='staffVID'>
                <img src='../src/assets/logo.png' width="40">
                <p>${staffVID}</p>
            </div>
        </div>
    </div>
    
    `;

    bodyPage.append(adminPanel);

    /* Just creating variables to be used in other files. */
    optionSection = document.querySelector(".options-section");
    titleSection = document.querySelector(".title-section");
    adminSection = document.querySelector(".admin-section");
    staffInfoSection = document.querySelector(".staff-info-section");

    const findOption = document.querySelector(".findOption");
    const eventsOption = document.querySelector(".eventsOption");
    const eventsOption2 = document.querySelector(".eventsOption2");
    const chartsOption = document.querySelector(".chartsOption");
    const examOption = document.querySelector(".examOption");
    const logsOption = document.querySelector(".logsOption")

    /* An event listener that is listening for a click on the findOption div. If the staffInfo.staff is
    equal to EC-DIR, EC-ADIR, or EC-WM, then it will run the findUser function. If not, then it will
    run the popUpAlert function. */
    findOption.addEventListener("click", () => {
        if(staffInfo.staff == "EC-DIR" || staffInfo.staff == "EC-ADIR" || staffInfo.staff == "EC-WM"){
            findUser("",staffInfo);
        }else{
            popUpAlert("No tienes permisos suficientes", `Esta zona esta restringida`, "warning");
        }
    });

    /* Listening for a click on the logsOption div. If the staffInfo.staff is equal to EC-WM, then it
    will run the getLogs function. If not, then it will run the popUpAlert function. */
    logsOption.addEventListener("click", () => {
        if(staffInfo.staff == "EC-WM"){
            getLogs(staffInfo);
        }else{
            popUpAlert("No tienes permisos suficientes", `Esta zona esta en mantenimiento`, "warning");
        }
    });

}