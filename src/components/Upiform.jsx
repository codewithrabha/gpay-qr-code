'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Qrcode from './Qrcode';
import { ClientSegmentRoot } from 'next/dist/client/components/client-segment';

const Upiform = () => {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
  const [qrCodeUrl, setQrCodeUrl] = useState(null);
  const [gPayUrl, setgPayUrl] = useState(null);

  const onSubmit = async (data) => {
    setQrCodeUrl(null); // Reset the QR code URL before generating a new one
    setgPayUrl(null); // Reset the PayURL before generating a new one

    try {
      const response = await fetch('/api/qr', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pa: data.receiverUpiId,
          pn: data.receiverName,
          am: data.transactionAmount,
          cu: 'INR', // Assuming currency is fixed as INR
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong!');
      }

      const result = await response.json();
      setQrCodeUrl(result.apiUrl); // Store the QR code URL to display it
      setgPayUrl(result.payUrl); // Store the Gpay URL to display it

    } catch (err) {
      console.error('Error generating QR code:', err.message);
    }
  };

  const name = watch('receiverName');
  const upiId = watch('receiverUpiId');

  return (
    <div className='form-qr-wrapper flex flex-col-reverse sm:flex-row gap-y-5 w-[50%] items-center justify-between'>
      <form onSubmit={handleSubmit(onSubmit)} className='p-5 w-[350px] bg-white rounded-sm flex flex-col gap-y-3 shadow-md'>
        <div className='input-block flex flex-col'>
          <label className='text-m mb-2' htmlFor="receiver-name">Your Name</label>
          <input
            className='border py-1.5 px-2 rounded-sm shadow-xs outline-blue-600'
            type="text"
            id="receiver-name"
            placeholder='Your / Business Name...'
            {...register('receiverName', { required: 'Name is required' })}
          />
          {errors.receiverName && <span className="text-red-500">{errors.receiverName.message}</span>}
        </div>

        <div className='input-block flex flex-col'>
          <label className='text-m mb-2' htmlFor="receiver-upi-app">UPI App</label>
          <select
            className='border py-2 px-2 rounded-sm shadow-xs text-blue-600 outline-blue-600'
            id="receiver-upi-app"
            {...register('receiverUpiApp', { required: true })}
          >
            <option value="google-pay">Google-Pay</option>
          </select>
        </div>

        <div className='input-block flex flex-col'>
          <label className='text-m mb-2' htmlFor="receiver-upi-id">UPI ID</label>
          <input
            className='upi-id border py-1.5 px-2 rounded-sm shadow-xs outline-blue-600'
            type="text"
            id="receiver-upi-id"
            placeholder='Your UPI address..'
            {...register('receiverUpiId', { required: 'UPI ID is required' })}
          />
          {errors.receiverUpiId && <span className="text-red-500">{errors.receiverUpiId.message}</span>}
        </div>

        <div className='input-block flex flex-col'>
          <label className='text-m mb-2' htmlFor="transaction-amount">Amount</label>
          <input
            className='amount border py-1.5 px-2 rounded-sm shadow-xs outline-blue-600'
            type="number"
            id="transaction-amount"
            placeholder='Set your amount...'
            {...register('transactionAmount', {
              required: 'Amount is required',
              valueAsNumber: true,
              validate: (value) => value > 0 || 'Amount must be greater than 0',
            })}
          />
          {errors.transactionAmount && <span className="text-red-500">{errors.transactionAmount.message}</span>}
        </div>

        <button
          type="submit"
          className='bg-[#3A81F1] mt-3 font-sans font-[500] text-white p-2 rounded-sm flex justify-center items-center gap-x-2'
          disabled={isSubmitting} // Disable the button when form is submitting
        >
          {isSubmitting ? 'Generating...' : 'Generate QR'}
          <span className="material-symbols-outlined text-white">
            qr_code_2
          </span>
        </button>
      </form>
      <Qrcode name={name} upiId={upiId} qrSource={qrCodeUrl} gPayUrl={gPayUrl} />
    </div>
  );
};

export default Upiform;
