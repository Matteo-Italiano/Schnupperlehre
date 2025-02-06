while True:
    name = input("Wie heisst du? ")
    print(f"Hallo {name}, willkommen beim Schnuppertag!")
    
    alter = int(input("Wie alt bist du? "))
    if alter >= 18:
        print("Du bist volljährig.")
    else:
        print("Du bist noch nicht volljährig.")
    
    nochmal = input("Möchtest du noch einmal probieren? (ja/nein): ")
    if nochmal.lower() != "ja":
        break