let states;
const qs = (selector) => document.querySelector(selector);

const init = async () => {
    await loadStates();
    renderStates();
    loadFilterButtons();
}

const loadStates = async () => states = await (await fetch('./bundesland.json')).json();

const renderStates = (filter = '') => {
    qs('.states').innerHTML = '';
    for (const state of states) {
        if (fitsFilter(state, filter)) qs('.states').innerHTML += stateTemplate(state);
    }
}

const fitsFilter = ({ name }, filter) => name[0].includes(filter);

const loadFilterButtons = () => {
    const uniqueLetters = [...new Set(states.map(({ name }) => name[0]))];
    for (const letter of uniqueLetters) {
        qs('.filters').innerHTML += filterTemplate(letter);
    }
}

// TEMPLATES

const stateTemplate = ({ name, population, url }) => {
    return /*html*/`
        <a class="state" href="${url}">
            <state-header>${name.replace('-', ' - ')}</state-header>
            <div class="population">${population.toString().replace('.', ',')} Millionen</div>
        </a>
    `
}

const filterTemplate = (letter) => {
    return /*html*/ `
        <div class="filter" onclick="renderStates('${letter}')">${letter}</div>
    `
}