import * as React from "react";
import { Card, CardContent, CardHeader, Typography } from "@material-ui/core";
import clockImage from '../../images/reloj.png' // relative path to image 
import { LineChart } from "./linechart";
import { Fragment, useEffect, useState } from "react";
import api from "../../api/axios";
import { BarChart } from "./barchart";
import { AccessFrecuencyDoughnutChart } from "./accessfrecuencydoughnutchart";

import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { ChartContainer } from "./chartContainer";
import { MeanTimeChart } from "./meantimechart";


export const Dashboard = () => {
  const [meanTimeExams, setMeanTimeExams] = useState(0);
  const [dailyActiveUsers, setDailyActiveUSers] = useState({dates:[], values:[]})
  const [dailyCompletedUnits, setDailyCompletedUnits] = useState({dates:[], values:[]})
  const [accessFrecuency, setAccessFrecuency] = useState({categories:[], values:[]})
  const [from, setFrom] = useState<Date | null>(new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000));
  const [to, setTo] = useState<Date | null>(new Date());

  const parseDate = (dateString: string) => {
    var date = new Date(dateString);
    var day = date.getUTCDate();
    var month = date.getUTCMonth()+1;
    var year = date.getUTCFullYear();
    return day+"/"+month+"/"+year;
  }

  const getMeanTimeExams = async () => {
    const res = await api.get('/stats/mean-time-exams', {
      params: {
        from: from,
        to: to,
      }
    });
    console.log(res.data)
    setMeanTimeExams(res.data);
  };

  const getDailyActiveUsers = async (from : Date|null, to : Date|null) => {
    const res = await api.get('/stats/daily-active-users', {
      params: {
        from: from,
        to: to,
      }
    });
    console.log(res.data)
    var dates = res.data.map((r: any) => { return(parseDate(r.date)) })
    var values = res.data.map((r: any) => { return(r.amountOfUsers) })
    setDailyActiveUSers({dates: dates, values: values})
  }

  const getDailyCompletedUnits = async () => {
    const res = await api.get('/stats/daily-completed-units', {
      params: {
        from: from,
        to: to,
      }
    });
    console.log(res.data)
    var dates = res.data.map((r: any) => { return(parseDate(r.date)) })
    var values = res.data.map((r: any) => { return(r.dailyPassedUnits) })
    setDailyCompletedUnits({dates: dates, values: values})
  }

  const getAccessFrecuency = async () => {
    const res = await api.get('/stats/access-frecuency', {
    });
    console.log(res.data)
    var categories = res.data.map((r: any) => { return(r.category) })
    var values = res.data.map((r: any) => { return(r.amountOfUsers) })
    setAccessFrecuency({categories: categories, values: values})
  }

  useEffect(() => {
    getDailyActiveUsers(from, to);
    getMeanTimeExams();
    getDailyCompletedUnits();
    getAccessFrecuency();
  }, [from, to]);
  
  return(
    <Card>
      <div style={{marginTop:'10px', marginBottom:'30px', textAlign:'center'}}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            style={{marginRight:'30px'}}
            inputVariant="outlined"
            label="Desde"
            variant="dialog"
            value={from}
            onChange={setFrom}
            format="dd/MM/yy" 
          />
          <DatePicker
            inputVariant="outlined"
            label="Hasta"
            variant="dialog"
            value={to}
            onChange={setTo}
            format="dd/MM/yy" 
          />
        </MuiPickersUtilsProvider>
      </div>
      <div style={{width:"100%", display:'flex', flexWrap:'wrap'}}>
        <div style={{width:'49%'}}>
          <ChartContainer chart={<LineChart dates={dailyActiveUsers.dates} values={dailyActiveUsers.values}/>} title="Accesos diarios"/>
        </div>
        <div style={{width:'49%'}}>
          <ChartContainer chart={<MeanTimeChart meanTimeExams={meanTimeExams}/>} title="Tiempo promedio de resolución de exámenes aprobados"/>
        </div>
        <div style={{width:'49%'}}>
          <ChartContainer chart={<BarChart dates={dailyCompletedUnits.dates} values={dailyCompletedUnits.values}/>} title="Unidades completadas por día"/>
        </div>
        <div style={{width:'49%'}}>
          <ChartContainer chart={<AccessFrecuencyDoughnutChart categories={accessFrecuency.categories} values={accessFrecuency.values}/>} title="Frecuencia de acceso de usuarios"/>
        </div>
      </div>
    </Card>
  );
}