import { ButtonType, TButtonProps } from '@/types/button.types';
import React from 'react';


const ButtonStyle: Record<ButtonType, string> = {
  primary: 'bg-primary-900 text-white px-4 py-3',
  secondary: 'bg-white px-4 py-3 outline outline-1 outline-offset-[-1px] outline-primary-400',
  dark: 'bg-black text-white p-4',
  'light-outline': 'bg-primary-300 px-4 py-3 outline outline-1 outline-offset-[-1px] outline-primary-400',
  gray: 'bg-primary-300 text-primary-400 p-4',
  disabled: 'bg-white p-4 outline outline-1 outline-offset-[-1px] outline-primary-300',

  'mini-default':
    'px-5 py-3 bg-white text-primary-900 font-normal outline outline-1 outline-offset-[-1px] outline-primary-300',
  'mini-active':
    'px-5 py-3 bg-primary-50 text-primary-900 font-normal outline outline-1 outline-offset-[-1px] outline-primary-300',
  'mini-disabled':
    'px-5 py-3 bg-primary-50 text-primary-400 font-normal outline outline-1 outline-offset-[-1px] outline-primary-300',
};


export default function Button({ type, label = 'label', onClick }: TButtonProps) {
  const isMini = type.startsWith('mini');
  const widthClass = isMini ? 'w-32' : 'w-96';
  const heightClass = isMini ? '' : 'h-16';

  return (
    <button
      className={`${widthClass} ${heightClass} rounded-sm inline-flex justify-center items-center ${ButtonStyle[type]}`}
      disabled={type === 'disabled' || type === 'mini-disabled'}
      onClick={onClick}
    >
      <span className={`text-center text-base font-['SUIT']`}>
        {label}
      </span>
    </button>
  );
}
