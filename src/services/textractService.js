import axios from 'axios';

const BASE_URL = '/api/textract';

function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function checkConnection() {
  const { data } = await axios.get(`${BASE_URL}/health`);
  return data;
}

export async function detectText(file) {
  const document = await fileToBase64(file);
  const { data } = await axios.post(`${BASE_URL}/detect-text`, { document });
  return data;
}

export async function analyzeDocument(file, featureTypes = ['FORMS', 'TABLES']) {
  const document = await fileToBase64(file);
  const { data } = await axios.post(`${BASE_URL}/analyze`, { document, featureTypes });
  return data;
}
