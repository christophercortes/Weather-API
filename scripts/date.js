document.getElementById("date").textContent = document.lastModified;
const year = new Date();
document.getElementById("year").textContent = new Date().getFullYear(
  "en-US",
  year
);
