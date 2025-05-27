import Image from "next/image";
// import WishIcon from './WishIcon';

const UpcomingEvent = ({ type, text, amount, children }) => {
  return (
    <div className="w-full md:max-w-84 px-4 lg:px-0">
      <div className="p-3 bg-white rounded shadow-md">
        <div className="">
          <div className="relative w-full mb-3 h-62 lg:mb-0">
            <div className="absolute top-0 right-0 flex flex-col p-3">
              {/* <WishIcon /> */}
              {type}
            </div>
            <Image
              src="/eventlogo.webp"
              width={720}
              height={720}
              // layout="responsive"
              alt="Latin Shine Dance Company Teaster event"
              style={{
                maxWidth: "100%",
                height: "auto"
              }} />
          </div>
          <div className="flex-auto p-2 justify-evenly">
            <div className="flex flex-wrap ">
              <div className="flex items-center justify-between w-full min-w-0 ">
                <h2 className="text-gray-600 mr-auto text-l cursor-pointer hover:text-gray-900 ">
                  {text}
                </h2>
              </div>
            </div>
            <div className="mt-1 text-xl font-semibold">{amount}</div>
            <div className="mt-4 gap-4 flex row">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvent;
