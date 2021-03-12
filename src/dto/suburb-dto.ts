import { LotDto } from "./lot-dto";

export interface SuburbDto {
  readonly lots: LotDto[][];
  readonly name: string;
}