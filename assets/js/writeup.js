/**
 * Funzione per ottenere un parametro specifico dall'URL.
 * @param {string} name - Il nome del parametro (es. 'path').
 * @returns {string|null} Il valore del parametro.
 */
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    const results = regex.exec(location.search);
    return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

/**
 * Funzione principale per caricare e convertire il file Markdown.
 */
function loadAndRenderMarkdown() {
    // 1. Ottieni il percorso del file dalla query string
    const filePath = getUrlParameter('path');
    const contentDisplay = document.getElementById('content-display');
    const pageTitle = document.getElementById('page-title');

    if (!filePath) {
        contentDisplay.innerHTML = '<h1>Errore</h1><p>Nessun percorso di guida specificato nell\'URL.</p>';
        return;
    }

    // 2. Carica il file Markdown
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                // Imposta un messaggio di errore leggibile se il file non esiste
                contentDisplay.innerHTML = `<h1>Errore di Caricamento</h1><p>Impossibile trovare il file: <code>${filePath}</code> (Status: ${response.status})</p>`;
                throw new Error(`Impossibile trovare il file: ${filePath}`);
            }
            return response.text();
        })
        .then(markdownText => {
            // 3. Converte il Markdown in HTML
            const htmlContent = marked.parse(markdownText);
            
            // 4. Inietta l'HTML convertito
            contentDisplay.innerHTML = htmlContent;

            // 5. Aggiorna il titolo della pagina (opzionale)
            // Prende l'H1 generato dal Markdown
            const firstHeader = contentDisplay.querySelector('h1');
            if (firstHeader) {
                pageTitle.textContent = `Guida: ${firstHeader.textContent}`;
            } else {
                 pageTitle.textContent = `Guida: ${filePath.split('/').pop().replace('.md', '')}`;
            }
        })
        .catch(error => {
            console.error('Errore durante la conversione:', error);
        });
}

// Avvia la logica all'apertura della pagina
document.addEventListener('DOMContentLoaded', loadAndRenderMarkdown);