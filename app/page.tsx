import Posts from "./components/Posts";


export default function Home() {
  return (
    <main className="px-6 mx-auto text-black dark:text-white ">
      <p className="mt-12 mb-12 text-3xl text-center dark:text-white">
        Hello and Welcome to my page 👋&nbsp;
        <span className="whitespace-nowrap">
          I&apos;m <span className="font-bold"> Pratik </span>
        </span>
      </p>
      <Posts/>
    </main>
  );
}
