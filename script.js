let reminders = JSON.parse(localStorage.getItem("reminders")) || [];

displayReminders();

// Save Reminder
document.getElementById("reminderForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("medicineName").value;
    let hour = parseInt(document.getElementById("hour").value);
    let minute = document.getElementById("minute").value || 0;
    let period = document.getElementById("period").value;

    let reminder = {
        medicineName: name,
        hour: hour,
        minute: parseInt(minute),
        period: period,
        alerted: false
    };

    reminders.push(reminder);
    localStorage.setItem("reminders", JSON.stringify(reminders));

    displayReminders();
    alert("Reminder Added Successfully!");
});

// Display
function displayReminders() {
    let list = document.getElementById("reminderList");
    list.innerHTML = "";

    reminders.forEach((r, index) => {
        list.innerHTML += `
            <div>
                <strong>${r.medicineName}</strong> - 
                ${r.hour}:${r.minute.toString().padStart(2, '0')} ${r.period}
                <button onclick="deleteReminder(${index})">Delete</button>
            </div>
        `;
    });
}

// Delete
function deleteReminder(index) {
    reminders.splice(index, 1);
    localStorage.setItem("reminders", JSON.stringify(reminders));
    displayReminders();
}

// Check every second
setInterval(checkReminders, 1000);

function checkReminders() {
    let now = new Date();
    let currentHour = now.getHours();
    let currentMinute = now.getMinutes();

    reminders.forEach(r => {

        let reminderHour = r.hour;

        // Convert to 24 hour format
        if (r.period === "PM" && reminderHour !== 12) {
            reminderHour += 12;
        }
        if (r.period === "AM" && reminderHour === 12) {
            reminderHour = 0;
        }

        let diff = (reminderHour * 60 + r.minute) - (currentHour * 60 + currentMinute);

        if (diff === 5 && !r.alerted) {
            alert("⏰ 5 Minutes Left for " + r.medicineName + "!");
            r.alerted = true;
            localStorage.setItem("reminders", JSON.stringify(reminders));
        }
    });
}