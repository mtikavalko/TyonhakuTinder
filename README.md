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
4. Avaa tarvittaessa CSS suoraan demosta: **🎨 Avaa CSS (styles.css)**

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


## Visuaalisen ilmeen testaus

### 1) Nopea manuaalinen testi

1. Käynnistä preview: `./preview.sh`
2. Avaa: `http://localhost:8000/index.html`
3. Tarkista ainakin nämä:
   - taustagradientit näkyvät
   - napit reagoivat hoveriin/klikkiin
   - kortit ovat luettavia (teksti + kontrasti)
   - sivu toimii sekä desktopilla että kapealla ikkunalla

### 2) Suora tiedostoavaus (ilman terminaalia)

- Tuplaklikkaa `index.html` tiedostonhallinnasta ja varmista, että ulkoasu ja napit toimivat myös näin.

### 3) Screenshot-vertailu

Jos haluat dokumentoida ilmeen ennen/jälkeen:

```bash
./preview.sh 8150
```

Ota screenshot selaimen devtooleilla tai Playwrightilla ja vertaa kuvia rinnakkain.

### 4) Yleiset ongelmat

- Jos näet vanhan tyylin, tee hard refresh (`Ctrl+F5` / `Cmd+Shift+R`).
- Jos sivu on blankko tai outo, tarkista ettei tiedostoihin ole jäänyt konfliktimerkintöjä:

```bash
rg "^(<<<<<<<|=======|>>>>>>>)" index.html app.js README.md styles.css
```


### Jos saat virheen `./preview.sh: No such file or directory`

Tämä tarkoittaa lähes aina, että et ole projektin juurihakemistossa.

1. Siirry oikeaan kansioon:
   ```bash
   cd /workspace/TyonhakuTinder
   ```
2. Varmista että skripti on olemassa:
   ```bash
   ls -l preview.sh
   ```
3. Käynnistä:
   ```bash
   ./preview.sh
   ```

Jos skripti ei silti käynnisty, voit käyttää suoraa fallback-komentoa:

```bash
python3 -m http.server 8000 --directory /workspace/TyonhakuTinder
```

Sitten avaa selaimessa: `http://localhost:8000/index.html`.
