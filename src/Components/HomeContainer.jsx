import React from "react";
import { heroData } from "../utils/data";
import delivery from "./img/delivery.png";
import Hero from "./img/heroBg.png";

const HomeContainer = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-2 h-full" id="home">
      <div className="py-3 flex-1 flex flex-col items-start md:items-start justify-center gap-6">
        <div className="flex items-center gap-2 justify-center bg-orange-200 px-4 py-1 rounded-full drop-shadow-xl">
          <p className="text-base text-[#53BF9D] font-semibold">
            Instant Delivey
          </p>
          <div className="w-8 h-8 bg-white rounded-full overflow-hidden">
            <img
              src={delivery}
              className="w-full h-full object-contain "
              alt=""
            />
          </div>
        </div>
        <p className="text-[3rem] lg:text-[4.5rem] md:w-[80%] font-bold tracking-wide text-headingColor ">
          The Fastest Delivery in{" "}
          <span className="text-[#53BF9D] ">Odisha</span>{" "}
        </p>
        <p className="text-base text-textColor">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem
          eligendi, quisquam cumque, sint recusandae tempore maiores ad ex
          facere iste officiis, facilis quia! Error nesciunt ipsam rerum, sint
          aspernatur officia.
        </p>
        <button
          type="button"
          className=" bg-gradient-to-br from-green-400 to-green-600 text-green-100
          w-full md:w-auto px-4 py-2 rounded-lg hover: shadow-lg transition-all ease-linear duration-100"
        >
          {" "}
          Order Now
        </button>
      </div>
      <div className="py-2 flex-1 flex items-center relative">
        <img
          src={Hero}
          className="ml-auto h-460 w-full lg:h-[650px] lg:w-auto"
          alt="hero-bg"
        />
        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center lg:px-32 py-4 gap-4 flex-wrap">
          {heroData &&
            heroData.map((n) => (
              <div
                key={n.id}
                className=" lg:w-190 p-4 bg-cardOverlay backdrop-blur-md rounded-3xl flex flex-col
                items-center justify-center drop-shadow-xl"
              >
                <img src={n.imagesrc} className="w-20 lg:w-40 -mt-10 lg:-mt-20" alt="icecream" />
                <p className="text-base lg:text-lg font-semibold text-textColor mt-2 lg:mt-4">
                  {n.name}
                </p>
                <p className="text-[10px] lg:text-sm font-semibold text-lighttextGray my-1 lg:my-3">
                  {n.desc}
                </p>
                <p className=" text-sm font-semibold text-headingColor">
                  <span className="text-xs text-red-600">$</span>
                  {n.price}
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
