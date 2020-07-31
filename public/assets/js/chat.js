
function openNav(btn) {
    if(window.innerWidth >= 700){
        document.getElementById("mySidenav").style.width = "30vw";
document.getElementById("main").style.marginRight = "30vw";
btn.style.right = "31vw"
    }
    else{
        document.getElementById("mySidenav").style.width = "100vw";
document.getElementById("main").style.width = "0vw";
btn.style.right = "31vw"
    }
btn.setAttribute('onclick',"closeNav(this)")

}
function closeNav() {
    btn=document.getElementById('fixed')
document.getElementById("mySidenav").style.width = "0";
document.getElementById("main").style.marginLeft = "0";
document.getElementById("main").style.width = "100vw";
btn.style.right = "10px"
btn.setAttribute('onclick',"openNav(this)")
}
document.getElementsByClassName('msgheader')[0].addEventListener("click",closeNav)
var socket = io();
    var named = document.getElementById("name");
    var messaged = document.getElementById("message");
    var msgs = document.getElementById("messages");
    document.getElementById("send").onclick = ()=>{
    sendMessage({name: named.value, message: messaged.value});
        }
    getMessages()
    socket.on('message', addMessages)
    function addMessages(message){
    if (message.name == named.value) {
    msgs.innerHTML+=(`<div class='chatme' > <img class='avatar' src='${message.name}' alt='${message.name}' ><br> ${message.message} </div><br>`)
    }
    else{
    msgs.innerHTML+=(`<div class='chat' > <img class='avatar' src='${message.name}' alt='${message.name}' ><br> ${message.message} </div><br>`)
    }      
    var final = msgs.children
        final[final.length-1].scrollIntoView()  
        messaged.value=''
    }

    function getMessages(){
    fetch('https://strong-ties.herokuapp.com/messages')
    .then((response) => response.json())
        .then((data) => {
        data.forEach(addMessages);
    })
    }

    function sendMessage(message){
        let sg = JSON.stringify(message)
    fetch("https://strong-ties.herokuapp.com/messages", {
    method: "POST", 
    body: sg, 
    headers: { 
        "Content-type": "application/json"
    } 
}) 
    }

    setTimeout(() => {
    var final = msgs.children
    if (final != null) {
        final[final.length-1].scrollIntoView()    
    }}, 1000);