import { File } from '@google-cloud/storage';
import { Storage } from '@google-cloud/storage'; // Example for Google Cloud Storage
import { Readable } from 'stream';
import { adminStorage } from '../firebaseAdmin';

export async function swapHomeDisplayNode(oldFile: File, newFile: File) {
  let oldFileMeta = null;
  let newFileMeta = null;

  const [newFileMetadata] = await newFile.getMetadata();
  newFileMeta = newFileMetadata.metadata;

  const [oldFileMetadata] = await oldFile.getMetadata();
  oldFileMeta = oldFileMetadata.metadata;

  const oldFileSwapped = {
    home_display: 'false',
    collection: oldFileMeta?.collection, // Example: Update this field as needed
  };

  const newFileSwapped = {
    home_display: 'true',
    collection: newFileMeta?.collection, // Example: Update this field as needed
  };

  try {
    // Update the file metadata
    const oldUpdatedMeta = oldFile.setMetadata({
      // @ts-ignore
      metadata: oldFileSwapped,
    });

    const newUpdatedMeta = newFile.setMetadata({
      // @ts-ignore
      metadata: newFileSwapped,
    });
    return [newFileSwapped, oldUpdatedMeta];
  } catch (error) {
    return [];
  }
}

export async function changeCollectionCoverBackend(
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string
) {
  try {
    // Ensure the file is an image of supported type
    const supportedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!supportedTypes.includes(mimeType)) {
      throw new Error('File must be a supported image type (jpg, jpeg, png)');
    }

    // Convert buffer to a stream since Google Cloud Storage expects a stream or buffer
    const fileStream = Readable.from(fileBuffer);

    console.log(fileStream, 'hello');

    // // Create a file object in your cloud storage bucket
    // const file = bucket.file(`collections/${collection}/cover/${fileName}`);

    // // Create a writable stream to upload to Google Cloud Storage
    // const writeStream = file.createWriteStream({
    //   metadata: {
    //     contentType: mimeType,
    //   },
    // });

    // // Pipe the fileBuffer into the writable stream
    // fileStream.pipe(writeStream);

    // // Wait for the file upload to complete
    // await new Promise((resolve, reject) => {
    //   writeStream.on('finish', resolve); // On success, resolve the promise
    //   writeStream.on('error', reject); // On error, reject the promise
    // });

    // console.log(`Successfully uploaded file: ${fileName} to Cloud Storage`);

    // // After uploading, you can store metadata if needed, or update the database
    // // For example: save the file URL or other information to your database

    // // Construct the file URL
    // const fileUrl = `https://storage.googleapis.com/${bucketName}/collections/${collection}/cover/${fileName}`;

    // // You can return or use the file URL to save into your database
    // return { fileUrl };
  } catch (error) {
    console.error('Error in changing collection cover:', error);
    throw error; // Rethrow the error so the caller can handle it
  }
}

//   // Create a storage reference with a unique file name
//   const fileName = `${Date.now()}-${file.name}`;
//   const fileRef = ref(storage, `${collection}/${fileName}`);

//   // Upload the file to Firebase Storage
//   const uploadResult = await uploadBytes(fileRef, file);
//   console.log('File uploaded successfully:', uploadResult);

//   // Get the file's download URL
//   const downloadURL = await getDownloadURL(fileRef);

//   // Add metadata to Firestore
//   const photoDocRef = doc(db, collection, fileName);
//   const photoMetadata = {
//     url: downloadURL,
//     uploadedAt: new Date().toISOString(),
//     ...metadata,
//   };

//   await setDoc(photoDocRef, photoMetadata);
//   console.log('Metadata added to Firestore:', photoMetadata);

//   return { success: true, downloadURL, metadata: photoMetadata };
// } catch (error) {
//   console.error('Error uploading image:', error);
//   return { success: false, error: error.message };
// }
