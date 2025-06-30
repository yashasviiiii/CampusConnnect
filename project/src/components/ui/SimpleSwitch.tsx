import React from 'react';

interface SimpleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const SimpleSwitch: React.FC<SimpleSwitchProps> = ({ checked, onChange }) => {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 flex items-center rounded-full p-1 duration-300 ease-in-out ${
        checked ? 'bg-orange-500' : 'bg-gray-300'
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
          checked ? 'translate-x-6' : ''
        }`}
      />
    </button>
  );
};

export default SimpleSwitch;
