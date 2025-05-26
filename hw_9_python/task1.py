arr = [4, 4, 8, 3, 3, 3, 2, 4, 4]

print("Всі елементи:")
for el in arr:
    print(el)

print("\nПерші 3 елементи:")
print(arr[:3])

total = sum(arr)
print("\nСума всіх елементів:", total)

sum_without_4 = sum(el for el in arr if el != 4)
print("Сума без 4:", sum_without_4)
