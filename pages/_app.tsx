import '../styles/globals.css'
import type { AppProps } from 'next/app'

function GetFundingRate(){
  let requestURL = 'https://fapi.binance.com/fapi/v1/premiumIndex'
  let request = new XMLHttpRequest();
  request.open('GET', requestURL);
  request.responseType = 'json';
  request.send();
  request.onload = () => {
    let premiumindexData = request.response;

  }
}

function createData(name: string, FundingRate: number){
  return {name, FundingRate};
}

/* function loadFundingRate(obj){

}
*/

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp
