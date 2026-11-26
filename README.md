# Legends Veylora – selainpelin suunnitelma

Pieni vanhan ajan otuspeli. Kävelet metsässä, ja puskista voi hypätä villi otus. Aloitat tuliotus **DUCKONDAlla**, jota ei saa mistään muualta. Taistelut ovat vuoropohjaisia. Voitoista saa kolikoita, joilla **HOITOLASTA** ostetaan **PYYDYSPALLOJA** otusten nappaamiseen.

## Otukset

| Laji | Vaihe | Sprite | Liikkeet | Puskasta / askel | Voitosta | Nappausvaikeus |
|---|---|---|---|---|---|---|
| DUCKONDA | aloitusotus, 1. vaihe | `duckonda.png` + `sprites/duckonda_*.png` | FIRE SPIN, FLAMETHROWER, FLAME TORNADO | ei koskaan (vain aloitusotuksena) | – | – |
| QUACKOBRA | 2. vaihe (DUCKONDA kehittyy tasolla 17, oppii POISON JABin) | `quackobra.png` + `sprites/quackobra_*.png` | POISON JAB, FIRE SPIN, FLAMETHROWER, FLAME TORNADO | ei koskaan (vain kehittämällä) | – | – |
| CORIL | 1. vaihe | `coril.png` + `sprites/coril_*.png` | TACKLE, ELECTROBALL, ENERGY BALL | MAATILAN maissipelto 30 % | 20 kolikkoa | helppo (0,65) |
| CORNECHAUN | 2. vaihe (kehittyy tasolla 7, oppii CORN GUNin) | `cornechaun.png` + `sprites/cornechaun_*.png` | CORN GUN, TACKLE, ELECTROBALL, ENERGY BALL | MAATILAN maissipelto 10 % | 35 kolikkoa | keskitaso (0,4) |
| CORNELIVA | 3. vaihe (kehittyy tasolla 16) | `corneliva.png` + `sprites/corneliva_*.png` | CORN GUN, TACKLE, ELECTROBALL, ENERGY BALL | MAATILAN maissipelto 5 % | 55 kolikkoa | hyvin vaikea (0,25) |
| SCARGHOST | ei kehity | `scarghost.png` + `sprites/scarghost_*.png` | SHADOW CLAW, SHADOW BALL, HAY HIDE | MAATILAN maissipelto 10 % | 40 kolikkoa | keskitaso (0,4) |
| AMPERITE | 1. vaihe | `moi 1st evo.png` + `sprites/amperite_*.png` | ELECTROBALL, TACKLE | 15 % | 25 kolikkoa | helppo (0,7) |
| AMPEREEM | 2. vaihe (kehittyy tasolla 8) | `moi.png` + `sprites/moi_*.png` | THUNDERBOLT, ELECTROBALL, TACKLE | 5 % | 50 kolikkoa | vaikea (0,35) |
| ZUBUG | 1. vaihe | `zubug.png` + `sprites/zubug_*.png` | BUG BUZZ, STICKY WEB | 15 % | 25 kolikkoa | helppo (0,7) |
| GOLBUG | 2. vaihe (kehittyy tasolla 10) | `golbug.png` + `sprites/golbug_*.png` | AIR SLASH, BUG BUZZ, STICKY WEB | 8 % | 50 kolikkoa | vaikea (0,35) |
| SQUISHROOM | ei kehity | `squishroom.png` + `sprites/squishroom_*.png` | MUD SHOT, FAIRY WIND, GIGA DRAIN | 20 % (vain HYUJAL METSÄ) | 30 kolikkoa, nappaamisesta myös 30 | keskitaso (0,5) |
| SHROOCID | ei kehity | `shroocid.png` + `sprites/shroocid_*.png` | POISON JAB, IRON HEAD, SLUDGE WAVE | 15 % (vain HYUJAL METSÄ) | 20 kolikkoa, nappaamisesta myös 20 | keskitaso (0,5) |
| EYEVIL | 1. vaihe | `eyevil.png` + `sprites/eyevil_*.png` | BABYDOLL EYES, DARK PULSE, POISON JAB | 30 % (vain HYUJAL METSÄ) | 30 kolikkoa | keskitaso (0,5) |
| EYEBALDON | 2. vaihe (kehittyy tasolla 14, oppii STARING EYEn) | `eyebaldon.png` + `sprites/eyebaldon_*.png` | STARING EYE, BABYDOLL EYES, DARK PULSE, POISON JAB | 10 % (vain HYUJAL METSÄ) | 50 kolikkoa | vaikea (0,3) |
| PSISTIEL | 1. vaihe | `psistiel.png` + `sprites/psistiel_*.png` | PSI STRIKE, PSYCHIC, IRON HEAD | 10 % (vain HYUJAL METSÄ) | 30 kolikkoa | keskitaso (0,45) |
| PSIDUOCIPE | 2. vaihe (kehittyy tasolla 20, oppii PSYCHO CUTin) | `psiduocipe.png` + `sprites/psiduocipe_*.png` | PSYCHO CUT, PSI STRIKE, PSYCHIC, IRON HEAD | 5 % (vain HYUJAL METSÄ) | 55 kolikkoa | hyvin vaikea (0,25) |
| ALGISH | 1. vaihe | `algish.png` + `sprites/algish_*.png` | POISON JAB, SLEEP POWDER | kalastus 40 % (SAARIMERI) | 25 kolikkoa | helppo (0,7) |
| SERPENALGE | 2. vaihe (kehittyy tasolla 12) | `serpenalge.png` + `sprites/serpenalge_*.png` | CRUNCH, FLAMETHROWER, POISON JAB, SLEEP POWDER | kalastus 10 % | 50 kolikkoa | vaikea (0,35) |
| MOONORG | ei kehity | `moonorg.png` + `sprites/moonorg_*.png` | DARK PULSE, CRUNCH, POISON JAB | kalastus 15 % | 35 kolikkoa | keskitaso (0,45) |
| BINCHULCIN | 1. vaihe | `binchulin.png` + `sprites/binchulin_*.png` | ICE CREAM THROW, BLIZZARD | 30 % (SNOW MOUNTAIN) | 15 kolikkoa | helppo (0,7) |
| OVERCHILL | 2. vaihe (kehittyy tasolla 9) | `overchill.png` + `sprites/overchill_*.png` | ICE FANG, ICE CREAM THROW, BLIZZARD | 10 % (SNOW MOUNTAIN) | 35 kolikkoa | keskitaso (0,45) |
| UNDERCHILL | 3. vaihe (kehittyy tasolla 16) | `underchill.png` + `sprites/underchill_*.png` | IRON HEAD, ICE FANG, ICE CREAM THROW, BLIZZARD | 3 % (SNOW MOUNTAIN) | 55 kolikkoa | hyvin vaikea (0,25) |
| SINIRAMEN | 1. vaihe | `siniramen.png` + `sprites/siniramen_*.png` | TACKLE, FIRE SPIN, MUD SHOT | 15 % (SNOW MOUNTAIN) | 20 kolikkoa | helppo (0,6) |
| POLTEARAMEN | 2. vaihe (kehittyy tasolla 16, oppii FLAMETHROWERin) | `poltearamen.png` + `sprites/poltearamen_*.png` | FLAMETHROWER, FIRE SPIN, MUD SHOT, TACKLE | 5 % (SNOW MOUNTAIN) | 55 kolikkoa | vaikea (0,3) |
| HUMMIRD | 1. vaihe | `hummird.png` + `sprites/hummird_*.png` | AIR SLASH, TACKLE | SAARIMEREN palmujen päällä (kävele palmua päin) ja VEYLORAN KYLÄN puskissa 15 % | 20 kolikkoa | keskitaso (0,6) |
| HUMMIRDING | 2. vaihe (kehittyy tasolla 14) | `hummirding.png` + `sprites/hummirding_*.png` | TWISTER, AIR SLASH, TACKLE | VEYLORAN KYLÄN puskissa 5 % (tai kehittämällä) | 45 kolikkoa | vaikea (0,3) |
| REGIACID | regi, ei kehity | `regiacid.png` + `sprites/regiacid_*.png` | REGI POWER, ACID PULSE, POISON JAB, FIRE PUNCH | REGI TEMPPELIN keskimmäinen jalusta, LV50 | – | erittäin vaikea (0,12) |
| REGIPSY | regi, ei kehity | `regipsy.png` + `sprites/regipsy_*.png` | REGI POWER, PSYCHO CUT, PSYCHIC, MIND HEAL | REGI TEMPPELIN oikea jalusta, LV50 | – | erittäin vaikea (0,12) |
| REGISMILE | regi, ei kehity | `regismile.png` + `sprites/regismile_*.png` | REGI POWER, HAPPINESS PULSE, BABYDOLL EYES, CHARM | REGI TEMPPELIN vasen jalusta, LV50 | – | erittäin vaikea (0,12) |
| VIRTULEAST | ULTRA PETO, ei kehity | `virtuleast ultra beast.png` + `sprites/virtuleast_*.png` | POISON JAB, VIRTUAL SHOT, SLUDGE WAVE, ELECTRO POWER | MADONREIÄSSÄ, vaeltaa kartalla | 50 kolikkoa | vaikea (0,2) |
| DROISON | ULTRA PETO, ei kehity | `droison ultra beast.png` + `sprites/droison_*.png` | POISON JAB, DRAGON BREATH, DRAGON CLAW, POISON POWDER | MADONREIÄSSÄ, vaeltaa kartalla | 50 kolikkoa | vaikea (0,2) |
| GOLBUZZ | ULTRA PETO, ei kehity | `golbuzz ultra beast.png` + `sprites/golbuzz_*.png` | BUG BUZZ, SWARM, CLOSE COMBAT, LOW KICK | MADONREIÄSSÄ, vaeltaa kartalla | 40 kolikkoa | vaikea (0,22) |
| ALGISHIOD | ULTRA PETO, ei kehity | `algishiod ultra beast.png` + `sprites/algishiod_*.png` | SHARP SPEAR, ELECTROBALL, SLEEP POWDER, FLAMETHROWER | MADONREIÄSSÄ, vaeltaa kartalla | 40 kolikkoa | vaikea (0,22) |
| AMPERITIE | ULTRA PETO, ei kehity | `amperitie ultra beast.png` + `sprites/amperitie_*.png` | THUNDER, SELF DESTRUCTION, ELECTROBALL, SPARK HEAL | MADONREIÄSSÄ, vaeltaa kartalla | 40 kolikkoa | vaikea (0,22) |
| DRISTIEL | ULTRA PETO, ei kehity | `dristiel ultra beast.png` + `sprites/dristiel_*.png` | PSI STRIKE, PSYCHIC, MIND CONTROL, REST | MADONREIÄSSÄ, vaeltaa kartalla | 40 kolikkoa | vaikea (0,22) |

Kehittyessään otus oppii uuden liikkeen ja pitää vanhat: AMPERITE oppii THUNDERBOLTin ja ZUBUG AIR SLASHin. Toisen vaiheen otuksilla on paremmat perusarvot (HP, hyökkäys, nopeus…), ja niistä saa enemmän kokemuspisteitä. Pelaaja aloittaa pelkällä DUCKONDAlla. Kaikki muut otukset saa vain nappaamalla.

PUSKAMETSÄN puskissa kohtaamisen mahdollisuus on yhteensä 43 % askelta kohden, HYUJAL METSÄSSÄ 90 % (EYEVIL 30 %, EYEBALDON 10 %, SQUISHROOM 20 %, SHROOCID 15 %, PSISTIEL 10 %, PSIDUOCIPE 5 %). SAARIMERELLÄ kalastus nappaa 65 % heitoista (ALGISH 40 %, MOONORG 15 %, SERPENALGE 10 %). Kehittyessään ALGISH oppii CRUNCHin ja FLAMETHROWERin. SNOW MOUNTAINilla puskissa on 63 % (BINCHULCIN 30 %, SINIRAMEN 15 %, OVERCHILL 10 %, POLTEARAMEN 5 %, UNDERCHILL 3 %). BINCHULCIN oppii ICE FANGin kehittyessään OVERCHILLiksi, ja OVERCHILL oppii IRON HEADin kehittyessään UNDERCHILLiksi.

### Kiiltävät muodot

- Jokainen kohdattu villi otus on **1/500** todennäköisyydellä kiiltävä (`SHINY_CHANCE` tiedostossa `js/battle.js`).
- **SHINY CHARM:** kun KOKOELMASSA on jokainen otus, eli olet napannut tai kehittänyt jokaista vähintään yhden (kaikki lajit paitsi aloitusotus DUCKONDA, vain kehittämällä saatava QUACKOBRA, regit ja ULTRA PEDOT; ne näkyvät silti KOKOELMASSA), saat SHINY CHARMin. Sen jälkeen villit otukset ovat kiiltäviä **1/400** todennäköisyydellä (`SHINY_CHANCE_CHARM`). SHINY CHARM ei vaikuta ULTRA PETOIHIN.
- **BEAST CHARM:** kun olet napannut jokaisen ULTRA PEDON (VIRTULEAST, DROISON, GOLBUZZ, ALGISHIOD, AMPERITIE ja DRISTIEL), saat BEAST CHARMin. Sen jälkeen ULTRA PEDOT ovat kiiltäviä **1/400** todennäköisyydellä (ilman sitä 1/500). BEAST CHARM ei vaikuta muihin otuksiin. KOKOELMAN yläreuna näyttää molempien charmien edistymisen.
- **KOKOELMA** (HOITOLAN valikossa): näyttää, mitkä otukset on napattu (oma ruutu otuskorteilla, ks. HOITOLA), montako on napattu (regit mukaan lukien) sekä SHINY CHARMin edistymisen ilman regejä (esim. SHINY CHARM 18/19) tai ON, kun se on saatu. Jos kokoelma on jo valmis mutta SHINY CHARMia ei vielä ole (esim. vanhassa tallennuksessa), se annetaan heti KOKOELMAA katsottaessa. Uusi laji lisätään kokoelmaan, kun se napataan ensimmäisen kerran **tai kun oma otus kehittyy siksi** (esim. EYEVIL → EYEBALDON lisää EYEBALDONin). Vanhoissa tallennuksissa jo kehittyneet otukset (tiimissä tai PC:ssä) lisätään kokoelmaan, kun peli ladataan.
- Aloitusotus DUCKONDA on kiiltävä **1/10** todennäköisyydellä (`shinyChance` DUCKONDAn tiedoissa). Arvonta tehdään, kun uusi peli alkaa, ja aloitusteksti kertoo, jos osui.
- Kiiltävä otus käyttää sinun "kiiltävä …" -spritejäsi, ja teksti kertoo, että se on KIILTÄVÄ.
- **Kiiltävän kimallus:** kun kiiltävä villi otus ilmestyy (tai lähetät oman kiiltäväsi taisteluun), sen keskeltä räjähtää iso valkoinen tähti ja kahdeksan kultaista tähteä lentää renkaana ulos. Sen jälkeen isot nelisakaraiset tähdet (kulta, valkoinen, vaaleanpunainen, vaaleansininen) syttyvät, kasvavat ja hiipuvat otuksen ympärillä, ja pientä kimallusta leijuu ylöspäin. Lopuksi yksi iso tähti välähtää otuksen päällä (`shinySparkle` tiedostossa `js/battle.js`).
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
- Napin vieressä on **🎒 Reppu**-nappi: se näyttää kaikkien pallojen (PYYDYS, GREAT, ULTRA, MASTER) ja kolikoiden määrän sekä oman tiimin (HP, XP, tila, liikkeet ja PP). PC:ssä olevat otukset eivät näy repussa. Reppu suljetaan Sulje-napista, taustaa klikkaamalla tai Esc/X-näppäimellä.
- Mukaan tallentuvat tiimi ja PC:n otukset (tasot, XP, HP, PP, tilat, kiiltävyys), kolikot, pallot ja paikka kartalla.
- Kesken taistelua ei tallenneta. Jos sivu suljetaan taistelussa, peli jatkuu viimeisestä tallennuksesta ennen taistelua.
- **Useita pelejä:** aloitusruudussa on **JATKA** ja **UUSI PELI**. Uusi peli ei poista vanhoja, vaan jokainen peli tallentuu omaksi pelikseen.
  - UUSI PELI kysyy pelille nimen (enintään 12 merkkiä; ehdotus PELI 1, PELI 2, …). Nimellä pelit erottaa toisistaan.
  - JATKA avaa listan **VALITSE PELI**: nimi, viimeisin tallennusaika sekä johtaja ja tiimin koko. Uusin ensin, 4 per sivu (vasen/oikea vaihtaa sivua).
  - Pelin valinnasta aukeaa JATKA / NIMEÄ / POISTA / TAKAISIN. POISTA kysyy varmistuksen (oletuksena EI), koska poistettua peliä ei voi palauttaa.
  - Tallenna-napin vieressä näkyy, mikä peli tallentui ja milloin.
  - Vanha tallennus (ajalta ennen useita pelejä) siirtyy listaan nimellä PELI 1.
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
     - OSTA: **TYHJÄ TM** maksaa 25 kolikkoa (`EMPTY_TM`), PYYDYSPALLO 50 kolikkoa (`BALL_PRICE` tiedostossa `js/overworld.js`), **ULTRA PALLO 200 kolikkoa** (`ULTRA_PRICE`) ja **MASTER PALLO 1000 kolikkoa** (`MASTER_PRICE`). Kauppa pysyy auki, kunnes valitset POISTU.
     - TIIMI: valitse, kuka johtaa (lähtee ensimmäisenä taisteluun).
     - KOKOELMA: oma ruutu, jossa jokainen otus on kortti: numero, sprite ja nimi. Napatut (tai kehitetyt) näkyvät värillisinä, muut mustina siluetteina ja "???"-nimellä; regien kortit ovat violetteja. Yläreunassa näkyy napattujen määrä, edistymispalkki ja SHINY CHARMin tilanne (ilman regejä).
       - Napauta korttia (tai paina Z) nähdäksesi tiedot: iso sprite, **✦ Näytä kiiltävä** -nappi, ominaisuudet palkkeina (HP, hyökkäys, puolustus, erikoishyökkäys, erikoispuolustus, nopeus), liikkeet, kehitys ja mistä otuksen löytää (alue ja todennäköisyys). Nappaamattomasta näkyy vain siluetti.
       - Näppäimistöllä: nuolet liikkuvat, Z avaa ja sulkee tiedot, tiedoissa vasen/oikea selaa otuksia ja S vaihtaa kiiltävään, X/Esc palaa ja sulkee. Puhelimella kortteja on kolme rivissä, ja lista vierii.
     - PC: oma ruutu otuksille, joita ei halua pitää tiimissä. Vasemmalla on tiimi (6 paikkaa), oikealla PC:n laatikko (30 paikkaa; jos otuksia on enemmän, laatikoita vaihdetaan ◀ ▶ -napeilla).
       - Raahaa otus toisen päälle, niin ne vaihtavat paikkaa (PC ↔ tiimi, tai järjestys tiimin/laatikon sisällä; tiimin ensimmäinen lähtee taisteluun ensin).
       - Tyhjään tiimipaikkaan raahattu otus liittyy tiimiin, tyhjään laatikkopaikkaan raahattu menee PC:hen (tiimiin jää aina vähintään yksi).
       - Raahaamisen sijaan voi myös napauttaa ensin otusta ja sitten paikkaa. Näppäimistöllä: nuolet liikuttavat, Z/Enter valitsee ja laskee, X peruu, Esc sulkee.
       - PC:hen menevät otukset parannetaan.
       - **Vapauttaminen:** napauta otusta (tiimissä tai laatikossa), niin sen tietojen viereen tulee punainen **Vapauta**-nappi (näppäimistöllä V tai Delete). Peli kysyy: *Haluatko vapauttaa tämän otuksen?* ja näyttää otuksen kuvan ja tason. EI on valmiiksi valittuna; vain KYLLÄ vapauttaa. Vapautettua otusta ei saa takaisin (napattu regi ei myöskään palaa temppeliin), ja tiimiin jää aina vähintään yksi otus.
     - Jos tiimi on täynnä (6), napattu otus lähetetään automaattisesti HOITOLAN PC:hen.
     - Kolikot ja pallot näkyvät vasemmassa yläkulmassa.
   - **Kyltti:** ohjeteksti.
   - Metsän alareunasta polku vie etelään **HYUJAL METSÄÄN**.
   - HOITOLAN ohi itään kulkeva polku jatkuu metsän oikean reunan läpi **SAARIMERELLE**.
   - HOITOLAN yläpuolelta polku nousee puskien välistä pohjoiseen **SNOW MOUNTAINILLE**.
   - Aloituspaikan vierestä polku kulkee länteen metsän vasemman reunan läpi **VEYLORAN KYLÄÄN**.
2b. **VEYLORAN KYLÄ** (30 × 20 ruutua, PUSKAMETSÄN länsipuolella)
   - Pieni kylä: viisi taloa (punainen, sininen, vihreä, oranssi ja violetti katto, ikkunoissa kukkalaatikot), hiekkakadut, kukkia, puskarivejä, kyltti ja avoin lampi. Soi PUSKAMETSÄN musiikki.
   - **Kylän puskista voi tulla** **HUMMIRD** (15 %), **SQUISHROOM** (15 %), **SINIRAMEN** (15 %), **HUMMIRDING** (5 %) tai **POLTEARAMEN** (5 %) askelta kohden, tasoilla 3–10. Lampeen ei pääse, eikä siinä voi kalastaa otuksia.
   - **Sivutehtävä: TM-KERÄILIJÄ** (vihreä lakki ja takki, `sprites/tmcollector.png`) seisoo kylän keskellä kyltin lähellä. Hän kerää TYHJIÄ TM-levyjä: tuo hänelle **5 TYHJÄÄ TM:ää** (25 kolikkoa kappale HOITOLAN kaupasta, `TM_QUEST_COUNT`), niin saat palkinnoksi **FALSE SWIPE TM:n**.
     - **FALSE SWIPE TM** on REPUSSA. Paina **Opeta** ja valitse tiimistä otus, joka oppii **FALSE SWIPEn**. Jos otus osaa jo 4 hyökkäystä, valitse, minkä se unohtaa. TM ei kulu, joten saman TM:n voi opettaa monelle otukselle. Taistelun aikana TM:ää ei voi käyttää.
     - **FALSE SWIPE** (voima 40, tarkkuus 100, 40 PP): jättää vastustajalle aina vähintään **1 HP:n**, joten otus ei uuvu ja sen voi napata.
   - Mene talon oven eteen ja paina Z: kylän vanhin, lapsi, kalastaja ja puutarhuri puhuvat, sininen talo on lukossa (tekstit kartan `houseTexts`-kohdassa).
   - Kartassa talo on `KKK`-lohko (3 × 3, ovi `O` alarivin keskellä), puska `B` ja lampi `~`. Talojen kattovärit menevät lukujärjestyksessä.
   - Itäreunan polku vie takaisin PUSKAMETSÄÄN ja länsireunan polku **MAATILALLE**.
2c. **MAATILA** (30 × 20 ruutua, VEYLORAN KYLÄN länsipuolella)
   - Iso punainen **navetta** (ovi keskellä, paina Z ovella), heinäpaaleja, **maissipelto** ja **lehmäaitaus**, jossa kolme lehmää kävelee rauhassa ja välillä laiduntaa pää alhaalla. Lisäksi maanviljelijän talo ja kyltti.
   - Aitaukseen pääsee alareunan portista. Kun kävelet lehmää päin tai painat Z sen vieressä, se ammuu.
   - **Maissipellosta voi tulla** **CORIL** (30 %), **CORNECHAUN** (10 %), **SCARGHOST** (10 %) tai **CORNELIVA** (5 %) askelta kohden, tasoilla 4–12. Maissi heiluu, kun sen läpi kävelee.
   - Kartassa navetta on `NNNN`-lohko (4 × 3, katto ulottuu rivin ylemmäs), maissi `B`, heinäpaali `M` ja aita `Y`. Lehmien paikat ja aitauksen rajat ovat kartan `cows`- ja `cowPen`-kohdissa.
   - Itäreunan polku vie takaisin VEYLORAN KYLÄÄN.
3. **HYUJAL METSÄ** (24 × 18 ruutua)
   - Hohtava metsä: liilat puut, ruoho ja puskat, hohtavat siniset ja liilat sienet (pienet sienet ja isot, kiinteät sienet sykkivät) sekä leijuvat valopisteet.
   - Liiloista puskista voi tulla **EYEVIL** (30 %), **EYEBALDON** (10 %), **SQUISHROOM** (20 %), **SHROOCID** (15 %), **PSISTIEL** (10 %) tai **PSIDUOCIPE** (5 %) askelta kohden.
   - Täällä taistellessa taustakin on liila, ja taivaalla tuikkii sinisiä ja liiloja valoja.
   - Kun menet alueelle, sen nimi liukuu hetkeksi ruudun yläreunaan. Sama tapahtuu palatessa PUSKAMETSÄÄN.
   - Pohjoisreunan polku vie takaisin PUSKAMETSÄÄN. Kyltti on polun varrella.
4. **SNOW MOUNTAIN** (26 × 20 ruutua)
   - Luminen metsä PUSKAMETSÄN pohjoispuolella: lumiset kuuset, lumihuippuiset puskat, kimaltelevaa lunta ja tallattu lumipolku keskellä. Lunta sataa koko ajan.
   - Lumisista puskista voi tulla **BINCHULCIN** (30 %), **SINIRAMEN** (15 %), **OVERCHILL** (10 %), **POLTEARAMEN** (5 %) tai **UNDERCHILL** (3 %). Kyltti on polun varrella.
   - Täällä taistellaan lumisella taustalla.
   - Polku jatkuu pohjoisreunan läpi suoraan **REGI TEMPPELIIN**.
4b. **REGI TEMPPELI** (24 × 23 ruutua, SNOW MOUNTAINin yläpuolella)
   - Violetti-pinkki temppeli: kivilaattalattia, violetti matto keskellä, hehkuvat riimut lattiassa, pinkillä liekillä palavat kivimaljat, tiiliseinät ja vaaleanpunaisia kipinöitä ilmassa. Soi HYUJAL METSÄN musiikki.
   - **Ei puskia eikä villejä otuksia.**
   - **Violetit patsaat:** yhdeksän patsasta jalustoillaan (mattoa pitkin perällä PSIDUOCIPE, sivuilla PSISTIEL, MOONORG, AMPEREEM, DUCKONDA, HUMMIRDING, UNDERCHILL, SERPENALGE ja GOLBUG). Patsaat tehdään peliä ajettaessa sinun otuskuvistasi: kuvan valot ja varjot säilyvät, mutta väri muuttuu violetiksi kiveksi. Kartassa patsas on `AA` (2 ruutua leveä, ei pääse läpi); lajit ovat kartan `statues`-listassa lukujärjestyksessä.
   - **Regit:** temppelin perällä on kolme jalustaa (`EE`), joilla leijuvat pinkissä hehkussa **REGISMILE** (vasen), **REGIACID** (keskellä) ja **REGIPSY** (oikea) (kartan `regis`-lista).
     - Kävele regiä päin (tai paina Z), niin taistelu alkaa. Regit ovat aina **tasolla 50**, ja ne taistelevat temppelin violetilla taustalla.
     - **Regiä ei voi voittaa pois:** jos se uupuu, se palaa jalustalleen ja taistelu loppuu (ei XP:tä). Taistelu alkaa alusta täysin voimin, kunnes nappaat sen. Paeta saa.
     - Nappaaminen on vaikeaa (0,12): heikennä regiä, anna sille tila (halvaus, myrkky, palovamma tai uni) ja käytä GREAT tai ULTRA PALLOA, tai MASTER PALLOA, joka nappaa aina. Täydellä tiimillä napattu regi menee PC:hen.
     - **Napattu regi ei palaa:** sen jalusta jää tyhjäksi ja hehkuu himmeästi.
     - **Regit eivät ole koskaan kiiltäviä** temppelissä.
   - Etelän ovesta pääsee takaisin SNOW MOUNTAINille. Kyltti on oven lähellä.
   - **Madonreikä:** oven vieressä oikeassa alakulmassa pyörii violetti madonreikä (`WW`, 2 × 2 ruutua, `sprites/wormhole.png`). Sen edessä seisoo **MADONREIÄN VARTIJA** (tummansininen takki, `sprites/wormkeeper.png`).
     - Vartija pyytää keräämään **5 REGI SHARDIA** (`sprites/regi_shard.png`). Ne kimaltelevat maassa: yksi PUSKAMETSÄSSÄ, HYUJAL METSÄSSÄ, SAARIMERELLÄ, SNOW MOUNTAINILLA ja MAATILALLA (kartan `shard`-kohta). Kävele shardin päälle, niin poimit sen. Reppu näyttää, montako sinulla on.
     - Kun sinulla on kaikki viisi, puhu vartijalle ja anna shardit. Sen jälkeen madonreikä pyörii nopeammin, ja kun kosket sitä, pääset **MADONREIKÄÄN**. Ilman shardeja vartija ei päästä sisään.
     - Shardit ja niiden antaminen tallentuvat.
4c. **MADONREIKÄ** (40 × 27 ruutua, madonreiän takana)
   - Kivisiä asteroideja leijuu tähtitaivaalla: kraatereita, hehkuvat tähtipolut, sinisiä tähtikristalleja, leijuvia violetteja kristalleja ja tuikkivia tähtiä. Asteroidien välissä ja kartan reunoilla on avaruutta (`T`), jota ei pääse läpi.
   - **ULTRA PEDOT näkyvät kartalla:** puskia eikä piilotettuja kohtaamisia ole. Kun tulet madonreiästä, kivelle ilmestyy 9 petoa (VIRTULEAST, DROISON, GOLBUZZ, ALGISHIOD, AMPERITIE ja DRISTIEL, kartan `wanderers`). Ne leijuvat ja liikkuvat hitaasti ruudusta toiseen, ja pikkukartalla ne näkyvät pinkkeinä pisteinä. Kävele pedon luo (tai paina Z sen edessä), niin taistelu alkaa. Peto katoaa kartalta, kun taistelu alkaa, ja uudet tulevat, kun palaat madonreiästä uudelleen. Ne ovat tasoilla 30–40, ja niitä vastaan taistellaan tähtitaivaan alla.
   - **Kiiltävät ULTRA PEDOT:** jokainen kartalle ilmestyvä peto on 1/500 (BEAST CHARMilla 1/400, SHINY CHARM ei auta) todennäköisyydellä kiiltävä (`virtuleast kiiltävä.png` ym. + `sprites/shiny_<nimi>_*.png`). Kiiltävän pedon näkee jo kartalla: se on kiiltävän värinen, ja sen päällä tuikkii pieni tähti. SHINY CHARMiin ULTRA PETOJA ei tarvita: niille on oma BEAST CHARM.
   - Uusia liikkeitä: VIRTUAL SHOT (kriittinen osuma tulee helpommin), ELECTRO POWER (voi halvaannuttaa), DRAGON BREATH (voi halvaannuttaa), DRAGON CLAW, POISON POWDER (myrkyttää, ei vahinkoa), SWARM, CLOSE COMBAT (120), LOW KICK, SHARP SPEAR (kriittinen osuma tulee helpommin), THUNDER (110, osuu 70 %), SELF DESTRUCTION (200, mutta käyttäjä uupuu itsekin), SPARK HEAL (palauttaa puolet HP:sta), MIND CONTROL (75, voi laskea kohteen hyökkäystä) ja REST (koko HP takaisin ja tila pois, mutta käyttäjä nukkuu 2 vuoroa).
   - Madonreikä vie takaisin REGI TEMPPELIIN. Itäreunan tähtipolku vie **DUO LANDSIIN**.
4d. **DUO LANDS** (32 × 22 ruutua, MADONREIÄN itäpuolella)
   - Hiljaisia peltoja, jotka leijuvat tähtitaivaalla: kynnettyä maata oraineen, kultaista vehnää (sen läpi voi kävellä, ja se heiluu), heinäpaaleja, hiekkapolku ja sinisinä tuikkivia tähtikukkia. Pellon reunojen ulkopuolella on yötaivas, jota ei pääse läpi.
   - Koko alueella on yö: taivaalla tuikkii tähtiä, ja muutaman sekunnin välein **tähdenlento** viuhahtaa taivaan poikki (`night`, `stars` ja `shootingStars` kartan tiedoissa).
   - Täällä ei ole otuksia, vain peltoa. Kyltti on keskellä. Länsireunan polku vie takaisin MADONREIKÄÄN.
5. **SAARIMERI** (30 × 20 ruutua)
   - Hiekkaranta palmuineen, kolme ruohoista saarta ja niiden välillä puusillat. Rantaviivassa vaahtoaa, ja vesi aaltoilee.
   - **Kalastus:** seiso veden (tai sillan) reunalla katse veteen ja paina **F**. Siima lentää veteen, ja koho kelluu hetken. Sitten joko jokin nappaa ja otus **nousee vedestä** taisteluun (ALGISH, MOONORG tai SERPENALGE), tai "Mikään ei näykkinyt". Merellä taistellaan meren taustalla (vesi ja hiekkasärkät). Lista on kartan `fishing`-kohdassa.
   - **RANTAKIOSKI:** mene tiskin eteen ja paina Z. Kioskista saa:
     - PYYDYSPALLO, 50 kolikkoa.
     - GREAT PALLO, 75 kolikkoa (`GREAT_PRICE`). Nappaa **kaksi kertaa** paremmin.
     - ULTRA PALLO, 200 kolikkoa (`ULTRA_PRICE`). Nappaa **kolme kertaa** paremmin.
     - MASTER PALLO, 1000 kolikkoa. Nappaa **aina** (100 %).
   - Puskia ei ole. Rannan ja saarten **palmujen päällä istuu HUMMIRDeja** (jokaisella palmulla 50 % mahdollisuus, arvotaan joka käynnillä, vähintään yksi). Kun kävelet palmua päin, jonka päällä HUMMIRD istuu, se syöksyy alas taisteluun ja lähtee palmulta.
   - Rannan vasempaan reunaan kulkeva hiekkapolku vie takaisin PUSKAMETSÄÄN.
   - Jokaisen alueen uloskäynnillä on pieni vilkkuva nuoli, joka osoittaa poistumissuuntaan.
6. **Taistelu** (vuoropohjainen)
   - Valikko: TAISTELE / PALLO / VAIHDA / PAKENE.
   - **VAIHDA:** valitse tiimistä toinen otus taisteluun (näkyy HP). Uupunutta tai jo taistelevaa ei voi valita, ja B peruu. Vaihto vie vuoron, joten villi otus hyökkää heti uutta vastaan. Pois vaihdetun nopeusmuutokset ja tulipyörre nollautuvat. XP:n saa se, joka on taistelussa voiton hetkellä.
   - Nopeampi otus hyökkää ensin. Tasatilanteessa järjestys arvotaan.
   - Voitto antaa kokemuspisteitä (XP) ja kolikoita. Tarpeeksi XP:tä nostaa tasoa. Kehittyminen tapahtuu heti taistelun jälkeen (vilkkuva valkoinen siluetti): AMPERITE → AMPEREEM tasolla 8, ZUBUG → GOLBUG tasolla 10, PSISTIEL → PSIDUOCIPE tasolla 20 (oppii PSYCHO CUTin), EYEVIL → EYEBALDON tasolla 14 (oppii STARING EYEn), SINIRAMEN → POLTEARAMEN tasolla 16 (oppii FLAMETHROWERin), DUCKONDA → QUACKOBRA tasolla 17 (oppii POISON JABin), CORIL → CORNECHAUN tasolla 7 (oppii CORN GUNin) → CORNELIVA tasolla 16. Kiiltävä pysyy kiiltävänä kehittyessään.
   - Jos oma otus uupuu, seuraava tiimiläinen, jolla on HP:ta, lähtee taisteluun.
   - Jos koko tiimi uupuu, heräät HOITOLAN ovelta täysin voimin.

## Nappaaminen

- Valitse taistelussa PALLO. Jos sinulla on useampaa palloa (PYYDYS, GREAT, ULTRA, MASTER), peli kysyy, mitä heität. Pallo lentää villin otuksen luo, otus imeytyy palloon, ja pallo heiluu.
- GREAT PALLO kertoo nappausmahdollisuuden kahdella, **ULTRA PALLO kolmella** ja **MASTER PALLO nappaa aina** (100 %) (pallot ja kertoimet: `BALL_TYPES` tiedostossa `js/overworld.js`).
- Kolme heilahdusta = napattu, ja otus liittyy tiimiin (enintään 6; täydellä tiimillä se menee HOITOLAN PC:hen).
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
| PSI STRIKE | 100 | 100 % | 10 | Erikoishyökkäys. Ruutu muuttuu violetiksi ja valorenkaat iskeytyvät kohteeseen |
| PSYCHIC | 90 | 100 % | 10 | Erikoishyökkäys. Aallot sykkivät kohteesta, ja kohde huojuu ilmassa |
| CRUNCH | 80 | 100 % | 15 | Fyysinen hyökkäys. Kaksi hammasriviä napsahtaa kiinni |
| DARK PULSE | 80 | 100 % | 15 | Erikoishyökkäys, tummat renkaat. 20 %: kohde säpsähtää |
| SLEEP POWDER | – | 75 % | 15 | Ei vahinkoa. Unijauhe nukuttaa kohteen 1–3 vuoroksi |
| ICE CREAM THROW | 65 | 95 % | 15 | Erikoishyökkäys (oma liike). Kolmen pallon jäätelötötterö lentää kaaressa ja läsähtää. 30 %: kohteen nopeus laskee |
| BLIZZARD | 110 | 70 % | 5 | Erikoishyökkäys. Ruutu muuttuu jäänsiniseksi ja lumimyrsky pyyhkii yli |
| ICE FANG | 65 | 95 % | 15 | Fyysinen hyökkäys, jäiset hampaat ja jääsirpaleet. 10 %: kohde säpsähtää |
| TWISTER | 70 | 100 % | 15 | Erikoishyökkäys. Pyörteinen tuulipatsas nostaa kohdetta. 20 %: kohde säpsähtää |
| PSYCHO CUT | 70 | 100 % | 20 | Fyysinen hyökkäys. Violetti taivas ja kaksi hehkuvaa vaaleanpunaista terää viiltää kohteen. Kriittisen osuman mahdollisuus 1/8 (tavallisesti 1/16) |
| STARING EYE | 85 | 100 % | 10 | Erikoishyökkäys. Ruutu pimenee, kohteen ylle aukeaa valtava punareunainen silmä, jonka rakopupilli tuijottaa, ja kohde vapisee. 30 %: halvaannuttaa |
| ENERGY BALL | 90 | 100 % | 10 | Erikoishyökkäys. Vihreä luonnonenergian pallo kasvaa käyttäjän edessä, lentää kohteeseen ja räjähtää |
| CORN GUN | 85 | 95 % | 15 | Fyysinen hyökkäys. Kultaisten maissinjyvien sarja ammutaan kohteeseen, ja se tärisee. 20 %: kohde säpsähtää |
| SHADOW CLAW | 70 | 100 % | 15 | Fyysinen hyökkäys. Taivas tummuu, ja kolme varjokynnenjälkeä repäisee kohteen. Kriittisen osuman mahdollisuus 1/8 |
| SHADOW BALL | 80 | 100 % | 15 | Erikoishyökkäys. Tumma, pyörivä varjopallo lentää kohteeseen ja hajoaa violetiksi savuksi |
| HAY HIDE | – | 100 % | 10 | Ei vahinkoa. Käyttäjä piiloutuu pyörivien heinien sekaan ja välkkyy: sen **väistö** nousee portaan (enintään 3). Jokainen porras pienentää osumatodennäköisyyttä siihen: 3/(3 + portaat), eli 100 % liike osuu 75 %, 60 % ja 50 % todennäköisyydellä. Nollautuu taistelun alussa ja vaihdossa |
| REGI POWER | 120 | 90 % | 5 | Regien erikoishyökkäys. Taivas muuttuu tumman violetiksi, kulta-pinkki-turkoosit renkaat romahtavat kohteeseen ja valtava säteiden räjähdys |
| ACID PULSE | 85 | 100 % | 10 | Erikoishyökkäys. Vihreä-violetit happopisarat lentävät kohteeseen ja happorenkaat aaltoilevat. 30 %: myrkyttää |
| FIRE PUNCH | 75 | 100 % | 15 | Fyysinen hyökkäys. Nyrkki syttyy palamaan, syöksy ja tulipurkaus. 10 %: palovamma |
| MIND HEAL | – | 100 % | 10 | Ei vahinkoa. Käyttäjä saa takaisin puolet maksimi-HP:staan (pinkki valo nousee sen ympäriltä) |
| HAPPINESS PULSE | 80 | 100 % | 15 | Erikoishyökkäys. Keltaisia ja pinkkejä ilon aaltoja vierii kohteeseen |
| BABYDOLL EYES | – | 100 % | 30 | Ei vahinkoa. Sydämiä leijuu kohteeseen, ja sen fyysinen hyökkäys laskee yhden portaan (enintään −3) |
| CHARM | – | 100 % | 20 | Ei vahinkoa. Enemmän sydämiä: kohteen fyysinen hyökkäys laskee kaksi porrasta (enintään −3) |
| FIRE SPIN | 35 | 85 % | 15 | Erikoishyökkäys. Tulirengas pyörii kohteen ympärillä, ja kohde jää tulipyörteen vangiksi 4–5 vuoroksi: menettää vuoron lopussa 1/8 maksimi-HP:sta |
| FLAMETHROWER | 90 | 100 % | 15 | Erikoishyökkäys, paksu tulisuihku. 10 % mahdollisuus palovammaan |
| FLAME TORNADO | 100 | 90 % | 5 | Erikoishyökkäys (oma liike, ei oikeaa esikuvaa). Ruutu hehkuu punaisena ja kohteen nielaisee pyörivä tulipatsas. 30 % mahdollisuus palovammaan |

- **Vahinko** = ((2·taso/5 + 2) · voima · hyökkäys / puolustus) / 50 + 2, kerrottuna satunnaisluvulla 0,85–1,0.
  - Kriittinen osuma: todennäköisyys 1/16, vahinko ×1,5.
- **Halvaantunut** (PAR) otus on puolet hitaampi, ja jää 25 %:n todennäköisyydellä vuorostaan.
- **Uni** (SLP): nukkuva otus ei pysty toimimaan 1–3 vuoroon (Z-kirjaimet leijuvat), ja sitten se herää. Jos kohteella on jo jokin tila, uni ei tehoa.
- **Palovamma** (BRN): otus menettää jokaisen vuoron lopussa 1/16 maksimi-HP:staan, ja sen fyysiset hyökkäykset tekevät puolet vähemmän vahinkoa. Pysyy, kunnes otus parannetaan HOITOLASSA.
- **Myrkytetty** (PSN) otus menettää jokaisen vuoron lopussa 1/8 maksimi-HP:staan. Myrkky jää taistelun jälkeen voimaan, kunnes otus parannetaan HOITOLASSA. Tila näkyy merkkinä tietolaatikon vieressä.
- Tilasta kärsivä villi otus on helpompi napata (×1,5).
- **Tasot:** XP-raja on taso³. Villien otusten taso riippuu alueesta, ei omasta tiimistä: PUSKAMETSÄ 2–9, HYUJAL METSÄ 6–14, SAARIMERI (ranta, palmut ja kalastus) 9–18, SNOW MOUNTAIN 18–26, VEYLORAN KYLÄ 3–10 ja MAATILA 4–12 (`WILD_LEVELS` tiedostossa `js/main.js`). Pelaaja aloittaa DUCKONDAlla tasolta 5.
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
| `uusi aloitus ruutu.png` | 96×48 | Aloitusruudun kuva (piirretään 3× isona, keskitettynä; yläreunan taivas jatkuu värillä `#aeecec`) |
| `sprites/moi_blink.png`, `_hurt`, `_attack` | 32×32 | AMPEREEM: räpytys, osuma, lataus |
| `sprites/moi_back.png`, `_back_attack` | 32×32 | AMPEREEM takaa |
| `zubug.png` | 32×32 | Sinun spritesi = ZUBUG edestä |
| `sprites/zubug_blink.png`, `_hurt`, `_attack`, `_back`, `_back_attack` | 32×32 | ZUBUG: räpytys, osuma, hyökkäys (suu auki, surina), takaa (kasvot pois, kuoren raidat) |
| `golbug.png` | 32×32 | Sinun spritesi = GOLBUG edestä |
| `sprites/golbug_blink.png`, `_hurt`, `_attack`, `_back`, `_back_attack` | 32×32 | GOLBUG: räpytys, osuma, hyökkäys (vihaiset kulmat, tuuli), takaa |
| `squishroom.png` | 32×32 | Sinun spritesi = SQUISHROOM edestä |
| `sprites/squishroom_blink.png`, `_hurt`, `_attack`, `_back`, `_back_attack` | 32×32 | SQUISHROOM: räpytys, osuma (siristys), hyökkäys (vihainen kulma, hehkuva hattu, itiöt), takaa (peilattu, kasvot ja vatsa piilossa) |
| `shroocid.png` | 32×32 | Sinun spritesi = SHROOCID edestä |
| `psistiel.png`, `algish.png`, `serpenalge.png`, `moonorg.png` (+ `kiiltävä …`) | 32×32 | Sinun spritesi uusille otuksille ja niiden kiiltäville muodoille |
| `hummird.png`, `hummirding.png` (+ `kiiltävä …`) | 32×32 | Sinun lintusi. Animaatiokuvat `sprites/hummird_*`, `hummirding_*` (selkäkuvat peilattu, silmä piilossa) |
| `sprites/hummird_small.png` | 32×16 | Pieni HUMMIRD palmun päällä, 2 kuvaa (heiluu hieman) |
| `binchulin.png` (BINCHULCIN), `overchill.png`, `underchill.png` (+ `kiiltävä binchulin.png`, `kiiltävä overchill.png`, `kiiltävä undechill.png`) | 32×32 | Sinun jääotuksesi. Animaatiokuvat: `sprites/binchulin_*`, `overchill_*`, `underchill_*` (selkäkuvat peilattu, kasvot piilossa) |
| `sprites/<laji>_blink.png`, `_hurt`, `_attack`, `_back`, `_back_attack` | 32×32 | Animaatiokuvat (`<laji>` = psistiel, algish, serpenalge, moonorg). PSISTIEL, ALGISH ja SERPENALGE on peilattu selkäkuvissa (kasvot piilossa). MOONORG on AMPERITEN tapaan 3/4-kuvakulmassa, joten sitä ei peilattu: selästä näkyvät silmien takaosat, eivät kieli, suu tai vaalea vatsa |
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
| `sprites/master_ball.png` | 48×16 | MASTER PALLO: violetti, pinkki raita, samat 3 asentoa |
| `sprites/ultra_ball.png` | 48×16 | ULTRA PALLO: musta, kultainen raita, samat 3 asentoa |
| `sprites/tiles_sea.png` | 272×16 | SAARIMEREN ruudut: 0–1 saaren ruoho, 2 hiekka, 3–4 simpukat ja meritähti (animaatio), 9 kyltti, 11–12 palmut (läpinäkyvät), 13–14 vesi (animaatio), 15 silta vasen–oikea, 16 silta ylös–alas |
| `sprites/kiosk.png` | 48×32 | RANTAKIOSKI (3×2 ruutua): raidallinen markiisi, hyllyillä palloja |
| `sprites/center.png` | 48×48 | HOITOLA-rakennus (3×3 ruutua) |
| `sprites/player.png` | 48×64 | Pelaaja: 3 saraketta (seisoo, askel A, askel B) × 4 riviä (alas, ylös, vasen, oikea), 16×16/kuva |
| `sprites/trainer_back.png` | 32×32 | Pelaaja selkä päin taistelun alussa |
| `sprites/tiles.png` | 208×16 | Ruudut 16×16: 0 ruoho, 1 ruoho 2, 2 polku, 3–4 kukat (animaatio), 5 puu (vanha), 6 puska, 7–8 lähde (ei käytössä), 9 kyltti, 10 puskan etuosa (pelaajan päälle), 11–12 läpinäkyvä puu kahtena versiona (lomittainen metsä) |
| `sprites/bush_rustle.png` | 48×16 | Puskan heilunta, 3 kuvaa |
| `sprites/tiles_hyujal.png` | 208×16 | HYUJAL METSÄN ruudut samassa järjestyksessä kuin `tiles.png`, paitsi: 3–4 pienet hohtavat sienet (animaatio), 7–8 iso hohtava sieni (animaatio, ei pääse läpi) |
| `sprites/bush_rustle_hyujal.png` | 48×16 | Liilan puskan heilunta, 3 kuvaa |
| `sprites/tiles_farm.png` | 320×16 | MAATILAN ruudut: samat kuin `tiles.png`, mutta 6 = maissi, 10 = maissin etuosa (pelaajan edessä), 7–8 = heinäpaali; 15–19 = puuaidan palat (tolppa, poikkilaudat vasemmalle ja oikealle, lankku ylös ja alas). Peli liittää palat naapuriruutujen mukaan, joten aitaukset muodostuvat automaattisesti |
| `sprites/corn_rustle.png` | 48×16 | Maissi heiluu, kun sen läpi kävelee (3 ruutua) |
| `sprites/barn.png` | 64×64 | Punainen navetta: harmaa mansardikatto, heinäparven luukku, sivuikkunat ja iso X-tuettu pariovi |
| `sprites/cow.png` | 64×16 | Lehmä 16×16: oikealle seisoo, oikealle syö, vasemmalle seisoo, vasemmalle syö |
| `sprites/tiles_town.png` | 320×16 | VEYLORAN KYLÄN ruudut: samat kuin `tiles.png` (0–12), lisäksi vesi (13–14) ja puuaidan palat (15–19) |
| `sprites/houses.png` | 240×48 | Viisi 48×48 taloa: punainen, sininen, vihreä, oranssi ja violetti katto, savupiippu, ikkunat kukkalaatikoineen ja ovi alarivin keskellä |
| `sprites/tiles_temple.png` | 208×16 | REGI TEMPPELIN ruudut: lattia (0–1, 5–6, 10), matto (2), hehkuva riimu (3–4), kivimalja pinkillä liekillä (7–8), kivitaulu (9), tiiliseinän etupuoli (11) ja seinän yläosa (12) |
| `sprites/tiles_space.png` | 208×16 | MADONREIÄN ruudut: asteroidikivi (0–1, 5–6, 10), tähtipolku (2), tuikkiva tähtikristalli (3–4), leijuva violetti kristalli (7–8), kivitaulu (9), kiven reuna avaruuden yllä (11) ja avaruus (12) |
| `sprites/tiles_duo.png` | 208×16 | DUO LANDSIN ruudut: ruoho (0, 5), kynnetty maa (1), polku (2), tuikkivat tähtikukat (3–4), vehnä (6), heinäpaali (7–8), kyltti (9), vehnän etuosa (10), pellon reuna taivaan yllä (11) ja tähtitaivas (12) |
| `sprites/duo_rustle.png` | 48×16 | Vehnän heilunta, 3 kuvaa |
| `sprites/wormhole.png` | 128×32 | MADONREIKÄ: 4 pyörivää kuvaa 32×32 |
| `sprites/regi_shard.png` | 32×16 | REGI SHARD: kristalli ja kimaltava kuva |
| `sprites/wormkeeper.png` | kuten `player.png` | MADONREIÄN VARTIJA: pelaajan kuva tummansinisellä takilla |
| `sprites/tmcollector.png` | kuten `player.png` | TM-KERÄILIJÄ: pelaajan kuva vihreällä lakilla ja takilla |
| `sprites/tm_empty.png` | 16×16 | TYHJÄ TM (harmaa levy) |
| `sprites/tm_false_swipe.png` | 16×16 | FALSE SWIPE TM (valkoinen levy, punainen raita) |
| `sprites/tiles_snow.png` | 208×16 | SNOW MOUNTAINin ruudut samassa järjestyksessä kuin `tiles.png`: lumi, lumi 2, lumipolku, kimalteleva lumi (3–4), lumiset kuuset (5, 11–12), lumihuippuinen puska (6, 10), kyltti (9) |
| `sprites/bush_rustle_snow.png` | 48×16 | Lumisen puskan heilunta (lunta tippuu), 3 kuvaa |
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
| `js/save.js` | Tallennus ja lataus selaimen muistiin (localStorage), useat nimetyt pelit ja nimen kysyminen |
| `js/touch.js` | Kosketusnäytön nappulat ja pelin koko puhelimella/tabletilla |
| `js/inventory.js` | 🎒 Reppu: pallot, kolikot ja tiimi |
| `js/pcscreen.js` | HOITOLAN PC -ruutu: tiimi, laatikko ja raahaamalla vaihtaminen |
| `js/dex.js` | KOKOELMA-ruutu: otuskortit spriteineen, tiedot ja kiiltävä versio |
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
