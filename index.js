document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("user-form");
    const responseDiv = document.getElementById("response");

    // ✅ Fetch and display existing users when the page loads
    function fetchUsers() {
        fetch("http://localhost:3000/users")
            .then(response => response.json())
            .then(users => {
                responseDiv.innerHTML = "<h3>Existing Users:</h3>";
                users.forEach(user => {
                    responseDiv.innerHTML += `<p>✅ ${user.name} (ID: ${user.id})</p>`;
                });
            })
            .catch(error => {
                responseDiv.innerHTML = `<p style="color: red;">❌ Error loading users: ${error.message}</p>`;
            });
    }

    // Call fetchUsers on page load
    fetchUsers();

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();

        if (name === "" || email === "") {
            responseDiv.innerHTML += `<p style="color: red;">❌ Please enter both name and email.</p>`;
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ name, email })
            });

            if (!response.ok) {
                throw new Error(`Server error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            responseDiv.innerHTML += `<p>✅ New user added: ${data.name} (ID: ${data.id})</p>`;

            form.reset();
        } catch (error) {
            responseDiv.innerHTML += `<p style="color: red;">❌ Error: ${error.message}</p>`;
        }
    });
});
