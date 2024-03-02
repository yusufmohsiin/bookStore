const loginForm = document.querySelector("#form")
const registerForm = document.querySelector("#register")

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const url = "http://localhost:3002/api/users/login";

  try {
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    
    if (response.ok) {
      const data = await response.json();
      console.log(data.token);


      sessionStorage.setItem("token", data.token);

      console.log("Login successful:", data);
      window.location.href="userProfile.html"

    } else {
      const errorMessage = await response.text();
      console.error("Login failed:", errorMessage);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
