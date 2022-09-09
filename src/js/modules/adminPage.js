export const adminPage = (staffInfo) => {

    const mainBody = document.querySelector("body");
    mainBody.style.backgroundImage = "none";
    mainBody.style.backgroundColor = "#080c17"

    const bodyPage = document.querySelector(".admin-panel");
    const loginSection = document.querySelector("#loginSection")
    loginSection.remove()

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
    </div>
    
    `;

    bodyPage.append(adminPanel);

}