const nodeFetch = require('node-fetch');
const fs = require('fs');

async function fetchJsonAndSaveToFile(url: string, filename: string) {
  try {
    // Виконуємо запит на отримання JSON з вказаного URL
    const response = await nodeFetch(url);
    const jsonData = await response.json();

    // Зберігаємо отриманий JSON в файл
    fs.writeFileSync(filename, JSON.stringify(jsonData, null, 2));
    console.log(`JSON з URL ${url} був збережений у файл ${filename}.`);
  } catch (error) {
    console.error(`Помилка при отриманні JSON з URL ${url}:`, error);
    process.exit(1);
  }
}

// Отримання аргументів командного рядка
const url = process.argv[2];
const filename = process.argv[3];

// Викликаємо функцію для отримання JSON та збереження в файл
fetchJsonAndSaveToFile(url, filename);
