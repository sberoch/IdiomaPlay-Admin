import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { Card } from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import * as React from "react";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { AccessFrecuencyDoughnutChart } from "./accessfrecuencydoughnutchart";
import { BarChart } from "./barchart";
import { ChartContainer } from "./chartContainer";
import { LineChart } from "./linechart";
import { MeanTimeChart } from "./meantimechart";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const Dashboard = () => {
  const [meanTimeExams, setMeanTimeExams] = useState(0);
  const [alertOpened, setAlertOpened] = useState(false);
  const [alertText, setAlertText] = useState("");
  const [dailyActiveUsers, setDailyActiveUSers] = useState({
    dates: [],
    values: [],
  });
  const [dailyCompletedUnits, setDailyCompletedUnits] = useState({
    dates: [],
    values: [],
  });
  const [accessFrecuency, setAccessFrecuency] = useState({
    categories: [],
    values: [],
  });
  const [passedExams, setPassedExams] = useState<{
    categories: string[];
    values: number[];
  }>({
    categories: [],
    values: [],
  });
  const [from, setFrom] = useState<Date | null>(
    new Date(
      new Date(new Date().setHours(0, 0, 0, 0)).getTime() -
        7 * 24 * 60 * 60 * 1000
    )
  );
  const [to, setTo] = useState<Date | null>(
    new Date(new Date().setHours(0, 0, 0, 0))
  );

  console.log({ from, to });

  const handleFromChange = (date: MaterialUiPickersDate) => {
    let fromDate = date;
    if (to) {
      const diff = (to!.getTime() - date!.getTime()) / 86400000;
      if (diff > 90) {
        fromDate = getDaysBackFromDate(to, 91);
        setAlertText("La ventana de tiempo m??xima es de 90 d??as");
        setAlertOpened(true);
      }

      if (date!.getTime() >= to?.getTime()) {
        setAlertText("Rango de fechas err??neo");
        setAlertOpened(true);
        fromDate = from;
      }
    }
    fromDate?.setHours(0, 0, 0, 0);
    setFrom(fromDate);
  };

  const handleToChange = (date: MaterialUiPickersDate) => {
    let toDate = date;
    if (from) {
      if (from.getTime() >= date!.getTime()) {
        setAlertText("Rango de fechas err??neo");
        setAlertOpened(true);
        toDate = to;
      }
    }
    toDate?.setHours(0, 0, 0, 0);
    setTo(toDate);
  };

  const parseDate = (dateString: string) => {
    var date = new Date(dateString);
    var day = date.getUTCDate();
    var month = date.getUTCMonth() + 1;
    return day + "/" + month;
  };

  const getDaysBackFromDate = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
  };

  const getMeanTimeExams = async () => {
    const fromToSend = new Date(from!);
    fromToSend.setHours(from!.getHours() - 3);
    const toToSend = new Date(to!);
    toToSend.setHours(to!.getHours() - 3);
    const res = await api.get("/stats/mean-time-exams", {
      params: {
        from: fromToSend,
        to: toToSend,
      },
    });
    console.log(res.data);
    setMeanTimeExams(res.data);
  };

  const getDailyActiveUsers = async () => {
    const fromToSend = new Date(from!);
    fromToSend.setHours(from!.getHours() - 3);
    const toToSend = new Date(to!);
    toToSend.setHours(to!.getHours() - 3);
    const res = await api.get("/stats/daily-active-users", {
      params: {
        from: fromToSend,
        to: toToSend,
      },
    });
    console.log(res.data);
    var dates = res.data.map((r: any) => {
      return parseDate(r.date);
    });
    var values = res.data.map((r: any) => {
      return r.amountOfUsers;
    });
    setDailyActiveUSers({ dates: dates, values: values });
  };

  const getDailyCompletedUnits = async () => {
    const fromToSend = new Date(from!);
    fromToSend.setHours(from!.getHours() - 3);
    const toToSend = new Date(to!);
    toToSend.setHours(to!.getHours() - 3);
    const res = await api.get("/stats/daily-completed-units", {
      params: {
        from: fromToSend,
        to: toToSend,
      },
    });
    console.log(res.data);
    var dates = res.data.map((r: any) => {
      return parseDate(r.date);
    });
    var values = res.data.map((r: any) => {
      return r.dailyPassedUnits;
    });
    setDailyCompletedUnits({ dates: dates, values: values });
  };

  const getAccessFrecuency = async () => {
    const res = await api.get("/stats/access-frecuency", {});
    console.log(res.data);
    var categories = res.data.map((r: any) => {
      return r.category;
    });
    var values = res.data.map((r: any) => {
      return r.amountOfUsers;
    });
    setAccessFrecuency({ categories: categories, values: values });
  };

  const getPassedExams = async () => {
    const fromToSend = new Date(from!);
    fromToSend.setHours(from!.getHours() - 3);
    const toToSend = new Date(to!);
    toToSend.setHours(to!.getHours() - 3);
    const res = await api.get("/stats/passed-exams", {
      params: {
        from: fromToSend,
        to: toToSend,
      },
    });
    var categories = Object.keys(res.data) as string[];
    var values = Object.values(res.data) as number[];
    setPassedExams({ categories: categories, values: values });
  };

  useEffect(() => {
    getDailyActiveUsers();
    getMeanTimeExams();
    getDailyCompletedUnits();
    getAccessFrecuency();
    getPassedExams();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to]);

  return (
    <Card>
      <div
        style={{ marginTop: "10px", marginBottom: "30px", textAlign: "center" }}
      >
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <DatePicker
            style={{ marginRight: "30px" }}
            inputVariant="outlined"
            label="Desde"
            variant="dialog"
            value={from}
            onChange={handleFromChange}
            format="dd/MM/yy"
          />
          <DatePicker
            inputVariant="outlined"
            label="Hasta"
            variant="dialog"
            value={to}
            onChange={handleToChange}
            format="dd/MM/yy"
          />
        </MuiPickersUtilsProvider>
      </div>
      <div style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
        <div
          style={{
            width: "40%",
            marginLeft: "20px",
            paddingRight: 10,
            paddingLeft: 10,
          }}
        >
          <ChartContainer
            chart={
              <LineChart
                dates={dailyActiveUsers.dates}
                values={dailyActiveUsers.values}
              />
            }
            title="Accesos diarios"
          />
        </div>
        <div style={{ width: "49%" }}>
          <ChartContainer
            chart={
              <MeanTimeChart
                meanTimeExams={meanTimeExams}
                categories={passedExams.categories}
                values={passedExams.values}
              />
            }
            title="Tiempo promedio de resoluci??n de ex??menes aprobados"
          />
        </div>
        <div
          style={{
            width: "40%",
            marginLeft: "20px",
            paddingRight: 10,
            paddingLeft: 10,
          }}
        >
          <ChartContainer
            chart={
              <BarChart
                dates={dailyCompletedUnits.dates}
                values={dailyCompletedUnits.values}
              />
            }
            title="Unidades completadas por d??a"
          />
        </div>
        <div
          style={{
            width: "28%",
            paddingRight: 125,
            paddingLeft: 125,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <ChartContainer
            chart={
              <AccessFrecuencyDoughnutChart
                categories={accessFrecuency.categories}
                values={accessFrecuency.values}
              />
            }
            title="Frecuencia de acceso de usuarios *"
          />
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={alertOpened}
        autoHideDuration={3000}
        onClose={() => {
          setAlertOpened(false);
        }}
      >
        <Alert severity="warning">{alertText}</Alert>
      </Snackbar>
    </Card>
  );
};
