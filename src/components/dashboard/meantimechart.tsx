
import { Typography } from "@material-ui/core";
import clockImage from '../../images/reloj.png' // relative path to image 

export const MeanTimeChart = (props: any) => {

    return (
        <div style={{width:'100%'}}>
            <div style={{width:"141px", display:'flex', flexWrap:'wrap', marginLeft:'auto', marginRight:'auto'}}>
                <img src={clockImage} style={{height:'70px'}}/>
                <div style={{marginLeft:'10px', marginTop:'10px'}}>
                <Typography style={{fontSize:'26px', fontWeight:'bold', lineHeight:'1'}} >
                    {Math.floor(props.meanTimeExams/60)}:{(props.meanTimeExams - Math.floor(props.meanTimeExams/60)*60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}
                </Typography>
                <Typography style={{fontSize:'18px', marginTop:'0px' }} >
                    Minutos
                </Typography>
                </div>
            </div>
        </div>
    );
}