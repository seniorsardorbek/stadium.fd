import Link from "next/link";

const Hero = () => {
  return (
    <section className="w-full h-full">
      <div className="flex items-center flex-col justify-center h-full">
        <div className="mx-auto max-w-2xl py-60 md:py-36 px-4 md:px-0 sm:py-48 lg:py-40">
          <div className="sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 hidden   text-xs md:text-sm leading-6 dark:dark:text-white  text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Announcing our next round of funding.{" "}
              <a href="#" className="font-semibold text-indigo-600">
                <span className="absolute inset-0" aria-hidden="true" />
                Read more <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-widest dark:text-white text-gray-900  sm:text-6xl">
              Stadionlarni kashf et.
            </h1>
            <p className="mt-6 text-lg leading-8 dark:text-white text-gray-900" >
              MiniMatch bilan ertangi o&aposyingi rejalashtir.
            </p>
          </div>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/stadiums"
            className="rounded-md bg-green-600 px-3.5 py-2.5 text-sm font-semibold text-white   shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Qani, ketdik!
          </Link>
          <Link
            href="/stadiums"
            className="text-sm  leading-6 dark:text-white text-gray-900" 
          >
            Ko&aposproq imkoniyatlar<span aria-hidden="true">→</span>
          </Link>
        </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
