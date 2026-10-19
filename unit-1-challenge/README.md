# English Challenge · Unit 1

20 úloh pre vek 10–11 rokov: present simple a present continuous, kladné vety, otázky, krátke odpovede a zápory. Jedlo je kontext viet. Bez samostatného testovania slovíčok či výslovnosti. Verzia 1.1 pridáva odovzdávanie výsledkov učiteľovi.

## Použitie

Otvoriť index.html alebo celý priečinok vložiť do koreňa GitHub Pages repozitára. Build ani server nie je potrebný. Každá z 20 odpovedí sa započíta raz, správna za 1 bod. Po vyhodnotení sa odpoveď uzamkne. Záverečný prehľad obsahuje všetky vlastné odpovede a riešenia. Nový pokus vynuluje skóre. Obnovenie stránky vymaže rozpracovaný pokus.

Písanie toleruje veľkosť písmen, medzery, interpunkciu a štandardné skrátené/plné tvary. Cieľový slovesný tvar musí byť správny. Slovosled možno skladať kliknutím aj klávesnicou; klik na vybrané slovo ho vráti. Každá úloha má jednu určenú odpoveď, nie otvorenú osobnú otázku.

## Odovzdávanie a súkromie

Pred spustením možno zapnúť odoslanie učiteľovi, zadať kód triedy a číslo žiaka v triednom zozname. Kód triedy sa môže predvyplniť z fragmentu odkazu #class=...; nie je súčasťou zdrojového kódu. Pri spustení vznikne jedinečný podpísaný pokus. Po 20 odpovediach sa výsledok automaticky odošle službe https://english-unit1-results.petinek.chatgpt.site. Potvrdenie sa ukáže až po úspešnom uložení. Pri chybe možno odoslanie zopakovať bez duplicitného záznamu. Bez potvrdenia sa výsledok nepovažuje za odovzdaný.

Učiteľský prehľad /teacher je prístupný iba overenému účtu vlastníka cez Sign in with ChatGPT. Ukladá sa číslo žiaka, 20 odpovedí, serverom vypočítané skóre a čas pokusu do D1 databázy; tieto údaje nie sú vo verejnom GitHube. Mená a kontakty detí sa nezhromažďujú. Kód žiaka zadáva sám žiak; nie je to autentifikácia totožnosti. Prehľad zobrazuje posledný a najlepší výsledok a opakované pokusy.

Režim bez odoslania je naďalej dostupný vypnutím zaškrtávacieho poľa. Aplikácia nepoužíva cookies, analytiku ani localStorage. Obnovením stránky sa rozpracovaný alebo ešte neodoslaný výsledok stratí. Pri začatom odosielaní musí žiak počkať na potvrdenie.

## Pôvod a oddelenie

Nové autorské úlohy podľa rozsahu používateľovej prípravy ANJ_5A_PRIPRAVA_2026-10-14_CVICENIA_A_ODPOVEDE.pdf a spresnenia z 19. 10. 2026. Bez reprodukcie strán učebnice. Mechanizmus vychádza z overeného postupu past-simple (otázka → kontrola → uzamknutie → ďalšia → skóre), s vlastnou implementáciou pre tri typy úloh. Neprebiera zoznam detí, identitu ani uložené výsledky starej aplikácie. Existujúce súbory repozitára ostávajú nezmenené.

## Overenie

Spustiť: node unit-1-challenge/test.cjs

Automatické kontroly: nezávislý kľúč všetkých 20 úloh, nesprávne odpovede, distraktory, dostupnosť slov na skladanie, skóre 0/20, 10/20, 20/20, ochrana pred duplicitným bodom, prázdnou odpoveďou a preskočením poradia, skrátené tvary, vynulovanie a kontrola súkromia. Stav vizuálneho overenia je v RUN_MANIFEST.md.

## Kľúč

| Úloha | Správna odpoveď |
|---|---|
| 1 | eat |
| 2 | are eating |
| 3 | drinks |
| 4 | is calling |
| 5 | eats |
| 6 | are having |
| 7 | drinks / is drinking |
| 8 | I am cooking dinner now. |
| 9 | don't |
| 10 | doesn't |
| 11 | They aren't eating noodles now. |
| 12 | He isn't drinking juice now. |
| 13 | Do you usually eat lunch at school? |
| 14 | What is she cooking now? |
| 15 | No, he doesn't. |
| 16 | Yes, they are. |
| 17 | We usually eat pasta on Fridays. |
| 18 | is making |
| 19 | Where does she usually eat lunch? |
| 20 | I am not eating now. |
