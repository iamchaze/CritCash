const Autopays = () => {
  const createAutopay = () => {};
  return (
    <>
      <div className="bg-white p-6 rounded-xl shadow font-[REM]">
        <h2 className=" text-lg font-semibold mb-4 ">Active Autopays</h2>
        <div
          className="m-auto bg-button1 text-white p-3 font-semibold rounded-lg w-fit h-fit flex flex-row space-between cursor-pointer hover:bg-button1light active:translate-0.5 transition-all"
          onClick={createAutopay}
        >
          <img
            src="../../public/images/plus-solid.svg"
            className="w-6 h-6 text-white fill-white mr-2"
            alt=""
          />
          <button className="cursor-pointer">Create</button>
        </div>
      </div>
    </>
  );
};

export default Autopays;
