"use client";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [fontSize, setFontsize] = useState(17);
  const [secondtimer, setsecondTimer] = useState(60);
  const [minutetimer, setminuteTimer] = useState(5);

  useEffect(() => {
    if (secondtimer <= 0) return;
    const interval = setInterval(() => {
      setsecondTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondtimer]);

  useEffect(() => {
    if (minutetimer <= 0) return;
    const interval = setInterval(() => {
      setminuteTimer((prev) => prev - 1);
    }, 60000);

    return () => clearInterval(interval);
  }, [minutetimer]);

  const reducesize = () => {
    setFontsize((prev) => prev - 1);
    console.log(fontSize);
  };

  const increasesize = () => {
    setFontsize((prev) => prev + 1);
    console.log(fontSize);
  };

  const resetsize = () => {
    setFontsize(20);
    console.log(fontSize);
  };

  return (
    <div>
      <div className="flex sm:flex-row px-5 flex-col items-center justify-between">
        <ul
          className={`flex mt-2 p-2 rounded-md border-1 items-center justify-center flex-row gap-4 font-bold cursor-pointer`}
        >
          <li onClick={reducesize}>A-</li>
          <li onClick={resetsize}>A</li>
          <li onClick={increasesize}>A+</li>
        </ul>
        <span className="font-semibold text-lg">
          Time:{minutetimer}:{secondtimer}
        </span>
      </div>

      <div
        style={{ fontSize: `${fontSize}px` }}
        className="m-4 border-2 p-3 rounded-md "
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui laboriosam
        facere, laborum omnis voluptatum architecto dicta, aliquid nam quasi
        delectus vel magnam voluptatibus asperiores molestias reprehenderit quas
        nemo neque voluptates voluptatem enim pariatur, assumenda iste? Quasi,
        voluptates voluptas atque minus sint quaerat sit harum quisquam
        temporibus ratione dolor officia placeat illum quod autem pariatur, nisi
        quas? Nostrum quam veniam inventore. Impedit possimus non totam commodi
        distinctio expedita consequuntur explicabo unde error aperiam eaque
        dolore hic minima sit sequi vitae fuga maxime esse quos eius nulla,
        quasi placeat aut! Minus cumque aliquam sequi sit ipsum eum possimus
        voluptatem illum eos corporis.
      </div>

      <div
        contentEditable
        className="min-h-[50vh] max-h-fit border-2 rounded-md border-purple-300 bg-purple-100 outline-none m-4 p-3"
      ></div>
    </div>
  );
};

export default Page;
