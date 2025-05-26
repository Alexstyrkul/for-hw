import json

with open('spaces_py.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for i, space in enumerate(data):
    lists = space.get('lists', [])
    if isinstance(lists, list):
        for lst in lists:
            list_id = lst.get('id')
            list_name = lst.get('name')
            print(f"ID: {list_id}, Name: {list_name}")
    else:
        print(f"У space[{i}] немає lists або неправильний формат")
