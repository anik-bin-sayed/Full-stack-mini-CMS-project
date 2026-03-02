const FloatingInput = ({ label, type = "text", name, value, onChange }) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        placeholder=" "
        className="
            peer
            w-full
            border
            border-yellow-300
            rounded-md
            px-3
            pt-4
            pb-2
            text-sm
            focus:outline-none
            focus:border-yellow-500
          "
      />

      <label
        className="
            absolute
            left-3
            top-1/2
            -translate-y-1/2
            text-gray-400
            text-md
            bg-white
            px-1
            transition-all
            pointer-events-none
  
            peer-focus:top-0
            peer-focus:text-xs
            peer-focus:text-black
            peer-focus:-translate-y-1/2
  
            peer-not-placeholder-shown:top-0
            peer-not-placeholder-shown:text-md
            peer-not-placeholder-shown:text-gray-600
            peer-not-placeholder-shown:-translate-y-1/2
          "
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingInput;
