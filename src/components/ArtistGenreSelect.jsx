const ARTIST_GENRES = [
  "Rock",
  "Alternative",
  "Electronic",
  "Metal",
  "Pop",
  "Jazz",
  "Hip-hop / Rap",
  "Blues",
  "Classical",
  "J-pop",
  "K-pop",
  "Thai",
  "R&B",
  "หมอลำ",
  "EDM",
  "Anime",
  "DnB",
  "Other",
];

export default function ArtistGenreSelect({ value, error, onChange }) {
  const errorId = "artist-genre-error";

  return (
    <div className="ka-field">
      <label className="ka-label" htmlFor="artist-genre">
        Artist genre
      </label>
      <select
        id="artist-genre"
        className="ka-input ka-select"
        name="genre"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        required
      >
        <option value="">Select genre</option>
        {ARTIST_GENRES.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
      {error && (
        <p id={errorId} className="ka-hint ka-hint--error">
          {error}
        </p>
      )}
    </div>
  );
}
