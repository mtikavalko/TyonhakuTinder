# TyonhakuTinder

Pieni selaindemo "keikkatyönhaun Tinder" -ideasta.

## Käynnistys

Avaa `index.html` selaimessa tai aja paikallinen palvelin:

```bash
python3 -m http.server 8000
```

Sitten avaa `http://localhost:8000`.

## Mitä demo tekee

- Generoi espoolaisia esimerkkityönhakijoita (nuoret, taidot, saatavuus, Espoon alue)
- Generoi espoolaisia esimerkkikeikkoja työnantajilta (esim. lumenluonti, muuttoapu, siivous)
- Laskee yksinkertaisen matching-score:n taitojen, sijainnin ja vuoron perusteella
- Sisältää swipe-näkymän, jossa keikkoja voi hyväksyä/hylätä (napit + nuolinäppäimet)
- Näyttää parhaat matchit

## Preview

Nopea käytännön preview:

1. Käynnistä paikallinen palvelin: `python3 -m http.server 8000`
2. Avaa selaimessa: `http://localhost:8000`
3. Testaa swipea napeilla tai nuolinäppäimillä (⬅️ hylkää, ➡️ kiinnostaa)
