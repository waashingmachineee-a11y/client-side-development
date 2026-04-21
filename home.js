function goResources() {
  window.location.href = "resources.html";
}

// required for assignment (LocalStorage)
localStorage.setItem("lastVisitedPage", "Home");
function saveCookie() {
  let name = document.getElementById("userName").value;

  if (name === "") {
    alert("Please enter your name");
    return;
  }

  // Create cookie (valid for 7 days)
  document.cookie = "username=" + name + "; max-age=" + (60 * 60 * 24 * 7);

  document.getElementById("cookieBox").style.display = "none";

  showWelcome(name);
}

function showWelcome(name) {
  let msg = document.getElementById("welcomeMsg");
  msg.innerText = "Welcome back, " + name + " 🎓";
  msg.style.display = "block";

  setTimeout(() => {
    msg.style.display = "none";
  }, 4000);
}

// Read cookie when page loads
window.onload = function () {
  let cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let c = cookies[i].trim();

    if (c.startsWith("username=")) {
      let name = c.substring("username=".length);
      showWelcome(name);
    }
  }
};