import fetch from 'node-fetch';
import * as fs from 'fs';

// Отримання URL з вхідного параметру
const url = process.argv[2];

// Виконання HTTP-запиту для отримання JSON
fetch(url)
  .then((response) => response.json())
  .then((data) => {
    // Збереження JSON в файл
    fs.writeFileSync('output.json', JSON.stringify(data, null, 2));
    console.log('JSON успішно отримано та збережено в файл output.json');
  })
  .catch((error) => {
    console.error('Помилка при отриманні JSON:', error);
    process.exit(1);
  });
