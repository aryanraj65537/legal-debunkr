document.addEventListener("DOMContentLoaded", function() {
    const menuBtn = document.querySelector(".menu-btn");
    const checkbox = document.getElementById("btn");

    menuBtn.addEventListener("click", () => {
        checkbox.checked = !checkbox.checked;
    });
});
