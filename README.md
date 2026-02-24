# TyonhakuTinder

Pieni selaindemo "keikkatyönhaun Tinder" -ideasta.

## Käynnistys

Voit avata demon kahdella tavalla:

1. **Ilman terminaalia (helpoin):** avaa projektin `index.html` suoraan selaimessa (tuplaklikkaa tiedostoa).
2. **Terminaalilla (suositeltu, jos haluat localhost-URL:n):**

```bash
./preview.sh
```

Sitten avaa `http://localhost:8000/index.html`.

## Mitä demo tekee

- Generoi espoolaisia esimerkkityönhakijoita (nuoret, taidot, saatavuus, Espoon alue)
- Generoi espoolaisia esimerkkikeikkoja työnantajilta (esim. lumenluonti, muuttoapu, siivous)
- Laskee yksinkertaisen matching-score:n taitojen, sijainnin ja vuoron perusteella
- Sisältää swipe-näkymän, jossa keikkoja voi hyväksyä/hylätä (napit + nuolinäppäimet)
- Näyttää parhaat matchit

## Preview

Nopea käytännön preview:

1. Käynnistä palvelin: `./preview.sh`
2. Avaa selaimessa: `http://localhost:8000/index.html`
3. Testaa swipea napeilla tai nuolinäppäimillä (⬅️ hylkää, ➡️ kiinnostaa)

### Ilman terminaalia

- Avaa kansio tiedostonhallinnassa.
- Tuplaklikkaa `index.html` (tai vedä tiedosto selaimeen).
- Demo toimii myös näin, koska se on täysin client-side eikä tarvitse backendiä.
- `index.html` sisältää myös tarvittavan JavaScriptin, joten napit toimivat myös suoraan tiedostona avattuna.

### Jos näet "Not found"

- Varmista, että avaat URL-osoitteen **`/index.html`** etkä satunnaista polkua.
- Käynnistä palvelin projektin juuresta tai käytä `./preview.sh`, joka pakottaa oikean hakemiston.

## Jos Gitissä on konflikteja

Jos saat `CONFLICT`-virheen merge/rebase-vaiheessa, tee näin:

1. Tarkista konfliktitiedostot:
   ```bash
   git status
   ```
2. Avaa tiedostot, joissa näkyy konfliktimerkinnät:
   - `<<<<<<< HEAD`
   - `=======`
   - `>>>>>>> branch`
3. Valitse haluttu sisältö (tai yhdistä molemmat), poista konfliktimerkit ja tallenna.
4. Merkitse ratkaistuksi:
   ```bash
   git add <tiedosto>
   ```
5. Jatka:
   - merge: `git commit`
   - rebase: `git rebase --continue`

Nopea tarkistus konfliktimerkintöjen löytymiselle:

```bash
rg "^(<<<<<<<|=======|>>>>>>>)" index.html app.js README.md styles.css
```

Jos napit eivät vieläkään toimi konfliktin jälkeen:
- Tee hard refresh selaimessa (`Ctrl+F5` / `Cmd+Shift+R`).
- Varmista, ettei tiedostoissa ole enää konfliktimerkintöjä.
- Avaa preview osoitteesta `http://localhost:8000/index.html`.
