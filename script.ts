class AppState {
    currentStyleName: string = '';
    currentStyleFile: string = '';
    availableStyles: { [key: string]: string } = {};

    constructor() {
        this.availableStyles = {
            'style1': 'styles/style.css',
            'style2': 'styles/style2.css'
        };
    }
// KOD NIE DZIALA
    setStyle(styleName: string): void {
        if (this.availableStyles.hasOwnProperty(styleName)) {
            this.removeOldStyle();
            this.currentStyleName = styleName;
            this.currentStyleFile = this.availableStyles[styleName];
            this.applyNewStyle();
        } else {
            console.error('Wybrany styl nie istnieje');
        }
    }

    private removeOldStyle(): void {
        const oldStyleElement = document.getElementById('app-style');
        if (oldStyleElement) {
            oldStyleElement.parentNode?.removeChild(oldStyleElement);
        }
    }

    private applyNewStyle(): void {
        const linkElement = document.createElement('link');
        linkElement.id = 'app-style';
        linkElement.rel = 'stylesheet';
        linkElement.href = this.currentStyleFile;
        document.head.appendChild(linkElement);
    }
}

const appState = new AppState();
appState.setStyle('style2');

