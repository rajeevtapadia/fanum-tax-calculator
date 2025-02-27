import Calculator from "./Calculator";

export default function Home() {
  return (
    <>
      <h1 className="text-4xl md:text-3xl font-extrabold text-center text-gray-900 dark:text-white tracking-tight leading-tight mt-4">
        Fanum Tax (Attendence) Calculator
      </h1>
      <div className="">
        <Calculator />
      </div>
    </>
  );
}
