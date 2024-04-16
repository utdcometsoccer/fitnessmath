import { AgeBasedHeartRateArguments } from "./AgeBasedHeartRateArguments";


export interface HeartRateReserveArguments extends AgeBasedHeartRateArguments {
    restingHeartRateBeatsPerMinute: number;
}
