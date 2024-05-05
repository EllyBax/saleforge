document.addEventListener("DOMContentLoaded", () => {
  //theme toggle

  var themeCategories = document.querySelector(".themeCategories");
  var chevy = document.getElementById("chevy");

  // Initially hide themeCategories and set chevron icons
  chevy.style.transform = "none";
  themeCategories.style.display = "none";
  document
    .querySelector(".toggleThemes")
    .addEventListener("click", function () {
      // Toggle themeCategories visibility
      if (themeCategories.style.display === "none") {
        themeCategories.style.display = "block";
        chevy.style.transform = "rotate(180deg)";
      } else {
        themeCategories.style.display = "none";
        chevy.style.transform = "none";
      }
    });

  light.addEventListener("click", () => {
    // remove/hide themeCategories and set chevron icons
    chevy.style.transform = "none";
    themeCategories.style.display = "none";
    changeTheme("light");
  });
  dark.addEventListener("click", () => {
    // remove/hide themeCategories and set chevron icons
    chevy.style.transform = "none";
    themeCategories.style.display = "none";
    changeTheme("dark");
  });
  auto.addEventListener("click", () => {
    // remove/hide themeCategories and set chevron icons
    chevy.style.transform = "none";
    themeCategories.style.display = "none";
    changeTheme("");
  });

  function changeTheme(theme) {
    document.querySelector("html").classList = theme;
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menuButton");
  const menuIcon = document.querySelector(".bx-menu");
  const navLinks = document.getElementById("navLinks");
  const links = document.getElementsByClassName("link");

  menuButton.addEventListener("click", function () {
    navLinks.classList.toggle("show");
    if (menuIcon.classList.contains("bx-menu")) {
      menuIcon.classList.replace("bx-menu", "bx-x");
    } else {
      menuIcon.classList.replace("bx-x", "bx-menu");
    }
  });

  // Loop through each link and add an event listener
  for (let i = 0; i < links.length; i++) {
    links[i].addEventListener("click", function (event) {
      // Prevent the default link behavior
      event.preventDefault();
      // Remove the 'show' class from navLinks
      navLinks.classList.remove("show");
      // Redirect after a short delay to allow the 'show' class to be removed
      setTimeout(function () {
        window.location.href = links[i].href;
      }, 100); // Adjust the delay as needed
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  //FabButton
  const fabButton = document.getElementById("fabButton");
  const actionsDiv = document.getElementById("actions");

  fabButton.addEventListener("click", () => {
    actionsDiv.classList.toggle("show");
  });

  //sales forms
  const addSaleButton = document.getElementById("addSale");
  const deleteSaleButton = document.getElementById("deleteSale");
  const entryForm = document.getElementById("entryForm");
  const deleteForm = document.getElementById("deleteForm");
  const closeButton = document.getElementById("closeButton");
  const closeEntryForm = document.getElementById("closeEntryForm");
  const salesTable = document.getElementById("salesTable");

  addSaleButton.addEventListener("click", () => {
    actionsDiv.classList.toggle("show");
    entryForm.classList.toggle("show");
    //scrollinto view of loaded element
    entryForm.scrollIntoView({ behavior: "smooth" });
  });

  deleteSaleButton.addEventListener("click", () => {
    actionsDiv.classList.toggle("show");
    deleteForm.classList.toggle("show");
    //scrollinto view of loaded element
    deleteForm.scrollIntoView({ behavior: "smooth" });
  });

  closeEntryForm.addEventListener("click", () => {
    salesTable.scrollIntoView({ behavior: "smooth" });
    entryForm.classList.remove("show");
  });

  closeButton.addEventListener("click", () => {
    salesTable.scrollIntoView({ behavior: "smooth" });
    deleteForm.classList.remove("show");
  });
});