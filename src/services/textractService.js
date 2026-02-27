import axios from 'axios';

const BASE_URL = '/api/textract';

export async function checkConnection() {
  const { data } = await axios.get(`${BASE_URL}/health`);
  return data;
}

export async function detectText(file) {
  const form = new FormData();
  form.append('document', file);
  const { data } = await axios.post(`${BASE_URL}/detect-text`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}

export async function analyzeDocument(file, featureTypes = ['FORMS', 'TABLES']) {
  const form = new FormData();
  form.append('document', file);
  form.append('featureTypes', JSON.stringify(featureTypes));
  const { data } = await axios.post(`${BASE_URL}/analyze`, form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
}
