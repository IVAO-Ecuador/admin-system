import { adminPage } from "./modules/adminPage.js";

let param = new URLSearchParams(location.search);
var token = param.get('IVAOTOKEN');
let userInfo = [];

if(token != null){
    fetch(`./getUser/${token}`)
    .then(data => data.json())
    .then(data => {
        userInfo = data;
        adminPage(userInfo);
        window.history.pushState("object or string", "Title", "/"+window.location.href.substring(window.location.href.lastIndexOf('/') + 1).split("?")[0]);
    })}
