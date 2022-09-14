import { adminPage } from "./modules/adminPage.js";

let param = new URLSearchParams(location.search);
var token = param.get('IVAOTOKEN');
let userInfo = [];

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
    staff: "EC-AOC:EC-TAC",
    va_staff_ids: "",
    va_staff: 0,
    va_staff_icaos: "",
    isNpoMember: 0,
    va_member_ids: "21991",
    hq_pilot: 0
    }

if(token != null){
    fetch(`./getUser/${token}`)
    .then(data => data.json())
    .then(data => {
        userInfo = data;
        adminPage(userInfo);
        window.history.pushState("object or string", "Title", "/"+window.location.href.substring(window.location.href.lastIndexOf('/') + 1).split("?")[0]);
    })}
    adminPage(xd);