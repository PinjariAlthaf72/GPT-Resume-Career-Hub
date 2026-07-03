document.addEventListener("DOMContentLoaded", () => {
    // 1. BACKGROUND SLIDER LOGIC
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
    if (slides.length > 0) {
        setInterval(() => {
            slides[currentSlide].classList.remove("active");
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add("active");
        }, 5000);
    }

    // 2. STATE CONFIGURATION & ROUTING INTERFACE
    let isLoggedIn = false; 
    let isSignUpMode = false; 

    const loginBtn = document.getElementById("loginBtn");
    const goToBuilder = document.getElementById("goToBuilder");
    const goToGuidance = document.getElementById("goToGuidance");
    const authModal = document.getElementById("authModal");
    const modalMessage = document.getElementById("modalMessage");
    const closeModalBtn = document.getElementById("closeModalBtn");

    // Form element references
    const modalContentNotice = document.getElementById("modalContentNotice");
    const modalContentForm = document.getElementById("modalContentForm");
    const formTitle = document.getElementById("formTitle");
    const authForm = document.getElementById("authForm");
    const submitAuthBtn = document.getElementById("submitAuthBtn");
    const signUpFields = document.getElementById("signUpFields");
    const toggleFormText = document.getElementById("toggleFormText");

    // Login/Sign Out Button Toggle Lifecycle Action
    loginBtn.addEventListener("click", () => {
        if (isLoggedIn) {
            isLoggedIn = false;
            loginBtn.innerText = "Sign In";
            loginBtn.style.background = "var(--accent-blue)";
            alert("Logged out successfully.");
        } else {
            modalContentNotice.style.display = "none";
            modalContentForm.style.display = "block";
            setAuthMode(false); 
            openModal();
        }
    });

    // Toggle view states between Sign In and Sign Up form inputs
    function setAuthMode(signUp) {
        isSignUpMode = signUp;
        if (isSignUpMode) {
            formTitle.textContent = "Create an Account";
            submitAuthBtn.textContent = "Sign Up";
            signUpFields.style.display = "flex";
            toggleFormText.innerHTML = `Already have an account? <a href="#" id="switchToSignUp" style="color: #38bdf8; font-weight: 600; text-decoration: none;">Log In</a>`;
        } else {
            formTitle.textContent = "Sign In to GPT Hub";
            submitAuthBtn.textContent = "Log In";
            signUpFields.style.display = "none";
            toggleFormText.innerHTML = `Don't have an account? <a href="#" id="switchToSignUp" style="color: #38bdf8; font-weight: 600; text-decoration: none;">Sign Up</a>`;
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

    function showDeniedModal(messageText) {
        modalContentForm.style.display = "none";
        modalContentNotice.style.display = "block";
        modalMessage.innerHTML = messageText;
        openModal();
    }

    // Secure Data Fetch Form Submission Route Pipeline
    authForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const emailVal = document.getElementById("authEmail").value;
        const passwordVal = document.getElementById("authPassword").value;
        const nameVal = document.getElementById("regName") ? document.getElementById("regName").value : "";
        
        const payload = {
            action: isSignUpMode ? "signup" : "login",
            email: emailVal,
            password: passwordVal,
            name: isSignUpMode ? nameVal : ""
        };

        fetch("auth.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                if (isSignUpMode) {
                    alert("🎉 " + data.message);
                    setAuthMode(false); 
                } else {
                    alert("👋 " + data.message);
                    isLoggedIn = true;
                    loginBtn.innerText = "Sign Out";
                    loginBtn.style.background = "#ef4444";
                    loginBtn.style.color = "#fff";
                    closeModal();
                    authForm.reset();
                }
            } else {
                alert("⚠️ Error: " + data.message);
            }
        })
        .catch(error => {
            console.error("Transmission Error:", error);
            alert("Unable to process authentication targets at this moment.");
        });
    });

    // 3. FEATURE CARD WORKSPACE MODAL RESTRICTIONS & REAL LINKS
    goToBuilder.addEventListener("click", () => {
        if (!isLoggedIn) {
            showDeniedModal("AI Resume Builder ni access cheyyalante clear ga **First Login kani Signup kani** avvali.");
        } else {
            // Forward user to the actual resume builder page
            window.location.href = "builder.html";
        }
    });

    goToGuidance.addEventListener("click", () => {
        if (!isLoggedIn) {
            showDeniedModal("AI Career Guidance system ni access cheyyalante clear ga **First Login kani Signup kani** avvali.");
        } else {
            // Forward user to the actual career guidance page
            window.location.href = "guidance.html";
        }
    });

    closeModalBtn.addEventListener("click", closeModal);
});