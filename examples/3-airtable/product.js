const result = document.querySelector('.result');

const getProduct = async () => {
    const id = window.location.search;
    try {
        const { data } = await axios.get(`/api/3-airtable${id}`);
        displayProduct(data);
    } catch (error) {
        result.innerHTML = '<h2>product not found</h2>';
    }
};

const displayProduct = (product) => {
    const {
        fields: {
            title,
            price,
            description,
            images: [image],
        },
    } = product;
    result.innerHTML = `<h1 class="title">${title}</h1>
                        <article class="product">
                            <img
                                class="product-img"
                                src="${image.fields.file.url}"
                                alt="${title}"
                            />
                            <div class="product-info">
                                <h5 class="title">${title}</h5>
                                <h5 class="price">$${(price / 100).toFixed(2)}</h5>
                                <p class="desc">${description}</p>
                            </div>
                        </article>`;
};

getProduct();
