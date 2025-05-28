const ReserveLevel = ({radioHandler, beginnerRadioCheck, experiencedRadioCheck}) => (
  <div className="form-check inline-block pt-4">
    <div>
      <input
        className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-xs bg-white checked:bg-shine checked:border-white focus:outline-hidden transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
        type="radio"
        name="classType"
        id="radioBeginner"
        onChange={radioHandler}
        defaultChecked={beginnerRadioCheck}
      />
      <label
        className="form-check-label block w-full pl-7 text-left text-white"
        htmlFor="radioBeginner">
        Beginner
      </label>
    </div>
    <div>
      <input
        className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-xs bg-white checked:bg-shine checked:border-white focus:outline-hidden transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
        type="radio"
        name="classType"
        id="radioExperienced"
        onChange={radioHandler}
        defaultChecked={experiencedRadioCheck}
      />
      <label
        className="form-check-label block w-full pl-7 text-left text-white"
        htmlFor="radioExperienced">
        Experienced
      </label>
    </div>
  </div>
);

export default ReserveLevel;
