//types
import type { SearchProps } from './index.props';
//styles
import styled from './index.module.scss';

const Search = ({ value, setValue }: SearchProps) => {
  const onChange = (e: { target: { value: string } }) => {
    const newValue = e.target.value;
    setValue(newValue);
  };

  return (
    <div className={styled.searchWrapper}>
      <input
        className={styled.inputSearch}
        value={value}
        onChange={onChange}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search products"
      />
    </div>
  );
};

export default Search;
