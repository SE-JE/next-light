export default function MenuBarComponent({ items, SetMenuActive, active, py }) {
  return (
    <>
      <div className='grid grid-flow-col grid-cols-auto rounded-full border border-gray-300 text-gray-600'>
        {items?.map((res, index) => {
          return (
            <div
              key={index}
              className={`text-center rounded-full ${"py-" + py} ${
                active == res
                  ? "bg__light__primary shadow bg-gray-50"
                  : "hover:bg-gray-50"
              } cursor-pointer`}
              onClick={() => SetMenuActive(res)}>
              <div>{res}</div>
            </div>
          );
        })}
      </div>
    </>
  );
}
