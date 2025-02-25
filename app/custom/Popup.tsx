import React from 'react';
import PropTypes from 'prop-types';
import { useProductContext } from '~/contexts/productContext';
import { useConfirmation } from '~/contexts/confirmationContext';

const Popup = ({
  children,
  className = '',
  centered = true,
  onClose,
  styles = "", 
  state = true,
}: {
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
  onClose?: () => void;
  styles?: string;
  state?: boolean;
}) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      console.log('Close card');
    }
  };

  const { confirmation, setConfirmation } = useConfirmation();
  return (
    <div
      className={`card-bg w-full h-full z-50 absolute ${
        centered ? 'flex items-center justify-center' : ''
      }`}
    >
      <div
        className={`bg-black rounded-lg card-shadow relative p-6 flex items-center flex-col justify-center  ${
          centered ? 'mx-auto' : ''
        } ${className}`}
      >
        <button
          onClick={handleClose}
          className="rounded-full w-4 h-4 absolute bg-red-600 right-2 top-2 hover:w-5 hover:h-5 hover:bg-red-700 transition-all hover:cursor-pointer"
        >
          &nbsp;
        </button>
        {children}
        <div className='flex items-center justify-center flex-row space-x-4'>
          <button
            onClick={() => { setConfirmation(true); handleClose(); }}
            className="bg-inputs text-white p-2 rounded-md mt-5 w-16"
          >
            Yes
          </button>
          <button
            onClick={() => { setConfirmation(false); handleClose(); }}
            className="bg-inputs text-white p-2 rounded-md mt-5 w-16"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

Popup.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  centered: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Popup;
