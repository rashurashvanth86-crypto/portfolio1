document.getElementById("contactForm").addEventListener("submit", async function(e) {

  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  try {

    const response = await fetch("https://portfolio-fks1.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, message })
    });

    const data = await response.json();

    if (data.success) {
      document.getElementById("status").innerText = "Message Sent Successfully!";
      document.getElementById("contactForm").reset();
    } else {
      document.getElementById("status").innerText = "Failed to send message.";
    }

  } catch (error) {
    document.getElementById("status").innerText = "Server error.";
    console.log(error);
  }

});
