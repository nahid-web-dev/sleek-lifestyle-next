'use client'

import { CldUploadWidget } from 'next-cloudinary';
import { MdOutlineCloudUpload } from 'react-icons/md';


function CloudWidget({ imageUrls, setImageUrls, maxLimit }) {

  const handleSuccess = (result) => {

    const newImageUrl = result?.info.secure_url;

    setImageUrls((prevArray) => {
      return [...prevArray, newImageUrl]
    })


  };

  return (
    <div className='flex flex-col text-stone-600 relative justify-end gap-2'>
      <h2 className=' sm:text-lg font-semibold'>Max: <span className='font-bold text-lg text-red-600'>{maxLimit == 1 ? '1' : '2'}</span> Images</h2>
      <CldUploadWidget
        uploadPreset="sleek_demo" // Your unsigned upload preset
        onSuccess={handleSuccess}
        options={{ multiple: true, maxFiles: maxLimit }} // Allow multiple uploads
      >
        {({ open }) => {
          function handleOnClick(e) {
            e.preventDefault();
            open(); // Open the widget on button click
          }
          return (
            <button type='button' className={`flex items-center justify-center sm:gap-4 gap-1 ${maxLimit == 1 ? 'bg-sky-400' : 'bg-sky-600'} text-white font-semibold w-28  h-10 sm:w-40 rounded-xl`} onClick={() => open()}>
              <MdOutlineCloudUpload className='  text-lg sm:text-xl font-semibold' /> {maxLimit == 1 ? "main Img" : "side Img"}
            </button>
          );
        }}
      </CldUploadWidget>
    </div>
  )
}

export default CloudWidget