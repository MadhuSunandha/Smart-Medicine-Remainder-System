// LOGIN
function login() {
    alert("Login clicked"); // Test to confirm button works

    let u = document.getElementById("username").value;
    let p = document.getElementById("password").value;

    let user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        alert("No user found. Please register first.");
        return;
    }

    if (u === user.username && p === user.password) {
        localStorage.setItem("loggedUser", u);
        window.location = "dashboard.html";
    } else {
        alert("Invalid Login");
    }
}

// REGISTER
function register() {
    let user = {
        username: document.getElementById("ruser").value,
        password: document.getElementById("rpass").value,
        email: document.getElementById("email") ? document.getElementById("email").value : "",
        phone: document.getElementById("phone") ? document.getElementById("phone").value : "",
        age: document.getElementById("age") ? document.getElementById("age").value : ""
    };

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("lastUser", user.username);
    alert("Registered Successfully! Please login now.");
    window.location = "index.html";
}

// LOGOUT
function logout() {
    localStorage.removeItem("loggedUser");
    window.location = "index.html";
}

// NAVIGATION
function go(page) {
    window.location = page;
}

// MENU
function toggleMenu() {
    let m = document.getElementById("menu");
    if (m) {
        m.style.left = (m.style.left === "0px") ? "-220px" : "0px";
    }
}

// AUTO-FILL LOGIN + WELCOME USER
window.onload = function () {
    let last = localStorage.getItem("lastUser");
    if (last && document.getElementById("username")) {
        document.getElementById("username").value = last;
    }

    let loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser && document.getElementById("welcome")) {
        document.getElementById("welcome").innerHTML = "Welcome, " + loggedUser + " 👋";
    }

    // SHOW REMINDERS
    if (document.getElementById("list")) {
        showReminders();
    }

    // SHOW HISTORY
    if (document.getElementById("history")) {
        showHistory();
    }
};

// ADD MEDICINE
function addMedicine() {
    let med = document.getElementById("med").value;
    let dose = document.getElementById("dose").value;
    let hour = document.getElementById("hour").value;
    let minute = document.getElementById("minute").value;
    let period = document.getElementById("period").value;

    if (med === "" || dose === "" || hour === "" || minute === "") {
        alert("Please fill all fields");
        return;
    }

    let data = JSON.parse(localStorage.getItem("reminders")) || [];

    data.push({
        med: med,
        dose: dose,
        hour: hour,
        minute: minute,
        period: period,
        done: false
    });

    localStorage.setItem("reminders", JSON.stringify(data));

    alert("Medicine Added!");

    // Clear fields so user can add one more medicine
    document.getElementById("med").value = "";
    document.getElementById("dose").value = "";
    document.getElementById("hour").value = "";
    document.getElementById("minute").value = "";
    document.getElementById("period").value = "AM";
}

// SHOW REMINDERS
function showReminders() {
    let data = JSON.parse(localStorage.getItem("reminders")) || [];
    let out = "";

    if (data.length === 0) {
        out = "<p>No reminders added yet.</p>";
    } else {
        data.forEach((r, i) => {
            out += `
                <div class="reminder-item">
                    <strong>${r.med}</strong><br>
                    Dosage: ${r.dose}<br>
                    Time: ${r.hour}:${String(r.minute).padStart(2, '0')} ${r.period}<br>
                    <button onclick="del(${i})">Delete</button>
                </div><br>
            `;
        });
    }

    document.getElementById("list").innerHTML = out;
}

// DELETE REMINDER
function del(i) {
    let data = JSON.parse(localStorage.getItem("reminders")) || [];
    data.splice(i, 1);
    localStorage.setItem("reminders", JSON.stringify(data));
    showReminders();
}

// SHOW HISTORY
function showHistory() {
    let data = JSON.parse(localStorage.getItem("history")) || [];
    let out = "";

    if (data.length === 0) {
        out = "<p>No history available yet.</p>";
    } else {
        data.forEach((r) => {
            out += `
                <div class="reminder-item">
                    <strong>${r.med}</strong><br>
                    Dosage: ${r.dose}<br>
                    Alerted At: ${r.hour}:${String(r.minute).padStart(2, '0')} ${r.period}
                </div><br>
            `;
        });
    }

    document.getElementById("history").innerHTML = out;
}

// ALERT SYSTEM
setInterval(() => {
    let now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();

    let data = JSON.parse(localStorage.getItem("reminders")) || [];

    let updated = false;

    data.forEach((r) => {
        let rh = parseInt(r.hour);
        let rm = parseInt(r.minute);

        // Convert to 24-hour format
        if (r.period === "PM" && rh !== 12) rh += 12;
        if (r.period === "AM" && rh === 12) rh = 0;

        if (rh === h && rm === m && !r.done) {
            alert("💊 Time to take " + r.med);

            r.done = true;
            updated = true;

            let history = JSON.parse(localStorage.getItem("history")) || [];
            history.push(r);
            localStorage.setItem("history", JSON.stringify(history));

            setTimeout(() => {
                window.location = "history.html";
            }, 3000);
        }
    });

    if (updated) {
        localStorage.setItem("reminders", JSON.stringify(data));
    }
}, 1000);