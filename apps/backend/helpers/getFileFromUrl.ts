import { adminStorage } from '../firebaseAdmin';

// Function to get the file reference from the URL
function getFileFromUrl(url: string) {
  // Remove the base URL and extract the file path
  const filePath = decodeURIComponent(
    url.split('/').slice(-1)[0].split('?')[0]
  );
  const file = adminStorage.file(filePath);
  return file;
}
