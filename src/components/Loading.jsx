import React from 'react'
import { CSpinner } from '@cscfi/csc-ui-react'

// Matches the Online/Offline pill footprint so cards don't jump.
export const StatusPillLoading = () => (
  <div className='text-center text-[#3F3F3F] bg-[#E4E4E4] border-[0.5px] border-[#3F3F3F] rounded-[100px] w-[88px] h-[25px] animate-pulse'>
    <p className='font-bold text-[14px]'>Loading...</p>
  </div>
)

export const LoadingBlock = (props) => (
  <div className={`flex items-center justify-center gap-3 py-8 ${props.className || ''}`}>
    <CSpinner size={24} width={2} />
    <p className='text-[14px] text-gray-600'>{props.label || 'Loading…'}</p>
  </div>
)

export const ErrorBlock = (props) => (
  <div className={`flex items-center justify-center py-8 ${props.className || ''}`}>
    <p className='text-[14px] text-[#7E0707]'>{props.label || 'Data is currently unavailable.'}</p>
  </div>
)
