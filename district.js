
const xhr = new XMLHttpRequest();
const get_url = 'https://cdn-api.co-vin.in/api/v2/admin/location/states'
xhr.open('GET', get_url)
xhr.onreadystatechange = () => {
    if(xhr.status == 200 && xhr.readyState == 4) {
        var get_states = JSON.parse(xhr.responseText);
        console.log(get_states);
        // No of states
        // console.log(states_res.states.length);
        const state_select = document.getElementById('sel-State');
        var combobox1;
        for(let i=0; i < get_states.states.length; i++) {
           const options= document.createElement("option")
           options.textContent=get_states.states[i].state_name
        //    console.log(options);
           const stateoption=document.getElementById("sel-State")
        //    console.log(stateoption);
         const op=  stateoption.appendChild(options)
        //  console.log(stateoption);
        }

        // changing the state 
        var s_id,s_index; //selected index
        state_select.addEventListener('change', (e) => {
         //1.Remove existing result
         const result_div=document.getElementsByClassName("result-heading")
         const div=document.getElementById("result")
         if(div.childElementCount!=0){  
            div.removeChild(result_div[0])
             }
           const inner_boxes=document.getElementsByClassName("box")
           const outer_box=document.getElementById("parent-box")
           const child_length=outer_box.childElementCount
           for(var i=0;i<child_length;i++){
            outer_box.removeChild(inner_boxes[0]);
           }
            const combobox1=document.getElementById("sel-State")
            if(combobox1.value=='Select State')
      {
        const msg=document.getElementById("validation_message")
        msg.textContent="Select Valid State"
      }
         const sel_district=document.getElementById("sel-districts")
         sel_district.innerHTML=`<option>Select District</option>`
            s_index = e.target.selectedIndex
            console.log(s_index +" index");
            if(s_index< 8) {
                s_id =s_index
                f1(s_id)
            } 
            else
             if(s_index== 9) {
                s_id =37
                f1(s_id)
                
            } 
            else {
                s_id =  s_index-1;
                f1(s_id)
            }
           
        })
            // console.log(s_id +" id--2: ");
            //fetch/requesting ditrict url 
             // lets get district name according to state id. 
             function f1(stat_id)
             {
                 s_id=stat_id
              //  console.log("f1 called"+s_id);
            const get_district_url = `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${s_id}`
            xhr.open('GET',get_district_url)
            // console.log(get_district_url);
            xhr.onreadystatechange = () => {
                if(xhr.status == 200 && xhr.readyState == 4) {
                    const district = JSON.parse(xhr.responseText)
                    console.log(district);

                    const district_length = district.districts.length
                    for(let i=0; i < district_length; i++) {
                     const sel_district=document.getElementById("sel-districts")
                     const options=document.createElement("option")
                     options.textContent=district.districts[i].district_name
                     sel_district.appendChild(options)
                   
                    }
                    const sel_district=document.getElementById("sel-districts")
                    sel_district.addEventListener('change', (e) => { 
                         //1.Remove existing result
                        const result_div=document.getElementsByClassName("result-heading")
                        const div=document.getElementById("result")
                    if(div.childElementCount!=0){  
                   div.removeChild(result_div[0])
                    }
                       
                    const inner_boxes=document.getElementsByClassName("box")
                    const outer_box=document.getElementById("parent-box")
                     const child_length=outer_box.childElementCount
                    for(var i=0;i<child_length;i++){
                       outer_box.removeChild(inner_boxes[0]);
                                          }
                    const combobox2=document.getElementById("sel-districts")
                    const msg=document.getElementById("validation_message")
                        if(combobox2.value=="Select District")
                        {
                          msg.textContent="select validdistrict"
                        }
                        else{
                            msg.textContent=""
                        district_name=e.target.value
                        console.log("d name "+e.target.value);
                        var dist_id = -1
                        for(let i = 0; i <district_length; i++) {
                            if(district.districts[i].district_name == district_name) {
                                district_id = district.districts[i].district_id
                                break

                            }
                        }
                        }
                    })
               
                }
                
            }
            xhr.send()
                    
 // button event to display the responded data.
 const search=document.getElementById("search-btn");
 //    console.log(search);
    search.addEventListener('click',(e)=>
    {
      e.preventDefault();

      const combobox2=document.getElementById("sel-districts")
      console.log(combobox2.value)
      let todays_date,d,m,y
      todays_date=new Date()
       d=todays_date.getDate()
       m=todays_date.getMonth()+1
       y=todays_date.getFullYear()
    // required date format
     todays_date=`${d}-${0}${m}-${y}`
      if(combobox2.value!="Select District")
      {
           // console.log(district_id);
              //get vaccination data  to display

             const get_sessions_url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${district_id}&date=${todays_date}`
               xhr.open('GET', get_sessions_url)
            //    console.log("date"+get_sessions_url);
                 xhr.onreadystatechange = () => {
               if(xhr.readyState == 4 && xhr.status == 200) {
                const center_Data = JSON.parse(xhr.responseText)
                    //console.log(data); //sessions array
                    if(center_Data.sessions.length==0)
                    {
                        alert("Vaccine is not available");
                        console.log("not available")
                    }
                    else{
                        var counter=0;
                        console.log(center_Data.sessions);
                        for(var i=0;i< center_Data.sessions.length;i++){
                            if(center_Data.sessions[i].available_capacity>0 &&  center_Data.sessions[i].min_age_limit>=18)
                            {
                                counter++;
                     //create a number of cards div to display data 
                        // var audio=new Audio('./images/successsound.MP3')
                        //  audio.play()
                        var block=document.createElement("div")
                        block.className="box"
                        // console.log(block);
                        const name=document.createElement("h1")
                        name.className="name"
                        block.appendChild(name)
                        const address=document.createElement("h2")
                        address.className="address"
                        block.appendChild(address)
                        const vaccine_t_fee=document.createElement("p")
                        vaccine_t_fee.className="vaccine-type"
                        block.appendChild(vaccine_t_fee)
                        const fees_type=document.createElement("i")
                        fees_type.className="fees-type"
                        block.appendChild(fees_type)
                        const age=document.createElement("p")
                        age.className="age-limit"
                        block.appendChild(age)
                        const capacity=document.createElement("p")
                        capacity.className="available_capacity"
                        block.appendChild( capacity)
                        const dose1=document.createElement("p")
                        dose1.className="dose-1"
                        block.appendChild(dose1)
                        const dose2=document.createElement("p")
                        dose2.className="dose-2"
                        block.appendChild(dose2)
                        // console.log(block);
                        name.textContent=center_Data.sessions[i].name
                        fees_type.textContent=center_Data.sessions[i].fee_type
                        address.textContent="Address : "+center_Data.sessions[i].address+", "+center_Data.sessions[i].state_name+", "+center_Data.sessions[i].district_name+", "+center_Data.sessions[i].pincode;
                        vaccine_t_fee.textContent="Vaccine : "+center_Data.sessions[i].vaccine
                        capacity.textContent="Availability : "+center_Data.sessions[i].available_capacity
                        age.textContent="Age : 18 & Above"
                        dose1.textContent="Vaccine Dose 1: "+center_Data.sessions[i].available_capacity_dose1+" available"
                        dose2.textContent="Vaccine Dose 2: "+center_Data.sessions[i].available_capacity_dose2+" available"
                        const cards=document.getElementById('parent-box')
                        // console.log(cards)
                        cards.appendChild(block)
                        // console.log("function called"+center_Data.sessions[0].name)
                    // console.log(data.sessions)
                        }
                     
                    //  else{}
                
                     }
                     if(counter==0)
                     {
                       alert("All centers Vaccine Availability is 0")
                     }
                     else{
                       const result_div=document.getElementById("result")
                     const heading=document.createElement("h2")
                     const head_span=document.createElement("span")
                     heading.className="result-heading"
                     heading.textContent="Slot Search Results :"
                     head_span.textContent=`(${counter} Center(s) Found)`
                     heading.appendChild(head_span)
                     result_div.appendChild(heading)
                     }
           
                    }

                           }
                       }
                       xhr.send()
                    
    }
    else{
        const msg=document.getElementById("validation_message")
        msg.textContent="Select Valide District"
    }
                   
    })
       }    

     
    }
}

xhr.send()
// function recieves sessions data

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


