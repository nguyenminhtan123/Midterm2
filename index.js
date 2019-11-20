var Students = [
    {   
        id: 1,
        name: "Tan",
        jsScore: 10,
        androidScore: 8,
        class: "PNV20A"
    },
    {
        id: 2,
        name: "Minh Tan",
        jsScore: 10,
        androidScore: 8,
        class: "PNV20B"
    },
    {
        id: 3,
        name: "Nguyen Minh Tan",
        jsScore: 10,
        androidScore: 8,
        class: "PNV20A"
    },
   
]

ListStudents = JSON.parse(localStorage.getItem ('items'));
if(ListStudents === null || ListStudents === undefined){
    localStorage.setItem('items', JSON.stringify(Students));
    ListStudents =JSON.parse(localStorage.getItem ('items'))
}


function generateStudentsHtml (student, index) {    
    var rankCondition=(parseInt(student.androidScore)+ parseInt(student.jsScore))/2;
    var rank="";
    var color="gray";
    if(rankCondition>8){
        rank="Very Good";
        color="#d9c707"
    }else if(rankCondition<=8 && rankCondition>7){
        rank="Good";
        color="#4e9403"
    }else{
        rank="Normal";
        
    }
    return `
    <tr>
        <th scope="row">${student.id}</th>
        
        <td>
            <input style="border-width:0px;border:none; type="text" id="${student.id}-name" value="${student.name}" readonly></td>
        <td>
            <input style="border-width:0px;border:none; type="text" id="${student.id}-name" value="${student.className}" readonly>
        </td>
        <td>
            <input style="border-width:0px;border:none; type="text" id="${student.id}-name" value="${student.jsScore}" readonly></td>
        </td>
        <td>
            <input style="border-width:0px;border:none; type="text" id="${student.id}-name" value="${student.androidScore}" readonly></td>
        </td>
        <td>
            <input style="border-width:0px;border:none; type="text" id="${student.id}-name" value="${(parseInt(student.androidScore)+ parseInt(student.jsScore))/2}" readonly></td>
        </td>
        <td style="background-color:${color}">
            <input style="background-color:${color};border-width:0px;border:none;" type="text" id="${student.id}-name" value="${rank}" readonly></td>
        </td>
        <td>
            <a class="" onClick="editStudent(event, '${student.id}')" ><i class="fa fa-pencil edit" id="edit${student.id}"  aria-hidden="true"></i><a>
            <a onclick = "editStudentClick(${student.id})"><i class="fa fa-floppy-o save" aria-hidden="true" id="save${student.id}" hidden ></i></a>
            <a class="" onClick="deleteStudent(event, '${student.id}')" ><i class="fa fa-trash-o" id="delete"  aria-hidden="true"></i></a>
            
        <td>
    </tr>
    `;
}

function loadListStudent(data){
    let studentHtml = data.reduce((html, Student, classes) => html += this.generateStudentsHtml(Student, classes), "");
    document.getElementById('studentList').innerHTML = studentHtml;
}


function addStudentClick()  {
    let idStudent = Math.floor(Math.random() * 200);
    let nameStudent = document.getElementById("studentName").value;
    let classStudent = document.getElementById("className").value;
    let jsStudentScore = document.getElementById("jsScore").value;
    let androidStudentScore = document.getElementById("androidScore").value;

    saveNewStudent(idStudent, nameStudent, jsStudentScore, androidStudentScore ,classStudent);
}

function showAddNewStudentForm ()  {
    document.getElementById("addStudent").style.display="block";
}

function saveNewStudent(id, name, jsScore, androidScore,className) {
    
    let newStudent = {
        id: id,
        name,
        jsScore,
        androidScore,
        className
    }
    if(name===""){
        document.getElementById("error").style.display="block";
    }
    if(jsScore<0||jsScore>10){
        document.getElementById("error1").style.display="block";
    }
    if(androidScore<0||androidScore>10){
        document.getElementById("error2").style.display="block";
    }
    if(androidScore>=0 && androidScore<=10 && jsScore>=0 && jsScore<=10 && name!==""){
    ListStudents.push(newStudent);
    localStorage.setItem('items', JSON.stringify(ListStudents));
    this.loadListStudent(ListStudents);
    document.getElementById("studentName").value = "";
    document.getElementById("className").value = "PNV20A";
    document.getElementById("jsScore").value = "";
    document.getElementById("androidScore").value="";
    document.getElementById("addStudent").style.display="none";
    document.getElementById("error").style.display="none";
    document.getElementById("error1").style.display="none";
    document.getElementById("error2").style.display="none";
    }
   
}


function deleteStudent(event,id)  {
    var result = confirm("Are you sure to delete?");
    if(result){
        let index = ListStudents.findIndex(k=>k.id==id)
        console.log(index)
        ListStudents.splice(index, 1);
        localStorage.setItem('items', JSON.stringify(ListStudents));
        this.loadListStudent(ListStudents);
    }
}
function sortStudent(){
    localStorage.setItem('items', JSON.stringify(ListStudents.sort(compare)));
    this.loadListStudent(ListStudents);
}

function compare(a, b) {
    const name1 = a.name.toUpperCase();
    const name2 = b.name.toUpperCase();
    
    let comparison = 0;
    if (name1 > name2) {
      comparison = 1;
    } else if (name1 < name2) {
      comparison = -1;
    }
    return comparison;
    }

  

loadListStudent(ListStudents);
