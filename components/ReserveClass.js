const ReserveClass = ({radioHandler, bachataRadioCheck, salsaRadioCheck}) => (
  <div className="form-check inline-block pt-4">
    <div>
      <input
        className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-xs bg-white checked:bg-shine checked:border-white focus:outline-hidden transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
        type="radio"
        name="classType"
        id="radioSalsa"
        onChange={radioHandler}
        defaultChecked={salsaRadioCheck}
      />
      <label
        className="form-check-label block w-full pl-7 text-left text-white"
        htmlFor="radioSalsa">
        Salsa Classes (Tuesdays)
      </label>
    </div>
    <div>
      <input
        className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-xs bg-white checked:bg-shine checked:border-white focus:outline-hidden transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
        type="radio"
        name="classType"
        id="radioBachata"
        onChange={radioHandler}
        defaultChecked={bachataRadioCheck}
      />
      <label
        className="form-check-label block w-full pl-7 text-left text-white"
        htmlFor="radioBachata">
        Bachata Classes (Wednesdays)
      </label>
    </div>
  </div>
);

export default ReserveClass;
