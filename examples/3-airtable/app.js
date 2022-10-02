const result = document.querySelector('.result');

const getProducts = async () => {
    try {
        const { data } = await axios.get('/api/3-airtable');
        const products = data.map((item) => {
            const {
                sys: { id },
                fields: {
                    title,
                    price,
                    images: [image],
                },
            } = item;
            return { id, title, price, url: image.fields.file.url };
        });
        displayProducts(products);
    } catch (error) {
        result.innerHTML = '<h2>server error</h2>';
    }
};

const displayProducts = (products) => {
    result.innerHTML = products
        .map(({ id, title, price, url }) => {
            return `<a href="product.html?id=${id}" class="product">
                    <img src="${url}" alt="${title}">
                    <div class="info">
                        <h5>${title}</h5>
                        <h5 class="price">$${(price / 100).toFixed(2)}</h5>
                    </div>
                </a>`;
        })
        .join('');
};

getProducts();
