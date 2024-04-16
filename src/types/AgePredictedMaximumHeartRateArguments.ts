import { AgeBasedHeartRateArguments } from "./AgeBasedHeartRateArguments";


export interface AgePredictedMaximumHeartRateArguments extends AgeBasedHeartRateArguments {
    intensityRatio: number;
}
