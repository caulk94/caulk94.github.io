// 1. Definisci l'alberatura delle guide
// Ogni "cartella" è un oggetto con una proprietà 'children'
// Ogni "file" è una stringa che punta al percorso del file .md
const guideStructure = {
    'guide-1': {
        children: {
            'Introduzione': 'guides/guide-1/intro.md',
            'Passo A': 'guides/guide-1/step-a.md'
        }
    },
    'guide-2': {
        children: {
            'Setup Iniziale': 'guides/guide-2/setup.md',
            'Panoramica Generale': 'guides/guide-2/overview.md'
        }
    },
    // Aggiungi altre guide qui...
};

const treeView = document.getElementById('tree-view');
const contentDisplay = document.getElementById('content-display');

/**
 * 2. Funzione per generare l'HTML dell'alberatura (ricorsiva)
 * @param {object} structure - L'oggetto della struttura delle guide
 * @param {HTMLElement} parentElement - L'elemento UL genitore in cui inserire i nuovi elementi
 */
function buildTree(structure, parentElement) {
    for (const key in structure) {
        if (structure.hasOwnProperty(key)) {
            const item = structure[key];

            if (typeof item === 'object' && item.children) {
                // È una cartella
                const folderLi = document.createElement('li');
                folderLi.className = 'folder';

                const folderSpan = document.createElement('span');
                folderSpan.textContent = `▶ ${key}`; // Usa un triangolo per indicare che è espandibile

                const subList = document.createElement('ul');

                // Aggiungi un gestore di eventi per espandere/comprimere la cartella
                folderSpan.onclick = function() {
                    const isHidden = subList.style.display === 'none' || subList.style.display === '';
                    subList.style.display = isHidden ? 'block' : 'none';
                    folderSpan.textContent = isHidden ? `▼ ${key}` : `▶ ${key}`;
                };

                folderLi.appendChild(folderSpan);
                folderLi.appendChild(subList);
                parentElement.appendChild(folderLi);

                // Ricorsione per le sottocartelle/file
                buildTree(item.children, subList);

            } else if (typeof item === 'string') {
                // È un file
                const fileLi = document.createElement('li');
                fileLi.className = 'file';

                const fileLink = document.createElement('a');
                fileLink.textContent = key;
                fileLink.href = '#'; // Impedisce il ricaricamento della pagina
                fileLink.setAttribute('data-path', item); // Memorizza il percorso del file

                // 3. Gestore di eventi per il click sul file
                fileLink.onclick = function(e) {
                    e.preventDefault();
                    loadFileContent(this.getAttribute('data-path'));
                };

                fileLi.appendChild(fileLink);
                parentElement.appendChild(fileLi);
            }
        }
    }
}

/**
 * 4. Funzione per caricare e visualizzare il contenuto del file
 * @param {string} path - Il percorso del file Markdown
 */
function loadFileContent(path) {
    // Rimuovi eventuali classi 'active' dai link precedenti
    document.querySelectorAll('.file a').forEach(a => a.classList.remove('active'));
    // Aggiungi la classe 'active' al link cliccato
    const activeLink = document.querySelector(`a[data-path="${path}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    // Carica il file tramite fetch
    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Impossibile caricare il file: ${path} (Status: ${response.status})`);
            }
            return response.text();
        })
        .then(markdownText => {
            // 5. Converte il Markdown in HTML
            const htmlContent = marked.parse(markdownText);
            contentDisplay.innerHTML = htmlContent;
            // Scrolla in cima al contenuto
            document.getElementById('content').scrollTop = 0;
        })
        .catch(error => {
            console.error('Errore durante il caricamento del file:', error);
            contentDisplay.innerHTML = `<p style="color: red;">Errore nel caricamento della guida: ${error.message}</p>`;
        });
}

// Avvia la generazione dell'alberatura quando la pagina è caricata
document.addEventListener('DOMContentLoaded', () => {
    buildTree(guideStructure, treeView);

    // Se c'è un file da aprire all'avvio, caricalo (opzionale)
    const firstFile = Object.values(guideStructure)[0]?.children ? Object.values(guideStructure)[0].children[Object.keys(Object.values(guideStructure)[0].children)[0]] : null;
    if (firstFile) {
        // loadFileContent(firstFile); // Rimuovi il commento per caricare la prima guida automaticamente
    }
});
