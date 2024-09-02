import MyProfilepic from "./components/MyProfilepic";
import Posts from "./components/Posts";

export const revalidate=86400
export default function Home() {
  return (
    <div className="mx-auto text-black dark:text-white ">
      <MyProfilepic/>
      <p className="mt-12 mb-12 text-3xl text-center dark:text-white">
        Hello and Welcome to my page 👋&nbsp;
        <span className="whitespace-nowrap">
          I'm <span className="font-bold"> Pratik </span>
        </span>
      </p>
      <Posts/>
    </div>
  );
}
