zahl1 = int(input("Gib die erste Zahl ein: "))
zahl2 = int(input("Gib die zweite Zahl ein: "))

print("Wähle eine Operation:")
print("1 - Addition")
print("2 - Subtraktion")
print("3 - Multiplikation")
print("4 - Division")
operation = input("Deine Wahl (1/2/3/4): ")

if operation == "1":
    print(f"Das Ergebnis ist: {zahl1 + zahl2}")
elif operation == "2":
    print(f"Das Ergebnis ist: {zahl1 - zahl2}")
elif operation == "3":
    print(f"Das Ergebnis ist: {zahl1 * zahl2}")
elif operation == "4":
    print(f"Das Ergebnis ist: {zahl1 / zahl2}")
else:
    print("Ungültige Auswahl!")
