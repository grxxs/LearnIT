# LearnIT

Lekka platforma do nauki do testów ABCD. Opiera się na dwóch technikach z najlepiej udokumentowaną skutecznością: **testowaniu siebie** i **powtórkach rozłożonych w czasie**.

## Dla kolegów: jak używać

Otwórz plik **`dist/index.html`** w przeglądarce (dwuklik). Nic nie trzeba instalować: pytania są wbudowane w ten plik, a postęp zapisuje się w przeglądarce.

- **Tryb mieszany** – pytania ze wszystkich przedmiotów naraz.
- **Przedmiot** – wybierasz przedmiot, a w nim konkretne wykłady (checkboxy).
- **Tryby sesji**
  - *Inteligentna* – najpierw zaległe powtórki, potem nowe pytania. Domyślna do codziennej nauki.
  - *Nowe* – tylko pytania jeszcze niewidziane, na pierwsze przejście materiału.
  - *Słabe* – pytania z ostatnią złą odpowiedzią albo strzałem.
  - *Egzamin próbny* – bez podpowiedzi, wynik i wyjaśnienia na końcu.
- Po dobrej odpowiedzi wybierz **Wiedziałem** (Enter) albo **Strzelałem** (S). Strzał jest traktowany jak niewiedza i pytanie szybko wróci.
- Błędne pytanie wraca jeszcze w tej samej sesji, kilka pytań później.
- Skróty: `1–4` / `A–D` wybór odpowiedzi, `Enter` dalej, `S` strzał, `Esc` koniec sesji.
- Menu `⋯` → eksport/import postępu (np. przy przenoszeniu na inny komputer lub przeglądarkę).

Powtórki (system pudełek Leitnera) są dostrojone do egzaminu za ok. tydzień: 10 min → 1 dzień → 2 → 3 → 5 dni. Pytanie liczy się jako „opanowane” od 3. pudełka.

## Rozwój

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # -> dist/index.html (jeden plik do wysłania)
```

### Dodawanie przedmiotu

1. Utwórz folder `data/<id>/` z plikiem `subject.json`:
   ```json
   { "id": "net", "name": "Architektura i programowanie w .NET", "short": ".NET",
     "description": "…", "lectures": ["w01", "w02"] }
   ```
2. Dla każdego wykładu dodaj `data/<id>/w01.json`:
   ```json
   { "id": "w01", "title": "W1 · Temat",
     "questions": [
       { "id": "w01-01", "q": "Treść pytania?",
         "a": ["POPRAWNA", "błędna", "błędna", "błędna"],
         "e": "Krótkie wyjaśnienie, dlaczego tak." }
     ] }
   ```
   **Pierwsza odpowiedź w `a` jest zawsze poprawna**, aplikacja sama miesza kolejność. `id` pytań muszą być stałe, bo postęp jest do nich przypisany.
3. `npm run build` i wysyłasz nowy `dist/index.html`.

## Źródła pytań

KPWA: slajdy W1–W15 dr. T. Nowickiego (tomeknowicki.pl/kpwa). Lokalne pliki W5, W13 i W15 były puste (0 B), więc ich treść pochodzi z oryginalnych slajdów online: *objects-relationship*, *platform-2* i *business-automation-flows*.
