let context = "You are a videogame expert specialized in all aspects of gaming.";

function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (userInput === "") return;
    const userMessageDiv = document.createElement("div")
    const userMessageP = document.createElement("p");
    userMessageDiv.className = "user-message-wrapper"
    userMessageP.className = "user-message";
    userMessageP.textContent = "You: " + userInput;
    chatBox = document.getElementById("chat-box");
    chatBox.appendChild(userMessageDiv);
    userMessageDiv.appendChild(userMessageP)
    document.getElementById("user-input").value = "";

    document.querySelector("h1").classList.add("h1-waiting");

    fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ context: context, question: userInput }),
    })
    .then((response) => response.json())
    .then((data) => {
        const botMessageDiv = document.createElement("div")
        const botMessageP = document.createElement("p");
        botMessageDiv.className = "bot-message-wrapper markdown-content"
        botMessageP.className = "bot-message";
        botMessageP.textContent = "Bot: " + data.response;
        chatBox = document.getElementById("chat-box");
        chatBox.appendChild(botMessageDiv);
        botMessageDiv.appendChild(botMessageP)

        document.querySelector("h1").classList.remove("h1-waiting");

        context = data.context;
    })

    .catch((error) => {
        console.error("Error:", error);

        // Remover la clase h1-waiting incluso si hay un error
        document.querySelector("h1").classList.remove("h1-waiting");
    });
}   

document.getElementById("user-input").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});
