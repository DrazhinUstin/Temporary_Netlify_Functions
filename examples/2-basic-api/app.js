const fetchData = async () => {
    try {
        const { data } = await axios.get('/api/2-basic-api');
        displayData(data);
    } catch (error) {
        console.log(error.response.data);
    }
};

const displayData = (data) => {
    document.querySelector('.result').innerHTML = data
        .map((item) => {
            const {
                name,
                price,
                image: { url },
            } = item;
            return `<article class="product">
                    <img
                        src="${url}"
                        alt="${name}"
                    />
                    <div class="info">
                        <h5>${name}</h5>
                        <h5 class="price">$${price}</h5>
                    </div>
                </article>`;
        })
        .join('');
};

document.addEventListener('DOMContentLoaded', fetchData);
