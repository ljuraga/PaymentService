# Pametni ugovor za posredovanje plačanja

Pametni ugovor sadrži slijedeće funkcije:
addCustomerAddress - funkcija za dodavanje klijenta u popis klijenta
removeCustomerAddress - funkcija za brisanje klijenta iz popisa klijenta
getCustomers - funkcija za ispis svih klijenata u popisu klijenata
getCustomerCount - funkcija za ispis koliko se klijenata nalazi u popisu klijenata
getOwnerRatio - funkcija za ispis postotka provizije
getCustomerRatio - funkcija za ispis postotka usluge
setOwnerRatio - funkcija za postavljanje postotka provizije
setCustomerRatio - funkcija za postavljanje postotka usluge
getContractBalance - funkcija za ispis stanja računa ugovora
transferContractBalanceToOwner - funkcija za prijenos stanja računa ugovora na račun vlasnika ugovora
closeContract - funkcija za zatvaranje ugovora
processPayment - funkcija za isplatu iznosa provizije vlasniku ugovora na njegov račun a vlasniku stranice iznos usluge na njegov račun koju vlasnik stranice poziva iz svoje aplikacije

Sve funkcije može pozivati samo vlasnik ugovora osim funkcije processPayment koja je javna funkcija koju može pozivati svatko.
