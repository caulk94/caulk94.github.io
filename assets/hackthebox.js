// ==========================================================
// 1. STRUTTURA DATI E VARIABILI GLOBALI
// ==========================================================
const challengeData = [
    {
        name: "Easy",
        children: [
            { name: "_", link: "#" }
        ]
    },
    {
        name: "Medium",
        children: [
            { name: "Querier", link: "HTB/Challenges/Medium/Querier.md" }
        ]
    },
    {
        name: "Hard",
        children: [
            { name: "_", link: "#" }
        ]
    }
];

// Riferimenti DOM (CORREZIONE: tutti gli elementi DOM necessari devono essere referenziati)
const challengesListWrapper = document.getElementById('challenges-list'); 
const contentDisplayWrapper = document.getElementById('content-display');
const backButton = document.getElementById('back-to-challenges'); 
const pageSubtitleElement = document.querySelector('#content-display h2'); 

let allCardsHTML = ''; // Variabile globale per memorizzare l'HTML iniziale delle card


// ==========================================================
// 2. LOGICA DI CARICAMENTO FILE E RENDERING MARKDOWN
// ==========================================================

/**
 * Funzione per caricare e visualizzare il contenuto del file Markdown (Guida)
 */
function loadFileContent(path) {
    // Nascondi la lista e mostra il bottone Indietro
    if (challengesListWrapper) challengesListWrapper.style.display = 'none';
    if (pageSubtitleElement) pageSubtitleElement.style.display = 'none'; 
    if (backButton) backButton.style.display = 'flex'; 
    
    // Svuota e prepara il contenitore per la guida
    if (contentDisplayWrapper) contentDisplayWrapper.innerHTML = ''; 

    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Impossibile caricare il file: ${path} (Status: ${response.status})`);
            }
            return response.text();
        })
        .then(markdownText => {
            const htmlContent = marked.parse(markdownText);
            
            if (contentDisplayWrapper) contentDisplayWrapper.innerHTML = htmlContent;
            
            const contentSection = document.getElementById('content');
            if (contentSection) contentSection.scrollTop = 0;
        })
        .catch(error => {
            console.error('Errore durante il caricamento del file:', error);
            if (contentDisplayWrapper) contentDisplayWrapper.innerHTML = `<p style="color: red;">Errore nel caricamento della guida: ${error.message}. Verifica che il file esista al percorso specificato.</p>`;
        });
}


// ==========================================================
// 3. LOGICA DI GENERAZIONE E INTERAZIONE (CARDS)
// ==========================================================

/**
 * Funzione per generare il contenuto HTML delle singole macchine (link interni)
 */
function generateSubchallengesHTML(children) {
    if (!children || children.length === 0) return '';
    
    let html = '<div class="subchallenges-list">';
    
    children.forEach(child => {
        html += `
            <div class="challenge-item sub-item">
                <div class="item-header" data-path="${child.link}">
                    <i class="fas fa-file-alt icon-file"></i>
                    <span class="item-title">${child.name}</span>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    return html;
}

/**
 * Funzione per generare l'HTML completo della categoria principale (il box espandibile)
 */
function generateChallengeCard(challenge) {
    const subcontent = generateSubchallengesHTML(challenge.children);
    
    return `
        <div class="challenge-card">
            <div class="card-header toggle-btn" data-target="#${challenge.name.toLowerCase().replace(/\s/g, '-')}-content">
                <div class="header-left">
                    <i class="fas fa-folder icon-folder"></i>
                    <span class="card-title">${challenge.name}</span>
                </div>
                <div class="header-right">
                    <i class="fas fa-chevron-down toggle-icon"></i>
                </div>
            </div>

            <div class="card-content" id="${challenge.name.toLowerCase().replace(/\s/g, '-')}-content">
                ${subcontent}
            </div>
        </div>
    `;
}

/**
 * Funzione per applicare la logica di espansione/compressione e i click sui file
 */
function applyToggleLogic() {
    // 1. Logica di espansione/compressione delle schede (Easy, Medium, Hard)
    document.querySelectorAll('.toggle-btn').forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const targetContent = document.querySelector(targetId);
            const card = button.closest('.challenge-card');
            
            card.classList.toggle('expanded');
            
            // Animazione di espansione/compressione basata su max-height
            if (targetContent.style.maxHeight && targetContent.style.maxHeight !== '0px') {
                targetContent.style.maxHeight = null;
            } else {
                targetContent.style.maxHeight = targetContent.scrollHeight + "px";
            }
        });
    });
    
    // 2. Logica di click sui singoli link (le macchine)
    document.querySelectorAll('.challenge-item.sub-item .item-header').forEach(itemHeader => {
        itemHeader.addEventListener('click', () => {
            const path = itemHeader.getAttribute('data-path');
            if (path) {
                loadFileContent(path);
            }
        });
    });
}


// ==========================================================
// 4. ESECUZIONE (DOMContentLoaded)
// ==========================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Genera tutte le schede e memorizza l'HTML
    challengeData.forEach(cat => {
        allCardsHTML += generateChallengeCard(cat);
    });
    
    // 2. Inietta l'HTML e applica la logica iniziale (solo se l'elemento esiste)
    if (challengesListWrapper) {
        challengesListWrapper.innerHTML = allCardsHTML;
        applyToggleLogic();
    }
    
    // 3. Configura il bottone Indietro
    if (backButton) {
        // Listener per tornare alla lista
        backButton.addEventListener('click', () => {
            // Nasconde il bottone Indietro
            backButton.style.display = 'none';
            
            // Riporta la vista a Challenge Write-Ups
            if (pageSubtitleElement) pageSubtitleElement.style.display = 'block';
            
            // Riporta la lista delle cards
            if (challengesListWrapper) {
                challengesListWrapper.style.display = 'block'; // Fai riapparire il contenitore
                challengesListWrapper.innerHTML = allCardsHTML; // Ricarica l'HTML delle card
            }
            
            // Riaplica la logica di espansione/click ai nuovi elementi DOM
            applyToggleLogic(); 
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});