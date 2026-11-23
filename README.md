# Legends Veylora – selainpelin suunnitelma

Pieni vanhan ajan otuspeli. Kävelet metsässä, ja puskista voi hypätä villi otus. Aloitat tuliotus **DUCKONDAlla**, jota ei saa mistään muualta. Taistelut ovat vuoropohjaisia. Voitoista saa kolikoita, joilla **HOITOLASTA** ostetaan **PYYDYSPALLOJA** otusten nappaamiseen.

## Otukset

| Laji | Vaihe | Sprite | Liikkeet | Puskasta / askel | Voitosta | Nappausvaikeus |
|---|---|---|---|---|---|---|
| DUCKONDA | aloitusotus, ei kehity | `duckonda.png` + `sprites/duckonda_*.png` | FIRE SPIN, FLAMETHROWER, FLAME TORNADO | ei koskaan (vain aloitusotuksena) | – | – |
| AMPERITE | 1. vaihe | `moi 1st evo.png` + `sprites/amperite_*.png` | ELECTROBALL, TACKLE | 15 % | 25 kolikkoa | helppo (0,7) |
| AMPEREEM | 2. vaihe (kehittyy tasolla 8) | `moi.png` + `sprites/moi_*.png` | THUNDERBOLT, ELECTROBALL, TACKLE | 5 % | 50 kolikkoa | vaikea (0,35) |
| ZUBUG | 1. vaihe | `zubug.png` + `sprites/zubug_*.png` | BUG BUZZ, STICKY WEB | 15 % | 25 kolikkoa | helppo (0,7) |
| GOLBUG | 2. vaihe (kehittyy tasolla 10) | `golbug.png` + `sprites/golbug_*.png` | AIR SLASH, BUG BUZZ, STICKY WEB | 8 % | 50 kolikkoa | vaikea (0,35) |
| SQUISHROOM | ei kehity | `squishroom.png` + `sprites/squishroom_*.png` | MUD SHOT, FAIRY WIND, GIGA DRAIN | 20 % (vain HYUJAL METSÄ) | 30 kolikkoa, nappaamisesta myös 30 | keskitaso (0,5) |
| SHROOCID | ei kehity | `shroocid.png` + `sprites/shroocid_*.png` | POISON JAB, IRON HEAD, SLUDGE WAVE | 15 % (vain HYUJAL METSÄ) | 20 kolikkoa, nappaamisesta myös 20 | keskitaso (0,5) |

Kehittyessään otus oppii uuden liikkeen ja pitää vanhat: AMPERITE oppii THUNDERBOLTin ja ZUBUG AIR SLASHin. Toisen vaiheen otuksilla on paremmat perusarvot (HP, hyökkäys, nopeus…), ja niistä saa enemmän kokemuspisteitä. Pelaaja aloittaa pelkällä DUCKONDAlla. Kaikki muut otukset saa vain nappaamalla.

PUSKAMETSÄN puskissa kohtaamisen mahdollisuus on yhteensä 43 % askelta kohden, HYUJAL METSÄSSÄ 35 % (SQUISHROOM 20 %, SHROOCID 15 %).

### Kiiltävät muodot

- Jokainen kohdattu villi otus on **1/100** todennäköisyydellä kiiltävä (`SHINY_CHANCE` tiedostossa `js/battle.js`).
- Aloitusotus DUCKONDA on kiiltävä **1/10** todennäköisyydellä (`shinyChance` DUCKONDAn tiedoissa). Arvonta tehdään, kun uusi peli alkaa, ja aloitusteksti kertoo, jos osui.
- Kiiltävä otus käyttää sinun "kiiltävä …" -spritejäsi. Se ilmestyy kipinöiden kanssa, ja teksti kertoo, että se on KIILTÄVÄ.
- Nimen perässä näkyy keltainen ★ taistelussa ja HOITOLAN tiimilistassa.
- Napattu kiiltävä pysyy kiiltävänä, myös kehittyessään (kiiltävä AMPERITE → kiiltävä AMPEREEM).

## Pelaaminen

Avaa `index.html` selaimessa (Chrome tai Edge, tuplaklikkaus riittää). Asennuksia ei tarvita.

| Näppäin | Toiminto |
|---|---|
| Nuolet / WASD | Liiku, valitse valikossa |
| Z / Enter / Välilyönti | OK, lue kyltti, mene HOITOLAAN (oven edessä ylös päin) |
| X / Esc | Takaisin valikosta |
| F | Kalasta (seiso veden edessä ja katso veteen) |
| M | Musiikki päälle/pois (valinta muistetaan) |

### Tallennus

Peli tallentuu automaattisesti selaimeen, joten sivun voi päivittää tai sulkea:
- Tallennus tapahtuu taistelun jälkeen, alueelta toiselle siirtyessä, HOITOLASTA ja rantakioskista lähtiessä, 10 sekunnin välein kävellessä sekä silloin, kun sivu suljetaan tai laitetaan taustalle.
- Pelin alla on lisäksi **💾 Tallenna**-nappi, jolla voi tallentaa itse milloin tahansa kävellessä. Napin vieressä näkyy, milloin peli tallentui viimeksi. Puhelimella vaakasuunnassa nappi on oikeassa yläkulmassa.
- Mukaan tallentuvat tiimi (tasot, XP, HP, PP, tilat, kiiltävyys), kolikot, pallot ja paikka kartalla.
- Kesken taistelua ei tallenneta. Jos sivu suljetaan taistelussa, peli jatkuu viimeisestä tallennuksesta ennen taistelua.
- Aloitusruudussa on **JATKA** (näyttää johtajan ja tiimin koon) ja **UUSI PELI**. Uusi peli kysyy varmistuksen, koska vanha tallennus poistuu.
- Tallennus on selain- ja laitekohtainen: puhelimella ja tietokoneella on omat tallennuksensa. Yksityinen selaustila tai selaimen tietojen tyhjentäminen poistaa sen.

### Puhelin ja tabletti

Kosketusnäytöllisillä laitteilla (puhelin, iPad) ruudulle tulee nappulat, joten näppäimistöä ei tarvita:
- **Ristiohjain** vasemmalla: liiku. Sormea voi liu'uttaa suunnasta toiseen nostamatta sitä.
- **A** (punainen) = Z/OK, **B** (sininen) = X/takaisin, **KALA** = F, **♪** = musiikki päälle/pois.
- Pystyasennossa peli on ylhäällä ja nappulat alhaalla. Vaakasuunnassa nappulat ovat pelin molemmin puolin.
- Sivu ei vierity eikä zoomaudu pelatessa, ja ääni aukeaa ensimmäisestä kosketuksesta (iPhone/iPad vaatii sen).
- Nappulat lähettävät samat painallukset kuin näppäimistö (`js/touch.js`).

### Musiikki

Pelissä on kolme omaa sävellettyä chiptune-kappaletta vanhojen käsikonsolien tyyliin. Ne soitetaan suoraan selaimessa (Web Audio), joten äänitiedostoja ei tarvita:
- **Metsä** (C-duuri, 126 BPM): rauhallinen ja iloinen kappale PUSKAMETSÄSSÄ.
- **HYUJAL METSÄ** (D-molli, 92 BPM): hidas ja mystinen kappale. Pehmeä melodia kaikuu, säestys on kimaltavia arpeggioita, ja rummut ovat hiljaiset ja harvat. Kappale vaihtuu, kun kävelet metsästä toiseen, ja palaa taistelun jälkeen.
- **Taistelu** (A-molli, 168 BPM): nopea ja jännittävä kappale, joka alkaa, kun villi otus hyppää esiin.

Kaikki ovat 8 tahdin luuppeja: pulssiaaltomelodia, toinen pulssiaalto säestää, kolmioaaltobasso ja kohinarummut. Musiikki alkaa, kun peli aloitetaan Z:lla (selaimet sallivat äänen vasta näppäimen painalluksen jälkeen), ja pysähtyy, kun välilehti on taustalla. Nuotit ovat tiedoston `js/music.js` alussa (`TRACKS`), ja niitä voi muokata.

## Pelin rakenne

1. **Aloitusruutu** → paina Z.
2. **Metsä** (28 × 21 ruutua, ruutu 16 × 16 px)
   - **Minikartta** oikeassa yläkulmassa: pyöreä kartta, jonka keskellä on pelaaja (punainen piste). Siinä näkyvät polut, puskat, puut, vesi, sillat, HOITOLA, kioski ja vilkkuvina keltaisina pisteinä uloskäynnit. Kartta seuraa pelaajaa ja on piilossa valikoiden ajan (värit: `MINI_COLORS`, koko: `MINI_R` ja tarkkuus: `MINI_SCALE` tiedostossa `js/overworld.js`; pienempi `MINI_SCALE` näyttää isomman alueen).
   - Ruudukkoliike niin kuin vanhoissa peleissä. Lyhyt napautus vain kääntää hahmoa. Yksi ruutu kestää noin 11 kuvaa (`WALK_SPEED` tiedostossa `js/overworld.js`).
   - Metsän puut ovat lomittain: joka toinen puurivi on siirretty puoli ruutua sivulle, ja rivit menevät hieman päällekkäin.
   - **Puskat:** joka askeleella puskassa voi tulla vastaan AMPERITE (15 %), ZUBUG (15 %), GOLBUG (8 %) tai AMPEREEM (5 %). Puska heiluu, ja pelaajan jalat jäävät lehtien taakse.
   - **HOITOLA** (keskellä metsää, ovi alareunassa):
     - PARANNA: koko tiimin HP, PP ja halvaantuminen.
     - OSTA PALLO: PYYDYSPALLO maksaa 50 kolikkoa (`BALL_PRICE` tiedostossa `js/overworld.js`).
     - TIIMI: valitse, kuka johtaa (lähtee ensimmäisenä taisteluun).
     - Kolikot ja pallot näkyvät vasemmassa yläkulmassa.
   - **Kyltti:** ohjeteksti.
   - Metsän alareunasta polku vie etelään **HYUJAL METSÄÄN**.
   - HOITOLAN ohi itään kulkeva polku jatkuu metsän oikean reunan läpi **SAARIMERELLE**.
3. **HYUJAL METSÄ** (24 × 18 ruutua)
   - Hohtava metsä: liilat puut, ruoho ja puskat, hohtavat siniset ja liilat sienet (pienet sienet ja isot, kiinteät sienet sykkivät) sekä leijuvat valopisteet.
   - Liiloista puskista voi tulla **SQUISHROOM** (20 %) tai **SHROOCID** (15 %) askelta kohden.
   - Täällä taistellessa taustakin on liila, ja taivaalla tuikkii sinisiä ja liiloja valoja.
   - Kun menet alueelle, sen nimi liukuu hetkeksi ruudun yläreunaan. Sama tapahtuu palatessa PUSKAMETSÄÄN.
   - Pohjoisreunan polku vie takaisin PUSKAMETSÄÄN. Kyltti on polun varrella.
4. **SAARIMERI** (30 × 20 ruutua)
   - Hiekkaranta palmuineen, kolme ruohoista saarta ja niiden välillä puusillat. Rantaviivassa vaahtoaa, ja vesi aaltoilee.
   - **Kalastus:** seiso veden (tai sillan) reunalla katse veteen ja paina **F**. Siima lentää veteen, ja koho kelluu hetken. Otuksia ei vielä ole, joten mikään ei nappaa (kartan `fishing`-lista on tyhjä). Lisäämällä otuksia listaan kalastus alkaa käynnistää taisteluja.
   - **RANTAKIOSKI:** mene tiskin eteen ja paina Z. Kioskista saa:
     - PYYDYSPALLO, 50 kolikkoa.
     - GREAT PALLO, 75 kolikkoa (`GREAT_PRICE`). Nappaa **kaksi kertaa** paremmin.
   - Puskia ei ole, eikä otuksia tule vastaan.
   - Rannan vasempaan reunaan kulkeva hiekkapolku vie takaisin PUSKAMETSÄÄN.
   - Jokaisen alueen uloskäynnillä on pieni vilkkuva nuoli, joka osoittaa poistumissuuntaan.
5. **Taistelu** (vuoropohjainen)
   - Valikko: TAISTELE / PALLO / PAKENE.
   - Nopeampi otus hyökkää ensin. Tasatilanteessa järjestys arvotaan.
   - Voitto antaa kokemuspisteitä (XP) ja kolikoita. Tarpeeksi XP:tä nostaa tasoa. Kehittyminen tapahtuu heti taistelun jälkeen (vilkkuva valkoinen siluetti): AMPERITE → AMPEREEM tasolla 8, ZUBUG → GOLBUG tasolla 10.
   - Jos oma otus uupuu, seuraava tiimiläinen, jolla on HP:ta, lähtee taisteluun.
   - Jos koko tiimi uupuu, heräät HOITOLAN ovelta täysin voimin.

## Nappaaminen

- Valitse taistelussa PALLO. Jos sinulla on sekä PYYDYSPALLOJA että GREAT PALLOJA, peli kysyy, kumpaa heität. Pallo lentää villin otuksen luo, otus imeytyy palloon, ja pallo heiluu.
- GREAT PALLO kertoo nappausmahdollisuuden kahdella.
- Kolme heilahdusta = napattu, ja otus liittyy tiimiin (enintään 6).
- Todennäköisyys = lajin nappausvaikeus · (1 − ⅔ · HP / max HP), ja halvaantuneella ×1,5. Heikennä otus ensin!
- Jos otus karkaa, vihollinen saa vuoron.
- Nappaaminen ei anna kokemuspisteitä. Kolikoita siitä saa vain lajeista, joilla on `catchCoins` (SQUISHROOM 30, SHROOCID 20).

## Taistelusäännöt

| Liike | Voima | Osuma | PP | Erityistä |
|---|---|---|---|---|
| THUNDERBOLT | 90 | 100 % | 10 | Erikoishyökkäys, 10 % mahdollisuus halvaannuttaa |
| ELECTROBALL | 40–150 | 100 % | 20 | Erikoishyökkäys. Mitä nopeampi käyttäjä on kohteeseen verrattuna, sitä kovempi isku: hitaampi 40, nopeus ≥1× 60, ≥2× 80, ≥3× 120, ≥4× 150 |
| TACKLE | 40 | 95 % | 35 | Fyysinen hyökkäys |
| BUG BUZZ | 90 | 100 % | 10 | Erikoishyökkäys, ääniaallot |
| STICKY WEB | – | 95 % | 20 | Ei vahinkoa. Kohteen nopeus laskee taistelun ajaksi (enintään 3 kertaa: ×⅔, ×½, ×⅖). Hidas kohde ottaa myös ELECTROBALLilta kovemmin |
| AIR SLASH | 75 | 95 % | 15 | Erikoishyökkäys. 30 %: kohde säpsähtää ja menettää vuoronsa, jos se ei ole vielä ehtinyt liikkua |
| MUD SHOT | 55 | 95 % | 15 | Erikoishyökkäys, mutapallot. Osuessaan laskee aina kohteen nopeutta (kuten STICKY WEB) |
| FAIRY WIND | 40 | 100 % | 30 | Erikoishyökkäys, kimaltava pyörre |
| GIGA DRAIN | 75 | 100 % | 10 | Erikoishyökkäys. Käyttäjä saa takaisin puolet tekemästään vahingosta HP:ksi |
| POISON JAB | 80 | 100 % | 20 | Fyysinen hyökkäys. 30 % mahdollisuus myrkyttää |
| IRON HEAD | 80 | 100 % | 15 | Fyysinen hyökkäys, käyttäjä hohtaa metallinvalkoisena. 30 %: kohde säpsähtää ja menettää vuoronsa, jos se ei ole vielä ehtinyt liikkua |
| SLUDGE WAVE | 95 | 100 % | 10 | Erikoishyökkäys, myrkkyaalto. 10 % mahdollisuus myrkyttää |
| FIRE SPIN | 35 | 85 % | 15 | Erikoishyökkäys. Tulirengas pyörii kohteen ympärillä, ja kohde jää tulipyörteen vangiksi 4–5 vuoroksi: menettää vuoron lopussa 1/8 maksimi-HP:sta |
| FLAMETHROWER | 90 | 100 % | 15 | Erikoishyökkäys, paksu tulisuihku. 10 % mahdollisuus palovammaan |
| FLAME TORNADO | 100 | 90 % | 5 | Erikoishyökkäys (oma liike, ei oikeaa esikuvaa). Ruutu hehkuu punaisena ja kohteen nielaisee pyörivä tulipatsas. 30 % mahdollisuus palovammaan |

- **Vahinko** = ((2·taso/5 + 2) · voima · hyökkäys / puolustus) / 50 + 2, kerrottuna satunnaisluvulla 0,85–1,0.
  - Kriittinen osuma: todennäköisyys 1/16, vahinko ×1,5.
- **Halvaantunut** (PAR) otus on puolet hitaampi, ja jää 25 %:n todennäköisyydellä vuorostaan.
- **Palovamma** (BRN): otus menettää jokaisen vuoron lopussa 1/16 maksimi-HP:staan, ja sen fyysiset hyökkäykset tekevät puolet vähemmän vahinkoa. Pysyy, kunnes otus parannetaan HOITOLASSA.
- **Myrkytetty** (PSN) otus menettää jokaisen vuoron lopussa 1/8 maksimi-HP:staan. Myrkky jää taistelun jälkeen voimaan, kunnes otus parannetaan HOITOLASSA. Tila näkyy merkkinä tietolaatikon vieressä.
- Tilasta kärsivä villi otus on helpompi napata (×1,5).
- **Tasot:** XP-raja on taso³. Villit otukset ovat tasoilla (johtajan taso − 2) … johtajan taso. Pelaaja aloittaa DUCKONDAlla tasolta 5.
- **Kokemuspisteet** (vain taistelussa olevalle) = lajin XP-arvo · vihollisen taso / 7 (AMPERITE 50, AMPEREEM 120).
- **Pakeneminen** onnistuu ensin 75 %:n todennäköisyydellä, ja jokainen epäonnistunut yritys nostaa mahdollisuutta.
- Jos PP:t loppuvat kesken taistelun, otus käyttää automaattisesti RIMPUILU-hyökkäystä.

## Spritet

Kaikki otusspritet ovat sinun piirtämiäsi. Animaatiokuvat on tehty niistä. Kaikki kuvat ovat tavallisia PNG-tiedostoja: voit maalata ne Photoshopissa uudelleen ja päivittää selaimen. **Säilytä koot ja ruutujen järjestys**, niin peli toimii suoraan.

| Tiedosto | Koko | Sisältö |
|---|---|---|
| `moi 1st evo.png` | 32×32 | Sinun spritesi = AMPERITE edestä |
| `sprites/amperite_blink.png`, `_hurt`, `_attack` | 32×32 | AMPERITE: räpytys, osuma, lataus |
| `sprites/amperite_back.png`, `_back_attack` | 32×32 | AMPERITE takaa (oma otus taistelussa). Musta puoli silmineen ja keltaisine hampaineen on kasvot, valkoinen levy on selkä ja johto on häntä. Takaa katsottuna valkoinen selkä (salamamerkki) on pelaajaa kohti, musta runko näkyy vain kaukaisista reunoista vastustajan suuntaan, hampaat ja silmät eivät näy. Häntä (johto) lähtee valkoisesta selästä ja nousee kaarena rungon yli, ja pistoke on ylhäällä |
| `moi.png` | 32×32 | Sinun spritesi = AMPEREEM edestä |
| `sprites/moi_blink.png`, `_hurt`, `_attack` | 32×32 | AMPEREEM: räpytys, osuma, lataus |
| `sprites/moi_back.png`, `_back_attack` | 32×32 | AMPEREEM takaa |
| `zubug.png` | 32×32 | Sinun spritesi = ZUBUG edestä |
| `sprites/zubug_blink.png`, `_hurt`, `_attack`, `_back`, `_back_attack` | 32×32 | ZUBUG: räpytys, osuma, hyökkäys (suu auki, surina), takaa (kasvot pois, kuoren raidat) |
| `golbug.png` | 32×32 | Sinun spritesi = GOLBUG edestä |
| `sprites/golbug_blink.png`, `_hurt`, `_attack`, `_back`, `_back_attack` | 32×32 | GOLBUG: räpytys, osuma, hyökkäys (vihaiset kulmat, tuuli), takaa |
| `squishroom.png` | 32×32 | Sinun spritesi = SQUISHROOM edestä |
| `sprites/squishroom_blink.png`, `_hurt`, `_attack`, `_back`, `_back_attack` | 32×32 | SQUISHROOM: räpytys, osuma (siristys), hyökkäys (vihainen kulma, hehkuva hattu, itiöt), takaa (peilattu, kasvot ja vatsa piilossa) |
| `shroocid.png` | 32×32 | Sinun spritesi = SHROOCID edestä |
| `sprites/shroocid_blink.png`, `_hurt`, `_attack`, `_back`, `_back_attack` | 32×32 | SHROOCID: räpytys, osuma (> <), hyökkäys (vihaiset hehkuvat silmät, myrkkypisarat), takaa (silmät pois, raita jalassa) |
| `duckonda.png` | 32×32 | Sinun spritesi = DUCKONDA edestä (sivuprofiili, nokka vasemmalle) |
| `sprites/duckonda_blink.png`, `_hurt`, `_attack`, `_back`, `_back_attack` | 32×32 | DUCKONDA: räpytys, osuma (X-silmä), hyökkäys (liekit roihuavat kirkkaina, kipinöitä), takaa (peilattu niin, että katsoo vastustajaa, silmä piilossa) |
| `kiiltävä ampereem.png`, `kiiltävä amperite.png`, `kiiltävä zubug.png`, `kiiltävä golbug.png`, `kiiltävä squishroom.png`, `kiiltävä shroocid.png`, `duckonda kiiltävä.png` | 32×32 | Sinun kiiltävät muotosi edestä |
| `sprites/shiny_<laji>_blink.png`, `_hurt`, `_attack`, `_back`, `_back_attack` | 32×32 | Kiiltävien animaatiokuvat. Tehty värittämällä tavalliset animaatiokuvat kiiltävän spritesi väreillä, ja kipinät on otettu mukaan. Hehkuvat kohdat hehkuvat kiiltävän omalla värillä (`<laji>` = moi, amperite, zubug, golbug, squishroom, shroocid, duckonda) |
| `sprites/web.png` | 32×32 | STICKY WEB -verkko |
| `sprites/slash.png` | 32×32 | AIR SLASH -sirppi |
| `sprites/electroball.png` | 32×16 | ELECTROBALL-pallo, 2 kuvaa 16×16 |
| `sprites/ball.png` | 48×16 | PYYDYSPALLO: pysty, kallistus vasemmalle, kallistus oikealle (16×16) |
| `sprites/great_ball.png` | 48×16 | GREAT PALLO: vaaleansininen, kultainen raita, samat 3 asentoa |
| `sprites/tiles_sea.png` | 272×16 | SAARIMEREN ruudut: 0–1 saaren ruoho, 2 hiekka, 3–4 simpukat ja meritähti (animaatio), 9 kyltti, 11–12 palmut (läpinäkyvät), 13–14 vesi (animaatio), 15 silta vasen–oikea, 16 silta ylös–alas |
| `sprites/kiosk.png` | 48×32 | RANTAKIOSKI (3×2 ruutua): raidallinen markiisi, hyllyillä palloja |
| `sprites/center.png` | 48×48 | HOITOLA-rakennus (3×3 ruutua) |
| `sprites/player.png` | 48×64 | Pelaaja: 3 saraketta (seisoo, askel A, askel B) × 4 riviä (alas, ylös, vasen, oikea), 16×16/kuva |
| `sprites/trainer_back.png` | 32×32 | Pelaaja selkä päin taistelun alussa |
| `sprites/tiles.png` | 208×16 | Ruudut 16×16: 0 ruoho, 1 ruoho 2, 2 polku, 3–4 kukat (animaatio), 5 puu (vanha), 6 puska, 7–8 lähde (ei käytössä), 9 kyltti, 10 puskan etuosa (pelaajan päälle), 11–12 läpinäkyvä puu kahtena versiona (lomittainen metsä) |
| `sprites/bush_rustle.png` | 48×16 | Puskan heilunta, 3 kuvaa |
| `sprites/tiles_hyujal.png` | 208×16 | HYUJAL METSÄN ruudut samassa järjestyksessä kuin `tiles.png`, paitsi: 3–4 pienet hohtavat sienet (animaatio), 7–8 iso hohtava sieni (animaatio, ei pääse läpi) |
| `sprites/bush_rustle_hyujal.png` | 48×16 | Liilan puskan heilunta, 3 kuvaa |
| `sprites/thunderbolt.png` | 48×32 | Salaman palat, 3 kuvaa 16×32 (pinotaan pystyyn) |
| `sprites/spark.png` | 96×32 | Sähköpurkaus, 3 kuvaa 32×32 |
| `sprites/hit.png` | 64×32 | TACKLE-osuman tähti, 2 kuvaa 32×32 |

Taistelussa 32×32-spritet piirretään 2× suurennettuna. Pikselit pysyvät terävinä.

## Koodi

| Tiedosto | Tehtävä |
|---|---|
| `index.html` | Sivu ja canvas (240×160, skaalataan kokonaisluvulla) |
| `js/font.js` | Oma 5×7-pikselifontti (myös Ä, Ö, Å) |
| `js/core.js` | Kuvien lataus, näppäimet, tekstilaatikko, valikot, apufunktiot |
| `js/overworld.js` | Kartat (`MAPS`), siirtymät karttojen välillä, alueen nimi, lomittaiset puut, liike, puskat, hohto, HOITOLA (parannus, kauppa, tiimi), kyltit |
| `js/battle.js` | Lajit (`SPECIES`), liikkeet (`MOVES`), vahinkokaava, taistelu, nappaaminen, animaatiot, kehittyminen |
| `js/save.js` | Tallennus ja lataus selaimen muistiin (localStorage) |
| `js/touch.js` | Kosketusnäytön nappulat ja pelin koko puhelimella/tabletilla |
| `js/music.js` | Chiptune-musiikki: nuotit (`TRACKS`), soittimet ja ajastus |
| `js/main.js` | Näkymät, siirtymäefektit, pelisilmukka (60 fps), kolikot ja pallot (`game`) |

Säädettäviä arvoja:
- Kohtaamisprosentit: kunkin kartan `encounters` tiedostossa `js/overworld.js` (HYUJAL METSÄLLÄ tyhjä lista = ei otuksia).
- Pallon hinta: `BALL_PRICE` tiedostossa `js/overworld.js`.
- Taistelutaustan värit kartoittain: `BATTLE_BG` tiedostossa `js/battle.js`.
- Kolikot (`coins`), nappauskolikot (`catchCoins`), nappausvaikeus (`catchRate`) ja kehitystaso (`evolveAt`): `SPECIES` tiedostossa `js/battle.js`.

Kartan muuttaminen: muokkaa kartan `rows`-taulukkoa `MAPS`-oliossa tiedostossa `js/overworld.js`. Merkit:
- `T` puu, `.` ruoho, `,` ruoho 2, `=` polku, `*` kukat / pienet sienet, `B` puska, `S` kyltti
- `H` HOITOLA (3×3), `D` HOITOLAN ovi, `P` aloituspaikka
- `M` iso hohtava sieni
- `~` vesi (kalastus), `#` silta vasemmalta oikealle, `|` silta ylhäältä alas, `Q` RANTAKIOSKI (3×2), `R` kioskin tiski
- `X` uloskäynti toiseen karttaan. Kohde määritellään kartan `warps`-kohdassa, esim. `'12,20': { to: 'hyujal', x: 12, y: 2, dir: 'down' }`.

Uuden alueen saa lisäämällä `MAPS`-olioon uuden kartan (nimi, ruutukuva, rivit, `encounters`, `warps`, kyltin teksti).

## Jatkoideoita

- Ääniefektit (askel, osuma, salama) samalla Web Audio -moottorilla.
- Voittofanfaari taistelun jälkeen.
- Otuksen vaihto kesken taistelun.
- Uusia otuksia omilla spriteillä ja tyypeillä (sähkö, kasvi, vesi…).
- Johtaja seuraa pelaajaa metsässä.
