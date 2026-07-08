// ===============================
// builder.js
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    // Back Button
    const backBtn = document.querySelector(".back-btn");

    if (backBtn) {
        backBtn.addEventListener("click", () => {
            window.location.href = "index.html";
        });
    }

   document.querySelectorAll(".btn-choose-mock").forEach(btn=>{

    btn.addEventListener("click",function(e){

        e.stopPropagation();

        const card=this.closest(".template-showcase-card");

        const template=card.dataset.templateId;

        window.location.href=
        "builder-input-form.html?template="+template;

    });

});

});