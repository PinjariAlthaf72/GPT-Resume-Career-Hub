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