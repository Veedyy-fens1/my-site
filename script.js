const body = document.body;
const darkModeBtn = document.getElementById("dark-mode-toggle");
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const scrollTopBtn = document.getElementById("scroll-top-btn");
const toast = document.getElementById("toast");

/* ---------------- TOAST ---------------- */
function showToast(message) {
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

/* ---------------- DARK MODE ---------------- */
function applySavedTheme() {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        body.classList.add("dark");
        if (darkModeBtn) {
            darkModeBtn.textContent = "☀️ Light mode";
        }
    } else {
        body.classList.remove("dark");
        if (darkModeBtn) {
            darkModeBtn.textContent = "🌙 Dark mode";
        }
    }
}

if (darkModeBtn) {
    applySavedTheme();

    darkModeBtn.addEventListener("click", () => {
        body.classList.toggle("dark");

        if (body.classList.contains("dark")) {
            localStorage.setItem("theme", "dark");
            darkModeBtn.textContent = "☀️ Light mode";
            showToast("Dark mode қосылды");
        } else {
            localStorage.setItem("theme", "light");
            darkModeBtn.textContent = "🌙 Dark mode";
            showToast("Light mode қосылды");
        }
    });
}

/* ---------------- MOBILE MENU ---------------- */
if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });
}

/* ---------------- SCROLL TOP ---------------- */
if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add("show");
        } else {
            scrollTopBtn.classList.remove("show");
        }
    });

    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/* ---------------- CARD SEARCH ---------------- */
const cardSearch = document.getElementById("card-search");
const cards = document.querySelectorAll("#card-container .card");

if (cardSearch && cards.length) {
    cardSearch.addEventListener("input", () => {
        const value = cardSearch.value.toLowerCase().trim();

        cards.forEach((card) => {
            const title = (card.dataset.title || "").toLowerCase();

            if (title.includes(value)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
}

/* ---------------- MINI GAME ---------------- */
const guessInput = document.getElementById("guess-input");
const checkButton = document.getElementById("check-button");
const resetButton = document.getElementById("reset-button");
const gameResult = document.getElementById("game-result");
const attemptsCount = document.getElementById("attempts-count");
const scoreCount = document.getElementById("score-count");

let randomNumber = Math.floor(Math.random() * 10) + 1;
let attempts = 3;
let score = 0;

function updateGameUI() {
    if (attemptsCount) {
        attemptsCount.textContent = attempts;
    }

    if (scoreCount) {
        scoreCount.textContent = score;
    }
}

function resetGame(fullReset = false) {
    randomNumber = Math.floor(Math.random() * 10) + 1;
    attempts = 3;

    if (guessInput) {
        guessInput.value = "";
    }

    if (gameResult) {
        gameResult.textContent = "Ойын қайта басталды!";
    }

    if (fullReset) {
        score = 0;
    }

    updateGameUI();
}

if (checkButton && guessInput && gameResult) {
    updateGameUI();

    checkButton.addEventListener("click", () => {
        const userGuess = Number(guessInput.value);

        if (guessInput.value.trim() === "") {
            gameResult.textContent = "Сан енгізіңіз!";
            return;
        }

        if (userGuess < 1 || userGuess > 10) {
            gameResult.textContent = "1 мен 10 арасындағы санды енгізіңіз!";
            return;
        }

        if (attempts <= 0) {
            gameResult.textContent = "Ойын аяқталды. Қайта бастау түймесін басыңыз!";
            return;
        }

        if (userGuess === randomNumber) {
            score++;
            gameResult.textContent = "🎉 Дұрыс таптыңыз!";
            showToast("Жарайсыз! Ұпай қосылды");

            randomNumber = Math.floor(Math.random() * 10) + 1;
            attempts = 3;
            guessInput.value = "";

            updateGameUI();
            return;
        }

        attempts--;

        if (attempts === 0) {
            gameResult.textContent = `❌ Жеңілдіңіз! Дұрыс сан: ${randomNumber}`;
        } else if (userGuess < randomNumber) {
            gameResult.textContent = "📉 Тым кіші сан!";
        } else {
            gameResult.textContent = "📈 Тым үлкен сан!";
        }

        updateGameUI();
    });

    guessInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            checkButton.click();
        }
    });
}

if (resetButton) {
    resetButton.addEventListener("click", () => {
        resetGame(false);
    });
}

/* ---------------- FAQ ---------------- */
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    if (question) {
        question.addEventListener("click", () => {
            item.classList.toggle("active");
        });
    }
});

/* ---------------- SERVICES FILTER ---------------- */
const filterButtons = document.querySelectorAll(".filter-btn");
const serviceCards = document.querySelectorAll(".service-card");

if (filterButtons.length && serviceCards.length) {
    filterButtons.forEach((button) => {
        button.addEventListener("click", () => {
            filterButtons.forEach((btn) => btn.classList.remove("active-filter"));
            button.classList.add("active-filter");

            const filter = button.dataset.filter;

            serviceCards.forEach((card) => {
                const category = card.dataset.category;

                if (filter === "all" || filter === category) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });
}

/* ---------------- CONTACT FORM ---------------- */
const contactForm = document.getElementById("contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const message = document.getElementById("message");

        const nameValue = name ? name.value.trim() : "";
        const emailValue = email ? email.value.trim() : "";
        const messageValue = message ? message.value.trim() : "";

        if (nameValue.length < 2) {
            showToast("Атыңызды дұрыс енгізіңіз");
            return;
        }

        if (!emailValue.includes("@") || !emailValue.includes(".")) {
            showToast("Email қате енгізілді");
            return;
        }

        if (messageValue.length < 5) {
            showToast("Хабарлама тым қысқа");
            return;
        }

        showToast("Хабарлама сәтті жіберілді!");
        contactForm.reset();
    });
}