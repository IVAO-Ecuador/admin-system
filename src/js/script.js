import { adminPage } from "./modules/adminPage.js";

let param = new URLSearchParams(location.search);
var token = param.get('IVAOTOKEN');
let userInfo = [];

if(token != null){
    fetch(`/getUser/${token}`)
    .then(data => data.json())
    .then(data => {
        userInfo = data;
        
        const loginSection = document.querySelector("#loginSection")
        loginSection.remove();

        adminPage(userInfo);
        window.history.pushState("object or string", "Title", "/"+window.location.href.substring(window.location.href.lastIndexOf('/') + 1).split("?")[0]);
    })}



// Button to go up
const buttonGoUp = document.getElementById("btn-go-up");
window.addEventListener("scroll", () =>{
    let scrollY = window.scrollY;
    var screenHeight = screen.height;

    if(scrollY > (screenHeight + (screenHeight/16))){
        buttonGoUp.style.opacity = "1";
    }else{
        buttonGoUp.style.opacity = "0";
    }
})
buttonGoUp.addEventListener("click", () => {
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
});