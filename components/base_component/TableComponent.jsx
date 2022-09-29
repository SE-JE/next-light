/* eslint-disable @next/next/no-img-element */
import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  faArrowAltCircleUp,
  faArrowDown,
  faArrowDownShortWide,
  faArrowUpShortWide,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faEllipsis,
  faEllipsisH,
  faFilter,
  faList,
  faMagnifyingGlass,
  faPlus,
  faSearch,
  faSliders,
  faSort,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import InputDefaultComponent from './input/InputDefaultComponent';
import ButtonComponent from './ButtonComponent';
import ShadowScrollComponent from './ShadowScrollComponent';
import CheckBoxComponent from './input/CheckBoxComponent';
import FilterComponent from './FilterComponent';

export default function TableComponent({
  columns,
  data,
  onChangeSearch,
  setSearch,
  searchColumn,
  onChangeSearchColumn,
  setSearchColumn,
  onChangeSort,
  setSort,
  setTotalRow,
  onChangePaginate,
  setPaginate,
  onChangePage,
  setPage,
  loading,
  width,
  // tabFilter,
  noSearch,
  topBar,
  onChangeFilter,
  setFilterValue,
}) {
  const [menuSort, setMenuSort] = useState(false);
  const [columnSelector, setColumnSelector] = useState([]);
  const [floatingAction, setFloatingAction] = useState(true);
  const [floatingPerpage, setFloatingPerpage] = useState(false);
  const [floatingSearchColumn, setFloatingSearchColumn] = useState(false);
  const [floatingActionActive, setFloatingActionActive] = useState(-1);
  const [pagination, setPagination] = useState({
    first: false,
    pages: [],
    last: false,
  });
  const [inputSearch, setInputSearch] = useState("");
  const [doSearch, setDoSearch] = useState("");
  const [floatingFilter, setFloatingFilter] = useState(false);

  useEffect(() => {
    let newSeletor = [];

    columns.map((column) => {
      newSeletor.push({ key: column.selector, width: column.width });
    });

    setColumnSelector(newSeletor);
  }, [columns]);

  useEffect(() => {
    if (setTotalRow > setPaginate) {
      let newPages = [];
      let lastPage = Math.ceil(setTotalRow / setPaginate);

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
  }, [setPage, setTotalRow, setPaginate, setSearch]);

  useEffect(() => {
    if (inputSearch != null) {
      const delaySearch = setTimeout(() => {
        if (onChangePage) {
          onChangePage(1);
        }

        setDoSearch(!doSearch)
      }, 500);
      return () => clearTimeout(delaySearch);
    }
  }, [inputSearch]);

  useEffect(() => {
    if (onChangeSearch) {
      onChangeSearch(inputSearch);
    }
  }, [doSearch]);

  useEffect(() => {
    setInputSearch(setSearch)
  }, [setSearch]);

  const wrapFilter = useRef([]);

  useEffect(() => {
    function handleClickOutsideFilter(e) {
      setTimeout(() => {
        if (
          floatingFilter != false &&
          wrapFilter.current[floatingFilter] &&
          !wrapFilter.current[floatingFilter].contains(e.target)
        ) {
          setFloatingFilter(false);
        }
      }, 100);
    }

    document.addEventListener("mousedown", handleClickOutsideFilter);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideFilter);
    };
  }, [wrapFilter, floatingFilter]);


  return (
    <div className='pb-5'>
      <div className=''>
        {topBar && (
          <div className='p-3 rounded-xl bg-white shadow-sm'>
            {topBar}
          </div>
        )}

        <div className='flex items-center justify-between my-4'>
          <div className='relative z-20'>
            {setTotalRow ? (
              <>
                <input
                  id='tablePage'
                  onFocus={() => setFloatingPerpage(true)}
                  onBlur={() => {
                    setTimeout(() => {
                      setFloatingPerpage(false);
                    }, 100);
                  }}
                  className='pl-4 pr-12 py-3 w-24 text-md font-semibold rounded-md border-b border-gray-300 focus:shadow-inner'
                  value={setPaginate}
                  readOnly={"readonly"}
                />
                <label htmlFor="tablePage">
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="absolute top-1/2 -translate-y-1/2 right-4 text-lg cursor-pointer"
                  />
                </label>

                <div
                  className={`absolute top-full right-1/2 translate-x-1/2 bg-white shadow-md rounded-lg py-2 ${!floatingPerpage ? "scale-0" : "scale-100"
                    }`}
                >
                  {[10, 20, 30, 50, 100].map((data, key) => {
                    return (
                      <div
                        key={key}
                        className={`px-4 py-3 w-24 cursor-pointer hover__bg__light__primary ${setPaginate == data ? "bg__light__primary text__primary" : ""}`}
                        // onClick={() => onChangePaginate(data)}
                        onMouseDown={() => {
                          setTimeout(() => {
                            setFloatingPerpage(true);
                          }, 110);

                          onChangePaginate(data)
                        }}

                        onMouseUp={() => {
                          setTimeout(() => {
                            setFloatingPerpage(false);
                          }, 120);

                          onChangePaginate(data)
                        }}
                      >
                        {data}
                      </div>
                    )
                  })}
                </div>
              </>
            ) : <></>}
          </div>

          {!noSearch && (
            <div className='flex w-1/2 lg:w-1/4'>
              {searchColumn && (
                <div className='relative z-20 border-r border-gray-300'>
                  <input
                    id='tableSearchColumn'
                    onFocus={() => setFloatingSearchColumn(true)}
                    onBlur={() => {
                      setTimeout(() => {
                        setFloatingSearchColumn(false);
                      }, 100);
                    }}
                    className='pl-4 pr-12 py-3 text-md w-32 font-semibold rounded-l-md border-b border-gray-300'
                    value={setSearchColumn?.label ? setSearchColumn?.label : "All"}
                    readOnly={"readonly"}
                  />
                  <label htmlFor="tableSearchColumn">
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className="absolute top-1/2 -translate-y-1/2 right-4 text-lg cursor-pointer"
                    />
                  </label>

                  <div
                    className={`absolute top-full right-1/2 translate-x-1/2 bg-white shadow-md rounded-lg py-2 ${!floatingSearchColumn ? "scale-0" : "scale-100"
                      }`}>
                    <div
                      className={`px-4 py-3 w-32 cursor-pointer hover__bg__light__primary ${!setSearchColumn?.selector ? "bg__light__primary text__primary" : ""}`}
                      onMouseDown={() => {
                        setTimeout(() => {
                          setFloatingSearchColumn(true);
                        }, 110);

                        onChangeSearchColumn(null)
                      }}

                      onMouseUp={() => {
                        setTimeout(() => {
                          setFloatingSearchColumn(false);
                        }, 120);

                        onChangeSearchColumn(null)
                      }}
                    >
                      All
                    </div>
                    {columns.map((data, key) => {
                      return (
                        <div
                          key={key}
                          className={`px-4 py-3 w-32 cursor-pointer hover__bg__light__primary ${setSearchColumn?.selector == data.selector ? "bg__light__primary text__primary" : ""}`}
                          onMouseDown={() => {
                            setTimeout(() => {
                              setFloatingSearchColumn(true);
                            }, 110);

                            onChangeSearchColumn(data)
                          }}

                          onMouseUp={() => {
                            setTimeout(() => {
                              setFloatingSearchColumn(false);
                            }, 120);

                            onChangeSearchColumn(data)
                          }}
                        >
                          {data.label}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              <div className='relative w-full'>
                <input type="text"
                  name={"search"}
                  placeholder={"Search Data..."}
                  value={inputSearch}
                  onChange={(e) => setInputSearch(e.target.value)}
                  className={`${loading ? "skeleton-loading" : ""} py-3 pl-4 pr-12 w-full font-semibold text-md ${searchColumn ? "rounded-r-lg" : "rounded-lg"} bg-white border-b border-gray-300`}
                  autoComplete={"off"}
                />

                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute top-1/2 -translate-y-1/2 right-4 text-lg"
                />
              </div>
            </div>
          )}
        </div>

        <div className='relative w-full'>
          <ShadowScrollComponent
            className={'w-full py-4 overflow-x-auto scroll_control'}
            onScroll={(e) =>
              setFloatingAction(
                e.target.scrollLeft + e.target.offsetWidth <=
                e.target.scrollWidth - 500
              )
            }>
            {loading ? (
              <>
                <div
                  className='min-w-full'
                  style={{
                    width: width ? width : "max-content"
                  }}
                >
                  {
                    // ? Head Column
                  }
                  <div className='flex gap-4 mb-2 px-3 py-2'>
                    <div className="w-16 px-6 py-4 font-bold skeleton__loading"></div>
                    {[1, 2, 3, 4, 5].map((column, key) => {
                      return (
                        <div
                          key={key}
                          className={`px-6 py-3 font-bold skeleton__loading`}
                          style={{
                            width: "200px"
                          }}
                        ></div>
                      )
                    })}
                  </div>

                  {
                    // ? Body Column
                  }
                  <div className='flex flex-col gap-y-2'>
                    {[1, 2, 3, 4].map((item, key) => {
                      return (
                        <div className='flex items-center gap-4 bg-white rounded-lg shadow-sm relative p-3' key={key}>
                          <div className="w-16 px-6 py-4 font-medium skeleton__loading"></div>
                          {[1, 2, 3, 4, 5].map((column, key) => {
                            return (
                              <div
                                key={key}
                                className="px-6 py-4 text-lg font-medium skeleton__loading"
                                style={{
                                  width: "200px"
                                }}
                              ></div>
                            )
                          })}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </>
            ) : (
              <>
                  {!data || !data[0] ? (
                  <div className='flex justify-center p-5'>
                      <div className='flex flex-col items-center justify-center gap-8 p-5'>
                        <img
                          src='/204.svg'
                          width={"200px"}
                          alt='server error'
                        />
                        <h1 className='text-2xl font-bold'>Empty Data</h1>
                      </div>
                  </div>
                ) : (
                      <div
                        className='min-w-full'
                        style={{
                          width: width ? width : "max-content"
                        }}
                      >
                        {
                          // ? Head Column
                        }
                        <div className='flex gap-4 mb-2'>
                          <div className="w-16 px-6 py-4 font-bold">
                            #
                          </div>
                          {columns && columns.map((column, key) => {
                            return (
                              <div
                                key={key}
                                className={`px-6 py-4 font-bold`}
                                style={{
                                  width: column.width ? column.width : "200px"
                                }}

                              >
                                <div className='flex justify-between gap-2 items-center'>
                                  <div
                                    className={`w-full ${column.sortable ? "cursor-pointer" : ""}`}
                                    onClick={() => {
                                      if (column.sortable && onChangeSort) {
                                        onChangeSort({
                                          selector: column.selector,
                                          direction: (!setSort || setSort.selector != column.selector) ? "desc" : setSort.direction == "desc" ? "asc" : "desc",
                                        })
                                      }
                                    }}
                                  >
                                    {column.label}
                                  </div>

                                  <div className='relative flex gap-4'>
                                    {(setSort && setSort.selector == column.selector) && (
                                      <div
                                        className={`${column.sortable ? "cursor-pointer" : ""}`}
                                        onClick={() => {
                                          if (column.sortable && onChangeSort) {
                                            onChangeSort({
                                              selector: column.selector,
                                              direction: (!setSort || setSort.selector != column.selector) ? "desc" : setSort.direction == "desc" ? "asc" : "desc",
                                            })
                                          }
                                        }}
                                      >
                                        {setSort.direction == "desc" ? (
                                          <FontAwesomeIcon icon={faArrowDownShortWide} className="text-lg" />
                                        ) : (
                                          <FontAwesomeIcon icon={faArrowUpShortWide} className="text-lg" />
                                        )}
                                      </div>
                                    )}

                                    {column.filter && (
                                      <>
                                        <div
                                          className={`cursor-pointer ${setFilterValue?.filter((prev) => prev.column == column.selector)?.at(0)?.value?.at(0) ? "text__primary" : ""}`}
                                          onClick={() => {
                                            setFloatingFilter(floatingFilter == column.selector ? false : column.selector)
                                          }}
                                        >
                                          <FontAwesomeIcon icon={faSliders} className="text-lg" />
                                        </div>

                                        <div
                                          ref={el => wrapFilter.current[column.selector] = el}
                                          className={`
                                              absolute -bottom-2 z-10 w-64 translate-y-full right-0 p-4 bg-white rounded-lg shadow
                                              ${floatingFilter == column.selector ? "" : "scale-y-0"}
                                            `}
                                        >
                                          <div className='flex justify-between mb-3'>
                                            <label className='text-sm'>Filter by {column.label}</label>
                                            <div
                                              className='text-sm text__secondary cursor-pointer'
                                              onClick={() => onChangeFilter(setFilterValue?.filter((prev) => prev.column != column.selector))}
                                            >
                                              Reset
                                            </div>
                                          </div>

                                          <FilterComponent
                                            type={column.filter.type}
                                            options={column.filter.options}
                                            onChange={(e) => {
                                              onChangeFilter([...setFilterValue?.filter((prev) => prev.column != column.selector), {
                                                column: column.selector,
                                                value: e,
                                              }])
                                            }}
                                            setInputValue={setFilterValue?.filter((prev) => prev.column == column.selector)[0] ? setFilterValue?.filter((prev) => prev.column == column.selector)[0].value : []}
                                          />
                                        </div>
                                      </>
                                    )}

                                  </div>

                                </div>

                              </div>
                            )
                          })}
                        </div>

                        {
                          // ? Body Column
                        }
                        <div className='flex flex-col gap-y-2'>
                          {(data && data[0]) && data.map((item, key) => {
                            return (
                              <div className='flex items-center gap-4 bg-white rounded-lg shadow-sm relative' key={key}>
                                <div className="w-16 px-6 py-4 font-medium">
                                  {key + 1}
                                </div>
                                {columns && columns.map((column, key) => {
                                  return (
                                    <div
                                      key={key}
                                      className="px-6 py-4 text-lg font-medium"
                                      style={{
                                        width: column.width ? column.width : "200px"
                                      }}
                                    >
                                      {item[column.selector] ? item[column.selector] : "-"}
                                    </div>
                                  )
                                })}
                                <div className="flex-1 flex justify-end gap-2 px-6 py-4">
                                  {item.action}
                                </div>

                                {(item.action && floatingAction) && (
                                  <div
                                    className='sticky hover:-right-2 bg__background -right-5 z-30 cursor-pointer flex shadow rounded-l-lg'
                                    onClick={() =>
                                      floatingActionActive == key
                                        ? setFloatingActionActive(-1)
                                        : setFloatingActionActive(key)
                                    }>
                                    <div className=' pl-5 pr-7 py-5'>
                                      <FontAwesomeIcon icon={floatingActionActive != key ? faChevronLeft : faChevronRight} className="text__primary" />
                                    </div>

                                    <div
                                      className={`py-2 flex gap-2 ${floatingActionActive == key
                                        ? "w-max pl-2 pr-8"
                                        : "w-0"
                                        }`}>
                                      {item.action}
                                    </div>
                                  </div>
                                )}

                              </div>
                            )
                          })}
                        </div>
                      </div>
                )}
              </>
            )}
          </ShadowScrollComponent>
        </div>

        {setTotalRow ? (
          <div className='flex items-center justify-between p-4'>
            <div className='flex items-center gap-3'>
              {setPage > 1 && (
                <div
                  className='p-3 text-gray-600 cursor-pointer'
                  onClick={() => onChangePage(setPage - 1)}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </div>
              )}

              {pagination.first && (
                <>
                  <div
                    className='px-5 py-2 font-bold bg-white rounded-md cursor-pointer hover:scale-110'
                    onClick={() => onChangePage(1)}>
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
                      className={`py-2 px-5 rounded-md font-bold ${page == setPage
                        ? "bg__light__primary text__primary"
                        : "bg-white cursor-pointer"
                        } hover:scale-110`}
                      onClick={() => onChangePage(page)}>
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
                    className='px-5 py-2 font-bold bg-white rounded-md cursor-pointer hover:scale-110'
                    onClick={() => onChangePage(pagination.last)}>
                    {pagination.last}
                  </div>
                </>
              )}
              {setPage < pagination.lastPage && (
                <div
                  className='p-3 text-gray-600 cursor-pointer'
                  onClick={() => onChangePage(setPage + 1)}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </div>
              )}
            </div>
            <div className='relative flex items-center gap-5 px-3'>
              <div className='text-gray-600'>
                {setPaginate * setPage - setPaginate + 1}
                {" "} - {" "}
                {setPage < pagination.lastPage
                  ? setPaginate * setPage
                  : setTotalRow}
                {" "} dari {" "}
                {setTotalRow}
              </div>

              {/* <div className='text-gray-600'>Per halaman</div> */}
            </div>
          </div>
        ) : <></>}
      </div>
    </div>
  );
}

