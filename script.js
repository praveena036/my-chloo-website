
/* =====================================
   1. PAGE NAVIGATION
===================================== */

const navLinks = document.getElementById("navLinks");
const menuToggle = document.getElementById("menuToggle");

const navItems = document.querySelectorAll(".nav-links a");
const pages = document.querySelectorAll(".page-screen");

function navigateTo(pageId, updateHistory = true) {

    const target = document.getElementById(pageId);

    if (!target) return;

    pages.forEach(page => page.classList.remove("active"));
    target.classList.add("active");

    navItems.forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + pageId
        );
    });

    if (updateHistory && location.hash !== "#" + pageId) {
        history.pushState(null, "", "#" + pageId);
    }

    navLinks.classList.remove("open");

    window.scrollTo({ top: 0, behavior: "smooth" });

}

navItems.forEach(link => {
    link.addEventListener("click", event => {
        event.preventDefault();
        navigateTo(link.getAttribute("href").substring(1));
    });
});

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
});

window.addEventListener("popstate", () => {
    navigateTo(location.hash.substring(1) || "home", false);
});

navigateTo(location.hash.substring(1) || "home", false);


/* =====================================
   2. PHOTO LOADER
===================================== */

function loadLocalPhoto(image, fileName) {

    const extensions = [
        ".jpg", ".jpeg", ".png", ".webp",
        ".jfif", ".avif", ".JPG", ".JPEG", ".PNG"
    ];

    const candidateNames = [
        fileName,
        fileName.replace(/dialogue/gi, "dilogue"),
        fileName.replace(/dilogue/gi, "dialogue")
    ].filter((value, index, arr) => arr.indexOf(value) === index);

    let extensionIndex = 0;
    let candidateIndex = 0;

    image.onerror = function () {

        while (candidateIndex < candidateNames.length) {
            const candidate = candidateNames[candidateIndex];
            const extension = extensions[extensionIndex] || "";

            if (extension) {
                image.src = "images/" + encodeURIComponent(candidate) + extension;
                extensionIndex++;
                return;
            }

            candidateIndex++;
            extensionIndex = 0;
        }

        console.error("Photo not found:", fileName);
        image.alt = "Photo not found: " + fileName;
    };

    image.src = "images/" + encodeURIComponent(candidateNames[0]) + extensions[0];
}

document.querySelectorAll("[data-photo]").forEach(image => {
    loadLocalPhoto(image, image.dataset.photo);
});


/* =====================================
   3. HOME SLIDESHOW
===================================== */

const slides = [
    { file: "my fav", title: "My Fav", quote: "The one I choose every time." },
    { file: "fav dress", title: "Fav Dress", quote: "You always look stunning." },
    { file: "our pic", title: "Our Beautiful Picture", quote: "My favourite view is you." },
    { file: "couple", title: "My Forever Person", quote: "Together is my favourite place." },
    { file: "oru first pic", title: "Our First Picture", quote: "Every story has a beautiful beginning." },
    { file: "fav", title: "My Favourite", quote: "Your smile makes my day." },
    { file: "special day", title: "Our Special Day", quote: "You make ordinary days special." },
    { file: "us", title: "Just Us", quote: "Two hearts, one beautiful journey." },
    { file: "most fav", title: "My Most Favourite", quote: "My favourite memories have you in them." },
    { file: "forever", title: "Forever Us", quote: "I want all my tomorrows with you." }
];

let currentSlide = 0;

const slideImage = document.getElementById("homeSlide");
const slideTitle = document.getElementById("slideTitle");
const slideQuote = document.getElementById("slideQuote");
const slideCount = document.getElementById("slideCount");

function showSlide(index) {

    currentSlide = (index + slides.length) % slides.length;

    const slide = slides[currentSlide];

    slideImage.style.opacity = "0";

    setTimeout(() => {

        loadLocalPhoto(slideImage, slide.file);

        slideTitle.textContent = slide.title;
        slideQuote.textContent = '"' + slide.quote + '"';

        slideCount.textContent =
            (currentSlide + 1) + " / " + slides.length;

        slideImage.style.opacity = "1";

    }, 250);

}

function nextSlide() {
    showSlide(currentSlide + 1);
}

function previousSlide() {
    showSlide(currentSlide - 1);
}

showSlide(0);

setInterval(nextSlide, 4500);


/* =====================================
   4. ALL 29 MEMORIES
===================================== */

const memories = [

    ["ur favv", "Another Favourite", "Little things make big memories."],
    ["my fav", "My Fav", "The one I choose every time."],
    ["most fav", "My Most Favourite", "My favourite memories have you in them."],
    ["fav dress", "Fav Dress", "You always look stunning."],
    ["our pic", "Our Beautiful Picture", "You are my favourite view."],
    ["oru first pic", "Our First Picture", "Every beautiful story has a beginning."],
    ["couple", "My Favourite Couple", "Together is my favourite place."],
    ["fav", "My Favourite", "Your smile is my favourite thing."],
    ["first pic", "First Picture", "Some moments last forever."],
    ["special day", "Our Special Day", "You make ordinary days extraordinary."],
    ["us", "Just Us", "Two hearts, one beautiful journey."],
    ["RP", "A Special Memory", "My heart always chooses you."],
    ["funy", "Our Funny Moments", "Life is funnier with you."],
    ["forever", "Forever Us", "I want all my tomorrows with you."],
    ["lifeline", "My Lifeline", "You are a beautiful part of my life."],
    ["partner", "My Life Partner", "My favourite person, my forever."],
    ["chat love", "Our Conversations", "I never get tired of talking to you."],
    ["childish", "Our Childish Side", "Stay silly and happy with me."],
    ["ur fav dilogue", "Your Favourite Dialogue", "Some words stay in the heart."],
    ["outing", "Our Outing", "Every adventure is better with you."],
    ["ur fav", "Your Favourite", "I love seeing you happy."],
    ["our name", "Our Names", "Two names, one beautiful story."],
    ["my first gift", "My First Gift", "The smallest gifts can mean the most."],
    ["first coin", "A Little Treasure", "Some things are priceless."],
    ["second gift", "Another Special Gift", "It is special because it came from you."],
    ["endless talk", "Our Endless Talks", "My favourite conversation is with you."],
    ["fuse", "A Sweet Little Memory", "Memories are little treasures."],
    ["frist chocolate", "First Chocolate", "You make my world sweeter."],
    ["choco", "Chocolate Memories", "Sweet moments, sweeter memories."],
    ["will you marry me", "A Special Question", "Will you be my forever?"],
    ["wrk id", "A Special Memory", "I am proud of your journey."]
];

const memoryGrid = document.getElementById("memoryGrid");

memories.forEach((memory, index) => {

    const card = document.createElement("article");
    card.className = "memory-card";
    card.style.animationDelay = (index * 0.05) + "s";

    const image = document.createElement("img");
    image.alt = memory[1];
    image.loading = "lazy";
    loadLocalPhoto(image, memory[0]);

    const title = document.createElement("h3");
    title.textContent = memory[1];

    const quote = document.createElement("p");
    quote.className = "quote";
    quote.textContent = '"' + memory[2] + '"';

    card.append(image, title, quote);
    memoryGrid.appendChild(card);

});


/* =====================================
   5. INSTAGRAM SHORTS
===================================== */

const shorts = [
    "https://www.instagram.com/reel/Df0r-m8PjNv/?rpxt=bTdqcXhhaHMyd3Aw",
    "https://www.instagram.com/reel/DerQh80yjA7/?obrf=MWZ4OHg5bzllM3cyMQ==",
    "https://www.instagram.com/reel/DewM9S6Sa72/?xtok=MXY3cjN2YjI3bXFzbw==",
    "https://www.instagram.com/reel/DerR07Qyk3k/?psln=d2d3MWdtdzVlandi",
    "https://www.instagram.com/reel/DfXbwM1ymxq/?xtok=MWplZXVicXNhYnB6aA==",
    "https://www.instagram.com/reel/DedmKDsAX0a/?exln=MWZ1dnVvazRsMzEyZQ==",
    "https://www.instagram.com/reel/DeyxqdgBv3g/?xtok=MjdjYmtiMnF0cWNr",
    "https://www.instagram.com/reel/Dflm1-iBdeO/?xtok=bXZla2MwZm5pMnp2",
    "https://www.instagram.com/reel/DbCsaZbgRIL/?psln=MTNyb3g4ZXJkeTJnMw==",
    "https://www.instagram.com/reel/Dcp3tPXuh2C/?mdxt=MWVyNW96N3d5OWk0Mg==",
    "https://www.instagram.com/reel/DeCPIJcIJkR/?xtok=OGVmZ2I3bGNjOGcy",
    "https://www.instagram.com/reel/Dfr5JqbTUrI/?exln=MWVxOGtmbDcxNDVjYg==",
    "https://www.instagram.com/reel/DfKHdl8BpLG/?xtok=MXFzeHIxcHdwY2Fxeg==",
    "https://www.instagram.com/reel/DdF_CSzhrad/?vrfl=eTBnYzYxaDNyc2U5",
    "https://www.instagram.com/reel/DeTcq5ciOU1/?vrfl=aW9hZmlpYTN1anNz",
    "https://www.instagram.com/reel/Dfzy3QMSg8Z/?dlrf=amFxNXF4NjkwdmRt",
    "https://www.instagram.com/reel/Dey6pxgo4ld/?mdxt=OTU5bWtya2o3dXFl",
    "https://www.instagram.com/reel/DfmJkg9BjVI/?exln=djVyM3BxemM3YWU="
];

const shortsGrid = document.getElementById("shortsGrid");

shorts.forEach((url, index) => {

    const card = document.createElement("div");
    card.className = "short-card";

    const icon = document.createElement("div");
    icon.textContent = "🎬";
    icon.style.fontSize = "38px";

    const title = document.createElement("h3");
    title.textContent = "Love Reel " + (index + 1);

    const description = document.createElement("p");
    description.textContent = "A little video saved especially for you ❤️";

    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Watch Reel ▶";

    card.append(icon, title, description, link);
    shortsGrid.appendChild(card);

});


/* =====================================
   6. GAME MENU
===================================== */

function showGame(gameId, button) {

    document.querySelectorAll(".game-panel").forEach(panel => {
        panel.classList.remove("active");
    });

    document.querySelectorAll(".game-choice").forEach(item => {
        item.classList.remove("active");
    });

    document.getElementById(gameId).classList.add("active");

    button.classList.add("active");

    if (gameId !== "catch") {
        stopCatchGame();
    }

}


/* =====================================
   7. LOVE QUIZ
===================================== */

const quizQuestions = [

    {
        question: "When was our first sight?",
        options: ["27 May 2025", "24 June 2025", "6 October 2025"],
        answer: 0
    },

    {
        question: "Which date has our special kiss memory?",
        options: ["27 May 2025", "24 June 2025", "15 August 2025"],
        answer: 1
    },

    {
        question: "What do I want to do with you?",
        options: ["Create a future together", "Forget our memories", "Stop talking"],
        answer: 0
    },

    {
        question: "What is your dream?",
        options: ["Become a Developer", "Stop learning", "Give up"],
        answer: 0
    },

    {
        question: "How much do I love you?",
        options: ["A little", "A lot", "More than words can explain"],
        answer: 2
    }

];

let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;

function renderQuiz() {

    const question = quizQuestions[quizIndex];

    document.getElementById("quizQuestion").textContent =
        question.question;

    const optionsBox = document.getElementById("quizOptions");
    optionsBox.innerHTML = "";

    document.getElementById("quizFeedback").textContent = "";
    document.getElementById("nextQuestion").hidden = true;

    quizAnswered = false;

    question.options.forEach((option, index) => {

        const button = document.createElement("button");
        button.className = "quiz-option";
        button.textContent = option;

        button.addEventListener("click", () => answerQuiz(index, button));

        optionsBox.appendChild(button);

    });

}

function answerQuiz(index, selectedButton) {

    if (quizAnswered) return;

    quizAnswered = true;

    const question = quizQuestions[quizIndex];

    const buttons = document.querySelectorAll("#quizOptions button");

    buttons.forEach(button => button.disabled = true);

    if (index === question.answer) {

        quizScore++;

        selectedButton.classList.add("correct");

        document.getElementById("quizFeedback").textContent =
            "Correct! You know our story so well! ❤️";

        celebrateHearts(8);

    } else {

        selectedButton.classList.add("wrong");
        buttons[question.answer].classList.add("correct");

        document.getElementById("quizFeedback").textContent =
            "Almost! Let's remember this special memory together. 💗";

    }

    const nextButton = document.getElementById("nextQuestion");

    nextButton.hidden = false;

    nextButton.textContent =
        quizIndex === quizQuestions.length - 1 ? "See My Result ❤️" : "Next Question →";

}

function nextQuiz() {

    if (!quizAnswered) return;

    quizIndex++;

    if (quizIndex >= quizQuestions.length) {

        document.getElementById("quizQuestion").textContent =
            "Our Love Quiz Is Complete!";

        document.getElementById("quizOptions").innerHTML = "";

        document.getElementById("quizFeedback").innerHTML =
            "Your score: " + quizScore + " / " + quizQuestions.length +
            "<br>Every memory with you is special! ❤️";

        document.getElementById("nextQuestion").hidden = false;
        document.getElementById("nextQuestion").textContent = "Play Again ↻";

        document.getElementById("nextQuestion").onclick = function() {
            quizIndex = 0;
            quizScore = 0;
            renderQuiz();
            this.onclick = nextQuiz;
        };

        celebrateHearts(20);

        return;

    }

    renderQuiz();

}

renderQuiz();


/* =====================================
   8. CATCH MY LOVE GAME
===================================== */

let catchScore = 0;
let catchTime = 30;
let catchTimer = null;
let catchSpawner = null;
let catchRunning = false;

function startCatchGame() {

    stopCatchGame();

    catchScore = 0;
    catchTime = 30;
    catchRunning = true;

    document.getElementById("heartScore").textContent = catchScore;
    document.getElementById("heartTime").textContent = catchTime;
    document.getElementById("catchResult").textContent = "";

    const arena = document.getElementById("catchArena");
    arena.innerHTML = "";

    document.getElementById("startCatch").textContent = "Restart Game ↻";

    catchSpawner = setInterval(() => {

        if (!catchRunning) return;

        const heart = document.createElement("button");

        heart.className = "catch-heart";
        heart.textContent = ["❤️", "💗", "💖"][Math.floor(Math.random() * 3)];

        heart.style.left = Math.random() * 85 + "%";
        heart.style.animationDuration = (Math.random() * 1.2 + 1.5) + "s";

        heart.addEventListener("click", () => {

            if (!catchRunning) return;

            catchScore++;

            document.getElementById("heartScore").textContent = catchScore;

            heart.remove();

        });

        arena.appendChild(heart);

        setTimeout(() => heart.remove(), 3000);

    }, 650);

    catchTimer = setInterval(() => {

        catchTime--;

        document.getElementById("heartTime").textContent = catchTime;

        if (catchTime <= 0) {

            stopCatchGame();

            document.getElementById("catchResult").innerHTML =
                "Game Over! Your score: " + catchScore +
                "<br>You collected so much love! ❤️";

            celebrateHearts(15);

        }

    }, 1000);

}

function stopCatchGame() {

    catchRunning = false;

    clearInterval(catchTimer);
    clearInterval(catchSpawner);

}


/* =====================================
   9. UNLOCK MY SECRET
===================================== */

const secretQuestions = [
    {
        question: "Which date is our first sight?",
        options: ["27 May 2025", "24 June 2025", "6 October 2025"],
        answer: 0
    },
    {
        question: "Which date is our second special memory?",
        options: ["27 May 2025", "24 June 2025", "6 October 2025"],
        answer: 1
    },
    {
        question: "What do I dream of?",
        options: ["A future together", "Never meeting again", "Forgetting everything"],
        answer: 0
    }
];

let secretIndex = 0;

function renderSecret() {

    const item = secretQuestions[secretIndex];

    document.getElementById("secretQuestion").textContent = item.question;

    const options = document.getElementById("secretOptions");

    options.innerHTML = "";

    item.options.forEach((option, index) => {

        const button = document.createElement("button");
        button.className = "quiz-option";
        button.textContent = option;

        button.onclick = () => {

            if (index === item.answer) {

                secretIndex++;

                if (secretIndex >= secretQuestions.length) {

                    options.innerHTML = "";
                    document.getElementById("secretQuestion").textContent =
                        "You unlocked all the secrets!";

                    document.getElementById("secretFeedback").textContent =
                        "A special letter is waiting for you! ❤️";

                    document.getElementById("secretLetter").hidden = false;

                    celebrateHearts(25);

                } else {

                    document.getElementById("secretFeedback").textContent =
                        "Correct! One more secret to unlock. 💗";

                    renderSecret();

                }

            } else {

                document.getElementById("secretFeedback").textContent =
                    "Try again! Think about our memories. 🥹";

            }

        };

        options.appendChild(button);

    });

}

renderSecret();


/* =====================================
   10. PROPOSAL GAME
===================================== */

function chooseYes() {

    const result = document.getElementById("proposalResult");

    result.innerHTML = `
        <span class="game-emotion">🥹💍❤️</span>
        <h2>Yay! You said YES!</h2>
        <p class="tamil-text">
            Ippo enakku romba sandhosham!
            Namma future-ah azhaga sernthu build pannalam.
        </p>
        <p class="quote">
            "You said yes, and my heart is smiling."
        </p>
        <h2>Love You Forever! ❤️</h2>
    `;

    celebrateHearts(40);

}

function chooseNo() {

    const result = document.getElementById("proposalResult");

    result.innerHTML = `
        <span class="game-emotion">👩🏻‍🦰😭💔</span>
        <h2>Oh No! You said NO!</h2>
        <p class="tamil-text">
            Aiyoo! Intha kutty ponnu azhuthutta! 🥺
        </p>
        <p class="quote">
            "Maybe you need one more little reason to smile."
        </p>
        <span class="game-emotion">🥹💕</span>
    `;

}


/* =====================================
   11. CELEBRATION
===================================== */

function celebrateHearts(amount = 20) {

    const emojis = ["❤️", "💗", "💖", "💍", "💕", "🥰"];

    for (let i = 0; i < amount; i++) {

        setTimeout(() => {

            const heart = document.createElement("span");

            heart.className = "background-heart";

            heart.textContent =
                emojis[Math.floor(Math.random() * emojis.length)];

            heart.style.left = Math.random() * 100 + "vw";
            heart.style.fontSize = "30px";
            heart.style.animationDuration = "4s";

            document.getElementById("backgroundHearts").appendChild(heart);

            setTimeout(() => heart.remove(), 4000);

        }, i * 70);

    }

}


/* =====================================
   12. LOVE LETTER
===================================== */

function openLetter() {
    document.getElementById("letterOverlay").classList.add("open");
}

function closeLetter() {
    document.getElementById("letterOverlay").classList.remove("open");
}

document.getElementById("letterOverlay").addEventListener("click", event => {

    if (event.target.id === "letterOverlay") {
        closeLetter();
    }

});

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeLetter();
    }

});


/* =====================================
   13. FLOATING HEARTS
===================================== */

function createFloatingHeart() {

    const container = document.getElementById("backgroundHearts");

    const heart = document.createElement("span");

    heart.className = "background-heart";

    const emojis = ["❤️", "💕", "💗", "💖", "🩷", "💘"];

    heart.textContent =
        emojis[Math.floor(Math.random() * emojis.length)];

    heart.style.left = Math.random() * 100 + "vw";

    const duration = Math.random() * 5 + 6;

    heart.style.fontSize = (Math.random() * 18 + 16) + "px";
    heart.style.animationDuration = duration + "s";

    container.appendChild(heart);

    setTimeout(() => heart.remove(), duration * 1000);

}

setInterval(createFloatingHeart, 500);


/* =====================================
   14. SPARKLES
===================================== */

function createSparkle() {

    const sparkle = document.createElement("span");

    sparkle.className = "sparkle";
    sparkle.textContent = "✦";

    sparkle.style.left = Math.random() * 100 + "vw";
    sparkle.style.top = Math.random() * 100 + "vh";
    sparkle.style.fontSize = (Math.random() * 12 + 8) + "px";

    document.getElementById("sparkles").appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 3500);

}

setInterval(createSparkle, 900);
