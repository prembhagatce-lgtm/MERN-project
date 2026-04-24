const API_URL = "http://localhost:5000/users";

const form = document.getElementById("userForm");
const userList = document.getElementById("userList");

// Fetch users
async function fetchUsers() {
    const res = await fetch(API_URL);
    const data = await res.json();

    userList.innerHTML = "";

    data.forEach(user => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${user.name} - ${user.email}
            <button onclick="deleteUser('${user._id}')">Delete</button>
        `;
        userList.appendChild(li);
    });
}

// Add user
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email })
    });

    form.reset();
    fetchUsers();
});

// Delete user
async function deleteUser(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });
    fetchUsers();
}

fetchUsers();