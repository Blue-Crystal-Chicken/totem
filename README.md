# BCC Totem - Kiosk Application

Questa è l'applicazione **Totem** (chiosco interattivo per ordini self-service) del progetto **Blue Crystal Chicken (BCC)**.
È realizzata con **React**, **TypeScript**, **Vite** e stilizzata tramite **Tailwind CSS** e componenti **shadcn/ui**.

---

## 🚀 Requisiti

- **Node.js** (versione 18 o superiore)
- **pnpm** (consigliato) oppure **npm** / **yarn**

---

## ⚙️ Configurazione & Variabili d'Ambiente

Prima di avviare il progetto, crea o modifica il file `.env.local` all'interno della cartella `totem`.

Esempio di `.env.local`:
```env
VITE_API_BASE_URL=http://localhost:8080
VITE_API_LOCATION_ID=1
VITE_API_LOCATION_NAME=Blue Crystal Torino
VITE_API_LOCATION_ADDRESS=Via Roma 10
VITE_API_LOCATION_CITY=Torino
```

### Dettaglio Variabili:
- `VITE_API_BASE_URL`: L'URL delle API del backend (generalmente `http://localhost:8080` in locale).
- `VITE_API_LOCATION_ID`: Identificatore del ristorante/punto vendita per cui opera questo totem.
- `VITE_API_LOCATION_NAME` / `ADDRESS` / `CITY`: Metadati del punto vendita visualizzati sull'interfaccia.

---

## 🛠️ Come Avviare l'Applicazione

### 1. Installazione Dipendenze
Accedi alla cartella `totem` ed esegui il comando per installare le dipendenze:
```bash
pnpm install
# oppure
npm install
```

### 2. Avvio in Modalità Sviluppo
Avvia il server di sviluppo locale:
```bash
pnpm dev
# oppure
npm run dev
```
Il server Vite si avvierà generalmente su `http://localhost:5173` (o un'altra porta disponibile, indicata nel terminale).

### 3. Build per la Produzione
Per compilare il pacchetto ottimizzato per la produzione:
```bash
pnpm build
# oppure
npm run build
```
I file compilati saranno salvati all'interno della cartella `dist/`.

---

## 🎨 Componenti & Stilizzazione

Questo progetto utilizza **shadcn/ui** per i componenti dell'interfaccia utente.
- Per aggiungere nuovi componenti pronti all'uso:
  ```bash
  npx shadcn@latest add [nome-componente]
  ```
- La stilizzazione è gestita tramite classi di utilità Tailwind CSS e animazioni personalizzate.
