import Image from 'next/image';
import Nav from './Nav';

export default function LandingPage() {
  return (
    <>
      <Nav />;
      <div className="container mx-auto px-5">
        <div className="flex justify-evenly items-center flex-col gap-10 md:flex-row mt-20">
          <div className="">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold ">
              Expressing and Love <span className="lg:block">Yourself</span>
            </h1>
            <p className="text-slate-500 md:text-xl">
              Make a memories and share to other people. Inspire and make it feels better.
            </p>
          </div>
          <div className="max-w-xs lg:max-w-full">
            <Image src={'/assets/self-illustration.svg'} height={0} width={500} alt="Self Expression" />
          </div>
        </div>
      </div>
    </>
  );
}
