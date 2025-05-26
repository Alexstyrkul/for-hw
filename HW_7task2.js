const fs = require('fs');

const data = fs.readFileSync('list.json', 'utf-8');
const json = JSON.parse(data);

if (Array.isArray(json.lists)) {
  json.lists.forEach(list => {
    console.log(`ID: ${list.id}, Name: ${list.name}`);
  });
} else {
  console.log("Поле 'lists' не знайдено або воно не є масивом.");
}
