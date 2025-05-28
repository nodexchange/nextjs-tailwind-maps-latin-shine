const ReserveForm = ({ inputEmailEl, inputFirstNameEl, inputLastNameEl }) => (
  <form className="w-full max-w-sm mx-auto">
    <div className="flex items-center border-b border-shine py-2">
      <input
        ref={inputEmailEl}
        className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-hidden"
        type="text"
        placeholder="youremail@gmail.com*"
        aria-label="Email Input Field"
      />
    </div>
    <div className="flex items-center border-b border-shine py-2">
      <input
        ref={inputFirstNameEl}
        className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-hidden"
        type="text"
        placeholder="Your First name*"
        aria-label="First Name Input Field"
      />
    </div>
    <div className="flex items-center border-b border-shine py-2">
      <input
        ref={inputLastNameEl}
        className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-hidden"
        type="text"
        placeholder="Your second name"
        aria-label="Last Name Input Field"
      />
    </div>
  </form>
);

export default ReserveForm;
