//const btn =document.querySelector('.btn');
const myForm = document.querySelector("#my-form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const msg = document.querySelector(".msg");
const userList = document.querySelector("#users");
let editUserId = null;

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

  const name = nameInput.value;
  const email = emailInput.value;
  const phone = phoneInput.value;

  if (name === "" || email === "" || phone === "") {
    msg.textContent = "Please fill in all fields";
    return;
  }

  // If an edit operation is ongoing, perform a PUT request
  if (editUserId) {
    const editedUser = {
      name,
      email,
      phone,
    };

    axios.put(`https://crudcrud.com/api/41899045d2ad465b9b46cb8f5f230f86/appointmentData/${editUserId}`, editedUser)
      .then((response) => {
        console.log("User updated:", response.data);
        clearForm();
        fetchAndDisplayUsers(); // Update the user list on the screen
      })
      .catch((error) => {
        console.error(error);
      });

    editUserId = null; // Reset the editUserId after the edit operation
    return;
  }

  // If not in edit mode, perform a POST request
  const newUser = {
    name,
    email,
    phone,
  };

  axios.post("https://crudcrud.com/api/41899045d2ad465b9b46cb8f5f230f86/appointmentData", newUser)
    .then((response) => {
      console.log("User added:", response.data);
      clearForm();
      fetchAndDisplayUsers(); // Update the user list on the screen
    })
    .catch((error) => {
      console.error(error);
    });
}

function populateEditForm(user) {
  nameInput.value = user.name;
  emailInput.value = user.email;
  phoneInput.value = user.phone;
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

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.classList.add("edit-btn");
  editButton.onclick = () => {
    populateEditForm(obj); // Call the function to populate the form for editing
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
