document.addEventListener('DOMContentLoaded', function () {
    const refresh_btn = document.getElementById("refresh_btn");
    refresh_btn.addEventListener("click", () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { type: "get_conversation" });
        });
    });

    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        console.log(message);
        exportToDoc(message['title'], message['conversation'])
    });
});

function exportToDoc(filename = '', conversation) {
    if (conversation.length > 0) {
        var htmlBody = '';
        for (let i = 0; i < conversation.length; i++) {
            htmlBody += `<div>${conversation[i]['message_typer']}:</div> ${conversation[i]['message']} <br><br>`
        }
        var html = `
            <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
                <head><meta charset='utf-8'>
                    <title>${filename}</title>
                </head>
                <body>
                    ${htmlBody}
                </body>
            </html>`;
        //complete html
        //specify the type
        var blob = new Blob(['\ufeff', html], {
            type: 'application/msword'
        });
        // Specify link url
        var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
        // Specify file name
        filename = filename ? filename + '.doc' : 'document.doc';
        console.log(blob);
        console.log(url);
        console.log(html);
        // Create download link element
        var downloadLink = document.createElement("a");
        document.body.appendChild(downloadLink);
        if (navigator.msSaveOrOpenBlob) {
            navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            // Create a link to the file
            downloadLink.href = url;
            // Setting the file name
            downloadLink.download = filename;
            //triggering the function
            downloadLink.click();
        }
        document.body.removeChild(downloadLink);
    } else {
        document.getElementById('doc_list').innerHTML = '<p>No conversation found</p>';
    }

}