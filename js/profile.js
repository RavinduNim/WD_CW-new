const userProfile = {
    step1: { name: "", uni: "", location: "" },
    step2: { reserve: "", activity: "", hours: "" },
    step3: { goal: "", pledge: "", brand: "" }
};

const totalPrompts = 9;

function runStep(stepNumber) {
    if (stepNumber === 1) {
        let ans1 = prompt("What's your name ?", userProfile.step1.name);
        if (ans1 !== null) userProfile.step1.name = ans1.trim();

        let ans2 = prompt("What university you attend ?", userProfile.step1.uni);
        if (ans2 !== null) userProfile.step1.uni = ans2.trimEnd();

        let ans3 = prompt("Whare are you located ?", userProfile.step1.location);
        if (ans3 !== null) userProfile.step1.location = ans3.trim();
    }
    else if (stepNumber === 2) {
        let ans1 = prompt("Type your favourite nature reserve ?", userProfile.step2.reserve);
        if (ans1 !== null) userProfile.step2.reserve = ans1.trim();

        let ans2 = prompt("Type your prefered conversation activity ?", userProfile.step2.activity);
        if (ans2 !== null) userProfile.step2.activity = ans2.trim();

        let ans3 = prompt("Hours per week willing to volunteer ?", userProfile.step2.hours);
        if (ans3 !== null) userProfile.step2.hours = ans3.trim();
    }
    else if (stepNumber === 3) {
        let ans1 = prompt("hat is your main conservation goal ?", userProfile.step3.goal);
        if (ans1 !== null) userProfile.step3.goal = ans1.trim();

        let ans2 = prompt("ill you pledge to plant one tree this year? (Yes/No)", userProfile.step3.pledge);
        if (ans2 !== null) userProfile.step3.pledge = ans2.trim();

        let ans3 = prompt("Do you have a business or brand that could support this?", userProfile.step3.brand);
        if (ans3 !== null) userProfile.step3.brand = ans3.trim();
    }

    updateDisplay();
    updateProgress();
}

function updateDisplay() {
    if (userProfile.step1.name || userProfile.step1.uni || userProfile.step1.location) {
        document.getElementById('cardStep1').style.display = 'block';
        document.getElementById('outName').innerHTML = `<span class="dataLabel">Name:</span> ${userProfile.step1.name || "<em style='color:red;'>Skipped</em>"}`;
        document.getElementById('outUni').innerHTML = `<span class="dataLabel">University: </span> ${userProfile.step1.uni || "<em style='color:red;'>Skipped</em>"}`;
        document.getElementById('outLocation').innerHTML = `<span class="dataLabel">Location:</span> ${userProfile.step1.location || "<em style='color:red;'>Skipped</em>"}`;
    }

    if (userProfile.step2.reserve || userProfile.step2.activity || userProfile.step2.hours) {
        document.getElementById('cardStep2').style.display = 'block';
        document.getElementById('outReserve').innerHTML = `<span class="dataLabel">Favorite Reserve:</span> ${userProfile.step2.reserve || "<em style='color:red;'>Skipped</em>"}`;
        document.getElementById('outActivity').innerHTML = `<span class="dataLabel">Activity:</span> ${userProfile.step2.activity || "<em style='color:red;'>Skipped</em>"}`;
        document.getElementById('outHours').innerHTML = `<span class="dataLabel">Hours/Week:</span> ${userProfile.step2.hours || "<em style='color:red;'>Skipped</em>"}`;
    }

    if (userProfile.step3.goal || userProfile.step3.pledge || userProfile.step3.brand) {
        document.getElementById('cardStep3').style.display = 'block';
        document.getElementById('outGoal').innerHTML = `<span class="dataLabel">Goal:</span> ${userProfile.step3.goal || "<em style='color:red;'>Skipped</em>"}`;
        document.getElementById('outPledge').innerHTML = `<span class="dataLabel">Pledge:</span> ${userProfile.step3.pledge || "<em style='color:red;'>Skipped</em>"}`;
        document.getElementById('outBrand').innerHTML = `<span class="dataLabel">Brand Support:</span> ${userProfile.step3.brand || "<em style='color:red;'>Skipped</em>"}`;
    }

}

function updateProgress() {
    let completeFields = 0;

    for (const step in userProfile) {
        for (const key in userProfile[step]) {
            if (userProfile[step][key] !== "") {
                completeFields++;
            }
        }
    }

    let percentage = Math.round((completeFields / totalPrompts) * 100);

    let progressBar = document.getElementById('progressBar');
    progressBar.style.width = percentage + "%";
    progressBar.innerHTML = percentage + "%";

    if (percentage === 100) {
        document.getElementById('progressText').innerHTML = "Profile 100% complete! Thank you.";

    } else {
        document.getElementById('progressText').innerHTML = `Profile is ${percentage}% complete. You can click the buttons above to complete skipped prompts.`;
    }
}