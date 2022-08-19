/* eslint-disable @next/next/no-img-element */
import React, {
  useEffect,
  useState,
} from 'react';

import {
  faChevronLeft,
  faChevronRight,
  faEllipsis,
  faList,
  faMagnifyingGlass,
  faSort,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import InputDefaultComponent from './input/InputDefaultComponent';

export default function TableComponent({
  columns,
  dataset,
  header,
  onSearch,
  setSearch,
  onSort,
  setSort,
  totalRows,
  changePerpage,
  changePage,
  leftActions,
  rightActions,
  isLoading,
  noData,
  width,
  selectRows,
  clearSelectRow,
  onSelectRows,
  onClickSelected,
  filter,
  noId,
  tabFilter,
  setPerpage,
  setPage,
  noSearch,
  bottomView
}) {
  // const [selected, setSelected] = useState([]);
  // const [countSelected, setCountSelected] = useState(0);
  // const [clearSelected, setClearSelected] = useState(false);
  const [menuSort, setMenuSort] = useState(false);
  const [columnSelector, setColumnSelector] = useState([]);
  const [floatingAction, setFloatingAction] = useState(true);
  const [floatingPerpage, setFloatingPerpage] = useState(false);
  const [floatingActionActive, setFloatingActionActive] = useState(-1);
  const [pagination, setPagination] = useState({
    first: false,
    pages: [],
    last: false,
  });
  const [inputSearch, setInputSearch] = useState("");
  const [doSearch, setDoSearch] = useState("");

  // useEffect(() => {
  //   setClearSelected(true);
  //   setSelected([]);
  //   setCountSelected(0);
  // }, [clearSelectRow]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // useEffect(() => {
  //   if (!isLoading) {
  //     setClearSelected(false);
  //   }
  // });

  useEffect(() => {
    let newSeletor = [];

    columns.map((column) => {
      newSeletor.push({ key: column.selector, width: column.width });
    });

    setColumnSelector(newSeletor);
  }, [columns]);

  useEffect(() => {
    if (totalRows > setPerpage) {
      let newPages = [];
      let lastPage = Math.ceil(totalRows / setPerpage);

      if (setPage > 1 && setPage < lastPage) {
        if (setPage > 2) {
          newPages = [setPage - 1, setPage, setPage + 1];
        } else {
          newPages = [1, setPage, setPage + 1];
        }
      } else if (setPage <= 1 && lastPage > 2) {
        newPages = [setPage, setPage + 1, setPage + 2];
      } else if (lastPage == 2) {
        if (setPage == 2) {
          newPages = [1, setPage];
        } else {
          newPages = [setPage, 2];
        }
      } else {
        newPages = [setPage - 2, setPage - 1, setPage];
      }

      setPagination({
        first: setPage > 3 ? "1" : false,
        pages: newPages,
        last: setPage + 1 < lastPage && lastPage > 3 ? lastPage : false,
        lastPage: lastPage,
      });
    } else {
      setPagination({
        first: false,
        pages: ["1"],
        last: false,
        lastPage: 1,
      });
    }
  }, [setPage, totalRows, setPerpage, setSearch]);

  useEffect(() => {
    if (inputSearch != null) {
      const delaySearch = setTimeout(() => {
        if (changePage) {
          changePage(1);
        }

        setDoSearch(!doSearch);
      }, 1000);
      return () => clearTimeout(delaySearch);
    }
  }, [inputSearch]);

  useEffect(() => {
    if (onSearch) {
      onSearch(inputSearch);
    }
  }, [doSearch]);

  return (
    <div className='pb-5'>
      {tabFilter && (
        <div className='flex'>
          <div className='bg-white text__primary shadow-[0_-2px_5px_-3px_rgba(0,0,0,0.35)] px-6 pt-4 pb-10 -mb-6 flex items-center gap-4 rounded-t-xl'>
            <FontAwesomeIcon icon={faList} className={"text-lg"} />
            <h6>Semua</h6>
          </div>
          <div className='flex items-center gap-4 px-6 py-4 text-gray-700 rounded-t-xl'>
            <FontAwesomeIcon icon={faList} className={"text-lg"} />
            <h6>Success</h6>
          </div>
        </div>
      )}

      <div className='bg-white shadow-md min-h-[calc(100%-7.5rem)] rounded-xl'>
        <div className='flex items-center justify-between p-5'>
          {leftActions}
          {!noSearch && (
            <div className='w-1/3'>
              <InputDefaultComponent
                name={"search"}
                size={"sm"}
                placeholder={"Search Data"}
                icon={faMagnifyingGlass}
                iconLeft
                setInputValue={setSearch}
                onChange={(e) => setInputSearch(e)}
                className={`${isLoading ? "skeleton-loading" : ""}`}
              />
            </div>
          )}
        </div>

        <div className='relative w-full overflow-x-hidden'>
          <div
            className='w-full overflow-auto scroll_control shadow__scrollx'
            onScroll={(e) =>
              setFloatingAction(
                e.target.scrollLeft + e.target.offsetWidth <=
                  e.target.scrollWidth - 120
              )
            }>
            {isLoading ? (
              <table
                cellPadding='0'
                cellSpacing='0'
                // width={width ? width : "180%"}
                className={`w3samples_table_loader w-[${
                  width ? width : "100%"
                }]`}>
                <tr className='row_head'>
                  <th className='col1'>
                    <span></span>
                  </th>
                  <th className='col4'>
                    <span></span>
                  </th>
                  <th className='col5'>
                    <span></span>
                  </th>
                </tr>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, key) => {
                  return (
                    <tr className='table_row' key={key}>
                      <td className='col1'>
                        <span></span>
                      </td>
                      <td className='col4'>
                        <span></span>
                      </td>
                      <td className='col5'>
                        <span></span>
                      </td>
                    </tr>
                  );
                })}
              </table>
            ) : (
              <>
                {noData ? (
                  <div className='flex justify-center p-5'>
                    <img
                      src='/images/no-data.svg'
                      width={"350px"}
                      alt='not found'
                    />
                  </div>
                ) : (
                  <table
                    width={width ? width : "100%"}
                    className={`table-auto w-[${width ? width : "100%"}]`}>
                    <thead className='px-3 font-bold text-white bg__light__secondary'>
                      <tr>
                        <th
                          width={"60px"}
                          className='px-5 py-4 font-bold text-center'>
                          #
                        </th>
                        {columns.map((column, key) => {
                          return (
                            <th
                              width={column.width ? column.width : "auto"}
                              key={key}
                              className={`py-6 px-5 font-bold text-left cursor-pointer ${
                                setSort && setSort.column == column.selector
                                  ? "text__secondary"
                                  : ""
                              }`}
                              onClick={(e) => {
                                if (
                                  setSort &&
                                  setSort.column == column.selector
                                ) {
                                  onSort({
                                    column: column.selector,
                                    direction:
                                      setSort.direction == "desc"
                                        ? "asc"
                                        : "desc",
                                  });
                                } else {
                                  onSort({
                                    column: column.selector,
                                    direction: "desc",
                                  });
                                }
                              }}>
                              {column.label}
                              {setSort && setSort.column == column.selector && (
                                <FontAwesomeIcon
                                  icon={faSort}
                                  className='ml-3'
                                />
                              )}
                            </th>
                          );
                        })}
                        <th className='table-column px-5 py-4 font-bold'></th>
                      </tr>
                    </thead>
                    <tbody className='px-3 font-medium'>
                      {dataset.map((data, index) => {
                        return (
                          <tr className='border-b table_row' key={index}>
                            <td
                              width={"60px"}
                              className='text-center table_cell'>
                              {data["id"]}
                            </td>
                            {columnSelector.map((selector, key) => {
                              return (
                                <td
                                  width={
                                    selector.width ? selector.width : "auto"
                                  }
                                  className={`table_cell max-w-[100px]`}
                                  key={key}>
                                  {data[selector.key]}
                                </td>
                              );
                            })}
                            <td className='table_cell'>
                              <div className='flex justify-end'>
                                {data["action"]}
                              </div>
                            </td>
                            {width != "100%" && data.action && (
                              <div
                                className={`absolute flex items-center translate-y-1/3 ${
                                  floatingAction ? "right-0" : "-right-100"
                                } `}>
                                <div
                                  className='px-3 py-2 rounded-l-lg shadow cursor-pointer table_floating_action'
                                  onClick={() =>
                                    floatingActionActive == index
                                      ? setFloatingActionActive(-1)
                                      : setFloatingActionActive(index)
                                  }>
                                  <FontAwesomeIcon
                                    icon={faEllipsis}
                                    className='text-xl text-white'
                                  />
                                </div>

                                <div
                                  className={`bg-white py-2 shadow rounded-l-md ${
                                    floatingActionActive == index
                                      ? "w-max px-2"
                                      : "w-0"
                                  }`}>
                                  {data["action"]}
                                </div>
                              </div>
                            )}
                            {data.extra}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </>
            )}
          </div>
        </div>

        {totalRows ? (
          <div className='flex items-center justify-between p-5'>
            <div className='flex items-center gap-3'>
              {setPage > 1 && (
                <div
                  className='p-3 text-gray-600 cursor-pointer'
                  onClick={() => changePage(setPage - 1)}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </div>
              )}

              {pagination.first && (
                <>
                  <div
                    className='px-5 py-2 font-bold text-gray-600 bg-gray-200 rounded-md cursor-pointer'
                    onClick={() => changePage(1)}>
                    1
                  </div>
                  <div className='px-2 py-2 font-bold text-gray-600 rounded-md'>
                    ...
                  </div>
                </>
              )}
              {pagination.pages &&
                pagination.pages.map((page, key) => {
                  return (
                    <div
                      key={key}
                      className={`py-2 px-5 rounded-md font-bold ${
                        page == setPage
                          ? "bg__light__primary text__primary"
                          : "bg-gray-200 text-gray-600 cursor-pointer"
                      }`}
                      onClick={() => changePage(page)}>
                      {page}
                    </div>
                  );
                })}
              {pagination.last && (
                <>
                  <div className='px-2 py-2 font-bold text-gray-600 rounded-md'>
                    ...
                  </div>
                  <div
                    className='px-5 py-2 font-bold text-gray-600 bg-gray-200 rounded-md cursor-pointer'
                    onClick={() => changePage(pagination.last)}>
                    {pagination.last}
                  </div>
                </>
              )}
              {setPage < pagination.lastPage && (
                <div
                  className='p-3 text-gray-600 cursor-pointer'
                  onClick={() => changePage(setPage + 1)}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </div>
              )}
            </div>
            <div className='relative flex items-center gap-5 px-3'>
              <div className='text-gray-600'>
                {setPerpage * setPage - setPerpage + 1} -
                {setPage < pagination.lastPage
                  ? setPerpage * setPage
                  : totalRows}
                dari {totalRows}
              </div>
              <input
                htmlFor='perpage'
                onFocus={() => setFloatingPerpage(true)}
                onBlur={() => {
                  setTimeout(() => {
                    setFloatingPerpage(false);
                  }, 100);
                }}
                className='w-20 px-6 py-2 font-bold text-gray-600 rounded-md max-w-max form__control'
                value={setPerpage}
              />
              <div
                className={`absolute top-0 right-1/2 translate-x-1/2 -translate-y-full bg-white shadow-md rounded-md py-2 ${
                  !floatingPerpage ? "scale-0" : "scale-100"
                }`}>
                <div
                  className='px-6 py-2 cursor-pointer hover:bg-gray-200'
                  onClick={() => changePerpage(10)}>
                  10
                </div>
                <div
                  className='px-6 py-2 cursor-pointer hover:bg-gray-200'
                  onClick={() => changePerpage(20)}>
                  20
                </div>
                <div
                  className='px-6 py-2 cursor-pointer hover:bg-gray-200'
                  onClick={() => changePerpage(30)}>
                  30
                </div>
                <div
                  className='px-6 py-2 cursor-pointer hover:bg-gray-200'
                  onClick={() => changePerpage(40)}>
                  40
                </div>
                <div
                  className='px-6 py-2 cursor-pointer hover:bg-gray-200'
                  onClick={() => changePerpage(50)}>
                  50
                </div>
              </div>
              <div className='text-gray-600'>Per halaman</div>
            </div>
          </div>
        ) : (
            <div className='p-5'>{bottomView}</div>
        )}
      </div>
    </div>
  );
}

