document.addEventListener("DOMContentLoaded", () => {
  const chatContainer = document.getElementById("chatContainer");
  const messageInput = document.getElementById("messageInput");
  const sendButton = document.getElementById("sendButton");

  const initialMessages = [
    "Запускаємо курс з арбітражу трафіку! Отримайте цінні знання від експертів. Поглиблене вивчення сучасних стратегій.",
    "Приєднуйтесь до нашого нового курсу! Інтерактивні заняття, практичні завдання, сертифікат. Відмінна можливість підвищити кваліфікацію.",
    "Учасники отримають доступ до ексклюзивних матеріалів, консультацій та мережі контактів. Вивчайте нові тенденції арбітражу трафіку.",
  ];

  const questions = [
    {
      text: "Хочете дізнатися більше?",
      answers: ["Так", "Hi"],
    },
    {
      text: "Чи був у вас досвід пов'язаний із Арбітражем трафіку?",
      answers: ["Так", "Ні", "Чув про це"],
    },
    {
      text: "Скільки часу ви могли б приділяти на день?",
      answers: ["Одна година", "2-3 години", "5 і більше"],
    },
  ];

  let currentQuestionIndex = 0;
  let stopInteraction = false;

  function addMessage(message, type = "message") {
    const messageEl = document.createElement("div");
    messageEl.classList.add(type);
    messageEl.textContent = message;
    chatContainer.appendChild(messageEl);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  function showInitialMessages() {
    initialMessages.forEach((msg) => {
      addMessage(msg);
    });
    setTimeout(showNextQuestion, 1000);
  }

  function showNextQuestion() {
    if (stopInteraction) return;

    if (currentQuestionIndex < questions.length) {
      const question = questions[currentQuestionIndex];
      const questionContainer = document.createElement("div");
      questionContainer.classList.add("question-container");

      const questionText = document.createElement("div");
      questionText.textContent = question.text;
      questionContainer.appendChild(questionText);

      const answersContainer = document.createElement("div");
      answersContainer.classList.add("answer-buttons");

      question.answers.forEach((answer) => {
        const answerButton = document.createElement("button");
        answerButton.classList.add("answer-button");
        answerButton.textContent = answer;
        answerButton.addEventListener("click", () => handleAnswer(answer));
        answersContainer.appendChild(answerButton);
      });

      questionContainer.appendChild(answersContainer);
      chatContainer.appendChild(questionContainer);
      chatContainer.scrollTop = chatContainer.scrollHeight;
      currentQuestionIndex++;
    } else {
      addMessage(
        "Чудово! Для реєстрації на курс заповніть, будь ласка, форму."
      );
      showForm();
    }
  }

  function handleAnswer(answer) {
    addMessage(answer, "user-message");

    if (answer === "Hi") {
      addMessage("Дякую за вашу відповідь, чекаємо на ваше повернення");
      stopInteraction = true;
      return;
    }

    showNextQuestion();
  }

  function showForm() {
    const formContainer = document.createElement("div");
    formContainer.classList.add("form-container");

    const form = document.createElement("form");
    form.innerHTML = `
        <input type="text" id="nameInput" class="form-input" placeholder="Ваше ім'я" required>
        <input type="text" id="lastNameInput" class="form-input" placeholder="Ваше прізвище" required>
        <input type="email" id="emailInput" class="form-input" placeholder="Електронна пошта" required>
        <input type="tel" id="phoneInput" class="form-input" placeholder="Номер телефону (+38 XXX XXX XX XX)" 
               pattern="\\+38\\s?[0-9]{3}\\s?[0-9]{3}\\s?[0-9]{2}\\s?[0-9]{2}" 
               title="Введіть номер у форматі +38 XXX XXX XX XX">
        <button type="submit" class="form-submit-button">Надіслати</button>
      `;

    form.addEventListener("submit", handleFormSubmit);
    formContainer.appendChild(form);
    chatContainer.appendChild(formContainer);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    const name = document.getElementById("nameInput").value.trim();
    const lastName = document.getElementById("lastNameInput").value.trim();
    const email = document.getElementById("emailInput").value.trim();
    const phone = document.getElementById("phoneInput").value.trim();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert("Введіть коректну електронну пошту");
      return;
    }

    const phoneRegex = /^\+38\s?[0-9]{3}\s?[0-9]{3}\s?[0-9]{2}\s?[0-9]{2}$/;
    if (!phoneRegex.test(phone)) {
      alert("Введіть номер телефону у форматі +38 XXX XXX XX XX");
      return;
    }

    const queryParams = new URLSearchParams({
      name: `${name} ${lastName}`,
      email: email,
      phone: phone,
    });

    window.location.href = `success.html?${queryParams.toString()}`;
  }

  sendButton.addEventListener("click", () => {
    const message = messageInput.value.trim();
    if (message) {
      addMessage(message, "user-message");
      messageInput.value = "";
    }
  });

  messageInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const message = messageInput.value.trim();
      if (message) {
        addMessage(message, "user-message");
        messageInput.value = "";
      }
    }
  });

  showInitialMessages();
});
