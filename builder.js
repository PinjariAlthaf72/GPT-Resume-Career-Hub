const headshotFilter = document.getElementById("headshotFilter");
const graphicsFilter = document.getElementById("graphicsFilter");
const columnsFilter = document.getElementById("columnsFilter");
const experienceFilter = document.getElementById("experienceFilter");

function filterTemplates() {

    const headshot = headshotFilter.value;
    const graphics = graphicsFilter.value;
    const columns = columnsFilter.value;
    const experience = experienceFilter.value;

    document.querySelectorAll(".template-card").forEach(card => {

        let show = true;

        if (
            headshot &&
            card.dataset.headshot !== headshot
        ) {
            show = false;
        }

        if (
            graphics &&
            card.dataset.graphics !== graphics
        ) {
            show = false;
        }

        if (
            columns &&
            card.dataset.columns !== columns
        ) {
            show = false;
        }

        if (
            experience &&
            card.dataset.experience !== experience
        ) {
            show = false;
        }

        card.style.display = show ? "block" : "none";

    });

}

headshotFilter.addEventListener("change", filterTemplates);
graphicsFilter.addEventListener("change", filterTemplates);
columnsFilter.addEventListener("change", filterTemplates);
experienceFilter.addEventListener("change", filterTemplates);


const cards = document.querySelectorAll(".template-card");

const modal = document.getElementById("previewModal");
const previewImage = document.getElementById("previewImage");
const title = document.getElementById("templateTitle");
const featureList = document.getElementById("templateFeatures");

let current = 0;

// ----------------------------
// OPEN PREVIEW
// ----------------------------
function openPreview(index) {

    current = index;

    const card = cards[current];

    // Preview Image
    previewImage.src = card.querySelector(".resume-preview img").src;

    // Template Name
    title.textContent =
        card.dataset.name ||
        card.querySelector("h3").textContent;

    // Template Features
    featureList.innerHTML = "";

    const features = (card.dataset.features || "").split("|");

    features.forEach(feature => {

        if(feature.trim() !== ""){

            const li = document.createElement("li");

            li.innerHTML = "✔ " + feature;

            featureList.appendChild(li);

        }

    });

    // Open Modal
    modal.style.display = "flex";

}

// ----------------------------
// CARD CLICK
// ----------------------------
cards.forEach((card,index)=>{

    card.addEventListener("click",function(e){

        if(e.target.classList.contains("choose-btn"))
            return;

        openPreview(index);

    });

});

// ----------------------------
// CLOSE
// ----------------------------
document.querySelector(".close-preview").onclick=function(){

    modal.style.display="none";

}

// ----------------------------
// PREVIOUS
// ----------------------------
document.querySelector(".prev").onclick=function(){

    current--;

    if(current<0)
        current=cards.length-1;

    openPreview(current);

}

// ----------------------------
// NEXT
// ----------------------------
document.querySelector(".next").onclick=function(){

    current++;

    if(current>=cards.length)
        current=0;

    openPreview(current);

}

// ----------------------------
// OUTSIDE CLICK
// ----------------------------
window.onclick=function(e){

    if(e.target===modal){

        modal.style.display="none";

    }

}

// ----------------------------
// ESC CLOSE
// ----------------------------
document.addEventListener("keydown",function(e){

    if(e.key==="Escape"){

        modal.style.display="none";

    }

});

// ----------------------------
// CHOOSE TEMPLATE
// ----------------------------
document.getElementById("chooseTemplateBtn").onclick=function(){

    cards[current]
        .querySelector(".choose-btn")
        .click();

}
// ----------------------------
// CHOOSE TEMPLATE
// ----------------------------
document.getElementById("chooseTemplateBtn").onclick=function(){

    cards[current]
        .querySelector(".choose-btn")
        .click();

}

///// BACK BUTTON 


 document.querySelector(".back-btn").addEventListener("click", () => {
    window.location.href = "index.html";
});