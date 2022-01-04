import { 
    checkAuth, 
    getCharacter,
    logout, 
    createCharacter,
    updateCharacter
} from '../fetch-utils.js';

checkAuth();

const headDropdown = document.getElementById('head-dropdown');
const middleDropdown = document.getElementById('middle-dropdown');
const bottomDropdown = document.getElementById('bottom-dropdown');
const headEl = document.getElementById('head');
const middleEl = document.getElementById('middle');
const bottomEl = document.getElementById('bottom');
const reportEl = document.getElementById('report');
const catchphrasesEl = document.getElementById('catchphrases');
const catchphraseInput = document.getElementById('catchphrase-input');
const catchphraseButton = document.getElementById('catchphrase-button');
const logoutButton = document.getElementById('logout');

let headCount = 0;
let middleCount = 0;
let bottomCount = 0;

headDropdown.addEventListener('change', async() => {
    headCount++;
    // await updateHead(headDropdown.value);
    await updateCharacter('head', headDropdown.value);

    refreshData();
});


middleDropdown.addEventListener('change', async() => {
    middleCount++;
    // await updateMiddle(middleDropdown.value);
    await updateCharacter('middle', middleDropdown.value);

    refreshData();
});


bottomDropdown.addEventListener('change', async() => {
    bottomCount++;
    // await updateBottom(bottomDropdown.value);
    await updateCharacter('bottom', bottomDropdown.value);

    refreshData();
});

catchphraseButton.addEventListener('click', async() => {
    const character = await getCharacter();

    const newCatchphrase = catchphraseInput.value;
    character.catchphrases.push(newCatchphrase);
    await updateCharacter('catchphrases', character.catchphrases);

    catchphraseInput.value = '';
    refreshData();
});

window.addEventListener('load', async() => {
    let character = {
        head: 'bird',
        middle: 'blue',
        bottom: 'leg',
        catchphrases: []
    };

    const userCharacter = await getCharacter();
    if (!userCharacter) {
        await createCharacter(character);
    }

    refreshData();
});

logoutButton.addEventListener('click', () => {
    logout();
});

function displayStats() {
    reportEl.textContent = `In this session, you have changed the head ${headCount} times, the body ${middleCount} times, and the pants ${bottomCount} times. And nobody can forget your character's classic catchphrases:`;
}



async function fetchAndDisplayCharacter() {
    const character = await getCharacter(); 

    if (character.head) {
        headEl.style.backgroundImage = `url(../assets/${character.head}-head.png)`;
    }
    if (character.middle) {
        middleEl.style.backgroundImage = `url(../assets/${character.middle}-middle.png)`;
    }
    if (character.bottom) {
        bottomEl.style.backgroundImage = `url(../assets/${character.bottom}-pants.png)`;
    }

    catchphrasesEl.textContent = '';
    for (let catchphrase of character.catchphrases) {
        const p = document.createElement('p');
        p.textContent = catchphrase;
        catchphrasesEl.append(p);
    }
}

function refreshData() {
    displayStats();
    fetchAndDisplayCharacter();
}
