// 1. Definisci l'alberatura delle guide con la gerarchia completa
const guideStructure = {
    // Il nodo principale è la cartella che appare nella sidebar
    'Hack The Box': {
        children: {
            'Challenges': {
                children: {
                    'Easy': {
                        children: {
                            'Machine Easy 1 (Guida)': 'guides/htb/challenges/easy/machine_easy_1.md'
                        }
                    },
                    'Medium': {
                        children: {
                            'Machine Medium 1 (Guida)': 'guides/htb/challenges/medium/machine_medium_1.md',
                            'Machine Medium 2 (Guida)': 'guides/htb/challenges/medium/machine_medium_2.md'
                        }
                    },
                    'Hard': {
                        children: {
                            'Machine Hard 1 (Guida)': 'guides/htb/challenges/hard/machine_hard_1.md'
                        }
                    }
                }
            },
            'Starting Point': {
                children: {
                    'Guida al Setup': 'guides/htb/starting_point/setup.md'
                }
            }
        }
    }
};

const treeView = document.getElementById('tree-view');
const contentDisplay = document.getElementById('content-display');

/**
 * Funzione per caricare e visualizzare il contenuto del file
 */
function loadFileContent(path) {
    document.querySelectorAll('.file a').forEach(a => a.classList.remove('active'));
    const activeLink = document.querySelector(`a[data-path="${path}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }

    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Impossibile caricare il file: ${path} (Status: ${response.status})`);
            }
            return response.text();
        })
        .then(markdownText => {
            const htmlContent = marked.parse(markdownText);
            contentDisplay.innerHTML = htmlContent;
            document.getElementById('content').scrollTop = 0;
        })
        .catch(error => {
            console.error('Errore durante il caricamento del file:', error);
            contentDisplay.innerHTML = `<p style="color: red;">Errore nel caricamento della guida: ${error.message}. Verifica che il file esista al percorso specificato in script.js.</p>`;
        });
}

/**
 * Funzione per generare l'HTML dell'alberatura (ricorsiva)
 */
function buildTree(structure, parentElement) {
    for (const key in structure) {
        if (structure.hasOwnProperty(key)) {
            const item = structure[key];

            if (typeof item === 'object' && item.children) {
                // È una cartella espandibile
                const folderLi = document.createElement('li');
                folderLi.className = 'folder';

                const folderSpan = document.createElement('span');
                
                // Icone di navigazione
                folderSpan.innerHTML = `<span class="folder-icon">▶</span> <i class="fas fa-folder"></i> ${key}`; 
                
                const subList = document.createElement('ul');

                // Gestore di eventi per espandere/comprimere la cartella
                folderSpan.onclick = function() {
                    const isHidden = subList.style.display === 'none' || subList.style.display === '';
                    
                    subList.style.display = isHidden ? 'block' : 'none';
                    
                    // Aggiorna l'icona della freccia e della cartella
                    folderSpan.querySelector('.folder-icon').textContent = isHidden ? '▼' : '▶';
                    folderSpan.querySelector('.fa-folder, .fa-folder-open').className = isHidden ? 'fas fa-folder-open' : 'fas fa-folder';
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
                fileLink.innerHTML = `<i class="fas fa-file-alt"></i> ${key}`;

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


// Avvia la generazione dell'alberatura quando la pagina è caricata
document.addEventListener('DOMContentLoaded', () => {
    buildTree(guideStructure, treeView);
});
