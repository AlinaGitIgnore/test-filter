import styled from './index.module.scss';

interface IProps {
  value: string;
  setValue: (v: string) => void;
}

const Search = ({ value, setValue }: IProps) => {
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
