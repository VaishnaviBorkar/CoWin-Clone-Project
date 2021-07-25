//get current date of system
let current_date,dt,mm,yyyy
current_date=new Date()
dt=current_date.getDate()
mm=current_date.getMonth()+1
yyyy=current_date.getFullYear()
//required date format
current_date=`${dt}-${0}${mm}-${yyyy}`
function covinByid(pin){
const xhr=new XMLHttpRequest()
const url=`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${current_date}`
xhr.open('GET',url)
xhr.onreadystatechange = ()=>{
    if(xhr.readyState==4 && xhr.status==200)
    {
    const center_data = JSON.parse(xhr.responseText);
    console.log(center_data.sessions);
    if(center_data.sessions.length==0)
    {
       alert("vaccination is not available");
       console.log("not available");
    }
    else{
        for(var i=0;i< center_data .sessions.length;i++){
     // console.log(center_data .sessions[i].name,center_data .sessions[i].address,center_data.sessions[i].fee_type,center_data .sessions[i].available_capacity,center_data .sessions[i].available_capacity_dose1) 
     //create a number of cards div to display data  
     var block=document.createElement("div")
        block.className="box"
        console.log(block);
        const h2=document.createElement("h1")
        block.appendChild(h2)
        // console.log(h2);
        h2.textContent=center_data .sessions[i].name
        const cards=document.getElementById('parent-box')
        // console.log(cards)
        cards.appendChild(block)
        }
    }
}
}
xhr.send()
}
const input=document.querySelector("#input-pin")
const search_pin_btn=document.querySelector("#by-pin-btn")
// when we try to empty search box.
input.addEventListener('keydown',(e)=>
{
    if(e.key=='Backspace')
    {
    const inner_card=document.getElementsByClassName('box')//child of parent-box

    const cards=document.getElementById("parent-box")
    // console.log(cards)
    for(var i=0;i<inner_card.length;i++)
    {
    cards.removeChild(inner_card[i])
    }
}
})
input.addEventListener('keyup',(e)=>
{
    var input_1=e.target.value;
})
search_pin_btn.addEventListener('click',(e)=>{
    e.preventDefault()
    let pincode=input.value;
    // let pincode=inpu;
    if(pincode==="")
    {
        alert("please enter pincode in search box")
    }
    else if(isNaN(pincode))
    {
        alert("Numbers are Allowed Only")
    }
    else if(pincode.length!=6)
    {
        alert("Input 6 digit pin Only")
    }
    else{
        // console.log(pincode)
        covinByid(pincode)
    }
})