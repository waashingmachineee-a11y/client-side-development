function toggleContent(btn) {
  let content = btn.nextElementSibling;

  if (content.style.display === "block") {
    content.style.display = "none";
    btn.innerText = "View Notes";
  } else {
    content.style.display = "block";
    btn.innerText = "Hide Notes";
  }
}

// SEARCH FUNCTION (kept same, slightly improved)
function searchResources() {
  let input = document.getElementById("search").value.toLowerCase();
  let items = document.getElementsByClassName("resource");

  for (let i = 0; i < items.length; i++) {
    let text = items[i].innerText.toLowerCase();
    items[i].style.display = text.includes(input) ? "block" : "none";
  }
}
