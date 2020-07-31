var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var date = new Date();
  var displaym = date.getMonth();
  var displaye = date.getFullYear();
  document.getElementById("displaym").innerHTML = monthNames[displaym];
  document.getElementById("displaye").innerHTML =
    String(displaye) + "&nbsp;";

  function right() {
    displaym++;
    if (displaym == 12) {
      displaym = 0;
      displaye++;
    }
    updatecal(displaym, displaye);
    document.getElementById("displaym").innerHTML = monthNames[displaym];
    document.getElementById("displaye").innerHTML =
      String(displaye) + "&nbsp;";
  }
  function left() {
    displaym--;
    if (displaym == -1) {
      displaym = 11;
      displaye--;
    }
    updatecal(displaym, displaye);
    document.getElementById("displaym").innerHTML = monthNames[displaym];
    document.getElementById("displaye").innerHTML =
      String(displaye) + "&nbsp;";
  }
  
  async function updatecal(month, year) {
    fetch(`https://strong-ties.herokuapp.com/api/cal/${month}/${year}`)
      .then((response) => response.json())
      .then((data) => {
        fetch(`https://strong-ties.herokuapp.com/api/cal/eve`)
          .then((response) => response.json())
          .then((eve) => {
            td = document.getElementsByTagName("td");
            var i = 0;
            if(eve.length==0){eve=['hello']}
            data.forEach((element) => {
              let daystr =
                element.year +
                "-" +
                (String(element.month).length == 2
                  ? element.month
                  : "0" + String(element.month)) +
                "-" +
                (String(element.day).length == 2
                  ? element.day
                  : "0" + String(element.day));
              var cl = [...td[i].classList];
              var isEvent = cl.includes("event");
              if (isEvent === true) {
                td[i].classList.remove("event");
              }   
            for (let index = 0; index < eve.length; index++) {
                const ele = eve[index];
                if(ele.date){
                if(daystr==ele.date){
                    td[i].innerHTML = element ? element.day : " ";
                    td[i].classList.add("event");
                }
                else{
                    td[i].innerHTML = element ? element.day : " ";
                   }}
               else{
                td[i].innerHTML = element ? element.day : " ";
               }
            }
              
               

              i++;
            });
          });
      });
  
  fetch(`https://strong-ties.herokuapp.com/api/cal/eve`)
          .then((response) => response.json())
          .then((events) => {
            var modalcon = document.getElementsByClassName("modal-con")[0]
            modalcon.innerHTML = ''
              for (let index = 0; index < events.length; index++) {
                  const e = events[index].date;
                  let matcadate= RegExp(String(displaym).length == 1? "0" + String(displaym):String(displaym))
                 let matc = e.match(matcadate)
                 if(matc){
                     
                     modalcon.innerHTML += '<tr>'+'<th class=\'hello\' >'+events[index].event + '</th>' +'<th class=\'hello\' >'+ events[index].date + '</th>'+'</tr>'
                     
                 }
                 
              }
            
          })
        }
  let mainNav = document.getElementById("js-menu");
  let navBarToggle = document.getElementById("js-navbar-toggle");

  navBarToggle.addEventListener("click", function () {
    mainNav.classList.toggle("active");
  });

  // Get the modal
  var modal = document.getElementById("myModal");
  
  // Get the button that opens the modal
  var btn = document.getElementsByClassName("date");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal

  for (let index = 0; index < btn.length; index++) {
    const element = btn[index];
    element.onclick = function () {
      var d = new Date();
      var year =
        String(displaye).length == 1
          ? "0" + String(displaye)
          : String(displaye);
      var month =
        String(displaym).length == 1
          ? "0" + String(displaym)
          : String(displaym);
      var day =
        element.innerHTML.trim().length == 1
          ? "0" + element.innerHTML.trim()
          : element.innerHTML.trim();

      var datestr = year + "-" + month + "-" + day;
      var modalc = document.getElementsByClassName("modc")[0];
      modalc.setAttribute("value", datestr);
      modal.style.display = "block";
    };
  }




  // When the user clicks on <span> (x), close the modals
  function clos() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };




  var da = new Date();
  updatecal(da.getMonth(), da.getFullYear());