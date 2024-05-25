import React, { useEffect } from 'react';
import axios from 'axios';
import { placeholder } from '../assets';
import { ImageEditor } from './ImageEditor';

function ImageGallery({
  photos,
  width = 240,
  height = 240,
  border = 5,
  color = [255, 255, 255, 0.6],
  isPublic = false,
}) {
  // const [img, setImg] = React.useState(placeholder);

  // useEffect(() => {
  //   axios
  //     .get(photos.path, {
  //       responseType: 'arraybuffer',
  //       headers: {
  //         Authorization: `Bearer ${
  //           document.getElementById('myToken')?.value
  //         }`,
  //       },
  //     })
  //     .then((response) => {
  //       //   const u8 = new Uint8Array(response.data);
  //       const b64encoded = btoa(
  //         [].reduce.call(
  //           new Uint8Array(response.data),
  //           (p, c) => p + String.fromCharCode(c),
  //           '',
  //         ),
  //       );
  //       const mimetype = 'image/jpeg';
  //       setImg(`data:${mimetype};base64,${b64encoded}`);
  //     });
  // }, []);

  //   const request = new XMLHttpRequest();

  //   request.open('GET', photos.path, true);
  //   request.setRequestHeader('Authorization', `Bearer ${document.getElementById('myToken')?.value}`);
  //   request.responseType = 'arraybuffer';
  //   request.onload = function (e) {
  //     const data = new Uint8Array(this.response);
  //     const raw = String.fromCharCode.apply(null, data);
  //     const base64 = btoa(raw);
  //     const src = `data:image;base64,${base64}`;
  //     setImg(src);
  //   };

  //   request.send();
  return (
    <div className="relative w-[100%]">
      {/* <ReactPanZoom alt="cool image" image={img} /> */}
      {/* <AvatarEditor
                image={img}
                width={250}
                height={250}
                border={5}
                color={[255, 255, 255, 0.6]} // RGBA
                scale={1.2}
                rotate={0}
            /> */}
      <ImageEditor
        isPublic={isPublic}
        image={photos}
        width={width}
        height={height}
        border={border}
        color={color}
      />
      {/* <button></button> */}
    </div>
  );
}

export default ImageGallery;
