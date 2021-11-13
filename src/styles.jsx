
const customStyles = {
  option: (provided, state) => ({
    ...provided,
    '&:last-child': { borderTop: '1px solid #C1C2CA' },
    color: state.isSelected ? '#2C36F2' : '#1F1E25',
    backgroundColor: state.isFocused ? '#f6f7ff' : 'white',
    minHeight: 60,
    padding: 24,
  }),
  menu: (provided, state) => ({
    ...provided,
    position: 'relative',
    border: '1px solid #1F1E25',
    boxShadow: 'none',
    marginTop: -1,
  }),
  placeholder: (provided, state) => ({
    ...provided,
    fontFamily: 'Roboto',
    fontWeight: 500,
    fontSize: 16,
    color: '#1F1E25',
    lineHeight: '140%',
  }),
  control: (provided, state) => ({
    ...provided,
    width: '100%',
    fontWeight: 500,
    fontSize: 16,
    boxShadow: 'none',
    color: '#1F1E25',
    lineHeight: '140%',
    border: state.isFocused ? '1px solid blue' : '1px solid #1F1E25',
    borderRadius: 4,
    padding: 12,
    background: state.menuIsOpen ? `url('../../img/select-rotate.svg')` : `url('../../img/select.svg')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: '97% center',

    transition: 'border-color 0.3s ease',

    '@media (max-width: 767px)': {
      padding: '12px 4px',
      backgroundPosition: '95% center',
    }
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';

    return { ...provided, opacity, transition };
  }
}

export { customStyles }