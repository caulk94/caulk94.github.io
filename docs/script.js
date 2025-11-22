// 1. Definisci l'alberatura delle guide con la gerarchia corretta
// Ogni oggetto con 'children' è una cartella espandibile.
const guideStructure = {
    // Il nodo principale (che sarà 'Hack The Box')
    'Hack The Box': {
        children: {
            // Sottocartella di secondo livello
            'Challenges': {
                children: {
                    // Sottocartella di terzo livello (Difficoltà)
                    'Easy': {
                        children: {
                            'Machine Easy 1 (Guida)': 'guides/htb/easy/machine_easy_1.md'
                        }
                    },
                    'Medium': {
                        children: {
                            'Machine Medium 1 (Guida)': 'guides/htb/medium/machine_medium_1.md',
                            'Machine Medium 2 (Guida)': 'guides/htb/medium/machine_medium_2.md'
                        }
                    },
                    'Hard': {
                        children: {
                            'Machine Hard 1 (Guida)': 'guides/htb/hard/machine_hard_1.md'
                        }
                    }
                }
            },
            // Puoi aggiungere altre sezioni di primo livello qui
            'Starting Point': {
                children: {
                    'Guida al Setup': 'guides/htb/setup.md'
                }
            }
        }
    }
};

const treeView = document.getElementById('tree-view');
const contentDisplay = document.getElementById('content-display');

// ... (loadFileContent function remains unchanged) ...

/**
 * Funzione per generare l'HTML dell'alberatura (ricorsiva)
 * Nota: La logica qui sotto rimane funzionalmente la stessa 
 * ma ora processa la struttura a più livelli sopra definita.
 */
function buildTree(structure, parentElement) {
    for (const key in structure) {
        if (structure.hasOwnProperty(key)) {
            const item = structure[key];

            if (typeof item === 'object' && item.children) {
                // È una cartella espandibile
                const folderLi = document.createElement('li');
                folderLi.className = 'folder';

                // L'icona cambierà in base allo stato
                const folderSpan = document.createElement('span');
                folderSpan.innerHTML = `<span class="folder-icon">▶</span> <i class="fas fa-folder"></i> ${key}`; 
                
                const subList = document.createElement('ul');

                // Gestore di eventi per espandere/comprimere la cartella
                folderSpan.onclick = function() {
                    const isHidden = subList.style.display === 'none' || subList.style.display === '';
                    subList.style.display = isHidden ? 'block' : 'none';
                    // Aggiorna l'icona della freccia (triangolo)
                    folderSpan.querySelector('.folder-icon').textContent = isHidden ? '▼' : '▶';
                    folderSpan.querySelector('.fa-folder').className = isHidden ? 'fas fa-folder-open' : 'fas fa-folder';
                };

                folderLi.appendChild(folderSpan);
                folderLi.appendChild(subList);
                parentElement.appendChild(folderLi);

                // Ricorsione per i livelli successivi
                buildTree(item.children, subList);

            } else if (typeof item === 'string') {
                // È un file (.md)
                const fileLi = document.createElement('li');
                fileLi.className = 'file';

                const fileLink = document.createElement('a');
                fileLink.textContent = key;
                fileLink.href = '#'; 
                fileLink.setAttribute('data-path', item); 
                fileLink.innerHTML = `<i class="fas fa-file-alt"></i> ${key}`; // Aggiunge l'icona del file

                // Gestore di eventi per il click sul file: carica il contenuto
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

// Avvia la generazione dell'alberatura
document.addEventListener('DOMContentLoaded', () => {
    buildTree(guideStructure, treeView);
});
