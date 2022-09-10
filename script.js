//const api_url = "<heroku_app_url>"
const api_url = "https://bagdeapp.herokuapp.com/user"
function loadData(records = []) {

console.log(records);
    var table_data = "";
    records.forEach((x) => {
        console.log(x);
        table_data += `<tr>`;
        table_data += `<td>${x.name}</td>`;
        table_data += `<td>${x.age}</td>`;
        table_data += `<td>${x.city}</td>`;
        table_data += `<td>`;
        table_data += `<a href="edit.html?id=${x._id}"><button class="btn btn-primary">Edit</button></a>`;
        table_data += '&nbsp;&nbsp;';
        table_data += `<button class="btn btn-danger" onclick=deleteData('${x._id}')>Delete</button>`;
        table_data += `</td>`;
        table_data += `</tr>`;
    });

//console.log(table_data);
document.getElementById("tbody").innerHTML = table_data;
}
function getData() {
fetch(api_url)
.then((response) => response.json())
.then((data) => {
console.table(data);
loadData(data);
});
}
function getDataById(id) {
fetch(`${api_url}/${id}`)
.then((response) => response.json())
.then((data) => {
console.log(data);
document.getElementById("id").value = data._id;
document.getElementById("name").value = data.name;
document.getElementById("age").value = data.age;
document.getElementById("city").value = data.city;
})
}
function postData() {
var name = document.getElementById("name").value;
var age = document.getElementById("age").value;
var city = document.getElementById("city").value;
data = {name: name, age: age, city: city};
fetch(api_url, {
method: "POST",
headers: {
'Accept': 'application/json',
'Content-Type': 'application/json'
},
body: JSON.stringify(data)
})
.then((response) => response.json())
.then((data) => {
console.log(data);
window.location.href = "index.html";
})
}
function putData() {
var _id = document.getElementById("id").value;
var name = document.getElementById("name").value;
var age = document.getElementById("age").value;
var city = document.getElementById("city").value;
data = {_id: _id, name: name, age: age, city: city};
fetch(api_url, {
method: "PUT",
headers: {
'Accept': 'application/json',
'Content-Type': 'application/json'
},
body: JSON.stringify(data)
})
.then((response) => response.json())
.then((data) => {
console.table(data);
window.location.href = "index.html";
})
}

data={name:name, age:age, city:city};
console.log(data)
function deleteData(id) {
alert('_id value: ${id}');
user_input = confirm("Are you sure you want to delete this record?");
if(user_input) {
fetch(api_url, {
method: "DELETE",
headers: {
'Accept': 'application/json',
'Content-Type': 'application/json'
},
body: JSON.stringify({"_id": id})
})
.then((response) => response.json())
.then((data) => {
console.log(data);
window.location.reload();
})
}
}