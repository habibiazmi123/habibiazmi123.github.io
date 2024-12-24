import React from "react";
import Image from "next/image";

import { getAge, shimmer, toBase64 } from "../../lib/utils";
import ContentWrapper from "../../shared/ContentWrapper";
import useMousePosition from "../../shared-hooks/useMousePosition";

const Me = () => {
  const [mouseX, mouseY] = useMousePosition();
  return (
    <section id='me' className='me relative mt-32'>
      <ContentWrapper extraClass='flex px-6 md:px-32 py-24 group overflow-hidden'>
        <div className='z-10 w-full md:w-3/4'>
          <p className='font-medium text-2xl md:text-4xl tracking-tight uppercase mb-8'>
            Hello 👋 My name is <span className="text-pink-700">Muhamad Habibi Azmi</span>
          </p>
          <p className='font-medium text-2xl md:text-4xl tracking-tight uppercase mb-8'>
            I{`'`}m a <span className="text-purple-700">{getAge(new Date("1996-08-25"))}</span>-Year-Old developer based
            in Bandung, Indonesia and currently working at <span className="text-yellow-400">PT. Sigma Cipta Caraka</span> (Telkomsigma).
          </p>

          <p className='font-medium text-2xl md:text-4xl tracking-tight uppercase'>
            My main focus is to build and maintain web applications and
            services. almost everyday i write some code or learn something new,
            i enjoy my job now.
          </p>
        </div>

        <div
          className='absolute z-0 -ml-64 -mt-96 hidden md:block'
          style={{
            transition: "0.75s cubic-bezier(0.19, 1.0, 0.22, 1.0)",
            left: `${mouseX}px`,
            top: `${mouseY}px`,
          }}
        >
          <Image
            src={"/images/me.jpg"}
            alt={"Muhamad Habibi Azmi portrait (me)"}
            width={480}
            height={480}
            layout='fixed'
            placeholder='blur'
            objectFit='cover'
            objectPosition='center'
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(480, 480)
            )}`}
            className='opacity-0 group-hover:opacity-50 filter grayscale duration-300'
          />
        </div>
      </ContentWrapper>
    </section>
  );
};

export default Me;
