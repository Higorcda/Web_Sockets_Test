
function render_message(message) 
{

    const messages_list_element = document.getElementById('chat__main-messages__main');

    const message_element     =       document.createElement('div');
    message_element.className = 'chat__main-messages__main-message';

    const message_p_element           =                            document.createElement('p');
    message_p_element.innerHTML       = `<span>${message.username}</span>: ${message.message}`;

    message_element.appendChild(message_p_element);

    messages_list_element.appendChild(message_element);

}

let socket = io('http://localhost:8000');

socket.on('received_message', (data) => { render_message(data); });

socket.on('previous_messages', (messages) => 
{

    messages.forEach( (message) => { render_message(message); });

});

const send_button = document.getElementById('chat__main-new_message__form-send_button');

send_button.addEventListener('click', (event) => 
{

    const message_object = 
    {   
        username : document.getElementById('username').value,
        message  :  document.getElementById('message').value
    };

    if ((message_object.username) && (message_object.message)) 
    {

        render_message(message_object);

        socket.emit('send', message_object);

    }

});