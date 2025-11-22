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

const challengeList = document.getElementById('challenges-list');
// La variabile contentDisplay e la funzione loadFileContent non sono più necessarie
// per il reindirizzamento, ma le lasciamo se servono altrove.

/**
 * Funzione per generare il contenuto HTML delle singole macchine (LINK REALI)
 */
function generateSubchallengesHTML(children) {
    if (!children || children.length === 0) return '';
    
    let html = '<div class="subchallenges-list">';
    
    children.forEach(child => {
        // 🟥 MODIFICA CHIAVE QUI: PUNTA A writeup.html con parametro path 🟥
        const targetUrl = `writeup.html?path=${encodeURIComponent(child.link)}`;
        
        html += `
            <div class="challenge-item sub-item">
                <a href="${targetUrl}" class="item-link">
                    <div class="item-header">
                        <i class="fas fa-file-alt icon-file"></i>
                        <span class="item-title">${child.name}</span>
                    </div>
                </a>
            </div>
        `;
    });
    
    html += '</div>';
    return html;
}

/**
 * Funzione per generare l'HTML completo della categoria principale (il box espandibile)
 * (INVARIATA, ma il suo output ora contiene link reali)
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
 * Funzione per applicare la logica di espansione/compressione (Semplificata)
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
    
    // Non è più necessaria la logica di click sui file, poiché ora usiamo <a> tag
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