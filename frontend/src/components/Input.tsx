import React from 'react'

interface Props {
  placeholder: string;
  className: string;
}

const Input = ({ placeholder, className = '' }: Props) => {
  return (
    <div>
      <input type="text" placeholder={placeholder} className={`default-input ${className}`} />
    </div>
  )
}

export default Input
