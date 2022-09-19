import React from 'react';

import Link from 'next/link';

import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function BreadcumbComponent({ items }) {
  return (
    <nav className='w-full overflow-auto rounded bg-grey-light whitespace-nowrap'>
      <ol className='flex list-reset text-grey-dark'>
        {items.map((data, key) => {
          let active = key + 1 == items.length;

          return (
            <>
              <li>
                <Link href={data.link}>
                  <a
                    className={`font-medium ${active ? "text__primary" : ""} `}>
                    {data.label}
                  </a>
                </Link>
              </li>
              {!active && (
                <li>
                  <span className='mx-3'>
                    <FontAwesomeIcon icon={faChevronRight} />
                  </span>
                </li>
              )}
            </>
          );
        })}
      </ol>
    </nav>
  );
}
