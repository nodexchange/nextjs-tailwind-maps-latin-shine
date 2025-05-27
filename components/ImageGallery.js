import React, { useState, useEffect } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { gaEvent } from '../lib/ga';

const ImageItem = ({ src, setMainImg, mainImg, caption, setMainImgCaption }) => {
  const [srcUrl, setSrcUrl] = useState(src);

  return (
    <Image
      className="opacity-100 hover:opacity-70"
      src={srcUrl}
      alt={caption}
      height="250"
      width="250"
      onClick={() => {
        gaEvent({ action: 'instagram_image_click', params: { caption: truncate(caption, 100) } });
        setMainImgCaption(truncate(caption, 400));
        setMainImg(srcUrl);
        setSrcUrl(mainImg);
      }}
      style={{
        maxWidth: "100%",
        height: "auto",
        objectFit: "cover"
      }} />
  );
};

const removeProxy = (url) => {
  const coreUrl = url.split('.');
  coreUrl[0] = 'https://scontent';
  return coreUrl.join('.');
}

function truncate( str, n, useWordBoundary=true ){
  if (str.length <= n) { return str; }
  const subString = str.substr(0, n-1); // the original check
  return (useWordBoundary 
    ? subString.substr(0, subString.lastIndexOf(" ")) 
    : subString) + " (...)";
};

const ImageGallery = () => {
  const [mainImg, setMainImg] = useState('');
  const [mainImgCaption, setMainImgCaption] = useState('');
  const [images, setImages] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    loadInstaImages();
  }, []);

  const loadInstaImages = async () => {
    const res = await fetch('/api/insta');
    const response = await res.json();
    if (response.error) {
      setError(true);
      // set error message? 
      return;
    }
    let imagesOnly = response.data.filter((item) => item.media_type === 'IMAGE' || item.media_type === 'CAROUSEL_ALBUM');
    setMainImg(removeProxy(imagesOnly[0].media_url));
    setMainImgCaption(truncate(imagesOnly[0].caption, 400));
    imagesOnly = imagesOnly.slice(1, 5);
    imagesOnly = imagesOnly.map((item) => { 
      item.media_url = removeProxy(item.media_url);
      return item;
    });
    setImages(imagesOnly);
    setLoading(false);
  }

  if (loading || images.length === 0) return (<>Loading...</>);
  if (error) return (<>Error...</>);

  return (
    <section className=" bg-white text-almostBlack px-8 py-10 md:py-10 lg:py-30 lg:px-30 xl:px-40 justify-between md:items-start">
      <div>
        <div className="inline-block">
          <h3
            className="text-bodyM pb-1 font-black uppercase font-bigShoulder cursor-pointer"
            style={{ lineHeight: '1.5rem' }}>
            <Link href="https://www.instagram.com/latinshinedance/">Latest from our Instagram</Link>
          </h3>
        </div>
        <div className="inline-block ml-1 ">
          <Link href="https://www.instagram.com/latinshinedance/">
            <svg
              className="dark:fill-white relative top-px left-0 fill-black transition-colors cursor-pointer"
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M10 1.802c2.67 0 2.987.01 4.042.059 2.71.123 3.975 1.409 4.099 4.099.048 1.054.057 1.37.057 4.04 0 2.672-.01 2.988-.057 4.042-.124 2.687-1.387 3.975-4.1 4.099-1.054.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.04-.058-2.718-.124-3.977-1.416-4.1-4.1-.048-1.054-.058-1.37-.058-4.041 0-2.67.01-2.986.058-4.04.124-2.69 1.387-3.977 4.1-4.1 1.054-.048 1.37-.058 4.04-.058ZM10 0C7.284 0 6.944.012 5.877.06 2.246.227.227 2.242.061 5.877.01 6.944 0 7.284 0 10s.012 3.057.06 4.123c.167 3.632 2.182 5.65 5.817 5.817 1.067.048 1.407.06 4.123.06s3.057-.012 4.123-.06c3.629-.167 5.652-2.182 5.816-5.817.05-1.066.061-1.407.061-4.123s-.012-3.056-.06-4.122C19.777 2.249 17.76.228 14.124.06 13.057.01 12.716 0 10 0Zm0 4.865a5.135 5.135 0 1 0 0 10.27 5.135 5.135 0 0 0 0-10.27Zm0 8.468a3.333 3.333 0 1 1 0-6.666 3.333 3.333 0 0 1 0 6.666Zm5.338-9.87a1.2 1.2 0 1 0 0 2.4 1.2 1.2 0 0 0 0-2.4Z" />
            </svg>
          </Link>
        </div>
      </div>
      <div className="container-wrapper mx-auto">
        <div className="container">
          <div className="main-image">
            <div className='absolute'>
              <Image
                src={mainImg}
                alt={mainImgCaption}
                height="500"
                width="500"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  objectFit: "cover"
                }} />
            </div>
            <div className='absolute bottom-0 p-3 bg-linear-to-t from-shine to-transparent opacity-75 hover:opacity-100'>
              <p className='text-white text-bodyXS main-text'>{mainImgCaption}</p>
            </div>
          </div>
          {images.map((image, index) => {
            return (
              <div key={'imageContainer' + index} className={`thumb${index} thumb`}>
                <ImageItem
                  key={'image' + index}
                  src={image.media_url}
                  caption={image.caption}
                  setMainImgCaption={setMainImgCaption}
                  setMainImg={setMainImg}
                  mainImg={mainImg}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;
