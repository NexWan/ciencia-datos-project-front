import React from 'react';
import PropTypes from 'prop-types';

const Card = ({
  children,
  className = '',
  width = 500,
  height = 500,
  centered = true,
  onClose,
  styles = ""
}: {
  children: React.ReactNode;
  className?: string;
  width?: number;
  height?: number;
  centered?: boolean;
  onClose?: () => void;
  styles?: string;
}) => {
  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      console.log('Close card');
    }
  };

  return (
    <div
      className={`card-bg w-full h-full z-50 absolute ${
        centered ? 'flex items-center justify-center' : ''
      }`}
    >
      <div
        className={`bg-white rounded-lg card-shadow relative p-6  ${
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
      </div>
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  centered: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Card;
