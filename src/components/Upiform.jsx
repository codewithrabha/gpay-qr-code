'use client';
import React from 'react';

const UpiForm = ({ register, errors, isSubmitting, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className='hidden sm:flex p-5 w-[350px] bg-white rounded-sm flex-col gap-y-3 shadow-md'>
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
        className='bg-[#3A81F1] mt-3 font-sans font-[500] text-white p-2 rounded-sm flex justify-center items-center gap-x-2 cursor-pointer'
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Generating...' : 'Generate QR'}
        <span className="material-symbols-outlined text-white">
          qr_code_2
        </span>
      </button>
    </form>
  );
};

export default UpiForm;