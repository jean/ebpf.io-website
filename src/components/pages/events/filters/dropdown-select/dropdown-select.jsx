import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';

import Checkbox from 'components/shared/checkbox';
import useClickOutside from 'hooks/use-click-outside';
import ChevronIcon from 'icons/chevron.inline.svg';

const DropdownSelect = ({ name, items, values, onSelect, className }) => {
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleSelect = (state, value) => {
    if (state) {
      onSelect([...values, value]);
    } else {
      onSelect(values.filter((currentValue) => currentValue !== value));
    }
  };

  const handleDropdownOutsideClick = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  useClickOutside([dropdownRef, buttonRef], handleDropdownOutsideClick);

  return (
    <div className={clsx('relative', className)}>
      <button
        className="group flex w-60 items-center justify-between rounded-full border border-gray-90 py-4 px-5 transition-colors duration-200 hover:border-gray-40 [@media(max-width:550px)]:w-full"
        type="button"
        ref={buttonRef}
        onClick={handleOpen}
      >
        <span
          className={clsx(
            'text-base font-medium leading-none text-gray-40 transition-colors duration-200 group-hover:text-black',
            isOpen && '!text-black',
            !!values.length && '!font-medium !tracking-normal !text-black'
          )}
        >
          {name}
        </span>
        <ChevronIcon
          className={clsx(
            'mt-1 h-auto w-2.5 shrink-0 text-gray-40 transition-[transform,color] duration-200 group-hover:text-black',
            isOpen && '-rotate-180',
            (isOpen || !!values.length) && '!text-black'
          )}
        />
      </button>
      <div
        className={clsx(
          'absolute top-16 left-0 w-[270px] rounded border border-gray-90 bg-white drop-shadow-book transition-[opacity,visibility] duration-200 hover:drop-shadow-book [@media(max-width:550px)]:w-full',
          isOpen ? 'visible z-10 opacity-100' : 'invisible -z-10 opacity-0'
        )}
        ref={dropdownRef}
      >
        <nav className="flex items-start justify-between px-4 py-5 md:p-3">
          <ul className="flex flex-col">
            {items.map(({ name }, index) => (
              <li
                className={clsx('flex items-center space-x-2.5 pt-2.5 first:pt-0 md:pt-3', {
                  'pl-7': items.length === 7 && index > 2,
                })}
                key={index}
              >
                <Checkbox
                  id={name}
                  name="type"
                  label={name}
                  value={name}
                  checked={values.includes(name)}
                  onChange={(e) => handleSelect(e.target.checked, e.target.value)}
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

DropdownSelect.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string.isRequired })).isRequired,
  values: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

DropdownSelect.defaultProps = {
  className: null,
};

export default DropdownSelect;
