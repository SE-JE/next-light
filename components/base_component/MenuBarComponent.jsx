export default function MenuBarComponent({ items, onChange, active, py }) {
  return (
    <>
      <div className='grid grid-flow-col grid-cols-auto rounded-full border-2 border-gray-300 text-gray-600'>
        {items?.map((res, index) => {
          return (
            <div
              key={index}
              className={`text-center font-semibold px-6 py-3 rounded-full ${"py-" + py} ${
                active == res
                ? "bg__light__primary shadow text__primary"
                  : "hover:bg-gray-50"
              } cursor-pointer`}
              onClick={() => onChange(res)}>
              <div>{res}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
