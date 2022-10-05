const form = document.querySelector('.form');
const input = document.querySelector('.email-input');
const alert = document.querySelector('.alert');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    alert.style.display = 'none';
    form.classList.add('loading');
    try {
        await axios.post('/api/6-newsletter', { email: input.value });
        form.innerHTML = '<h4>success! please check your email</h4>';
    } catch (error) {
        console.log(error.response.data);
        alert.style.display = 'block';
        alert.textContent = 'There was an error!';
    }
    form.classList.remove('loading');
});
