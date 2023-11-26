// Definicja klasy przechowującej stan aplikacji

class AppState {
    currentStyleName: string = '';
    currentStyleFile: string = '';
    availableStyles: { [key: string]: string } = {};

    constructor() {
        // Inicjalizacja stanu aplikacji
        this.availableStyles = {
            'style1': 'styles/style.css',
            'style2': 'styles/style2.css',
            // Dodaj więcej dostępnych stylów w razie potrzeby
        };
    }

    // Metoda do ustawiania aktualnego stylu
    setStyle(styleName: string): void {
        if (this.availableStyles.hasOwnProperty(styleName)) {
            this.removeOldStyle(); // Usuń poprzedni styl
            this.currentStyleName = styleName;
            this.currentStyleFile = this.availableStyles[styleName];
            this.applyNewStyle(); // Dodaj nowy styl
        } else {
            console.error('Wybrany styl nie istnieje.');
        }
    }

    // Metoda usuwająca poprzedni styl z DOM
    private removeOldStyle(): void {
        const oldStyleElement = document.getElementById('app-style');
        if (oldStyleElement) {
            oldStyleElement.parentNode?.removeChild(oldStyleElement);
        }
    }

    // Metoda dodająca nowy styl do DOM
    private applyNewStyle(): void {
        const linkElement = document.createElement('link');
        linkElement.id = 'app-style';
        linkElement.rel = 'stylesheet';
        linkElement.href = this.currentStyleFile;
        document.head.appendChild(linkElement);
    }
}

// Przykład użycia
const appState = new AppState();

// Wywołanie aplikacji z linka (np. po kliknięciu przycisku)
const selectedStyle = 'style1';
appState.setStyle(selectedStyle);

