kontostand = 100  

while True:
    print("\nWillkommen beim Bankautomaten")
    print("1 - Kontostand anzeigen")
    print("2 - Geld einzahlen")
    print("3 - Geld abheben")
    print("4 - Beenden")

    # Eingabe des Benutzers
    auswahl = input("Wähle eine Option (1/2/3/4): ")

    if auswahl == "1":
        print(f"\nDein Kontostand: {kontostand}€")

    elif auswahl == "2":
        betrag = int(input("\nBetrag zum Einzahlen: "))
        kontostand = kontostand + betrag
        print(f"\nNeuer Kontostand: {kontostand}€")

    elif auswahl == "3":
        betrag = int(input("\nBetrag zum Abheben: "))
        if betrag <= kontostand:
            kontostand = kontostand - betrag
            print(f"\nNeuer Kontostand: {kontostand}€")
        else:
            print("\nNicht genug Geld auf dem Konto!")

    elif auswahl == "4":
        print("\nDanke fürs Nutzen des Bankautomaten. Tschüss!")
        break 

    else:
        print("\nUngültige Eingabe, bitte wähle 1, 2, 3 oder 4.")
