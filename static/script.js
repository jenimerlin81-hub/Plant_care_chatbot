const chatBox = document.getElementById("chat-box");

const userInput = document.getElementById("user-input");

const sendButton = document.getElementById("send-button");



/* ==========================================
   ADD MESSAGE
========================================== */

function addMessage(message, sender) {


    const messageDiv =
        document.createElement("div");


    messageDiv.classList.add("message");


    if (sender === "user") {


        messageDiv.classList.add("user-message");


        messageDiv.innerHTML = `

            <div class="message-content">

                <strong>You</strong>

                <p>
                    ${escapeHtml(message)}
                </p>

            </div>

        `;


    } else {


        messageDiv.classList.add("bot-message");


        messageDiv.innerHTML = `

            <div class="avatar">
                🌱
            </div>

            <div class="message-content">

                <strong>
                    Plant Care AI
                </strong>

                <p>
                    ${formatMessage(message)}
                </p>

            </div>

        `;

    }


    chatBox.appendChild(messageDiv);


    chatBox.scrollTop =
        chatBox.scrollHeight;

}



/* ==========================================
   SEND MESSAGE
========================================== */

async function sendMessage() {


    const message =
        userInput.value.trim();


    if (message === "") {

        return;

    }


    /* Show user question */

    addMessage(
        message,
        "user"
    );


    /* Clear input */

    userInput.value = "";


    /* Disable button */

    sendButton.disabled = true;

    sendButton.textContent =
        "Thinking...";


    try {


        const response =
            await fetch(
                "/chat",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify({

                        message: message

                    })

                }
            );


        const data =
            await response.json();


        if (data.success) {


            addMessage(
                data.reply,
                "bot"
            );


        } else {


            addMessage(
                data.reply,
                "bot"
            );

        }


    } catch (error) {


        console.error(
            "ERROR:",
            error
        );


        addMessage(
            "Unable to connect to the server. Please check Flask.",
            "bot"
        );

    }


    /* Enable button */

    sendButton.disabled = false;

    sendButton.textContent =
        "Send 🌿";


    userInput.focus();

}



/* ==========================================
   SUGGESTION BUTTON
========================================== */

function askQuestion(question) {


    userInput.value =
        question;


    sendMessage();

}



/* ==========================================
   ENTER KEY
========================================== */

userInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            sendMessage();

        }

    }
);



/* ==========================================
   SECURITY
========================================== */

function escapeHtml(text) {


    const div =
        document.createElement("div");


    div.textContent =
        text;


    return div.innerHTML;

}



/* ==========================================
   FORMAT BOT RESPONSE
========================================== */

function formatMessage(text) {


    return escapeHtml(text)
        .replace(/\n/g, "<br>");

}
