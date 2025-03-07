document.addEventListener('DOMContentLoaded', function () {

    // ✅ Enhanced Symptom Checker Responses
    const symptomsData = {
        headache: "Drink plenty of water, rest in a quiet place, and avoid bright screens. If persistent, consult a doctor.",
        fever: "Stay hydrated, rest, and take paracetamol if needed. Seek medical attention if fever lasts more than 3 days.",
        cough: "Drink warm fluids, use honey and ginger, and avoid cold drinks. If severe, check for respiratory infection.",
        stomach_pain: "Eat light meals, avoid spicy foods, and drink peppermint tea. If pain is sharp or persistent, consult a doctor.",
        fatigue: "Ensure adequate sleep, eat iron-rich foods, and reduce caffeine intake.",
        sore_throat: "Gargle with warm salt water, drink herbal tea, and avoid irritants.",
        nausea: "Eat light foods, avoid strong smells, and drink ginger tea.",
        dizziness: "Rest in a cool area, drink water, and check for low blood sugar.",
        body_aches: "Stretch, take warm baths, and stay hydrated.",
        breathing_difficulty: "Seek emergency medical help immediately!"
    };

    document.getElementById('symptom-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const symptomInput = document.getElementById('symptoms').value.toLowerCase();
        document.getElementById('symptom-result').textContent = symptomsData[symptomInput] || 
            "No data found for this symptom. Please consult a doctor.";
    });

    // ✅ Expanded Diet Recommendations
    const dietData = {
        fever: "Eat light meals like soups, boiled vegetables, and drink herbal tea. Stay hydrated with coconut water.",
        cough: "Drink warm ginger tea, honey lemon water, and eat vitamin C-rich fruits like oranges.",
        headache: "Consume magnesium-rich foods like nuts, spinach, whole grains, and drink chamomile tea.",
        stomach_pain: "Eat bananas, rice, applesauce, and avoid dairy or greasy food.",
        fatigue: "Eat iron-rich foods like spinach, lentils, nuts, and drink plenty of water.",
        sore_throat: "Drink warm broths, honey lemon tea, and eat soft foods like mashed potatoes.",
        nausea: "Try dry crackers, bananas, and avoid acidic foods.",
        dizziness: "Drink electrolyte-rich fluids, eat lean proteins, and avoid skipping meals.",
        muscle_pain: "Eat anti-inflammatory foods like berries, fatty fish, and turmeric milk.",
        anxiety: "Consume omega-3-rich foods like salmon, nuts, and drink green tea."
    };

    document.getElementById('diet-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const selectedCondition = document.getElementById('diet-options').value;
        document.getElementById('diet-result').textContent = dietData[selectedCondition] || 
            "No diet recommendation available.";
    });

    // ✅ Expanded First Aid Tips
    const firstAidTips = {
        burn: "Run cool water over the burn for 10 minutes. Do not apply ice. Cover with a sterile bandage. Seek medical help if severe.",
        cut: "Apply pressure to stop bleeding. Clean the wound with mild soap and water. Cover with a clean bandage.",
        choking: "Perform the Heimlich maneuver. If the person is unconscious, call emergency services immediately.",
        fracture: "Keep the injured limb still and support it with a splint. Seek medical help immediately.",
        nosebleed: "Pinch your nostrils together and lean forward for 10 minutes. Do not tilt your head back.",
        poisoning: "Do not induce vomiting. Call poison control immediately and seek medical help.",
        electric_shock: "Turn off the power source. Do not touch the person directly. Call emergency services immediately.",
        heatstroke: "Move to a cool area, drink water, and place cold cloths on the body. Seek medical attention.",
        hypothermia: "Gradually warm the person with blankets and warm drinks. Avoid sudden heat exposure.",
        seizure: "Ensure the person is lying on their side. Do not put anything in their mouth. Seek medical attention if it lasts more than 5 minutes."
    };

    document.getElementById('get-first-aid').addEventListener('click', function () {
        const selectedIssue = document.getElementById('first-aid-options').value;
        document.getElementById('first-aid-info').textContent = firstAidTips[selectedIssue] || 
            "Please select a valid option.";
    });

    // ✅ Mental Health Tracker
    document.getElementById('check-mood').addEventListener('click', function () {
        const mood = document.getElementById('mood').value;
        const moodAdvice = {
            Happy: "Keep up the positive energy! Engage in activities you love.",
            Stressed: "Take deep breaths, meditate, or go for a short walk.",
            Anxious: "Try mindfulness exercises, avoid caffeine, and focus on deep breathing.",
            Depressed: "Talk to a loved one, listen to calming music, and seek professional help if needed.",
            Neutral: "Maintain a balanced routine and focus on self-care."
        };
        document.getElementById('mood-advice').textContent = moodAdvice[mood];
    });

    // ✅ AI Chatbot for Health Queries // 
 const API_KEY = 'AIzaSyDTKOTZ76UiPftgpR7jNyaLJtrCW-Kq6mQ'; 
// Replace with your actual Gemini API key – this stores the API key to authenticate requests to the Gemini API.

const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';
// The base URL of the Gemini API used to generate content (for text-based responses).

const chatMessages = document.getElementById('chat-messages');
// Gets the DOM element with the ID 'chat-messages', where the chat messages (user and bot) will be displayed.

const userInput = document.getElementById('user-input');
// Gets the DOM element with the ID 'user-input', which is the input field where the user types their message.

const sendButton = document.getElementById('send-button');
// Gets the DOM element with the ID 'send-button', which is the button the user clicks to send their message.

async function generateResponse(prompt) {
// Defines an asynchronous function `generateResponse` that takes the user's input (prompt) and generates a response from the API.

    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
    // Sends a POST request to the Gemini API endpoint with the API key appended to the URL.
        method: 'POST',
        // Specifies the HTTP method (POST) to send data to the API.

        headers: {
            'Content-Type': 'application/json',
        },
        // Sets the request headers to indicate that the content being sent is in JSON format.

        body: JSON.stringify({
        // The body of the request, converting the user's message into the format required by the API.
            contents: [
                {
                    parts: [
                        {
                            text: prompt
                            // The user's input (`prompt`) is inserted into the request payload.
                        }
                    ]
                }
            ]
        })
    });

    if (!response.ok) {
    // Checks if the API request was unsuccessful (i.e., the response is not OK).
        throw new Error('Failed to generate response');
        // If there's an error, an exception is thrown with an error message.
    }

    const data = await response.json();
    // Converts the API response to JSON format.

    return data.candidates[0].content.parts[0].text;
    // Returns the first generated response from the API (the text part of the response).
}

function cleanMarkdown(text) {
// Defines a function `cleanMarkdown` to remove any Markdown formatting (like headers, bold text, etc.) from the response.
    return text
        .replace(/#{1,6}\s?/g, '')
        // Removes any Markdown headers (e.g., #, ##, ###).

        .replace(/\*\*/g, '')
        // Removes bold formatting (double asterisks **).

        .replace(/\n{3,}/g, '\n\n')
        // Limits excessive newlines to a maximum of two (replaces more than two newlines with two).

        .trim();
        // Removes any whitespace from the start and end of the string.
}

function addMessage(message, isUser) {
// Defines a function `addMessage` to add a new message to the chat display. It takes the `message` (text) and `isUser` (boolean indicating whether the message is from the user or the bot).
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    // Creates a new `div` element for the message and adds the 'message' CSS class.

    messageElement.classList.add(isUser ? 'user-message' : 'bot-message');
    // Adds a class based on whether the message is from the user ('user-message') or the bot ('bot-message').

    const profileImage = document.createElement('img');
    profileImage.classList.add('profile-image');
    // Creates an image element for the profile picture (either the user or the bot) and adds the 'profile-image' CSS class.

    profileImage.src = isUser ? 'user.jpg' : 'bot.jpg';
    // Sets the image source depending on whether it's a user or bot message ('user.jpg' or 'bot.jpg').

    profileImage.alt = isUser ? 'User' : 'Bot';
    // Sets the alternate text for the image (for accessibility), either 'User' or 'Bot'.

    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    // Creates a `div` element to hold the text content of the message and adds the 'message-content' CSS class.

    messageContent.textContent = message;
    // Sets the text content of the message.

    messageElement.appendChild(profileImage);
    messageElement.appendChild(messageContent);
    // Appends the profile image and message content to the message element.

    chatMessages.appendChild(messageElement);
    // Appends the complete message (with profile image and text) to the chat messages section.

    chatMessages.scrollTop = chatMessages.scrollHeight;
    // Scrolls the chat to the bottom to ensure the latest message is visible.
}

async function handleUserInput() {
// Defines an asynchronous function `handleUserInput` to process and handle the user’s input.
    const userMessage = userInput.value.trim();
    // Retrieves the user input from the input field and trims any leading/trailing whitespace.

    if (userMessage) {
    // If the user has entered a message (i.e., it's not empty):
        addMessage(userMessage, true);
        // Adds the user's message to the chat (as a user message).

        userInput.value = '';
        // Clears the input field.

        sendButton.disabled = true;
        userInput.disabled = true;
        // Disables the send button and the input field to prevent multiple messages being sent while the bot responds.

        try {
            const botMessage = await generateResponse(userMessage);
            // Calls the `generateResponse` function to get the bot's reply.

            addMessage(cleanMarkdown(botMessage), false);
            // Adds the bot's cleaned response to the chat.
        } catch (error) {
            console.error('Error:', error);
            // Logs any error that occurs during the bot response.

            addMessage('Sorry, I encountered an error. Please try again.', false);
            // Displays an error message in the chat if something goes wrong.
        } finally {
            sendButton.disabled = false;
            userInput.disabled = false;
            userInput.focus();
            // Re-enables the send button and the input field, and puts the focus back on the input for further user interaction.
        }
    }
}

sendButton.addEventListener('click', handleUserInput);
// Adds an event listener to the send button that calls `handleUserInput` when clicked.

userInput.addEventListener('keypress', (e) => {
// Adds an event listener for when a key is pressed in the input field.
    if (e.key === 'Enter' && !e.shiftKey) {
    // Checks if the 'Enter' key is pressed and Shift is not held (to distinguish from Shift+Enter for newlines).
        e.preventDefault();
        // Prevents the default behavior of adding a newline.

        handleUserInput();
        // Calls `handleUserInput` to send the message.
    }
});
});