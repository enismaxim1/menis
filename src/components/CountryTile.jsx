import './CountryTile.css';

function CountryTile({ country, revealed, color, onReveal, disabled }) {
  return (
    <div
      className={`country-tile ${revealed ? 'revealed' : ''} ${disabled ? 'disabled' : ''}`}
      onClick={(!revealed && !disabled) ? onReveal : undefined}
      style={revealed ? { backgroundColor: color } : {}}
    >
      <span className="country-name">{country}</span>
    </div>
  );
}

export default CountryTile; 