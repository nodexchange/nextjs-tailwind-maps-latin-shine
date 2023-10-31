import Image from "next/legacy/image";
import Link from 'next/link';

export const Article = ({ img, title, date, author, text, category, href, short, standalone }) => {
  return (
    <article className="flex flex-wrap mb-6">
      <div className="grow-0 shrink-0 basis-auto w-full md:w-3/12 px-3 mb-6 md:mb-0 ml-auto">
        {standalone && (
          <h2 className="text-lg font-bold mb-3">{title}</h2>
        )}
        <div
          className="relative overflow-hidden bg-no-repeat bg-cover ripple shadow-lg rounded-lg mb-6"
          data-mdb-ripple="true"
          data-mdb-ripple-color="light">
          <Image
            src={img}
            className="w-full"
            alt="Louvre"
            width="619"
            height="413"
          />
          <Link href="/classes">
            <div className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed opacity-0 hover:opacity-100 transition duration-300 ease-in-out"></div>
          </Link>
        </div>
      </div>

      <div className="grow-0 shrink-0 basis-auto w-full md:w-9/12 xl:w-7/12 px-3 mb-6 md:mb-0 mr-auto">
        {!standalone && (<Link href={href}><h5 className="text-lg font-bold mb-3">{title}</h5></Link>)}
        <div className="mb-3 text-yellow-300 font-medium text-sm flex items-center justify-center md:justify-start">
          <svg
            className="w-4 h-4 mr-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 496 512">
            <path
              fill="currentColor"
              d="M248 8C111.03 8 0 119.03 0 256s111.03 248 248 248 248-111.03 248-248S384.97 8 248 8zm82.29 357.6c-3.9 3.88-7.99 7.95-11.31 11.28-2.99 3-5.1 6.7-6.17 10.71-1.51 5.66-2.73 11.38-4.77 16.87l-17.39 46.85c-13.76 3-28 4.69-42.65 4.69v-27.38c1.69-12.62-7.64-36.26-22.63-51.25-6-6-9.37-14.14-9.37-22.63v-32.01c0-11.64-6.27-22.34-16.46-27.97-14.37-7.95-34.81-19.06-48.81-26.11-11.48-5.78-22.1-13.14-31.65-21.75l-.8-.72a114.792 114.792 0 0 1-18.06-20.74c-9.38-13.77-24.66-36.42-34.59-51.14 20.47-45.5 57.36-82.04 103.2-101.89l24.01 12.01C203.48 89.74 216 82.01 216 70.11v-11.3c7.99-1.29 16.12-2.11 24.39-2.42l28.3 28.3c6.25 6.25 6.25 16.38 0 22.63L264 112l-10.34 10.34c-3.12 3.12-3.12 8.19 0 11.31l4.69 4.69c3.12 3.12 3.12 8.19 0 11.31l-8 8a8.008 8.008 0 0 1-5.66 2.34h-8.99c-2.08 0-4.08.81-5.58 2.27l-9.92 9.65a8.008 8.008 0 0 0-1.58 9.31l15.59 31.19c2.66 5.32-1.21 11.58-7.15 11.58h-5.64c-1.93 0-3.79-.7-5.24-1.96l-9.28-8.06a16.017 16.017 0 0 0-15.55-3.1l-31.17 10.39a11.95 11.95 0 0 0-8.17 11.34c0 4.53 2.56 8.66 6.61 10.69l11.08 5.54c9.41 4.71 19.79 7.16 30.31 7.16s22.59 27.29 32 32h66.75c8.49 0 16.62 3.37 22.63 9.37l13.69 13.69a30.503 30.503 0 0 1 8.93 21.57 46.536 46.536 0 0 1-13.72 32.98zM417 274.25c-5.79-1.45-10.84-5-14.15-9.97l-17.98-26.97a23.97 23.97 0 0 1 0-26.62l19.59-29.38c2.32-3.47 5.5-6.29 9.24-8.15l12.98-6.49C440.2 193.59 448 223.87 448 256c0 8.67-.74 17.16-1.82 25.54L417 274.25z"
            />
          </svg>
          {category}
        </div>
        <p className="text-gray-400 mb-6">
          Published <u>{date}</u> by{' '}
          <span className="text-white">{author}</span>
        </p>
        {!standalone ? (
          <>
          <p className="text-white whitespace-pre-line align-bottom">{short}</p>
          <Link href={href}>
            <button className="bg-yellow-300 text-black font-bold uppercase text-sm px-6 py-3 rounded-full mt-6">Read more</button>
          </Link>
          </>
        ) : (
          <p className="text-white whitespace-pre-line align-bottom">{text}</p>
        )}
        <p>--------------------</p>
      </div>
    </article>
  );
};

Article.propTypes = {};
