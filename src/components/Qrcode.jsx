import React from 'react';


const Qrcode = ({name, upiId, qrSource}) => {
  return (
    <div className='qr-code-wrapper bg-white flex gap-y-5 items-center flex-col border w-[350px] h-auto rounded shadow-sm pb-[10px]'>
      <h3 className='bg-slate-100 w-[100%] text-xl font-medium uppercase py-2 text-center font-sans'>{name ? name : 'Abhijit Rabha'}</h3>
      <img className='w-[255px]' src={qrSource ? qrSource : '/images/donateQrcode.png'} />
      <div className='upi-id-wrapper flex '>
        <img className='w-[40px]' src='/images/googlepay.svg' alt="Google-Pay" />
        <span className='text-gray-500 ml-2 font-semibold font-sans'>{upiId ? upiId : 'mr.abhijitrabha@oksbi'}</span>
      </div>
    </div>
  )
}

export default Qrcode
