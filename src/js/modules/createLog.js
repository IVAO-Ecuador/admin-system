export const createLog = (staffInfo, type) => {

    const logDate = new Date();

    const dateLog = ('0' + logDate.getDate()).slice(-2).toString() + '/' 
    + ('0' + (logDate.getMonth()+1)).slice(-2).toString() 
    + '/' + logDate.getFullYear().toString();

    const timeLog = ('0' + logDate.getHours()).slice(-2).toString() + ':' 
    + ('0' + logDate.getMinutes()).slice(-2).toString() 
    + ':' + ('0' + logDate.getSeconds()).slice(-2).toString()

    const fullDate = `${dateLog} - ${timeLog}`;

    const logUser = {
        vid: staffInfo.vid,
        nombre: `${staffInfo.firstname} ${staffInfo.lastname}`,
        descripcion: type,
        fecha: fullDate
    }
    
    fetch("/logs/new/", {
        method: "POST",
        body: JSON.stringify(logUser),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json()) 
    .then(json => console.log(json))
    .catch(err => console.log(err));

    
}