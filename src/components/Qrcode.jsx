import React from 'react';


const Qrcode = ({ name, upiId, gPayUrl, qrSource}) => {

  const defaultQrSource = '/images/donateQrcode.png';
  const imageSource = qrSource || defaultQrSource;

  const handleDownload = async () => {
    try {
      // Fetch the image data
      const response = await fetch(imageSource, { mode: 'cors' });
      if (!response.ok) {
        throw new Error('Failed to fetch image.');
      }

      // Convert to Blob
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      // Create a temporary link for download
      const link = document.createElement('a');
      link.href = url;
      link.download = `${name ? name : 'QRCode'}.png`;
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading the image:', error);
    }
  };

  return (
    <div className='qr-code-wrapper bg-white flex gap-y-4 items-center flex-col border w-[350px] h-auto rounded-sm shadow-xs pb-[15px]'>

      <h3 className='bg-slate-100 w-[100%] text-xl font-medium uppercase py-2 text-center font-sans'>{name ? name : 'Abhijit Rabha'}</h3>
      <img className='w-[255px]' src={qrSource ? qrSource : defaultQrSource} />

      <div className='upi-id-wrapper flex '>
        <span className='text-gray-500 ml-2 font-semibold font-sans'>{upiId ? upiId : 'mr.abhijitrabha@oksbi'}</span>
      </div>

      <div className='flex gap-3'>
        <a href={gPayUrl ? gPayUrl : 'upi://pay?pa=mr.abhijitrabha@oksbi&am=500&cu=INR'} className='flex items-center gap-2 border rounded-sm py-1 px-2 border-[#3A81F1] font-sans font-[600] text-[#3A81F1]'>
          <span>Pay with</span>
          <img className='w-[40px] pt-1' src='/images/googlepay.svg' alt="Google-Pay" />
        </a>

        <button id='download-qr' className='flex gap-x-2 justify-center items-center font-sans font-[600] text-[#3A81F1] cursor-pointer' onClick={handleDownload}>
          Download
          <span className="material-symbols-outlined text-[#3A81F1]">download</span>
        </button>
      </div>

    </div>
  )
}

export default Qrcode
