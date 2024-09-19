import { adminStorage } from '../firebaseAdmin';

export async function getFilesandMeta() {
  const [files] = await adminStorage.getFiles();

  const filePromises = files.map(async (file) => {
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: '03-17-2025',
    });

    const [metadata] = await file.getMetadata();

    const processedMetadata = {
      ...metadata.metadata,
      home_display: metadata.metadata?.home_display === 'true',
      // @ts-ignore
      collection: metadata.metadata?.collection?.includes(',')
        ? metadata.metadata.collection
            // @ts-ignore

            .split(',')
            // @ts-ignore

            .map((item) => item.trim().replace(/[\[\]]/g, ''))
        : // @ts-ignore

          metadata.metadata?.collection?.replace(/[\[\]]/g, ''),
    };

    return { url, metadata: processedMetadata };
  });

  const photos = await Promise.all(filePromises);

  console.log('from helper');

  return photos;
}
