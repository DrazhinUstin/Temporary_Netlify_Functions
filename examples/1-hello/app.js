const resultDOM = document.querySelector('.result');

const fetchData = async () => {
    try {
        const { data } = await axios.get('/api/1-hello');
        resultDOM.textContent = data;
    } catch (error) {
        console.log(error.response.data);
    }
};

fetchData();
