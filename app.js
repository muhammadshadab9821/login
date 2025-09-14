// ================= Signup =================
function signup() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let age = document.getElementById("age").value;
  let phone = document.getElementById("phone").value;
  let password = document.getElementById("password").value;

  if (name && email && age && phone && password) {
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // check if email already exists
    let existingUser = users.find(u => u.email === email);

    if (existingUser) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "User already exists with this email!"
      });
    } else {
      let user = { name, email, age, phone, password };
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));

      Swal.fire({
        icon: "success",
        title: "Signup Successful!",
        text: "You can now login."
      }).then(() => {
        window.location.href = "login.html";
      });
    }
  } else {
    Swal.fire({
      icon: "warning",
      title: "Missing Fields",
      text: "Please fill all fields."
    });
  }
}


// ✅ Signup page secure check
if (window.location.pathname.includes("signup.html")) {
  if (localStorage.getItem("isLoggedIn") === "true") {
    Swal.fire({
      icon: "info",
      title: "Already Logged In",
      text: "You cannot signup while logged in."
    }).then(() => {
      window.location.href = "home.html";
    });
  }
}

// ================= Login =================
function login() {
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let validUser = users.find(u => u.email === email && u.password === password);

  if (validUser) {
    localStorage.setItem("isLoggedIn", "true");
    Swal.fire({
      icon: "success",
      title: "Login Successful!",
      text: "Welcome " + validUser.name
    }).then(() => {
      window.location.href = "home.html";
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: "Invalid email or password."
    });
  }
}

// ✅ Login page secure check
if (window.location.pathname.includes("login.html")) {
  if (localStorage.getItem("isLoggedIn") === "true") {
    Swal.fire({
      icon: "info",
      title: "Already Logged In",
      text: "You are already logged in."
    }).then(() => {
      window.location.href = "home.html";
    });
  }
}

// ================= Home =================
if (window.location.pathname.includes("home.html")) {
  if (localStorage.getItem("isLoggedIn") !== "true") {
    Swal.fire({
      icon: "error",
      title: "Access Denied",
      text: "Please login first!"
    }).then(() => {
      window.location.href = "login.html";
    });
  }
}

// ✅ Logout
function logout() {
  localStorage.removeItem("isLoggedIn");
  Swal.fire({
    icon: "success",
    title: "Logged Out",
    text: "You have been logged out successfully!"
  }).then(() => {
    window.location.href = "login.html";
  });
}

let editIndex = null;

    // Dummy data (localStorage se bhi aa sakta hai)
   
    function renderTable() {
       let users = JSON.parse(localStorage.getItem("users")) || [];
  const tbody = document.getElementById("userTable");
  tbody.innerHTML = "";

  users.forEach((user, index) => {
    const row = `
      <tr>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.age}</td>
        <td>${user.phone}</td>
        <td>
          <button class="edit" onclick="editUser(${index})">Edit</button>
          <button class="delete" onclick="deleteUser(${index})">Delete</button>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });

  localStorage.setItem("users", JSON.stringify(users));
}


    function editUser(index) {
      let users = JSON.parse(localStorage.getItem("users")) || [];
      editIndex = index;
      document.getElementById("editName").value = users[index].name;
      document.getElementById("editEmail").value = users[index].email;
      document.getElementById("editAge").value = users[index].age;
      document.getElementById("editForm").style.display = "block";
      console.log(index);
      
    }

    function updateUser() {
       let users = JSON.parse(localStorage.getItem("users")) || [];
      users[editIndex].name = document.getElementById("editName").value;
      users[editIndex].email = document.getElementById("editEmail").value;
      users[editIndex].age = document.getElementById("editAge").value;

      localStorage.setItem("users", JSON.stringify(users));
      renderTable();

      document.getElementById("editForm").style.display = "none";
    }

    function deleteUser(index) {
       let users = JSON.parse(localStorage.getItem("users")) || [];
  Swal.fire({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this user!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      users.splice(index, 1); // index wale user ko remove karo
      localStorage.setItem("users", JSON.stringify(users));
      renderTable(); // table refresh

      Swal.fire(
        "Deleted!",
        "User has been deleted successfully.",
        "success"
      );
    }
  });
}
if (window.location.pathname.includes("home.html")) {
  renderTable();
}
