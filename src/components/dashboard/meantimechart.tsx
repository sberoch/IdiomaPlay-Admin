import { Typography } from "@material-ui/core";
import clockImage from "../../images/reloj.png"; // relative path to image
import { ExamPassedDoughnutChart } from "./examPassedDoughnutChart";

export const MeanTimeChart = (props: any) => {
  return (
    <div style={{ width: "100%", display: "flex" }}>
      <div
        style={{
          width: "30%",
          display: "flex",
          marginLeft: "10%",
          flexWrap: "wrap",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <img src={clockImage} style={{ height: "100px" }} alt="asd" />
        <div style={{ marginTop: "10px" }}>
          <Typography
            style={{ fontSize: "26px", fontWeight: "bold", lineHeight: "1" }}
          >
            {Math.floor(props.meanTimeExams / 60)}:
            {(
              props.meanTimeExams -
              Math.floor(props.meanTimeExams / 60) * 60
            ).toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })}
          </Typography>
          <Typography style={{ fontSize: "18px", marginTop: "0px" }}>
            Minutos
          </Typography>
        </div>
      </div>
      <div
        style={{
          width: "30%",
          display: "flex",
          marginLeft: "10%",
          textAlign: "center",
          alignContent: "flex-start",
          justifyContent: "center",
        }}
      >
        <ExamPassedDoughnutChart
          categories={props.categories}
          values={props.values}
        />
      </div>
    </div>
  );
};
