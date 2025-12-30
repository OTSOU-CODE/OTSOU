document.addEventListener("DOMContentLoaded", () => {
  // View Toggle
  const viewBtns = document.querySelectorAll(".view-btn");
  const grid = document.querySelector(".vehicles-grid");
  const list = document.querySelector(".vehicles-list");

  if (viewBtns.length && grid && list) {
    viewBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        viewBtns.forEach((b) => b.classList.remove("active"));
        this.classList.add("active");

        const view = this.dataset.view;

        if (view === "list") {
          grid.style.display = "none";
          list.classList.add("active");
        } else {
          grid.style.display = "grid";
          list.classList.remove("active");

          grid.className = "vehicles-grid"; // Reset classes
          if (view === "grid-3") grid.classList.add("cols-3");
        }
      });
    });
  }

  // Compare Mode
  const compareToggle = document.getElementById("compareMode");
  const checkboxes = document.querySelectorAll(".compare-checkbox");
  const compareBtn = document.querySelector(".compare-btn");

  if (compareToggle) {
    compareToggle.addEventListener("change", function () {
      checkboxes.forEach((cb) => {
        cb.style.display = this.checked ? "block" : "none";
      });
      if (this.checked) {
        if (compareBtn) compareBtn.classList.add("active");
      } else {
        if (compareBtn) compareBtn.classList.remove("active");
        // Uncheck all when exiting compare mode
        checkboxes.forEach((cb) => (cb.checked = false));
        updateCompareCount();
      }
    });
  }

  // Update Compare Count
  function updateCompareCount() {
    const checkedCount = document.querySelectorAll(
      ".compare-checkbox:checked"
    ).length;
    if (compareBtn) {
      compareBtn.textContent = `Compare Selected (${checkedCount})`;
    }
  }

  checkboxes.forEach((cb) => {
    cb.addEventListener("change", updateCompareCount);
  });
});
