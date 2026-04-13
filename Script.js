let students=[]

function addStudent()

{

let name=document.getElementById("name").value
let roll=document.getElementById("roll").value
let semester=document.getElementById("semester").value
let marks=parseInt(document.getElementById("marks").value)

let percent=(marks/500)*100

let grade="C"
if(percent>=80) grade="A"
else if(percent>=60) grade="B"

let result=percent>=40?"Pass":"Fail"

let student={
name,roll,semester,marks,percent:percent.toFixed(2),grade,result
}

students.push(student)

displayStudents()
updateStats()

}

function displayStudents(){

let table=document.getElementById("table")

table.innerHTML=`
<tr>
<th>Name</th>
<th>Roll</th>
<th>Marks</th>
<th>%</th>
<th>Grade</th>
<th>Result</th>
<th>Semester</th>
<th>Action</th>
</tr>
`

students.forEach((s,index)=>{

let row=table.insertRow()

row.innerHTML=`
<td>${s.name}</td>
<td>${s.roll}</td>
<td>${s.marks}</td>
<td>${s.percent}</td>
<td>${s.grade}</td>
<td>${s.result}</td>
<td>${s.semester}</td>

<td>
<button onclick="editStudent(${index})">Edit</button>
<button onclick="deleteStudent(${index})">Delete</button>
</td>
`

})

}

function deleteStudent(i){
students.splice(i,1)
displayStudents()
updateStats()
}

function editStudent(i){

let s=students[i]

document.getElementById("name").value=s.name
document.getElementById("roll").value=s.roll
document.getElementById("semester").value=s.semester
document.getElementById("marks").value=s.marks

students.splice(i,1)

displayStudents()
updateStats()

}

function updateStats(){

document.getElementById("total").innerText=students.length

let pass=students.filter(s=>s.result=="Pass").length
let fail=students.filter(s=>s.result=="Fail").length

document.getElementById("pass").innerText=pass
document.getElementById("fail").innerText=fail

if(students.length>0){

let topper=students.reduce((a,b)=>a.marks>b.marks?a:b)

document.getElementById("topper").innerText=topper.name

}

}

function searchStudent(){

let input=document.getElementById("search").value.toLowerCase()

let rows=document.querySelectorAll("#table tr")

rows.forEach((row,i)=>{

if(i==0)return

let name=row.cells[0].innerText.toLowerCase()

row.style.display=name.includes(input)?"":"none"

})

}

function exportExcel(){

let data="Name,Roll,Marks,Percent,Grade,Result\n"

students.forEach(s=>{
data+=`${s.name},${s.roll},${s.marks},${s.percent},${s.grade},${s.result}\n`
})

let blob=new Blob([data])
let a=document.createElement("a")

a.href=URL.createObjectURL(blob)
a.download="students.csv"

a.click()

}

function exportPDF(){
window.print()
}

function showGraph(){

let names=students.map(s=>s.name)
let marks=students.map(s=>s.marks)

new Chart(document.getElementById("chart"),{

type:"bar",

data:{
labels:names,
datasets:[{
label:"Marks",
data:marks
}]
}

})

}
