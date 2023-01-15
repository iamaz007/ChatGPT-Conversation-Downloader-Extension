chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "get_conversation") {
        getConversation();
    }
});

function getConversation() {
    var title = '';
    var conversation = [];
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
        conversation.push(conversation_object);
    });
    // get title
    $('#__next div.overflow-hidden div.dark nav div.flex-col div a').each(function (index) {
        if (!$(this).hasClass('hover:bg-[#2A2B32]')) {
            title = $(this).text();
        }
    });
    // console.log(title)
    // console.log(conversation)

    // return data to popup.js
    chrome.runtime.sendMessage({
        'title': title,
        'conversation': conversation,
    }, function (response) {
        console.log(response);
    });
}
