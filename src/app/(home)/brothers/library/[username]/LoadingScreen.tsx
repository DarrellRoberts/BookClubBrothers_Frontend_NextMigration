import React from 'react';
import LoaderNoText from '@/components/loader/LoaderNoText';
import Link from 'next/link';
import style from "./Dashboard.module.css";

const LoadingScreen = () => (
  <>
    <div className="flex m-10">
      <LoaderNoText />
    </div>
    <div className={style.box}>
      <div className={style.boxItem}>
        <h2 className="underline">Worst rated book</h2>
        <LoaderNoText />
      </div>

      <div className={style.boxItem}>
        <h2 className="underline">Best rated book</h2>
        <LoaderNoText />
      </div>

      <div className={style.boxItem}>
        <h2>Share of books read:</h2>
        <h2>Average Score:</h2>
        <LoaderNoText />
      </div>
    </div>

    <div className="flex">
      <div className={style.libraryButtons + " m-10 border-4 border-black p-3 rounded-lg bg-black text-white"}>
        <Link href="/books">
          <h2>The Books</h2>
        </Link>
      </div>

      <div className={style.libraryButtons + " m-10 border-4 border-black p-3 rounded-lg bg-black text-white"}>
        <Link href="/brothers">
          <h2>The Brothers</h2>
        </Link>
      </div>
    </div>

    <div className="m-10 border-4 border-black p-3 rounded-lg bg-black text-white">
      <h2 className="underline">Books scored</h2>
      <LoaderNoText />
    </div>

    <div className="m-10 border-4 border-black p-3 rounded-lg bg-black text-white">
      <h2 className="underline">Unread Books</h2>
      <LoaderNoText />
    </div>

    <div className="m-10 border-4 border-black p-3 rounded-lg bg-black text-white">
      <h2 className="underline">Comments</h2>
      <LoaderNoText />
    </div>
  </>
);

export default LoadingScreen;
