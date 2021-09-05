import useSWR, { SWRConfig } from "swr";
import type { AppProps } from 'next/app'
import { makeStyles } from "@material-ui/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import React from "react";
const useStyles = makeStyles({
  table: {
    minWidth: 450,
  },
});

interface Columnconfig {
  id: 'symbol' | 'FundingRate';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const fetcher = (url:string) => fetch(url).then((res) => res.json());
const API = 'https://fapi.binance.com/fapi/v1/premiumIndex';

const FR = () => {
    const { data , error } = useSWR<string[], any>(API,fetcher);
    const FRtables = useStyles();
    console.log("......", !!data);
    if(error) return <p>Error!</p>;
    if(!data) return <p>Loading...</p>;
  return (
/*   <table>
      <tbody>
        {data.map((data) => (
          <tr>
            <td>{data.symbol}</td>
            <td>{data.lastFundingRate}</td>
          </tr>
        ))
        }
      </tbody>
    </table>
    */
   
   <div>
   <TableContainer component={Paper}>
      <Table className={FRtables.table} size="small" aria-label="table">
        <TableHead>
          <TableRow>
            <TableCell>Symbol</TableCell>
            <TableCell align="right">FundingRate</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((data:any) => (
            <TableRow key={data.symbol}>
              <TableCell component="th" scope="row">
                {data.symbol}
              </TableCell>
              <TableCell align="right">{Math.round(data.lastFundingRate * 1000000)/10000}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}

export default FR
