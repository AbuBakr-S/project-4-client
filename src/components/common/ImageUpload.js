import React from 'react'
const uploadUrl = 'djxh1yrnv'
const uploadPreset = 'learnupload'

function ImageUpload({ onUpload }) {
  const [image, setImage] = React.useState('')
  function handleUpload() {
    window.cloudinary
      .createUploadWidget(
        {
          cloudName: uploadUrl,
          uploadPreset,
          sources: ['local'],
          multiple: false,
        },
        (err, result) => {
          if (err) console.log(err)
          if (result.event === 'success') {
            setImage(result.info.url)
            // onUpload(result.info.url)
          }
        }
      )
      .open()
  }
  return (
    <>
      {image && <img src={image} alt="uploaded profile" />}
      <button onClick={handleUpload} type="button" className="button is-fullwidth is-primary">{!image ? 'Select Image' : 'Select Another Image'}</button>
    </>
  )
}
export default ImageUpload