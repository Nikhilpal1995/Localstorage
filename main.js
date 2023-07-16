//const btn =document.querySelector('.btn');
const myForm = document.querySelector("#my-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
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

  // Validate the input
  if (name === "" || email === "") {
    msg.textContent = "Please fill in all fields";
    return;
  }

  // Clear the input fields
  nameInput.value = "";
  emailInput.value = "";

  // inputvalue stores in localStorage
  localStorage.setItem("name", name);
  localStorage.setItem("email", email);

  //Store input in an object
  const obj = {
    name,
    email
  }

  //store object as a string in local storage
  localStorage.setItem('userDetails',JSON.stringify(obj)); 

  // Display a success message
  msg.textContent = "User added successfully";
}
