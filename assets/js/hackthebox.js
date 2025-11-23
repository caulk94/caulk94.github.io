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
            { name: "Querier", link: "HTB/Challenges/Medium/Querier.html" }
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

/**
 * Funzione per generare il contenuto HTML delle singole macchine (LINK REALI)
 */
function generateSubchallengesHTML(children) {
    if (!children || children.length === 0) return '';
    
    let html = '<div class="subchallenges-list">';
    
    children.forEach(child => {
        // 🟥 MODIFICA CHIAVE: targetUrl è ORA il link diretto al file 🟥
        const targetUrl = child.link;
        
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
 * Funzione per applicare la logica di espansione/compressione (INVARIATA)
 */
function applyToggleLogic() {
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
}


// 3. Esecuzione
document.addEventListener('DOMContentLoaded', () => {
    let allCardsHTML = '';
    challengeData.forEach(cat => {
        allCardsHTML += generateChallengeCard(cat);
    });
    
    if (challengeList) {
        challengeList.innerHTML = allCardsHTML;
        applyToggleLogic();
    }
});