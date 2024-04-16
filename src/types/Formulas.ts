import { AgePredictedMaximumHeartRateArguments } from "./AgePredictedMaximumHeartRateArguments";
import { DesiredBodyWeightArguments } from "./DesiredBodyWeightArguments";
import { HeartRateReserveArguments } from "./HeartRateReserveArguments";
import { TargetHeartRateArguments } from "./TargetHeartRateArguments";

export interface Formulas {
    MaximumHeartRate:(age:number)=>number;
    AgePredictedMaximumHeartRate:(args:AgePredictedMaximumHeartRateArguments)=> number;
    HeartRateReserve:(args:HeartRateReserveArguments)=> number;
    TargetHeartRate:(args: TargetHeartRateArguments)=>number;
    DesiredBodyWeight:(args:DesiredBodyWeightArguments)=> number;
    TargetProteinIntake:(weightInKG:number)=>number;
}