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

### Jos näet "Not found"

- Varmista, että avaat URL-osoitteen **`/index.html`** etkä satunnaista polkua.
- Käynnistä palvelin projektin juuresta tai käytä `./preview.sh`, joka pakottaa oikean hakemiston.
