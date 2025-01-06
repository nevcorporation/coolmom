var messageInput = document.getElementById("messageInput");
var submitButton = document.getElementById("submitButton");
var messagesList = document.getElementById("messagesList");

async function getRequest() {
    try {
        const response = await fetch('https://23eaeeec-1d54-46d2-94c7-526c09c85ccb-00-3iv6zsak4gtkb.riker.replit.dev/messages');
        const messages = await response.json();
        messagesList.innerHTML = messages.map(msg => `<li>${msg}</li>`).join('');
    } catch(error) {
        console.error('Error fetching messages: ', error);
    }
}

getRequest();
setInterval(getRequest, 1000);

submitButton.addEventListener('click', async () => {
    const message = messageInput.value.trim();
    if (message) {
        try {
            const response = await fetch('https://23eaeeec-1d54-46d2-94c7-526c09c85ccb-00-3iv6zsak4gtkb.riker.replit.dev/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message })
            });
            if (response.ok) {
                messageInput.value = '';
            } else {
                console.log('Failed to send message');
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    } else {
        console.log('Message cannot be empty');
    }
});
