import { Typography } from "@material-ui/core";

export const ChartContainer = (props: any) => {
  return (
    <div>
      <Typography
        style={{
          fontWeight: "bold",
          marginTop: 0,
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "center",
          fontSize: "16px",
        }}
      >
        {props.title}
      </Typography>
      <div
        style={{
          marginTop: "15px",
          paddingBottom: "50px",
          marginLeft: "auto",
          marginRight: "auto",
          height: "250px",
        }}
      >
        {props.chart}
      </div>
    </div>
  );
};
