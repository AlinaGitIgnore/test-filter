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
    <div>
      <input
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
