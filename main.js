//const btn =document.querySelector('.btn');
const myForm = document.querySelector("#my-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector('#phone')
const msg = document.querySelector(".msg");
const userList = document.querySelector("#users");
//const body = document.querySelector('body');

// btn.addEventListener('click', (e) => {
// e.preventDefault();
// myForm.style.background = '#789';
// body.classList.add('bg-dark');
// });

// btn.addEventListener('mouseover',(e) => {
// e.preventDefault();
// myForm.style.background = '#ccc';
// body.classList.add('bg-dark');
// });

// btn.addEventListener('mouseout', (e) => {
// e.preventDefault();
// myForm.style.background = '#fff789';
// body.classList.add('bg-dark');
// });

myForm.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();

  // Get the input values
  const name = nameInput.value;
  const email = emailInput.value;
  const phone = phoneInput.value;

  // Validate the input
  if (name === "" || email === "" || phone === "") {
    msg.textContent = "Please fill in all fields";
    return;
  }

  // Clear the input fields
  nameInput.value = "";
  emailInput.value = "";
  phoneInput.value="";

  // inputvalue stores in localStorage
  //localStorage.setItem("name", name);
  //localStorage.setItem("email", email);

  //Store input in an object
  const obj = {
    name,
    email,
    phone
  }

  // Retrieve existing user details from localStorage
  let userDetails = JSON.parse(localStorage.getItem("userDetails")) || [];

  // Add the new user object to the array
  userDetails.push(obj);

  //store object as a string in local storage
  localStorage.setItem('userDetails',JSON.stringify(userDetails)); 

  // Display a success message
  msg.textContent = "User added successfully";

  // Render the updated user list
  showUserOnScreen(obj);
}

function showUserOnScreen(obj) {
  const parentElem = document.getElementById('users')
  const childElem = document.createElement('li')
  childElem.textContent = obj.name + ' - ' + obj.email + ' - ' + obj.phone;

  const deleteButton = document.createElement("input");
  deleteButton.type = "button";
  deleteButton.value = "Delete"
  deleteButton.onclick = () => {
      localStorage.removeItem(obj.email)
      parentElem.removeChild(childElem)
  }
  childElem.appendChild(deleteButton)
  parentElem.appendChild(childElem)
  
}

