export const createLog = (staffInfo, type) => {

    /* Creating a new Date object. */
    const logDate = new Date();

    /* It's a way to format the date. */
    const dateLog = ('0' + logDate.getDate()).slice(-2).toString() + '/' 
    + ('0' + (logDate.getMonth()+1)).slice(-2).toString() 
    + '/' + logDate.getFullYear().toString();

    const timeLog = ('0' + logDate.getHours()).slice(-2).toString() + ':' 
    + ('0' + logDate.getMinutes()).slice(-2).toString() 
    + ':' + ('0' + logDate.getSeconds()).slice(-2).toString();

    const fullDate = `${dateLog} - ${timeLog}`;

    /* It's creating a new object with the data that I need to send to the server. */
    const logUser = {
        vid: staffInfo.vid,
        nombre: `${staffInfo.firstname} ${staffInfo.lastname}`,
        descripcion: type,
        fecha: fullDate
    }
    
    /* It's sending the data to the server. */
    fetch("/logs/new/", {
        method: "POST",
        body: JSON.stringify(logUser),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    .then(json => console.log(json))
    .catch(err => console.log(err));
}