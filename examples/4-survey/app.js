const title = document.querySelector('.title h2');
const result = document.querySelector('.result');

const getSurvey = async () => {
    try {
        const { data } = await axios.get('/api/4-survey');
        displaySurvey(data);
    } catch (error) {
        result.innerHTML = '<h2>There was an error</h2>';
    }
};

const displaySurvey = (data) => {
    result.innerHTML = data
        .map((item) => {
            const {
                id,
                fields: { name, votes },
            } = item;
            return `<li>
                        <div class="key">${name.toUpperCase().slice(0, 2)}</div>
                        <div>
                            <h4>${name}</h4>
                            <p>${votes} votes</p>
                        </div>
                        <button data-id="${id}" data-votes="${votes}">
                            <i class="fas fa-vote-yea"></i>
                        </button>
                    </li>`;
        })
        .join('');
};

result.addEventListener('click', async (e) => {
    const button = e.target.closest('button');
    if (!button) return;
    const id = button.dataset.id;
    const votes = button.dataset.votes;
    title.textContent = 'loading...';
    const newVotes = await updateVotes(id, votes);
    if (newVotes) {
        button.dataset.votes = newVotes;
        button.parentElement.querySelector('p').textContent = `${newVotes} votes`;
    }
    title.textContent = 'survey';
});

const updateVotes = async (id, votes) => {
    try {
        const { data } = await axios.put('/api/4-survey', { id, votes });
        const { votes: newVotes } = data.fields;
        return newVotes;
    } catch (error) {
        return null;
    }
};

window.addEventListener('DOMContentLoaded', getSurvey);
