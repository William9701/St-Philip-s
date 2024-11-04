document.addEventListener("DOMContentLoaded", function () {
    // Toggle forms for toggleCheckbox3
    const toggleCheckbox3 = document.getElementById("dark-mode-toggle3");
    const martinForm3 = document.getElementById("SnMartinForm");
    const eucaruisticForm3 = document.getElementById("SnEucaristicForm");
  
    if (toggleCheckbox3 && martinForm3 && eucaruisticForm3) {
      function toggleForms3() {
        if (toggleCheckbox3.checked) {
          martinForm3.style.display = "block";
          eucaruisticForm3.style.display = "none";
        } else {
          martinForm3.style.display = "none";
          eucaruisticForm3.style.display = "block";
        }
      }
      toggleCheckbox3.addEventListener("change", toggleForms3);
    }
  
    // Toggle forms for toggleCheckbox2
    const toggleCheckbox2 = document.getElementById("dark-mode-toggle2");
    const martinForm2 = document.getElementById("ssMartinForm");
    const eucaruisticForm2 = document.getElementById("ssEucaristicForm");
  
    if (toggleCheckbox2 && martinForm2 && eucaruisticForm2) {
      function toggleForms1() {
        if (toggleCheckbox2.checked) {
          martinForm2.style.display = "none";
          eucaruisticForm2.style.display = "block";
        } else {
          martinForm2.style.display = "block";
          eucaruisticForm2.style.display = "none";
        }
      }
      toggleCheckbox2.addEventListener("change", toggleForms1);
    }
  
    // Toggle forms for toggleCheckbox
    const toggleCheckbox = document.getElementById("dark-mode-toggle");
    const martinForm = document.getElementById("MartinForm");
    const eucaruisticForm = document.getElementById("EucaristicForm");
  
    if (toggleCheckbox && martinForm && eucaruisticForm) {
      function toggleForms() {
        if (toggleCheckbox.checked) {
          martinForm.style.display = "block";
          eucaruisticForm.style.display = "none";
        } else {
          martinForm.style.display = "none";
          eucaruisticForm.style.display = "block";
        }
      }
      toggleCheckbox.addEventListener("change", toggleForms);
    }
  });
  