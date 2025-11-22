// 1. Struttura Dati
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
            { name: "Querier", link: "HTB/Challenge/Medium/Querier" }
        ]
    },
    {
        name: "Hard",
        children: [
            { name: "_", link: "#" }
        ]
    }
];

const challengeList = document.getElementById('challenges-list');
const contentDisplay = document.getElementById('content-display');


/**
 * Funzione per caricare e visualizzare il contenuto del file (REINSERITO per link interni)
 */
function loadFileContent(path) {
    // Rimuovi la classe 'active' da eventuali elementi precedenti se necessario (non applicabile qui)
    
    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Impossibile caricare il file: ${path} (Status: ${response.status})`);
            }
            return response.text();
        })
        .then(markdownText => {
            // Converte il Markdown in HTML
            const htmlContent = marked.parse(markdownText);
            contentDisplay.innerHTML = htmlContent;
            document.getElementById('content').scrollTop = 0;
        })
        .catch(error => {
            console.error('Errore durante il caricamento del file:', error);
            contentDisplay.innerHTML = `<p style="color: red;">Errore nel caricamento della guida: ${error.message}.</p>`;
        });
}


/**
 * Funzione per generare il contenuto HTML delle singole macchine (link interni)
 */
function generateSubchallengesHTML(children) {
    if (!children || children.length === 0) return '';
    
    let html = '<div class="subchallenges-list">';
    
    children.forEach(child => {
        // Usa data-path per memorizzare il percorso del file
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
            <div class="card-header toggle-btn" data-target="#${challenge.name.toLowerCase()}">
                <div class="header-left">
                    <i class="fas fa-folder icon-folder"></i>
                    <span class="card-title">${challenge.name}</span>
                </div>
                <div class="header-right">
                    <i class="fas fa-chevron-down toggle-icon"></i>
                </div>
            </div>

            <div class="card-content" id="${challenge.name.toLowerCase()}">
                ${subcontent}
            </div>
        </div>
    `;
}

/**
 * Funzione per applicare la logica di espansione/compressione e i click sui file
 */
function applyToggleLogic() {
    // Logica di espansione/compressione delle schede (Easy, Medium, Hard)
    document.querySelectorAll('.toggle-btn').forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');
            const targetContent = document.querySelector(targetId);
            const card = button.closest('.challenge-card');
            
            card.classList.toggle('expanded');
            
            if (targetContent.style.maxHeight) {
                targetContent.style.maxHeight = null;
            } else {
                targetContent.style.maxHeight = targetContent.scrollHeight + "px";
            }
        });
    });
    
    // Logica di click sui singoli link (le macchine)
    document.querySelectorAll('.challenge-item.sub-item .item-header').forEach(itemHeader => {
        itemHeader.addEventListener('click', () => {
            const path = itemHeader.getAttribute('data-path');
            if (path) {
                loadFileContent(path);
                
                // Opzionale: scrolla in cima alla pagina dopo il caricamento
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        });
    });
}


// 3. Esecuzione
document.addEventListener('DOMContentLoaded', () => {
    // 1. Genera tutte le schede
    let allCardsHTML = '';
    challengeData.forEach(cat => {
        allCardsHTML += generateChallengeCard(cat);
    });
    
    // Inietta l'HTML e applica la logica
    if (challengeList) {
        challengeList.innerHTML = allCardsHTML;
        applyToggleLogic();
    }
});