
const editDocument = (e) => {
  documents = documents.map(item => {
    if (item.id === Number(e.target.dataset.id)) {
      item.isEditActive = !item.isEditActive
    } else {
      item.isEditActive = false
    }

    return item
  })

}

var my_previous_conversation = []

const addMessage = () => {

  // Add message to container

  const input = document.getElementById("message-area")
  if (!input.value) return alert("Value is empty");

  const messagesWrap = document.getElementById('messages-wrap')

  const message = document.createElement("p")
  message.classList.add("message")
  const messageAdditionalClass = 'my-message'
  message.classList.add(messageAdditionalClass)

  const messageSpan = document.createElement("message-name")
  messageSpan.className = "message-name"
  messageSpan.innerText = ('ME :')

  const textSpan = document.createElement("message-name")
  textSpan.innerText = input.value

  message.appendChild(messageSpan)
  message.appendChild(textSpan)
  messagesWrap.append(message)
  messagesWrap.scrollTop = messagesWrap.scrollHeight;




  let aiAnswer = ""
  const AI_MESSAGE = document.createElement("p")
  AI_MESSAGE.classList.add("message")
  const AI_messageAdditionalClass = 'app-message'
  message.classList.add(AI_messageAdditionalClass)

  const AI_MESSAGE_SPAN = document.createElement("message-name")
  messageSpan.className = "message-name"
  messageSpan.innerText = ('AI :')

  const AI_textSpan = document.createElement("message-name")
  AI_textSpan.innerText = aiAnswer

  AI_MESSAGE.appendChild(messageSpan)
  AI_MESSAGE.appendChild(AI_textSpan)
  // messagesWrap.append(AI_MESSAGE)

  messagesWrap.scrollTop = messagesWrap.scrollHeight;

  console.log("previous_conv",my_previous_conversation)




  // The API CALL

  $.ajax({
    url: "get_response",
    type: 'POST',
    data: {
      prompt: input.value,
      prev_conv: JSON.stringify(my_previous_conversation)
    },
    dataType: 'json', // added data type
    beforeSend: function () {

      messagesWrap.innerHTML += `<div class="stage">
                                    <div class="dot-pulse"></div>
                                </div>`

      messagesWrap.scrollTop = messagesWrap.scrollHeight;

    },
    success: function (res) {
      $('.stage').remove();

      let aiAnswer = res['message']

      const AI_MESSAGE = document.createElement("p")
      AI_MESSAGE.classList.add("message")
      const AI_messageAdditionalClass = 'app-message'
      message.classList.add(AI_messageAdditionalClass)
    
      const AI_MESSAGE_SPAN = document.createElement("message-name")
      messageSpan.className = "message-name"
      messageSpan.innerText = ('gpt3.5 :')
    
      const AI_textSpan = document.createElement("message-name")
      AI_textSpan.innerText = aiAnswer
    
      AI_MESSAGE.appendChild(messageSpan)
      AI_MESSAGE.appendChild(AI_textSpan)
      messagesWrap.append(AI_MESSAGE)

      messagesWrap.scrollTop = messagesWrap.scrollHeight;

      my_previous_conversation.push({"user":input.value,"assistant":aiAnswer})

      input.value = ''


    },
    error: function () {
      // $('.stage').remove();
      $('.stage').remove();
      let aiAnswer = "Something went wrong on server side, Please try again."

      const message = document.createElement("p")
      message.classList.add("message")
      const messageAdditionalClass = 'app-message'
      message.classList.add(messageAdditionalClass)

      const messageSpan = document.createElement("message-name")
      messageSpan.className = "message-name"
      messageSpan.innerText = ('AI :')

      const textSpan = document.createElement("message-name")
      textSpan.innerText = aiAnswer

      message.appendChild(messageSpan)
      message.appendChild(textSpan)
      messagesWrap.append(message)

      messagesWrap.scrollTop = messagesWrap.scrollHeight;
      input.value = ''


    }
  });
  
}



const node = document.getElementById("message-area");
node.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addMessage()
  }
});




