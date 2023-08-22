//const btn =document.querySelector('.btn');
const myForm = document.querySelector("#my-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
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
  phoneInput.value = "";

  // inputvalue stores in localStorage
  //localStorage.setItem("name", name);
  //localStorage.setItem("email", email);

  //Store input in an object
  const obj = {
    name,
    email,
    phone,
  };

  axios.post("https://crudcrud.com/api/41899045d2ad465b9b46cb8f5f230f86/appointmentData", obj)
  .then((respone)=> {
      console.log(respone.data);
      showUserOnScreen(obj);
  })
  .catch((err)=> {
    console.log(err);
  })

  // Retrieve existing user details from localStorage
  //let userDetails = JSON.parse(localStorage.getItem("userDetails")) || [];

  // Add the new user object to the array
  //userDetails.push(obj);

  //store object as a string in local storage
  //localStorage.setItem("userDetails", JSON.stringify(userDetails));

  // Display a success message
  //msg.textContent = "User added successfully";

  // Render the updated user list
  //showUserOnScreen(obj);
}

function showUserOnScreen(obj) {
  const parentElem = document.getElementById("users");
  const childElem = document.createElement("li");
  childElem.textContent = obj.name + " - " + obj.email + " - " + obj.phone;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.classList.add("delete-btn");
  deleteButton.onclick = () => {
    deleteUser(obj._id); // Call the function to delete the user
    parentElem.removeChild(childElem); // Remove the user from the screen
  };

  const editButton = document.createElement("input");
  editButton.type = "button";
  editButton.value = "Edit";
  editButton.onclick = () => {
    localStorage.removeItem(obj.email);
    parentElem.removeChild(childElem);
    document.getElementById('name').value = obj.name;
    document.getElementById('email').value = obj.email;
    document.getElementById('phone').value = obj.phone;
  };

  childElem.appendChild(deleteButton);
  childElem.appendChild(editButton);
  parentElem.appendChild(childElem);
}

function fetchAndDisplayUsers() {
  axios.get("https://crudcrud.com/api/41899045d2ad465b9b46cb8f5f230f86/appointmentData")
    .then((response) => {
      const users = response.data;
      users.forEach((user) => {
        showUserOnScreen(user); // Display each user on the screen
      });
    })
    .catch((error) => {
      console.error(error);
    });
}


function deleteUser(userId) {
  axios.delete(`https://crudcrud.com/api/41899045d2ad465b9b46cb8f5f230f86/appointmentData/${userId}`)
    .then((response) => {
      console.log("User deleted:", userId);
    })
    .catch((error) => {
      console.error(error);
    });
}

window.addEventListener("load", fetchAndDisplayUsers);
