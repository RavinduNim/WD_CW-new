// ==== FEEDBACK SYSTEM ====//

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("feedbackForm");

    displayDashboard();

    // ==== SUBMIT FORM ==== //
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        // Get values (FIXED IDs)
        const name = document.getElementById("fullName").value;
        const email = document.getElementById("emailAddress").value;
        const rating = document.querySelector('input[name="satisfactionRating"]:checked');
        const category = document.getElementById("feedbackType").value;
        const comment = document.getElementById("comments").value;
        const recommend = document.querySelector('input[name="recommendServices"]:checked');

        // Validation
        if (!name || !email || !rating || !category) {
            alert("Please fill all required fields!");
            return;
        }

        // Create object
        const feedback = {
            name: name,
            rating: rating.value,
            category: category,
            comment: comment,
            recommend: recommend ? recommend.value : "",
            date: new Date().toLocaleString()
        };

        // Get old data
        let feedbackList = JSON.parse(localStorage.getItem("feedbacks")) || [];

        feedbackList.push(feedback);

        localStorage.setItem("feedbacks", JSON.stringify(feedbackList));

        form.reset();

        displayDashboard();

        alert("Feedback submitted successfully!");
    });
});


// ==== DISPLAY DASHBOARD ==== //
function displayDashboard() {

    let feedbackList = JSON.parse(localStorage.getItem("feedbacks")) || [];

    updateCards(feedbackList);
    updateChart(feedbackList);
    showRecentFeedback(feedbackList);
}


// ==== UPDATE CARDS ==== //

function updateCards(list) {

    // Total
    document.getElementById("totalResponses").innerText = list.length;

    // Average rating
    let total = 0;
    for (let i = 0; i < list.length; i++) {
        total += Number(list[i].rating);
    }

    let avg = list.length ? (total / list.length).toFixed(1) : 0;
    document.getElementById("avgRating").innerText = avg;

    // Recommendation %
    let count = 0;
    for (let i = 0; i < list.length; i++) {
        if (list[i].recommend === "Yes") {
            count++;
        }
    }

    let percent = list.length ? Math.round((count / list.length) * 100) : 0;
    document.getElementById("recommendRate").innerText = percent + "%";
}


// ==== UPDATE CHART ==== //

function updateChart(list) {

    let ratings = [0, 0, 0, 0, 0];

    for (let i = 0; i < list.length; i++) {
        let r = list[i].rating;
        if (r) {
            ratings[r - 1]++;
        }
    }

    const ctx = document.getElementById("ratingChart");

    if (window.myChart) {
        window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {   // ✅ FIXED
        type: "bar",
        data: {
            labels: ["1", "2", "3", "4", "5"],
            datasets: [{
                data: ratings,
                backgroundColor: "#008000"
            }]
        },
        options: {
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


// ==== SHOW RECENT FEEDBACK ==== //

function showRecentFeedback(list) {

    const container = document.getElementById("feedbackContainer");
    container.innerHTML = "";

    let recent = list.slice(-5).reverse();

    for (let i = 0; i < recent.length; i++) {

        let item = document.createElement("div");
        item.className = "feedback-card";

        item.innerHTML = `
            <strong>${recent[i].name}</strong> (${recent[i].rating} ⭐)
            <p>${recent[i].comment || "No comments"}</p>
            <small>${recent[i].date}</small>
        `;

        container.appendChild(item);
    }
}