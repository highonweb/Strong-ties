var canvas = document.getElementById("chart")
var context = canvas.getContext('2d');
var income=0;
canvas.width = 200
canvas.height = 200
var pink = ['#FFC0CB','#DB7093','#FFB6C1','#FF69B4','#FF1493','#FFC0CB','#DB7093','#FFB6C1','#FF69B4','#FF1493','#FFC0CB','#DB7093','#FFB6C1','#FF69B4','#FF1493']
function drawChart() {
    context.clearRect(0, 0, chart.width, chart.height)
    var initial =0;
    for (let i = 0; i < arguments.length; i++) {
        var sum = [...arguments].reduce((a,b)=>a+b)
        
        let angle = (arguments[i]/sum)*Math.PI*2
        final = initial+angle
        context.beginPath();
        context.arc(canvas.width/2, canvas.height/2, 100, initial,final, false);
        context.lineTo(canvas.width/2, canvas.height/2);
        context.closePath();
        context.fillStyle = pink[i];
        context.fill();
        initial = final
    }
    return sum 
}

var emparr=[];
        var contrs = document.getElementsByClassName("contr")
        var rocon = document.getElementsByClassName("rocon")
        for (let index = 0; index < contrs.length; index++) {
            const element = Number(contrs[index].innerHTML.slice(1,));
            rocon[index].style.backgroundColor=pink[index]
            emparr.push(element)                
        }
        income = drawChart(...emparr)
        
        calculate()
        function calculate() {
            var incomeee = document.getElementsByClassName('income')
        var incomesum = income;
            for (let index = 0; index < incomeee.length; index++) {
            const element = incomeee[index].innerHTML
            console.log(element.slice(element.indexOf('-')+2));
            incomesum += Number(element.slice(element.indexOf('-')+2))
        }
        
        var expenseee = document.getElementsByClassName('expense')
        var expensesum = 0;
        for (let index = 0; index < expenseee.length; index++) {
            const element = expenseee[index].innerHTML
            expensesum += Number(element.slice(element.indexOf('-')+2))
        }
        document.getElementById("result").innerHTML='<span style="color: green;" >₹'+String(incomesum)+"</span> - "+'<span style="color: red;" >₹'+String(expensesum)+"</span> → "+'₹'+String(incomesum-expensesum)

        }
        function Income() {
    var iname = document.getElementById('incname').value
    var ivalue =document.getElementById('incamount').value
    var inc = document.getElementById('inc')
    if(iname == '' || ivalue == '' ){
        return false
    }
    if(!/^[0-9]+$/.test(ivalue)){
        alert("Please only enter numeric characters")
        return false
    }
    inc.innerHTML += `<div><h2 class="income">${iname}  -  ${ivalue}</h2></div>`
    var data = {
        iname:iname,
        ivalue:ivalue
    }
            calculate()
    fetch("https://strong-ties.herokuapp.com/api/addinc", { 
      
      // Adding method type 
      method: "POST", 
        
      // Adding body or contents to send 
      body: JSON.stringify(data), 
        
      // Adding headers to the request 
      headers: { 
          "Content-type": "application/json",
          "origin": "*"
      } 
  })  

}
function Expense() {
    var ename = document.getElementById('expname').value
    var evalue =document.getElementById('expamount').value
    var exp = document.getElementById('exp')
    if(ename == '' || evalue == '' ){
        return false
    }
    if(!/^[0-9]+$/.test(evalue)){
        alert("Please only enter numeric characters")
        return false
    }
    exp.innerHTML += `<div><h2 class="expense">${ename}  -  ${evalue}</h2></div>`
    console.log(ename,evalue)
    var data = {
        ename:ename,
        evalue:evalue
    }
    
  calculate()  
    fetch("https://strong-ties.herokuapp.com/api/addexp", { 
      
      // Adding method type 
      method: "POST", 
        
      // Adding body or contents to send 
      body: JSON.stringify(data), 
        
      // Adding headers to the request 
      headers: { 
          "Content-type": "application/json",
          "origin": "*"
      } 
  })   
}
async function nm(btn) {
    btn.disabled = true;
    let g = await fetch("https://strong-ties.herokuapp.com/api/nm") 
           
}