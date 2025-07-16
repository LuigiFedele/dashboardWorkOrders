import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// Função para buscar ordens da API local
export async function fetchOrdens() {
  const response = await fetch(`${API_URL}/workorder/workorders`);
  return await response.json();
}

// Função para buscar ordens com cache diário no localStorage (frontend)
export async function fetchOrdensComCacheLocalStorage() {
  const cacheKey = 'ordens_cache';
  const cacheStr = localStorage.getItem(cacheKey);
  let cache: { date: string; data: any } | null = null;
  if (cacheStr) {
    try {
      cache = JSON.parse(cacheStr);
    } catch {}
  }
  const today = new Date();
  const todayStr = today.toISOString().slice(0, 10); // yyyy-mm-dd
  if (cache && cache.date === todayStr) {
    return cache.data;
  }
  const data = await fetchOrdens();
  localStorage.setItem(cacheKey, JSON.stringify({ date: todayStr, data }));
  return data; // Agora retorna um array direto
}

// Função utilitária para acessar campos aninhados e tratar nulos
export function getSafe(obj: any, path: string[], fallback: any = null) {
  return path.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : fallback), obj);
}
