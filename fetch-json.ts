import fetch from 'node-fetch';

// Функція для отримання JSON з URL
async function fetchJson(url: string): Promise<any> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch JSON from ${url}: ${response.status} ${response.statusText}`
    );
  }
  return await response.json();
}

// Приклад використання функції fetchJson
async function main() {
  try {
    const url = 'https://jsonplaceholder.typicode.com/posts/1';
    const json = await fetchJson(url);
    console.log('JSON:', json);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Виклик основної функції
main();
