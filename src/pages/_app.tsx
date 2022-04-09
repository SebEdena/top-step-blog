import "normalize.css";
import { AppProps } from "next/app";
// NOTE: Do not move the styles dir to the src.
// They are used by the Netlify CMS preview feature.
import "../../public/styles/global.css";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function App({ Component, pageProps }: AppProps) {

    const router = useRouter();

    useEffect(() => {
      console.log(process.env.localhost);
      
      if(!process.env.localhost) {
  
        const adminRedirects = [
          '/#confirmation_token', 
          '/#invite_token', 
          '/#recovery_token', 
          '/#email_change_token'
        ]
    
        const handleRouteChange = (url: string) => {
          for(const redirect of adminRedirects) {
            if (url.startsWith(redirect)) {
              router.push(`/admin${url}`)
            }
          }
        }
    
        handleRouteChange(router.asPath)
        
        router.events.on('routeChangeStart', handleRouteChange)
    
        // If the component is unmounted, unsubscribe
        // from the event with the `off` method:
        return () => {
          router.events.off('routeChangeStart', handleRouteChange)
        }

      }
    }, [])

  return <Component {...pageProps} />;
}
