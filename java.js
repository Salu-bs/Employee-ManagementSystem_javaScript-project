
// let table= []
let tableData=[];

let TableDatas=[];
let start=0;
let employeelist=document.getElementById("employeelist")


fetch('http://localhost:3000/employees')
    .then((data) => {
        return data.json(); // Convert to an object
    })
    .then((objectData) => {
        TableDatas = objectData; // Store the data globally
        pagination(TableDatas);
    });

employeelist.addEventListener("change", function () {
    pagination(TableDatas);
});

function pagination(employees) {
    let paginationbtn = document.getElementById("paginationbtn");
    let start = 0;
    let pageSize = parseInt(employeelist.value);
    let totalpage = Math.ceil(employees.length / pageSize);
    paginationbtn.innerHTML = "";

    for (let i = 1; i <= totalpage; i++) {
        let newbutton = document.createElement("button");
        newbutton.textContent = i;
        newbutton.id = "pages" + i;
        newbutton.onclick = function () {
            Activepage(newbutton);
            employeeperpage(newbutton.textContent);
        };
        paginationbtn.appendChild(newbutton);
    }

    Activepage(document.getElementById("pages1")); // Activate the first page button

    function Activepage(activebtn) {
        let allButtons = document.querySelectorAll("#paginationbtn button");
        allButtons.forEach(btn => btn.classList.remove("active"));
        activebtn.classList.add("active");
    }

    employeeperpage(1); // Display the first page initially
}

function employeeperpage(pagenum) {
    let emptyarray = [];
    let start = (pagenum - 1) * parseInt(employeelist.value);
    let stop = start + parseInt(employeelist.value);
    let employeesToDisplay = TableDatas.slice(start, stop);

    display(employeesToDisplay);
}

// function display(data) {
//     // Implement this function to display data on the page
//     // You can use DOM manipulation to render the data
// }

let row;
var cell ;
function  display(TableDatas){
    let tableData="";
     
    TableDatas.map((value,index)=>{
         row = document.createElement("tr");
    cell =document.createElement("td");
        tableData+=` 
        <tr class="edit">
        <td scope="row">#${zero(start+1)}</td>
        <td><img src="http://localhost:3000/employees/${value.id}/avatar" class="rounded-circle me-2"height=30 width=30>
        ${value.salutation} ${value.firstName} ${value.lastName} </td>
        <td>${value.email} </td>
        <td>${value.phone}</td>
        <td>${value.gender}</td>
        <td>${value.dob}</td>
        <td>${value.country}</td>
        <td>
        <span  class="dots">

        <button onclick="optionbox(this.nextElementSibling)" class="dots-button "> <i class="fa-solid fa-ellipsis"></i></button>
          <div  id="subbox${index}" class="subdots" >
          <a href="details.html?id=${value.id}"> <i class="material-symbols-outlined">
          visibility
          </i><p>View Details</p></a>
              <button onclick="editemployee('${value.id}','${index}'),modaal(),reload()" id="editemployeebtn"><i class="fa-solid fa-pen"></i>
                  
                  <p>Edit </p></button>
              <button onclick="deleteemployee('${value.id}','${index}'),modaal()" id="deleteemployeebtn"><i class="material-symbols-outlined">
                  delete
                  </i><p>Delete </p></button>
          </div>
       
      </span>

</td>
    </tr>`

    start++;

   
    });
        document.getElementById("table_body").innerHTML=tableData;
     
      
        // succesdata()
    
}
function zero(slno){
    if(slno<=9){
        return 0
    }
    else {
        return " "

    }
}


let modal=document.getElementById("modal")
let optionbox = (action)=>{

            if (action.style.display === "none" || action.style.display === ""){
            action .style.display = "block";
         modal.style.display="block"
            }
            else {
                modaal()
                action.style.display = "none";
                // modaal()

              }

return false
    }
    
function modaal(){
    console.log('overlay clicked');
    modal.style.display="none"
    for(let i=0;i<employeelist.value;i++){
          let subbox=document.getElementById("subbox"+i)
        if(subbox.style.display=="block"){
            subbox.style.display="none"
        }
    }
 }


// ***********addemployeeformopen************
let EmployeeForm=document.getElementById("EmployeeForm")
let Addemployee=document.getElementById("Addemployee")
let updatedbtn=document.getElementById("updatedbtn")
let overlay=document.getElementById("overlay")




  
   function addemployeeopn(){
    let addemployeeform=document.getElementById("addemployeeform")
    // document.getElementById("eployeeFormbag").style.display="none"
    EmployeeForm.style.display="block"
    Addemployee.style.display="block"

    editEmployeeForm.style.display="none"
    updatedbtn.style.display="none"
     overlay.style.display="block"
     addemployeeform.style.display="block"
     refresh()
   }
// //   ****** close time form*****
   function closeup(){
    EmployeeForm.style.display="none"
    overlay.style.display="none"
    overlay.style.display="none"
  
   refresh()
   reload()
//    deletesuccessfully()

}
function closeuppop(){
    deleteform.style.display="none"
    editpopup.style.display="none"
//  firstpages()



}


// // global declaration
let salutation=document.getElementById("salutation")
let firstname=document.getElementById("firstname")
let lastname=document.getElementById("lastname")
let username=document.getElementById("username")
let password=document.getElementById("password")
let emailaddress=document.getElementById("emailaddress")
let number=document.getElementById("number")
let Birth= document.getElementById("Birth")
let qualification=document.getElementById("qualification")
let address=document.getElementById("address")
let country=document.getElementById("country")
let state=document.getElementById("state")
let city=document.getElementById("city")
let pins=document.getElementById("pin")
// let Gender=document.getElementById("Gender")
let male =document.getElementById("male")
let female =document.getElementById("female")

function formdata(){

let user=
{
    salutation:salutation.value,
    firstName:firstname.value ,
    lastName:lastname.value,
    email:emailaddress.value ,
    phone:number.value ,
    dob:dob(Birth.value) ,
    gender: gender(),
    qualifications:qualification.value,
    address:address.value,
    city:city.value ,
    state:state.value ,
    country:country.value,
    username:username.value,
    password:password.value

}

return user

    function gender(){
        // document.getElementById("male")
        // l=document.getElementById("female")
        if(male.checked){
        return male.value
        }
        if(female.checked) {
    return female.value
    }
}


function dob(birthdate){
    let data= birthdate.split('-').reverse().join('-');
    // console.log(data)
    return data
    } 
    function gender(){
        let male=document.getElementById("male")
        let female=document.getElementById("female")
        if(male.checked){
        return male.value
        }else {
    return female.value
    }
}

}


// appent the data in table

 
function createTableRow(data,id) {
    // Create a new row  

    var newRow = document.createElement('tr');
   
    console.log(data)
    // Populate the row with data
    // Get the number of existing rows
    var tableBody = document.getElementById('table_body');
    var rowCount = tableBody.rows.length;
    console.log();

    newRow.innerHTML = 
    `

     <th scope="row">#${zero(rowCount + 1)}</th>

    <td><img src="http://localhost:3000/employees/${id}/avatar" class="rounded-circle me-2"height=30 width=30>
    ${data.salutation} ${data.firstName} ${data.lastName} </td>
    <td>${data.email} </td>
    <td>${data.phone}</td>
    <td>${data.gender}</td>
    <td>${data.dob}</td>
    <td>${data.country}</td>
    <td>
    <span  class="dots">

    <button onclick="optionbox(this.nextElementSibling)" class="dots-button "> <i class="fa-solid fa-ellipsis"></i></button>
      <div  id="subbox${id}" class="subdots" >
      <a href="details.html?id=${id}"> <i class="material-symbols-outlined">
      visibility
      </i><p>View Details</p></a>
          <button onclick="editemployee('${id}'),modaal(),reload()" id="editemployeebtn"><i class="fa-solid fa-pen"></i>
              
              <p>Edit </p></button>
          <button onclick="deleteemployee('${id}'),modaal()" id="deleteemployeebtn"><i class="material-symbols-outlined">
              delete
              </i><p>Delete </p></button>
      </div>
   
  </span>

</td>
    `;
    // if(validateform()){
  
   var firstRow = document.getElementById('table_body').querySelector('tr:first-child');
    // Insert the new row before the first row
    if (firstRow) {
        // employeelist+1
        firstRow.parentNode.insertBefore(newRow, firstRow);
        

    } else {
        // If there are no existing rows, just append the new row
        document.getElementById('table_body').appendChild(newRow);
    }
    // }
// pagination()

// updateSerialNumbers()
    
    // modal()
 
}
function updateSerialNumbers() {
    var tableBody = document.getElementById('table_body');
    var rows = tableBody.rows;
    for (var i = 0; i < rows.length; i++) {
        rows[i].getElementsByTagName('th')[0].textContent = '#' + zero(i + 1);
    }
}
function zero(num) {
    return (num < 10 ? '0' : '') + num;
}




  function addemployee() {
   

 
    fetch("http://localhost:3000/employees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formdata())
    })
    .then(response => response.json()) // Assuming response is JSON
    .then(data=> {
       console.log(data.message);
      if(data.message){
        uplodavatar(data.id,profileimg)
            //   modaal()
        const newEmp = formdata();
      validateform()
      createTableRow(newEmp , data.id);
      closeup()
      updateSerialNumbers();
      }
    })
    .catch(error => {
      console.error('Error:', error);
      // Handle errors if any
    });
validateform()
  }
function dob(birthdate){
    let data= birthdate.split('-').reverse().join('-');
    // console.log(data)
    return data
    } 
    function gender(){
        let male=document.getElementById("male")
        let female=document.getElementById("female")
        if(male.checked){
        return male.value
        }else {
    return female.value
    }
}
    
// ***********edit form**********
let addemployeeform=document.getElementById("addemployeeform")
let editEmployeeForm=document.getElementById("editEmployeeForm")
let editemployeebtn=document.getElementById("editemployeebtn")
let editemployeeid
let editIndex;
 async function editemployee (editid,index){
    editIndex=index
    // detailempty()
    addemployeeform.style.display="none"
    Addemployee.style.display="none"
    updatedbtn.style.display="block"
    EmployeeForm.style.display="block"
    overlay.style.display="block"
    editemployeeid=editid
    refresh()
    reload()
    // 
   await fetch('http://localhost:3000/employees/'+editemployeeid)
    .then((data)=>{
        return data.json()     
    })
    
    .then((employee)=>{
 
    salutation.value=employee.salutation
    firstname.value=employee.firstName
    lastname.value=employee.lastName
    username.value=employee.username
    password.value=employee. password
    emailaddress.value=employee.email
    number.value=employee.phone
    // Gender.valu=employee.gender
    Birth.value=dob(employee.dob)
    qualification.value=employee.qualifications
    address.value=employee. address
    country.value=employee.country
    state.value=employee.state
    city.value=employee.city
    employee.gender==="male"?document.getElementById("male").checked=true:document.getElementById("female").checked=true;
    getimge.src="http://localhost:3000/employees/"+ editid + "/avatar";
    console.log(getimge);
    })
  
    editEmployeeForm.style.display="block"

 }
// //**************/ deletmethod**************
let newId;

let deleteform = document.getElementById("deleteform");
let DELETEEMPLOYEEbtn = document.getElementById("DELETEEMPLOYEEbtn");

function deleteemployee(deleteid,index) {
    console.log(`index no : ${index}`);
    // document.getElementById("table_body").deleteRow(index);
    // deleteid = deleteid;
    deleteform.style.display = 'block';
    overlay.style.display = "block";

    DELETEEMPLOYEEbtn.addEventListener("click", function () {
            // employeeperpage(index)
        fetch('http://localhost:3000/employees/' + deleteid, {
            method: "DELETE",
        })
        .then((response) => {
            if (response.ok) {
                console.log(deleteid);
              deletesuccessfully()
              document.getElementById("table_body").deleteRow(index);
        
              spliceAllEmp(deleteid);
              updateSerialNumbers()
            console.log(row);
            } 
          
        })
        .catch(error => {
            console.error('Error:', error);
        });

        // Reset form and overlay display
        deleteform.style.display = 'none';
        overlay.style.display = "none";
    });
}
let revdata;
//
let firstpage=document.getElementById("firstpages")
// // ***************pagination*******************
// // defultemployees


function firstpages(){
    fetch('http://localhost:3000/employees'). then((data)=>{
    return data.json();//convert to an object
}).then((TableDatas)=>{
    
    pagination(TableDatas.reverse())
})

}
function finalpages(){

    
    let emptyarray=[];
    // console.log(TableDatas);

     start =TableDatas.length - employeelist.value
     let stop =(start + parseInt(employeelist.value))
     let totalpage=Math.ceil(TableDatas.length/employeelist.value)

     for(var i = 1 ; i <= totalpage ; i++) {
       
        if( document.getElementById(`pages${i}`).classList.contains('active')){
        
            document.getElementById(`pages${i}`).classList.remove('active')
            }
                 
     }
     
     document.getElementById(`pages${totalpage}`).classList.add('active')
     for ( let i=start;i<stop&& i<TableDatas.length;i++){
    
        emptyarray.push(TableDatas[i])
     }
      console.log(emptyarray);
      display(emptyarray)
     

}
function nextpage(){
        // console.log(`pages${i+1}`)
    let totalpage=Math.ceil(TableDatas.length/employeelist.value)
    for(var i = 1 ; i <= totalpage ; i++) {
       
        if( document.getElementById(`pages${i}`).classList.contains('active')){

            ( document.getElementById(`pages${i+1}`).classList.add('active'))
            document.getElementById(`pages${i}`).classList.remove('active')
               employeeperpage(i+1)
            break;
            }         
     } 
}
function prebtn(){
    let totalpage=Math.ceil(TableDatas.length/employeelist.value)
    for(var i = 1 ; i <= totalpage ; i++) {
       
        if( document.getElementById(`pages${i}`).classList.contains('active')){

            ( document.getElementById(`pages${i-1}`).classList.add('active'))
            document.getElementById(`pages${i}`).classList.remove('active')
               employeeperpage(i-1)
            break;
            }         
     } 

}

// // ************photoupload*******
let Adduploading=document.getElementById("upload")
let imageFile=document.getElementById("uploading")
let inputfile=document.getElementById("inputfile")
let getimge=document.getElementById("getimg")
let profileimg;
Adduploading.addEventListener('change',function(){
    profileimg=Adduploading.files[0]
    console.log(profileimg);
if(profileimg){
    // inputfile.style.display="none"
    addemployeeform.style.display="none"
    editEmployeeForm.style.display="block"
    ediEmployeeheading.innerHTML="Add Employee"
    // imagechange()


}
getimge.src=URL.createObjectURL(profileimg);
//         console.log(file);
})

imageFile.addEventListener('change',function(){
    profileimg=imageFile.files[0]
    console.log(profileimg);
    getimge.src=URL.createObjectURL(profileimg);
    // imagechange()
    
})

// *****************imageuplodingfunction PUT**********
// function editemployee (editid,index){
function update(){


    //************ */ editdatadisplay In tabletry...****************

    //************ */End editdatadisplay In tabletry...****************

    if(profileimg){
        uplodavatar(editemployeeid, profileimg)
        imagechange()
   
    }
    fetch('http://localhost:3000/employees/'+editemployeeid,{
        method:"PUT",
        headers:{
"Content-Type":"application/json"
        },
        body:JSON.stringify(formdata()),
      
    })
    .then((Response)=>{
        if(Response.ok){
            validateform()
            EmployeeForm.style.display="none"
            overlay.style.display="none"
//    let updata=formdata()
//             pagination(updata)
            firstpages()
    
            editsuccessfully() 
validateform()
            // 
//
// 
        }
        
       console.log(Response);
       uplodavatar(Response.id,profileimg)
      
    
    })

    validateform()
    
    
}
// // *****************imageuplodingfunction POST**********
function uplodavatar(id,image){
    let avatardata=new FormData()
    avatardata.append("avatar",image)
    try{
      fetch('http://localhost:3000/employees/'+id+"/avatar",{
        method:"POST",
        body:avatardata

    })
    }
    catch(error){
        console.log(error);
    }
} 
// // *************validation*******************
let FirstNameError=document.getElementById("FirstNameError")
let LastNameError=document.getElementById("LastNameError")
let UsernameError=document.getElementById("UsernameError")
let PasswordError=document.getElementById("PasswordError")
let emailError=document.getElementById("emailError")
let NumberError=document.getElementById("NumberError")
let BirthError=document.getElementById("BirthError")
let QualificationError=document.getElementById("QualificationError")
let AddressError=document.getElementById("AddressError")
let CityError=document.getElementById("CityError")
let PinZipErrors=document.getElementById("PinZipError")
let GenderError=document.getElementById("GenderError")
let SalutationError=document.getElementById("SalutationError")
let CountryError=document.getElementById("CountryError")
let StateError=document.getElementById("StateError")
function validateSalutation(){
    let salutation=document.getElementById("salutation").value
    if (salutation==""){
        // salutation.ClassList.add(active)
  SalutationError.innerHTML="Salutation is required "
        document.getElementById("salutation").style.borderColor = "red";
        SalutationError.innerHTML="Salutation is required "
        // salutation.ClassList.add(active)
        console.log(SalutationError);
        return false;
       
    }else{
        SalutationError.innerHTML=""
    }
    SalutationError.innerHTML=" "
    document.getElementById("salutation").style.borderColor = "unset";
    // return true;
}
function validateCountry(){
    let country=document.getElementById("country").value
    console.log(country);
    if (country==""){
        CountryError.innerHTML="Country is required "
        document.getElementById("country").style.borderColor = "red";
        console.log(SalutationError);
        return false;
    
    }
    CountryError.innerHTML=" "
    document.getElementById("country").style.borderColor = "unset";
    // return true;
}
function validateState(){
    let state=document.getElementById("state").value
    console.log(state);
    if (state==""){
        StateError.innerHTML="State is required "
        document.getElementById("state").style.borderColor = "red";
        console.log(SalutationError);
        return false;
    
    }
    StateError.innerHTML=" "
    document.getElementById("state").style.borderColor = "unset";
    
    // return true;

}
function validateFirstName(){
    let firstname=document.getElementById("firstname").value
    if (firstname.length==0){
        document.getElementById("firstname").style.borderColor = "red"; 

      FirstNameError.innerHTML="FirstName is required "
        return false;

    }
    FirstNameError.innerHTML=""
    document.getElementById("firstname").style.borderColor = "unset";

}

function validateLastName(){
    let lastname=document.getElementById("lastname").value
    if (lastname.length==0){
        LastNameError.innerHTML="LastName is required "
        document.getElementById("lastname").style.borderColor = "red";
        return false;
    }
    LastNameError.innerHTML=""
    // return true;
    document.getElementById("lastname").style.borderColor = "unset";
}
function validatePassword(){
    // let password=document.getElementById("password").value
    let password=document.getElementById("password").value
    
    if(password.length==0){
        PasswordError.innerHTML="password is required" 
        document.getElementById("password").style.borderColor = "red";
        return false;
    }

    if(password.length<=6){
        console.log(password.length)
        PasswordError.innerHTML="password atleast 6 charactor" 
        document.getElementById("password").style.borderColor = "red";
        return false;
    }
    PasswordError.innerHTML=" "
    document.getElementById("password").style.borderColor = "unset";
    // return true;
}
function validateEmail(){
    let emailaddress=document.getElementById("emailaddress").value
     let email= /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

     if(emailaddress.length==0){ 
        emailError.innerHTML="Email is required" 
        document.getElementById("emailaddress").style.borderColor = "red";
    
        return false;
    }
    
    if(emailaddress.match(email)){
       
        emailError.innerHTML="" 
        document.getElementById("emailaddress").style.borderColor = "unset";
        return false;
    }

    document.getElementById("emailaddress").style.borderColor = "red";
    emailError.innerHTML=" Invalid email address! " 
    // return true;
}
function validatepin(){
    
    let pins=document.getElementById("pin").value
    if (pins.length==0){
        PinZipErrors.innerHTML="Pin/Zip is required "
        document.getElementById("pin").style.borderColor = "red";
        return false;
    
    } 
    if(pins.length>0){
        PinZipErrors.innerHTML=""
 let pin=document.getElementById("pin")
 pin.style.borderColor="none"

        document.getElementById("pin").style.borderColor = "";
    // /return false;  
}
}

function validateBirth(){
    let Birth= document.getElementById("Birth").value

    if(Birth.length==0){
        BirthError.innerHTML="Date of Birth is required" 
        document.getElementById("Birth").style.borderColor = "red";
        return false;
    }
    BirthError.innerHTML=""
    document.getElementById("Birth").style.borderColor = "unset";
    // return true;
}
    function validateQualification(){
       
        let qualification=document.getElementById("qualification").value
       
   
        if(qualification.length==0){ 

            QualificationError.innerHTML="qualification is required"
            // QualificationError.style.borderColor=" 1px solid red"
            document.getElementById("qualification").style.borderColor = "red";
            return false;
        }
         QualificationError.innerHTML=" " 
         document.getElementById("qualification").style.borderColor = "unset";
        // return true;
    }

function validateNumber(){
    let number=document.getElementById("number").value
    
    if(number.length==0){ 
        NumberError.innerHTML=" Phone is required" 
        document.getElementById("number").style.borderColor = "red";
    
        return false;
    }
     
    if(number.length>10||number.length<10){ 
        NumberError.innerHTML="Invalid phone number format" 
        document.getElementById("number").style.borderColor = "red";
    
        return false;
    }
      
    NumberError.innerHTML=" "
    document.getElementById("number").style.borderColor = "unset";
}
function validateAddress(){
    let address=document.getElementById("address").value

  
    if(address.length==0){ 
        AddressError.innerHTML=" Address is required" 
        document.getElementById("address").style.borderColor = "red";
        return false;

    }
    AddressError.innerHTML=" "
    document.getElementById("address").style.borderColor = "unset";
    // return true;

}
function validateCity(){
    let city=document.getElementById("city").value
    if(city.length==0){ 
        CityError.innerHTML="City is required" 
        document.getElementById("city").style.borderColor = "red";
        return false;

    }
    CityError.innerHTML=" "
    // return true;
    document.getElementById("city").style.borderColor = "unset";
}
function validateGender(){
    let male =document.getElementById("male")
    let female =document.getElementById("female")
console.log(male);
    if(male.checked==false && female.checked==false ){ 
    GenderError.innerHTML="Gender is required" 
    
    return false;

}
    GenderError.innerHTML="" 

    return true;
function validatepin(){
    
    let pins=document.getElementById("pin").value
    if (pins.length==0){
        PinZipErrors.innerHTML="Pin/Zip is required "
        document.getElementById("pin").style.borderColor = "red";
        return false;
    
    } 
    if(pins.length>0){
        PinZipErrors.innerHTML=""
 let pin=document.getElementById("pin")
 pin.style.borderColor="none"

        document.getElementById("pin").style.borderColor = "";
   
}
}

}
function validateUsername(){
    let username=document.getElementById("username").value
    if(username.length==0){
        UsernameError.innerHTML="Username is requred "
        document.getElementById("username").style.borderColor = "red";
        return false  
    }
    UsernameError.innerHTML=" "
    document.getElementById("username").style.borderColor = "unset";
    // return true
}
function validateform(){
    if((!validateCity())&&(! validateFirstName())&&(!validateState())&&(!validatepin())&&(!validateCountry())&&(!validateAddress())&&(!validateQualification())&&(!validateGender())&&(!validateBirth())&&(!validateNumber())&&(!validateEmail())&&(!validatePassword())&&(!validateUsername())&&( !validateLastName())&&(! validateSalutation())){
    return false
    }
    if( ( !validateSalutation())&&( !validateFirstName())&&(!validateUsername())&&(!validatePassword())&&(!validateEmail())&&!validateNumber()&&(!validateBirth())&&(!validateQualification())&&(!validateAddress())&&(!validateCountry())&&(!validateState())&&(!validateCity())&&(validateGender())&&(!validateLastName())&&(!validatepin()))
        return false;
       
}
// search working
let editpopup=document.getElementById("popup")


function editsuccessfully(){
    heading.innerHTML="Employee Edited  Succesfully!!"
    let editpopup=document.getElementById("popup")
    editpopup.style.display="block"
    EmployeeForm.style.display="none"
}
let heading=document.getElementById("heading")
  function Addsuccessfully(){
    let editpopup=document.getElementById("popup")
    editpopup.style.display="block"
    EmployeeForm.style.display="none"
  heading.innerHTML="Add Employee Succesfully!!"
  }
  function deletesuccessfully(){
    let editpopup=document.getElementById("popup")
    editpopup.style.display="block"
    heading.innerHTML="Employee Deleted  Succesfully!!"
    deleteform.style.display="none"
}
function imagechange(){
    let editpopup=document.getElementById("popup")
    editpopup.style.display="block"
    heading.innerHTML="Image updated  Succesfully!!"
    EmployeeForm.style.display="none"
}
function refresh(){

    // addemployeeopn()
let salutation=document.getElementById("salutation").value=""
let firstname=document.getElementById("firstname").value=""
let lastname=document.getElementById("lastname").value=""
let username=document.getElementById("username").value=""
let password=document.getElementById("password").value=""
let emailaddress=document.getElementById("emailaddress").value=""
let number=document.getElementById("number").value=""
let Birth= document.getElementById("Birth").value=""
let qualification=document.getElementById("qualification").value=""
let address=document.getElementById("address").value=""
let country=document.getElementById("country").value=""
let state=document.getElementById("state").value=""
let city=document.getElementById("city").value=""
let pin=document.getElementById("pin").value=""
let Gender=document.getElementById("Gender").value=" "
// let male =document.getElementById("male").value=""
// let female =document.getElementById("female").value=""


}

function reload(){
document.getElementById("country").style.borderColor = " ";
document.getElementById("SalutationError").style.display="none"
document.getElementById("StateError").style.display="none"
document.getElementById("CountryError").style.display="none"
document.getElementById("firstname").style.borderColor = ""; 
document.getElementById("city").style.borderColor = "";
document.getElementById("username").style.borderColor = "";
 document.getElementById("city").style.borderColor = "";
    document.getElementById("number").style.borderColor = "";
    document.getElementById("address").style.borderColor = "";
    document.getElementById("qualification").style.borderColor = "";
    document.getElementById("Birth").style.borderColor = "";
    document.getElementById("emailaddress").style.borderColor = "";
    document.getElementById("password").style.borderColor = "";
    document.getElementById("lastname").style.borderColor = "";
    document.getElementById("firstname").style.borderColor = "";
    document.getElementById("city").style.borderColor = " ";
    document.getElementById("state").style.borderColor = "";
    document.getElementById("salutation").style.borderColor = "";
    document.getElementById("country").style.borderColor = "";
    document.getElementById("pin").style.borderColor = "";

    FirstNameError.innerHTML=""
    GenderError.innerHTML=" "
     LastNameError.innerHTML=" "
     UsernameError.innerHTML=" "
     PasswordError.innerHTML=" "
     emailError.innerHTML=" "
     NumberError.innerHTML=" "
     BirthError.innerHTML=" "
     QualificationError.innerHTML=" "
     AddressError.innerHTML=" "
     CityError.innerHTML=" "
     PinZipErrors.innerHTML=" "
     SalutationError.innerHTML=" "
     CountryError.innerHTML=" "
     StateError.innerHTML=" "
    //  validateform()
    }
// ******************search***************


function search() {
    start=0
    let newarray = [];
    let searchvalue = document.getElementById("search").value.toLowerCase();
    for (let i = 0; i < TableDatas.length; i++) {
        let firstname = TableDatas[i].firstName.toLowerCase();
        let emailaddress = TableDatas[i].email.toLowerCase();
        let lastname = TableDatas[i].lastName.toLowerCase();
        let number = TableDatas[i].phone.toString();

        // Corrected the condition to properly check if the filter exists in the strings
        if (firstname.includes(searchvalue) || 
            emailaddress.includes(searchvalue) || 
            lastname.includes(searchvalue) || 
            number.includes(searchvalue)) {
            newarray.push(TableDatas[i]);
        }
    } 
    pagination(newarray);
    // searching()
    if(TableDatas.length>6){
        let mainer=document.getElementById("mainer")
        mainer.style.height="100vh"
    }
    
    }

function spliceAllEmp(id) {

   
    for (let i = 0; i < revdata.length; i++) {
      
         let userId = revdata[i].id ;
         console.log(userId)
      
        if (userId.includes(id) ){
            revdata.splice(i, 1)
        }
    }
          updateSerialNumbers()

   
}





