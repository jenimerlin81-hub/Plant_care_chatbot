from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


# ==========================================
# HOME PAGE
# ==========================================

@app.route("/")
def home():
    return render_template("index.html")


# ==========================================
# TEST CHAT API
# ==========================================

@app.route("/chat", methods=["POST"])
def chat():

    try:

        data = request.get_json()

        if not data:
            return jsonify({
                "success": False,
                "reply": "Please enter a message."
            })

        message = data.get("message", "").strip()

        print("USER:", message)

        if message == "":
            return jsonify({
                "success": False,
                "reply": "Please type something."
            })


        # Simple test responses
        message_lower = message.lower()


        if "hi" in message_lower or "hello" in message_lower:

            reply = """
Hello! 🌱

Welcome to Plant Care Chatbot.

I can help you with:
💧 Watering
☀️ Sunlight
🌱 Soil
🍃 Plant problems
🌿 Plant growth
"""


        elif "water" in message_lower:

            reply = """
💧 Watering Tip:

Water your plant when the top layer of soil becomes dry.

Avoid overwatering because it can damage the roots.
"""


        elif "sunlight" in message_lower:

            reply = """
☀️ Sunlight Tip:

Most plants need suitable sunlight for healthy growth.

Avoid keeping plants in very harsh direct sunlight unless they need it.
"""


        elif "soil" in message_lower:

            reply = """
🌱 Soil Tip:

Use well-draining soil so that excess water can drain away easily.
"""


        elif "yellow" in message_lower:

            reply = """
🍃 Yellow Leaves:

Yellow leaves can happen because of overwatering,
insufficient light, or other plant-care issues.

Check the soil moisture and lighting first.
"""


        else:

            reply = """
🌱 I am your Plant Care Chatbot.

You can ask me about:

💧 Watering
☀️ Sunlight
🌱 Soil
🍃 Yellow leaves
🌿 Plant growth

Please ask a plant-care question.
"""


        print("BOT:", reply)


        return jsonify({
            "success": True,
            "reply": reply
        })


    except Exception as error:

        print("ERROR:", error)

        return jsonify({
            "success": False,
            "reply": "Something went wrong in Flask."
        })


# ==========================================
# RUN SERVER
# ==========================================

if __name__ == "__main__":

    print("================================")
    print("🌱 Plant Care Chatbot")
    print("================================")
    print("Open: http://127.0.0.1:5000")
    print("================================")

    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )