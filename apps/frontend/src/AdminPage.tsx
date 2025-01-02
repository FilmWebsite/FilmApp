import React from 'react';
import { usePhotos } from '@film/photos-web';
import { Collection, CollectionType, Photo } from '@film/photos-iso';
// import { CollectionSection } from './components/CollectionSection.tsx';
// import { EditAlbumCard } from './components/EditAlbumCard.tsx';
// import imageOne from '/photos/imageOne.JPG';
// import imageTwo from './photos/imageTwo.JPG';


function AdminPage() {

    const {
        homePhotos,
        collections
      } = usePhotos();

      const albums = {
        album1: {
            name: "Sunset Vibes",
            image: "https://i.shgcdn.com/9f67059a-c8be-45db-9c91-79df9572c903/-/format/auto/-/preview/3000x3000/-/quality/lighter/", // Use URL directly
          },
        album2: {
          name: "City Lights",
          image: "https://www.primermagazine.com/wp-content/uploads/2019/05/Film_Camera_Beginner_5.jpg",
        },
        album3: {
          name: "Mountain Escape",
          image: "https://images.squarespace-cdn.com/content/v1/5da72ce0effe46000d7af51a/1610406628259-Y8LOR5VH69X7ZZTFD5DU/2424-08.jpg",
        },
        album4: {
            name: "Mountain Escape",
            image: "https://www.stevehuffphoto.com/wp-content/uploads/2013/02/7.1.jpg",
          },
      };
      


  return (
    <div className="adminBackground">

        <div>
            <h1 className='adminHeaders' style={{ color: '#f94e63' }}>Shuffle Pictures</h1>
            <div className='homePhotos'>
                {homePhotos.map((square, index) => (
                    <img src={square.url} className='homePhoto'/>
                ))}
            </div>
        </div>

        {/* <div>
       <h1 className='adminHeaders' style={{ color: '#fd5e53' }}>Edit Albums</h1>
            <div className='homePhotos'>
                {collections.map((card, index) => (
                //      <p >
                //      {card.card_name}
                //    </p>
                   <div className='albumFrame'>
                        <p>Hey</p>
                   </div>
                ))}
            </div>     
        </div> */}
        

        <div>
            <h1 className='adminHeaders' style={{ color: '#ff7f50' }}>Edit Albums</h1>
            {/* <EditAlbumCard collections={collections} /> */}
            {Object.values(albums).map((album, index) => (
                <div key={index}>
                <img src={album.image} alt={album.name} className='albumFrame' />
                <p>{album.name}</p>
                </div>
            ))}
        </div>
        

        <a href='/' className='logoutBtn'>Logout</a>
        

    </div>
  )
}

// #ff7f50, #fd5e53, #f94e63, #d2386c

export default AdminPage