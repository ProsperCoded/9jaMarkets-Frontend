export default function Select({ options, selected, setSelected }) {
  return (
    <div className="inline-block relative w-full max-w-24">
      <select
        className="block border-Primary hover:border-gray-500 bg-white shadow focus:shadow-outline px-4 py-2 pr-8 border rounded-xl w-full leading-tight appearance-none focus:outline-none"
        value={options[selected]}
        onChange={(e) => setSelected(e.target.value)}
      >
        {options.map((option) => (
          <option className="" key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <div className="right-0 absolute inset-y-0 flex items-center px-2 text-gray-700 pointer-events-none">
        <svg
          className="w-4 h-4 fill-current"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M7 10l5 5 5-5H7z" />
        </svg>
      </div>
    </div>
  );
}
