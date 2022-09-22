import { adminPage } from "./modules/adminPage.js";
import { createLog } from "./modules/createLog.js";

/* Getting the token from the URL. */
let param = new URLSearchParams(location.search);
var token = param.get('IVAOTOKEN');
let staffInfo = [];

const xd = {
    result: 1,
    vid: "598172",
    firstname: "Santiago",
    lastname: "Idarraga Ceballos",
    rating: 2,
    ratingatc: 7,
    ratingpilot: 7,
    division: "EC",
    country: "CO",
    skype: "",
    hours_atc: 7143740,
    hours_pilot: 16846471,
    staff: "EC-WM",
    va_staff_ids: "",
    va_staff: 0,
    va_staff_icaos: "",
    isNpoMember: 0,
    va_member_ids: "21991",
    hq_pilot: 0
    }

/* Checking if the token is null or not. If it is not null, it will fetch the user data from the
database. */
if(token != null){
    fetch(`/getUser/${token}`)
    .then(data => data.json())
    .then(data => {
        staffInfo = data;

        createLog(staffInfo, "Ha iniciado sesión en el panel administrativo")

        const loginSection = document.querySelector("#loginSection")
        loginSection.remove();

        adminPage(staffInfo);
        window.history.pushState("object or string", "Title", "/"+window.location.href.substring(window.location.href.lastIndexOf('/') + 1).split("?")[0]);
    })
}

adminPage(xd);
const loginSection = document.querySelector("#loginSection")
        loginSection.remove();

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