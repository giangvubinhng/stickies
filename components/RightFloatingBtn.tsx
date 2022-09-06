import type { NextPage } from 'next';

const RightFloatingBtn: NextPage = () => {
  return (
    <div>
      <button onClick={() => { console.log("hello world") }} title="Contact Sale"
        className="fixed z-90 bottom-10 right-8 bg-blue-600 w-20 h-20 rounded-full drop-shadow-lg flex justify-center items-center text-white text-4xl hover:bg-blue-700 hover:drop-shadow-2xl hover:animate-bounce duration-300">&#9993;</button>
    </div>)
}

export default RightFloatingBtn;
