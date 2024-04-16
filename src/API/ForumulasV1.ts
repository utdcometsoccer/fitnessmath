import { ProteinPerKg } from "../Constants/ProteinPerKg";
import { FormulaError } from "../Errors/FormulaError";
import { AgePredictedMaximumHeartRateArguments } from "../types/AgePredictedMaximumHeartRateArguments";
import { DesiredBodyWeightArguments } from "../types/DesiredBodyWeightArguments";
import { Formulas } from "../types/Formulas";
import { HeartRateReserveArguments } from "../types/HeartRateReserveArguments";
import { TargetHeartRateArguments } from "../types/TargetHeartRateArguments";

export class FormulasV1 implements Formulas {
    
    private validateRatio(intensityRatio: number) {
        if (intensityRatio < 0 || intensityRatio > 1) {
            throw new FormulaError("Invalid Intensity!", "AgePredictedMaximumHeartRate");
        }
    }
    private validateAge(age: number) {
        if (age < 0 || age > 220) {
            throw new FormulaError("Invalid Age!", "MaximumHeartRate");
        }
    }
    private validateGreaterThanZero(restingHeartRateBeatsPerMinute: number) {
        if (restingHeartRateBeatsPerMinute <= 0) {
            throw new FormulaError("Invalid Resting Heart Rate!", "HeartRateReserve");
        }
    }

    MaximumHeartRate(age: number): number {
        this.validateAge(age);
        return 220 - age;
    }

    AgePredictedMaximumHeartRate(args: AgePredictedMaximumHeartRateArguments): number {
        this.validateRatio(args.intensityRatio);
        const MHR = this.MaximumHeartRate(args.age);
        return MHR * args.intensityRatio;
    }


    HeartRateReserve(args: HeartRateReserveArguments): number {
        this.validateGreaterThanZero(args.restingHeartRateBeatsPerMinute);
        const MHR = this.MaximumHeartRate(args.age);
        return MHR - args.restingHeartRateBeatsPerMinute;
    }

    

    TargetHeartRate(args: TargetHeartRateArguments): number {
        this.validateRatio(args.intensityRatio);
        this.validateGreaterThanZero(args.restingHeartRateBeatsPerMinute);

        const HRR = this.HeartRateReserve({ age: args.age, restingHeartRateBeatsPerMinute: args.restingHeartRateBeatsPerMinute });
        return (HRR * args.intensityRatio) + args.restingHeartRateBeatsPerMinute;
    }
    DesiredBodyWeight(args: DesiredBodyWeightArguments):number{
        this.validateRatio(args.currentBodyFatRatio);
        this.validateRatio(args.desiredBodyFatRatio);
        this.validateGreaterThanZero(args.weight);

        const leanBodyRatio = 1-args.currentBodyFatRatio;
        const leanBodyWeight = leanBodyRatio * args.weight;
        const desiredLeanBodyRatio = 1-args.desiredBodyFatRatio;
        return leanBodyWeight / desiredLeanBodyRatio;
    }
    TargetProteinIntake(weightInKG: number): number{
        this.validateGreaterThanZero(weightInKG);
        return ProteinPerKg*weightInKG;
    }
}