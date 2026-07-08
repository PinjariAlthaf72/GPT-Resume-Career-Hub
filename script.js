document.addEventListener("DOMContentLoaded", () => {
    // 1. DYNAMIC CHROMATIC BACKGROUND SLIDER LOGIC
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;

    if (slides.length > 0) {
        setInterval(() => {
            slides[currentSlide].classList.remove("active");
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add("active");
        }, 5000);
    }

    // 2. LOGIN STATE
    let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    let isSignUpMode = false;

    const loginBtn = document.getElementById("loginBtn");
    const goToBuilder = document.getElementById("goToBuilder");
    const goToGuidance = document.getElementById("goToGuidance");
    const authModal = document.getElementById("authModal");
    const modalMessage = document.getElementById("modalMessage");
    const modalTitle = document.getElementById("modalTitle");
const modalIcon = document.getElementById("modalIcon");
    const closeModalBtn = document.getElementById("closeModalBtn");

    const modalContentNotice = document.getElementById("modalContentNotice");
    const modalContentForm = document.getElementById("modalContentForm");
    const formTitle = document.getElementById("formTitle");
    const authForm = document.getElementById("authForm");
    const submitAuthBtn = document.getElementById("submitAuthBtn");
    const signUpFields = document.getElementById("signUpFields");
    const toggleFormText = document.getElementById("toggleFormText");
    const navHome = document.getElementById("navHome");

    // Update Login Button
    function updateLoginButton() {
        if (isLoggedIn) {
            loginBtn.innerText = "Sign Out";
            loginBtn.style.background = "#ef4444";
            loginBtn.style.color = "#fff";
        } else {
            loginBtn.innerText = "Sign In";
            loginBtn.style.background = "var(--accent-blue)";
            loginBtn.style.color = "#fff";
        }
    }

    updateLoginButton();

  // Login / Logout
loginBtn.addEventListener("click", () => {

    if (isLoggedIn) {

        isLoggedIn = false;
        localStorage.removeItem("isLoggedIn");

        updateLoginButton();

        // Show Logout Success Modal
        modalContentForm.style.display = "none";
        modalContentNotice.style.display = "block";

        modalIcon.innerHTML = "👋";
        modalTitle.textContent = "Logged Out";
        modalTitle.style.color = "#f59e0b";

        modalMessage.innerHTML =
            "You have been logged out successfully.";

        openModal();

    } else {

        // Show Login Form
        modalContentNotice.style.display = "none";
        modalContentForm.style.display = "block";

        setAuthMode(false);
        openModal();
    }
});

    function setAuthMode(signUp) {
        isSignUpMode = signUp;

        if (signUp) {
            formTitle.textContent = "Create an Account";
            submitAuthBtn.textContent = "Sign Up";
            signUpFields.style.display = "flex";
            toggleFormText.innerHTML =
                `Already have an account? <a href="#" id="switchToSignUp">Log In</a>`;
        } else {
            formTitle.textContent = "Sign In to GPT Hub";
            submitAuthBtn.textContent = "Log In";
            signUpFields.style.display = "none";
            toggleFormText.innerHTML =
                `Don't have an account? <a href="#" id="switchToSignUp">Sign Up</a>`;
        }

        document.getElementById("switchToSignUp").addEventListener("click", (e) => {
            e.preventDefault();
            setAuthMode(!isSignUpMode);
        });
    }

    function openModal() {
        authModal.classList.remove("hidden");
        setTimeout(() => authModal.classList.add("show-modal"), 10);
    }

    function closeModal() {
        authModal.classList.remove("show-modal");
        setTimeout(() => authModal.classList.add("hidden"), 300);
    }

   function showDeniedModal(message) {
    modalContentForm.style.display = "none";
    modalContentNotice.style.display = "block";

    modalIcon.innerHTML = "🔒";
    modalTitle.textContent = "Access Denied";
    modalTitle.style.color = "#ef4444";

    modalMessage.innerHTML = message;

    openModal();
}

authForm.addEventListener("submit", (e) => {
    e.preventDefault();

    isLoggedIn = true;
    localStorage.setItem("isLoggedIn", "true");

    updateLoginButton();
    authForm.reset();

    modalContentForm.style.display = "none";
    modalContentNotice.style.display = "block";

    modalIcon.innerHTML = "✅";
    modalTitle.textContent = "Login Successful";
    modalTitle.style.color = "#22c55e";

    modalMessage.innerHTML =
        "You can now access AI Resume Builder and AI Career Guidance.";

    openModal();
});
    // Resume Builder
    goToBuilder.addEventListener("click", () => {
        if (!isLoggedIn) {
            showDeniedModal("AI Resume Builder ni access cheyyalante First Login kani Signup kani avvali.");
        } else {
            window.location.href = "builder.html";
        }
    });

    // Career Guidance
    goToGuidance.addEventListener("click", () => {
        if (!isLoggedIn) {
            showDeniedModal("AI Career Guidance system ni access cheyyalante First Login kani Signup kani avvali.");
        } else {
            window.location.href = "guidance.html";
        }
    });

    navHome.addEventListener("click", (e) => {
        e.preventDefault();
        closeModal();
    });

    closeModalBtn.addEventListener("click", closeModal);
});