
var messege=document.getElementById("validation_message")
const input=document.querySelector("#input-pin")
const search_pin_btn=document.querySelector("#by-pin-btn")
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
       alert("vaccine is not available");
       console.log("not available");
    }
    else{
        var count=0;
        for(var i=0;i< center_data.sessions.length;i++){
     //create a number of cards div to display data  
     if(center_data.sessions[i].available_capacity>0 &&  center_data.sessions[i].min_age_limit>=18 )
            //gives only available slots details
     {
         count+=1
        var audio=new Audio("./images/successsound.MP3")
          audio.play()
     var block=document.createElement("div")
        block.className="box"
        // console.log(block);
        const name=document.createElement("h1")
        name.className="name"
        block.appendChild(name)
        const address=document.createElement("h2")
        address.className="address"
        block.appendChild(address)
        const vaccine_t_fee=document.createElement("h2")
        vaccine_t_fee.className="vaccine-type"
        block.appendChild(vaccine_t_fee)
        const fees_type=document.createElement("i")
        fees_type.className="fees-type"
        block.appendChild(fees_type)
        const age=document.createElement("h2")
        age.className="age-limit"
        block.appendChild(age)
        const capacity=document.createElement("h2")
        capacity.className="available_capacity"
        block.appendChild( capacity)
        const dose1=document.createElement("h2")
        dose1.className="dose-1"
        block.appendChild(dose1)
        const dose2=document.createElement("h2")
        dose2.className="dose-2"
        block.appendChild(dose2)
        // console.log(block);
        name.textContent=center_data.sessions[i].name
        fees_type.textContent=center_data.sessions[i].fee_type
        address.textContent="Address : "+center_data.sessions[i].address+", "+center_data.sessions[i].state_name+", "+center_data.sessions[i].district_name+", "+center_data.sessions[i].pincode;
        vaccine_t_fee.textContent="Vaccine : "+center_data.sessions[i].vaccine
        capacity.textContent="Availability : "+center_data.sessions[i].available_capacity
        age.textContent="Age : 18 & Above"
        dose1.textContent="Vaccine Dose 1: "+center_data.sessions[i].available_capacity_dose1+" available"
        dose2.textContent="Vaccine Dose 2: "+center_data.sessions[i].available_capacity_dose2+" available"
        const cards=document.getElementById('parent-box')
        // console.log(cards)
        cards.appendChild(block)
        }
       
    //     else {alert("vaccination is not available")}
    }
    if(count==0)
    {
      alert("All centers Vaccine Availability is 0")
    }
    else{
    const result_div=document.getElementById("result")
    const heading=document.createElement("h2")
    const head_span=document.createElement("span")
    heading.className="result-heading"
    heading.textContent="Slot Search Results :"
    head_span.textContent=`(${count} Center(s) Found)`
    heading.appendChild(head_span)
    result_div.appendChild(heading)
    }
}
}
}
xhr.send()
}
// when we try to make empty search box.
input.addEventListener('keydown',(e)=>
{
   if(e.key=='Backspace')
    {  
         //1.Remove existing result
         const result_div=document.getElementsByClassName("result-heading")
         const div=document.getElementById("result")
         if(div.childElementCount!=0){  
            div.removeChild(result_div[0])
             }
        const child=document.getElementById("parent-box").childElementCount
        // console.log(child)
        const cards=document.getElementById("parent-box")
        const inner_card=document.getElementsByClassName('box')
            for(var i=0;i<child;i++)
            {
                // console.log(i)
            cards.removeChild(inner_card[0])
            }
    }

})
input.addEventListener('keyup',(e)=>{ 
    let pincode=e.target.value;
    // let pincode=inpu
     if(isNaN(pincode))
    {

        messege.textContent="Please Enter Valid Pincode"
    }
    else{
        messege.textContent=""
    }
})
        search_pin_btn.addEventListener('click',(e)=>{
         const pincode=input.value
            if(pincode==="")
            {
                messege.textContent="please enter pincode in search box"
            }
            else if(pincode.length!=6)
            {
               messege.textContent="Please Enter 6 digit pincode"
            }
            else{
            e.preventDefault()
          console.log(pincode)
            covinByid(pincode)
            }
        
        })
           
// image  sliderr
var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}    
  x[myIndex-1].style.display = "block";  
  setTimeout(carousel, 2000); // Change image every 2 seconds
}
