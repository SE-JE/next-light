export default function ConfirmComponent({
  close,
  message,
  messageDescription,
  optionTrue,
  optionFalse,
  onSave,
  bgTrue,
}) {
  return (
    <>
      <div
        className='fixed top-0 left-0 z-50 flex w-screen h-screen bg-black opacity-20'
        onClick={() => close(false)}></div>
      <div
        className='z-50 opacity-100 absolute__center mt-25vh'
        style={{
          position: "fixed",
          top:
            document.documentElement.scrollTop > 200
              ? document.documentElement.scrollTop - 300
              : document.documentElement.scrollTop + "px",
        }}>
        <div className='text-gray-600 bg-white rounded-xl'>
          <div className='px-8 pt-12 pb-10 text-center border-b lg:px-24'>
            <div className='text-xl'>
              {message ? message : "Apakah anda yakin?"}
            </div>
            <div className='font-normal leading-5'>{messageDescription}</div>
          </div>
          <div className='grid grid-cols-2 text-center'>
            <div
              className='h-full py-4 border-r cursor-pointer hover:bg-gray-100 rounded-bl-xl'
              onClick={() => close(false)}>
              {optionFalse ? optionFalse : "Batalkan"}
            </div>
            <div
              className={`hover__bg__${
                bgTrue ? bgTrue : "primary"
              } hover:text-white py-4 rounded-br-xl cursor-pointer`}
              onClick={(e) => onSave(e)}>
              {optionTrue ? optionTrue : "Ya"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
