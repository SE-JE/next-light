import '../styles/general.css';
import '../styles/darkmode.css';

import React, {
  useEffect,
  useState,
} from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <React.Fragment>
      <Component {...pageProps} />
    </React.Fragment>
  );
}

export default MyApp;
