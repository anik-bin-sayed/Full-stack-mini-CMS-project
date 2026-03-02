const Button = ({ text = "Sign Up", type }) => {
  return (
    <button
      type={type}
      className="
          relative
          overflow-hidden
          h-12
          w-full
          bg-yellow-400
          text-black
          rounded-md
          font-medium
          group
          cursor-pointer
          hover:bg-yellow-500
          transition-colors
          duration-300
        "
    >
      <span
        className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            transition-transform
            duration-300
            group-hover:-translate-y-full
          "
      >
        {text}
      </span>

      <span
        className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            translate-y-full
            transition-transform
            duration-300
            group-hover:translate-y-0
          "
      >
        {text}
      </span>
    </button>
  );
};

export default Button;
