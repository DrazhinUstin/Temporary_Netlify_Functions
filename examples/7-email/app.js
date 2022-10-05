const nameInput = document.querySelector('.name-input');
const emailInput = document.querySelector('.email-input');
const subjectInput = document.querySelector('.subject-input');
const messageInput = document.querySelector('.message-input');
const form = document.querySelector('.form');
const submitBtn = document.querySelector('.submit-btn');
const alert = document.querySelector('.alert');
const title = document.querySelector('.title');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    alert.style.display = 'none';
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="sending"></span>';
    try {
        const name = nameInput.value;
        const email = emailInput.value;
        const subject = subjectInput.value;
        const message = messageInput.value;
        await axios.post('/api/7-email', { name, email, subject, message });
        nameInput.value = '';
        emailInput.value = '';
        subjectInput.value = '';
        messageInput.value = '';
        title.textContent = 'message sent';
        setTimeout(() => (title.textContent = 'send a message'), 3000);
    } catch (error) {
        alert.style.display = 'block';
        alert.textContent = error.response.data;
    }
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'send';
});
