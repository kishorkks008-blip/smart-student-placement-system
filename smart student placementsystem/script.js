/* =====================================
   USERS
===================================== */

let users =
    JSON.parse(
        localStorage.getItem("placementUsers")
    ) || [

        {
            id: 1,
            username: "student",
            password: "1234",
            role: "student",
            name: "Rahul Kumar"
        },

        {
            id: 2,
            username: "company",
            password: "1234",
            role: "company",
            name: "Tech Solutions"
        },

        {
            id: 3,
            username: "admin",
            password: "admin123",
            role: "admin",
            name: "Placement Officer"
        }

    ];


/* =====================================
   JOBS
===================================== */

let jobs =
    JSON.parse(
        localStorage.getItem("placementJobs")
    ) || [

        {
            id: 1,
            title: "Software Engineer",
            company: "Tech Solutions",
            category: "Software",
            location: "Bangalore",
            package: "8 LPA",
            skills:
                "JavaScript, React, SQL",
            minCGPA: 7.0,
            description:
                "Develop modern web applications and work with an experienced engineering team.",
            postedBy: 2
        },

        {
            id: 2,
            title: "Data Analyst",
            company: "DataWorks",
            category: "Data",
            location: "Chennai",
            package: "6 LPA",
            skills:
                "Python, SQL, Excel",
            minCGPA: 7.0,
            description:
                "Analyze business data and create meaningful reports and dashboards.",
            postedBy: 2
        },

        {
            id: 3,
            title: "Financial Analyst",
            company: "FinanceCorp",
            category: "Finance",
            location: "Mumbai",
            package: "7 LPA",
            skills:
                "Excel, Finance, Analytics",
            minCGPA: 7.5,
            description:
                "Support financial planning and analysis activities.",
            postedBy: 2
        },

        {
            id: 4,
            title: "Marketing Associate",
            company: "MarketPro",
            category: "Marketing",
            location: "Hyderabad",
            package: "5 LPA",
            skills:
                "Marketing, SEO, Communication",
            minCGPA: 6.5,
            description:
                "Work with the marketing team to develop campaigns and strategies.",
            postedBy: 2
        },

        {
            id: 5,
            title: "Graduate Engineer Trainee",
            company: "Engineering Ltd",
            category: "Core",
            location: "Pune",
            package: "6.5 LPA",
            skills:
                "Problem Solving, Engineering",
            minCGPA: 7.0,
            description:
                "Join our engineering team as a graduate trainee.",
            postedBy: 2
        }

    ];


/* =====================================
   APPLICATIONS
===================================== */

let applications =
    JSON.parse(
        localStorage.getItem(
            "placementApplications"
        )
    ) || [

        {
            id: 1,
            jobId: 1,
            studentId: 1,
            studentName: "Rahul Kumar",
            status: "Pending",
            date:
                new Date()
                    .toLocaleDateString()
        }

    ];


/* =====================================
   CURRENT USER
===================================== */

let currentUser =
    JSON.parse(
        sessionStorage.getItem(
            "placementCurrentUser"
        )
    );


/* =====================================
   SAVE
===================================== */

function saveData() {

    localStorage.setItem(
        "placementUsers",
        JSON.stringify(users)
    );

    localStorage.setItem(
        "placementJobs",
        JSON.stringify(jobs)
    );

    localStorage.setItem(
        "placementApplications",
        JSON.stringify(applications)
    );

}


/* =====================================
   LOGIN
===================================== */

document
    .getElementById("loginForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const username =
                document
                    .getElementById("username")
                    .value
                    .trim();


            const password =
                document
                    .getElementById("password")
                    .value;


            const user =
                users.find(
                    item =>
                        item.username === username &&
                        item.password === password
                );


            if (!user) {

                document
                    .getElementById(
                        "loginMessage"
                    )
                    .textContent =
                    "Invalid username or password.";

                return;
            }


            currentUser = user;


            sessionStorage.setItem(
                "placementCurrentUser",
                JSON.stringify(user)
            );


            document
                .getElementById("loginPage")
                .classList.add("hidden");


            document
                .getElementById("app")
                .classList.remove("hidden");


            setupApplication();

        }
    );


/* =====================================
   SETUP
===================================== */

function setupApplication() {

    document
        .getElementById("companyNav")
        .classList.add("hidden");


    document
        .getElementById("adminNav")
        .classList.add("hidden");


    if (
        currentUser.role === "company"
    ) {

        document
            .getElementById("companyNav")
            .classList.remove("hidden");

    }


    if (
        currentUser.role === "admin"
    ) {

        document
            .getElementById("adminNav")
            .classList.remove("hidden");

    }


    displayJobs();

    updateStudentDashboard();

    updateCompanyDashboard();

    updateAdminDashboard();

}


/* =====================================
   LOGOUT
===================================== */

function logout() {

    sessionStorage.removeItem(
        "placementCurrentUser"
    );

    currentUser = null;


    document
        .getElementById("app")
        .classList.add("hidden");


    document
        .getElementById("loginPage")
        .classList.remove("hidden");


    document
        .getElementById("loginForm")
        .reset();

}


/* =====================================
   PAGE NAVIGATION
===================================== */

function showPage(page) {

    const pages = [

        "homePage",
        "jobsPage",
        "dashboardPage",
        "companyPage",
        "adminPage"

    ];


    pages.forEach(
        id => {

            document
                .getElementById(id)
                .classList.add("hidden");

        }
    );


    if (page === "home") {

        document
            .getElementById("homePage")
            .classList.remove("hidden");

    }


    if (page === "jobs") {

        document
            .getElementById("jobsPage")
            .classList.remove("hidden");

        displayJobs();

    }


    if (page === "dashboard") {

        if (
            currentUser.role === "student"
        ) {

            document
                .getElementById(
                    "dashboardPage"
                )
                .classList.remove("hidden");

            updateStudentDashboard();

        }

        else {

            alert(
                "Student dashboard is available for students."
            );

        }

    }


    if (page === "company") {

        if (
            currentUser.role !== "company"
        ) {

            alert(
                "Company access required."
            );

            return;
        }


        document
            .getElementById("companyPage")
            .classList.remove("hidden");


        updateCompanyDashboard();

    }


    if (page === "admin") {

        if (
            currentUser.role !== "admin"
        ) {

            alert(
                "Admin access required."
            );

            return;
        }


        document
            .getElementById("adminPage")
            .classList.remove("hidden");


        updateAdminDashboard();

    }

}


/* =====================================
   DISPLAY JOBS
===================================== */

function displayJobs(
    list = jobs
) {

    const container =
        document.getElementById(
            "jobList"
        );


    container.innerHTML = "";


    if (list.length === 0) {

        container.innerHTML =
            "<p>No matching jobs found.</p>";

        return;
    }


    list.forEach(
        job => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "job-card";


            let action = "";


            if (
                currentUser.role === "student"
            ) {

                const applied =
                    applications.some(
                        application =>
                            application.jobId ===
                                job.id &&
                            application.studentId ===
                                currentUser.id
                    );


                action =
                    applied

                    ?

                    `
                    <button
                        class="btn"
                        disabled
                    >
                        Already Applied
                    </button>
                    `

                    :

                    `
                    <button
                        class="btn"
                        onclick="applyForJob(${job.id})"
                    >
                        Apply Now
                    </button>
                    `;

            }


            card.innerHTML = `

                <span class="job-category">
                    ${job.category}
                </span>

                <h3>
                    ${job.title}
                </h3>

                <p class="company">
                    🏢 ${job.company}
                </p>

                <p>
                    📍 ${job.location}
                </p>

                <p>
                    💰 ${job.package}
                </p>

                <p>
                    🎓 Minimum CGPA:
                    ${job.minCGPA}
                </p>

                <div class="skills">
                    <strong>Skills:</strong>
                    ${job.skills}
                </div>

                <p>
                    ${job.description}
                </p>

                <div class="job-action">
                    ${action}
                </div>

            `;


            container.appendChild(card);

        }
    );

}


/* =====================================
   FILTER JOBS
===================================== */

function filterJobs() {

    const search =
        document
            .getElementById("searchJob")
            .value
            .toLowerCase();


    const category =
        document
            .getElementById("jobCategory")
            .value;


    const filtered =
        jobs.filter(
            job => {

                const matchesSearch =

                    job.title
                        .toLowerCase()
                        .includes(search)

                    ||

                    job.company
                        .toLowerCase()
                        .includes(search)

                    ||

                    job.skills
                        .toLowerCase()
                        .includes(search)

                    ||

                    job.location
                        .toLowerCase()
                        .includes(search);


                const matchesCategory =

                    category === "all"

                    ||

                    job.category === category;


                return (
                    matchesSearch &&
                    matchesCategory
                );

            }
        );


    displayJobs(filtered);

}


/* =====================================
   APPLY FOR JOB
===================================== */

function applyForJob(jobId) {

    if (
        currentUser.role !== "student"
    ) {

        alert(
            "Only students can apply."
        );

        return;
    }


    const job =
        jobs.find(
            item =>
                item.id === jobId
        );


    if (!job) {
        return;
    }


    const alreadyApplied =
        applications.some(
            application =>
                application.jobId === jobId &&
                application.studentId ===
                    currentUser.id
        );


    if (alreadyApplied) {

        alert(
            "You have already applied for this job."
        );

        return;
    }


    applications.push({

        id: Date.now(),

        jobId: jobId,

        studentId:
            currentUser.id,

        studentName:
            currentUser.name,

        status: "Pending",

        date:
            new Date()
                .toLocaleDateString()

    });


    saveData();


    displayJobs();

    updateStudentDashboard();

    updateCompanyDashboard();

    updateAdminDashboard();


    alert(
        "Application submitted successfully!"
    );

}


/* =====================================
   STUDENT DASHBOARD
===================================== */

function updateStudentDashboard() {

    if (
        !currentUser ||
        currentUser.role !== "student"
    ) {

        return;
    }


    document
        .getElementById("studentName")
        .textContent =
        currentUser.name;


    const mine =
        applications.filter(
            application =>
                application.studentId ===
                currentUser.id
        );


    const pending =
        mine.filter(
            application =>
                application.status ===
                "Pending"
        );


    const selected =
        mine.filter(
            application =>
                application.status ===
                "Selected"
        );


    const rejected =
        mine.filter(
            application =>
                application.status ===
                "Rejected"
        );


    document
        .getElementById(
            "totalApplications"
        )
        .textContent =
        mine.length;


    document
        .getElementById(
            "pendingApplications"
        )
        .textContent =
        pending.length;


    document
        .getElementById(
            "selectedApplications"
        )
        .textContent =
        selected.length;


    document
        .getElementById(
            "rejectedApplications"
        )
        .textContent =
        rejected.length;


    const container =
        document.getElementById(
            "studentApplications"
        );


    container.innerHTML = "";


    if (mine.length === 0) {

        container.innerHTML =
            "<p>No applications yet.</p>";

        return;
    }


    mine.forEach(
        application => {

            const job =
                jobs.find(
                    item =>
                        item.id ===
                        application.jobId
                );


            if (!job) {
                return;
            }


            let statusClass =
                "pending";


            if (
                application.status ===
                "Selected"
            ) {

                statusClass =
                    "selected";

            }


            if (
                application.status ===
                "Rejected"
            ) {

                statusClass =
                    "rejected";

            }


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "application-card";


            card.innerHTML = `

                <div class="application-info">

                    <h3>
                        ${job.title}
                    </h3>

                    <p>
                        🏢 ${job.company}
                    </p>

                    <p>
                        📍 ${job.location}
                    </p>

                    <p>
                        Applied:
                        ${application.date}
                    </p>

                </div>

                <span
                    class="status ${statusClass}"
                >
                    ${application.status}
                </span>

            `;


            container.appendChild(card);

        }
    );

}


/* =====================================
   COMPANY DASHBOARD
===================================== */

function updateCompanyDashboard() {

    if (
        !currentUser ||
        currentUser.role !== "company"
    ) {

        return;
    }


    const companyJobs =
        jobs.filter(
            job =>
                job.postedBy ===
                currentUser.id
        );


    const companyApplications =
        applications.filter(
            application => {

                const job =
                    jobs.find(
                        item =>
                            item.id ===
                            application.jobId
                    );


                return (
                    job &&
                    job.postedBy ===
                        currentUser.id
                );

            }
        );


    document
        .getElementById(
            "companyJobs"
        )
        .textContent =
        companyJobs.length;


    document
        .getElementById(
            "receivedApplications"
        )
        .textContent =
        companyApplications.length;


    displayCompanyApplications(
        companyApplications
    );

}


/* =====================================
   COMPANY APPLICATIONS
===================================== */

function displayCompanyApplications(
    list
) {

    const container =
        document.getElementById(
            "companyApplicationList"
        );


    container.innerHTML = "";


    if (list.length === 0) {

        container.innerHTML =
            "<p>No applications received.</p>";

        return;
    }


    list.forEach(
        application => {

            const job =
                jobs.find(
                    item =>
                        item.id ===
                        application.jobId
                );


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "application-card";


            let buttons = "";


            if (
                application.status ===
                "Pending"
            ) {

                buttons = `

                    <div class="action-buttons">

                        <button
                            class="accept-btn"
                            onclick="updateApplication(
                                ${application.id},
                                'Selected'
                            )"
                        >
                            Select
                        </button>

                        <button
                            class="reject-btn"
                            onclick="updateApplication(
                                ${application.id},
                                'Rejected'
                            )"
                        >
                            Reject
                        </button>

                    </div>

                `;

            }

            else {

                buttons = `

                    <span class="status ${
                        application.status ===
                        "Selected"
                            ? "selected"
                            : "rejected"
                    }">

                        ${application.status}

                    </span>

                `;

            }


            card.innerHTML = `

                <div class="application-info">

                    <h3>
                        ${application.studentName}
                    </h3>

                    <p>
                        Job:
                        ${job.title}
                    </p>

                    <p>
                        Applied:
                        ${application.date}
                    </p>

                </div>

                ${buttons}

            `;


            container.appendChild(card);

        }
    );

}


/* =====================================
   UPDATE APPLICATION
===================================== */

function updateApplication(
    applicationId,
    status
) {

    const application =
        applications.find(
            item =>
                item.id === applicationId
        );


    if (!application) {
        return;
    }


    application.status =
        status;


    saveData();


    updateStudentDashboard();

    updateCompanyDashboard();

    updateAdminDashboard();


    alert(
        `Application ${status.toLowerCase()}.`
    );

}


/* =====================================
   POST JOB
===================================== */

document
    .getElementById("jobForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            if (
                currentUser.role !==
                "company"
            ) {

                alert(
                    "Only companies can post jobs."
                );

                return;
            }


            const job = {

                id: Date.now(),

                title:
                    document
                        .getElementById(
                            "jobTitle"
                        )
                        .value
                        .trim(),

                company:
                    document
                        .getElementById(
                            "companyName"
                        )
                        .value
                        .trim(),

                category:
                    document
                        .getElementById(
                            "jobType"
                        )
                        .value,

                location:
                    document
                        .getElementById(
                            "jobLocation"
                        )
                        .value
                        .trim(),

                package:
                    document
                        .getElementById(
                            "jobPackage"
                        )
                        .value
                        .trim(),

                skills:
                    document
                        .getElementById(
                            "jobSkills"
                        )
                        .value
                        .trim(),

                minCGPA:
                    Number(
                        document
                            .getElementById(
                                "minCGPA"
                            )
                            .value
                    ),

                description:
                    document
                        .getElementById(
                            "jobDescription"
                        )
                        .value
                        .trim(),

                postedBy:
                    currentUser.id

            };


            jobs.push(job);


            saveData();


            this.reset();


            displayJobs();

            updateCompanyDashboard();

            updateAdminDashboard();


            alert(
                "Job posted successfully!"
            );

        }
    );


/* =====================================
   ADMIN DASHBOARD
===================================== */

function updateAdminDashboard() {

    if (
        !currentUser ||
        currentUser.role !== "admin"
    ) {

        return;
    }


    const students =
        users.filter(
            user =>
                user.role === "student"
        );


    const companies =
        users.filter(
            user =>
                user.role === "company"
        );


    const selectedStudents =
        new Set(
            applications
                .filter(
                    application =>
                        application.status ===
                        "Selected"
                )
                .map(
                    application =>
                        application.studentId
                )
        );


    document
        .getElementById(
            "studentCount"
        )
        .textContent =
        students.length;


    document
        .getElementById(
            "companyCount"
        )
        .textContent =
        companies.length;


    document
        .getElementById(
            "jobCount"
        )
        .textContent =
        jobs.length;


    document
        .getElementById(
            "placedCount"
        )
        .textContent =
        selectedStudents.size;


    const percentage =
        students.length === 0

            ? 0

            :

            Math.round(
                (
                    selectedStudents.size /
                    students.length
                ) * 100
            );


    document
        .getElementById(
            "placementProgress"
        )
        .style.width =
        percentage + "%";


    document
        .getElementById(
            "placementPercentage"
        )
        .textContent =
        percentage +
        "% Placement Rate";


    displayAdminJobs();

}


/* =====================================
   ADMIN JOBS
===================================== */

function displayAdminJobs() {

    const container =
        document.getElementById(
            "adminJobList"
        );


    container.innerHTML = "";


    jobs.forEach(
        job => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "application-card";


            card.innerHTML = `

                <div class="application-info">

                    <h3>
                        ${job.title}
                    </h3>

                    <p>
                        🏢 ${job.company}
                    </p>

                    <p>
                        Category:
                        ${job.category}
                    </p>

                    <p>
                        Package:
                        ${job.package}
                    </p>

                </div>

                <button
                    class="delete-btn"
                    onclick="deleteJob(${job.id})"
                >
                    Remove
                </button>

            `;


            container.appendChild(card);

        }
    );

}


/* =====================================
   DELETE JOB
===================================== */

function deleteJob(jobId) {

    if (
        currentUser.role !== "admin"
    ) {

        return;
    }


    const confirmed =
        confirm(
            "Are you sure you want to remove this job?"
        );


    if (!confirmed) {
        return;
    }


    jobs =
        jobs.filter(
            job =>
                job.id !== jobId
        );


    applications =
        applications.filter(
            application =>
                application.jobId !== jobId
        );


    saveData();


    displayJobs();

    updateAdminDashboard();

    updateCompanyDashboard();


    alert(
        "Job removed successfully."
    );

}


/* =====================================
   RESTORE SESSION
===================================== */

if (currentUser) {

    document
        .getElementById("loginPage")
        .classList.add("hidden");


    document
        .getElementById("app")
        .classList.remove("hidden");


    setupApplication();

}
