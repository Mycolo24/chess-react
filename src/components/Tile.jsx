function Tile({ className, value, onClick }) {
  if (value == null) {
    return <div onClick={onClick} className={`${className}`}></div>;
  }
  return (
    <div onClick={onClick} className={`${className} ${value}  piece`}></div>
  );
}

export default Tile;
