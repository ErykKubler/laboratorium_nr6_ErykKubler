import './style.css'
import dayjs from 'dayjs'

const SUPABASE_URL = "https://zvsaklkuxbgypagazmvm.supabase.co/rest/v1/article";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2c2FrbGt1eGJneXBhZ2F6bXZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAyMzUxMzMsImV4cCI6MjA5NTgxMTEzM30.TyUv2xNqWow4h2K-CZpcuvM-TMOZwUQA0jDuLtVy1bQ";
const HEADERS = {
  "apikey": SUPABASE_KEY,
  "Authorization": `Bearer ${SUPABASE_KEY}`,
  "Content-Type": "application/json"
};

async function fetchArticles(sortBy = 'created_at.desc') {
  try {
    const response = await fetch(`${SUPABASE_URL}?order=${sortBy}`, { headers: HEADERS });
    if (!response.ok) throw new Error("Błąd podczas pobierania danych.");
    
    const articles = await response.json();
    const listElement = document.getElementById('articles-list');
    
    if (articles.length === 0) {
      listElement.innerHTML = '<p class="text-slate-400 text-center italic">Brak artykułów w bazie danych.</p>';
      return;
    }

    listElement.innerHTML = '';

    articles.forEach(article => {
      const formattedDate = dayjs(article.created_at).format('DD-MM-YYYY HH:mm');

      listElement.innerHTML += `
        <div class="bg-slate-800 p-6 rounded-lg shadow-xl border border-slate-700 transition-all hover:border-slate-600">
          <h2 class="text-2xl font-bold text-blue-400 mb-1">${article.title}</h2>
          <h3 class="text-sm text-slate-400 italic mb-3">${article.subtitle}</h3>
          <div class="text-xs text-slate-500 mb-4 flex justify-between bg-slate-900/50 p-2 rounded">
            <span>✍️ Autor: <strong class="text-slate-300">${article.author}</strong></span>
            <span>📅 Data: <strong class="text-slate-300">${formattedDate}</strong></span>
          </div>
          <p class="text-slate-200 whitespace-pre-wrap leading-relaxed">${article.content}</p>
        </div>
      `;
    });
  } catch (error) {
    document.getElementById('articles-list').innerHTML = `
      <p class="text-red-400 text-center font-semibold">Nie udało się załadować artykułów. Sprawdź konfigurację API Supabase.</p>
    `;
    console.error(error);
  }
}

document.getElementById('article-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const newArticle = {
    title: document.getElementById('title-input').value,
    subtitle: document.getElementById('subtitle-input').value,
    author: document.getElementById('author-input').value,
    content: document.getElementById('content-input').value,
    created_at: document.getElementById('date-input').value
  };

  try {
    const response = await fetch(SUPABASE_URL, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(newArticle)
    });

    if (!response.ok) throw new Error("Błąd podczas zapisywania artykułu.");

    document.getElementById('article-form').reset();
    const currentSort = document.getElementById('sort-select').value;
    fetchArticles(currentSort);

  } catch (error) {
    alert("Wystąpił problem z dodaniem artykułu. Sprawdź połączenie z bazą.");
    console.error(error);
  }
});

document.getElementById('sort-select').addEventListener('change', (e) => {
  fetchArticles(e.target.value);
});

fetchArticles();