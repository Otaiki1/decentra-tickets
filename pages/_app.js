import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css';
import Link from 'next/link';
import {useEffect} from 'react';

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        import('bootstrap/dist/js/bootstrap.bundle') ;
    }, [])


  return (
    <>
     <header>
                <nav className="row px-5 bg-white">
                    <div className="col-md-3 p-1 ">
                        <Link href="/viewEvents" passRef>
                            <a className="btn"> View Events</a>
                        </Link>
                   </div>
                   <div className="col-md-3 p-1 ">
                        <Link href="/createEvent" passRef>
                            <a className="btn"> Create Events</a>
                        </Link>
                   </div>
                   <div className="col-md-3 p-1 ">
                        <Link href="/" passRef>
                            <a className="btn"> View Event Status</a>
                        </Link>
                   </div>
                   <div className="col-md-3 p-1 ">
                        <Link href="/" passRef>
                            <a className="btn"> Refund Ticket</a>
                        </Link>
                   </div>
                </nav>
            </header>

  <Component {...pageProps} />
  </>)
}

export default MyApp
