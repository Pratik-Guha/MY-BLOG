import React from "react";
import Image from "next/image";
export default function MyProfilepic() {
  return (
    <section>
      <Image
        src={"/images/mypfofiephoto.png"}
        width={200}
        height={200}
        alt="my profile picture"
        priority={true}
        className="border-4 dark:border-slate-400 drop-shadow-2xl hover:drop-shadow-xl rounded-full shadow-black dark:shadow-slate-100 mx-auto mt-8"
      />
    </section>
  );
}
