// Отримання URL з вхідного параметру
const url = process.argv[2];
console.log(url);

const pattern = /\/dashboard\/([a-z0-9]{3}-){2}[a-z0-9]{3}\?/;
const match = url.match(pattern);
if (match && match[1]) {
  const dashboardId = match[0].replace('/dashboard/', '').replace('?', '');
  console.log(dashboardId);
} else {
  console.error('Помилка: Не вдалося знайти ідентифікатор панелі');
}
