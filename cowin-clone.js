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
    const response = JSON.parse(xhr.responseText);
    if(response.sessions ==[])
    {
       alert("vaccination is bot available")
    }
    for(var i=0;i<response.sessions.length;i++){
    console.log(response.sessions[i].name)
    }
}
}
xhr.send()
}
const input=document.querySelector("#input-pin")
const search_pin_btn=document.querySelector("#by-pin-btn")
search_pin_btn.addEventListener('click',(e)=>{
    e.preventDefault()
    let pincode=input.value;
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
        console.log(pincode)
        covinByid(pincode)
    }
})