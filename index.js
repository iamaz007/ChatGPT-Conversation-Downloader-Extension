// if (document.readyState !== 'complete') {
//     window.addEventListener('load', afterWindowLoaded);
// } else {
//     afterWindowLoaded();
// }
$(document).ready(function () {
    getConversation();
})

function getConversation() {
    //Everything that needs to happen after the window is fully loaded.
    var conversations = [];
    var conversation_object = {};
    $('div.w-full.border-b').each(function (index) {
        // console.log(index + ": " + $(this).find());
        var message = $(this).find('div.whitespace-pre-wrap');
        // console.log(message);
        var messageWriter = $(message).find('div.markdown.prose');
        // console.log(messageWriter);
        if (messageWriter.length > 0) {
            conversation_object = {
                'message_typer': 'bot',
            }
        } else {
            conversation_object = {
                'message_typer': 'me',
            }
        }
        conversation_object['message'] = message.html();

        // push to main array
        conversations.push(conversation_object);
    });
    console.log(conversations)
}