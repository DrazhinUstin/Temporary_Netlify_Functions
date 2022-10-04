const form = document.querySelector('.form');
const input = document.querySelector('.form-input');
const submitBtn = document.querySelector('.submit-btn');
const alert = document.querySelector('.alert');
const result = document.querySelector('.result');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = input.value;
    if (!city) {
        alert.style.display = 'block';
        alert.textContent = 'Please, enter the city name';
        input.focus();
    } else getWeather(city);
});

const getWeather = async (city) => {
    alert.style.display = 'none';
    input.disabled = true;
    submitBtn.disabled = true;
    submitBtn.textContent = 'please wait...';
    try {
        const { data } = await axios.post('/api/5-weather', { city });
        displayWeather(data);
    } catch (error) {
        alert.style.display = 'block';
        alert.textContent = 'City not found';
    }
    input.disabled = false;
    submitBtn.disabled = false;
    submitBtn.textContent = 'get weather';
};

const displayWeather = (data) => {
    const {
        name,
        sys: { country },
        weather: [{ description }],
        main: { temp_min, temp_max, feels_like },
    } = data;
    result.innerHTML = `<article class="card">
                            <h3>${name}, ${country}</h3>
                            <p>${description}</p>
                            <p>min temp: ${temp_min}&#8451;</p>
                            <p>max temp: ${temp_max}&#8451;</p>
                            <p>feels like: ${feels_like}&#8451;</p>
                        </article>`;
};
