import type { AppProps } from 'next/app';
import { withAnalytics } from '../components/withAnalytics';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default withAnalytics(MyApp);
