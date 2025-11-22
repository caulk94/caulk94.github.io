// Struttura delle Guide (COME PRIMA)
const guideStructure = {
    // Le chiavi di primo livello sono le TUE CATEGORIE (cartelle)
    'Web Exploitation': {
        children: {
            'Introduzione al Web': 'guides/web/intro.md',
            'SQL Injection Basics': 'guides/web/sql-basics.md'
        }
    },
    'Pwn': {
        children: {
            'Buffer Overflow': 'guides/pwn/buffer-overflow.md',
            'Format String Attack': 'guides/pwn/format-string.md'
        }
    },
    // Aggiungi qui le tue altre categorie/cartelle
};

const treeView = document.getElementById('tree-view');
const contentDisplay = document.getElementById('content-display');
const htbToggler = document.getElementById('htb-toggler'); // Il nuovo interruttore principale

/**
 * Funzione per generare l'HTML dell'alberatura (ricorsiva)
 */
function buildTree(structure, parentElement) {
    for (const key in structure) {
        if (structure.hasOwnProperty(key)) {
            const item = structure[key];

            if (typeof item === 'object' && item.children) {
                // È una cartella (Categoria)
                const folderLi = document.createElement('li');
                folderLi.className = 'folder';

                const folderSpan = document.createElement('span');
                folderSpan.innerHTML = `<span class="folder-icon">▶</span> ${key}`; 
                
                const subList = document.createElement('ul');

                // Gestore di eventi per espandere/comprimere la cartella
                folderSpan.onclick = function() {
                    const isHidden = subList.style.display === 'none' || subList.style.display === '';
                    subList.style.display = isHidden ? 'block' : 'none';
                    // Aggiorna l'icona della freccia (triangolo)
                    folderSpan.querySelector('.folder-icon').textContent = isHidden ? '▼' : '▶';
                };

                folderLi.appendChild(folderSpan);
                folderLi.appendChild(subList);
                parentElement.appendChild(folderLi);

                // Ricorsione per i file all'interno della cartella
                buildTree(item.children, subList);

            } else if (typeof item === 'string') {
                // È un file (.md)
                const fileLi = document.createElement('li');
                fileLi.className = 'file';

                const fileLink = document.createElement('a');
                fileLink.textContent = key;
                fileLink.href = '#'; 
                fileLink.setAttribute('data-path', item); 

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

/**
 * Funzione per caricare e visualizzare il contenuto del file (INVARIATA)
 */
function loadFileContent(path) {
    // Rimuovi eventuali classi 'active' dai link precedenti e imposta il nuovo attivo
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
            // Converte il Markdown in HTML
            const htmlContent = marked.parse(markdownText);
            contentDisplay.innerHTML = htmlContent;
            document.getElementById('content').scrollTop = 0;
        })
        .catch(error => {
            console.error('Errore durante il caricamento del file:', error);
            contentDisplay.innerHTML = `<p style="color: red;">Errore nel caricamento della guida: ${error.message}</p>`;
        });
}


// Avvia la generazione dell'alberatura e aggiungi la logica di toggling principale
document.addEventListener('DOMContentLoaded', () => {
    // 1. Costruisce l'alberatura delle categorie all'interno di #tree-view
    buildTree(guideStructure, treeView);
    
    // 2. Aggiunge il gestore per l'interruttore "Hack The Box"
    htbToggler.addEventListener('click', () => {
        const isHidden = treeView.style.display === 'none' || treeView.style.display === '';
        treeView.style.display = isHidden ? 'block' : 'none';
        
        // Opzionale: cambia l'icona del toggler principale
        htbToggler.innerHTML = isHidden 
            ? '<i class="fas fa-folder-open"></i> Hack The Box' 
            : '<i class="fas fa-folder"></i> Hack The Box';
        
        // Rimuove la classe 'active' se il menu viene richiuso, per pulizia
        if (!isHidden) {
             document.querySelectorAll('.file a').forEach(a => a.classList.remove('active'));
        }
    });

    // 3. (Opzionale) Apri la prima guida all'avvio:
    // Rimuovi il commento se vuoi che il contenuto sia visibile subito:
    /*
    const firstCategory = Object.values(guideStructure)[0]?.children;
    if (firstCategory) {
        const firstFile = Object.values(firstCategory)[0];
        if (firstFile) {
            loadFileContent(firstFile);
            treeView.style.display = 'block'; // Mostra il sottomenu
        }
    }
    */
});
