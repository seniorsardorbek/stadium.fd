import Link from "next/link";
import React from "react";

function NoToken() {
  return (
    <main className="mt-16 flex flex-col items-center justify-center gap-2">
      <h2 className="dark:text-white md:text-3xl text-lg text-center  p-5">
        Futbolist dasturga kirish esdan chiqibdi-ku!
      </h2>
      <div className="flex gap-5">
        <Link
          className="mt-16 text-md  dark:text-white md:px-4 px-2   py-1 rounded-lg border border-gray-900 dark:border-white w-40 md:w-56 text-center "
          href={"login"}
        >
          Kirish{" "}
        </Link>
        <Link
          className="mt-16 text-md  dark:text-white md:px-4 px-2   py-1 rounded-lg border border-gray-900 dark:border-white w-40 md:w-56  text-center "
          href={"register"}
        >
          Ro&apos;yxatdan o&apos;tish{" "}
        </Link>
      </div>
    </main>
  );
}

export default NoToken;
