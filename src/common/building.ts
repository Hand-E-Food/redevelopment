import { BuildingType, BuildingTypes } from "./building-type";
import { LotType } from "./lot";
import { Condition, IScoring, OtherText, Score, ScoreForEachAdjacent, ScoreIf, ScoreIfAnyAdjacent, ScoreIfNotAdjacent } from "./scoring";

export class Building {

  public readonly century: number;

  public readonly id: string;

  public readonly isAmphibious: boolean;

  public readonly isImprovement: boolean;

  public readonly name: string;

  public readonly scorings: IScoring[];

  public readonly type: BuildingType;

  public constructor(id: string, century: number, type: BuildingType, name: string, ...scorings: IScoring[]) {
    this.century = century;
    this.id = id;
    this.isAmphibious = century >= 22;
    this.isImprovement = century >= 20 && id.endsWith('i');
    this.name = name;
    this.scorings = scorings;
    this.type = type;
  }

  public toDto(): string { return this.id; }
}

function is(type: BuildingType): Condition { return lot => lot.buildings.find(card => card.type === type) != undefined; }
const isBorder: Condition = lot => lot.type === LotType.border;
function isCentury(century: number): Condition { return lot => lot.buildings[0]?.century === century; }
const isCommercial: Condition = is(BuildingTypes.commercial);
const isLand: Condition = lot => lot.type === LotType.land;
const isOcean: Condition = lot => lot.type === LotType.ocean;
const isVacantLand: Condition = lot => lot.type === LotType.land && lot.buildings.length === 0;
const isVacantWater: Condition = lot => lot.type === LotType.water && lot.buildings.length === 0;
const isWater: Condition = lot => lot.type === LotType.water;

export const Buildings: {[id: string]: Building} = [
  new Building('19h', 19, BuildingTypes.house, 'Weatherboard House',
    new Score('Gain:', {19:2})
  ),
  new Building('19g', 19, BuildingTypes.cottage, 'Labourers Cottage', 
    new Score('Gain:', {19:1}),
    new ScoreForEachAdjacent(is(BuildingTypes.cottage), 'Each adjacent [cottage]:', {19:1, 20:1, 21:1, 22:1}),
  ),
  new Building('19a', 19, BuildingTypes.farm, 'Farm House', 
    new ScoreForEachAdjacent(isBorder, 'Each adjacent border:', {19:1}),
    new ScoreForEachAdjacent(isVacantLand, 'Each adjacent vacant land:', {19:1, 20:1, 21:1, 22:1}),
  ),
  new Building('19f', 19, BuildingTypes.fancy, 'Homestead', 
    new Score('Gain:', {19:1, 20:1, 21:1, 22:1}),
    new ScoreIfAnyAdjacent(isVacantLand, 'Any adjacent vacant land:', {19:3, 20:3, 21:3, 22:3})
  ),
  new Building('19c', 19, BuildingTypes.commercial, 'Market', 
    new ScoreIfNotAdjacent(isBorder, 'If not adjacent to border:', {19:2, 20:1, 21:1, 22:1}),
    new ScoreForEachAdjacent(isCommercial, 'Each adjacent [commercial]:', {19:1, 20:1, 21:1, 22:1}),
  ),
  new Building('19i', 19, BuildingTypes.park, 'Community Park', 
    new ScoreIfNotAdjacent(isBorder, 'If not adjacent to border:', {19:1, 20:4, 21:9, 22:16}),
    new ScoreIfAnyAdjacent(isBorder, 'If adjacent to border:'    , {19:1, 20:2, 21:3, 22:4 }),
  ),
  new Building('20h', 20, BuildingTypes.house, 'Brick House', 
    new Score('Gain:', {20:2}),
  ),
  new Building('20g', 20, BuildingTypes.unit, 'Block of Units', 
    new Score('Gain:', {20:1}),
    new ScoreForEachAdjacent(is(BuildingTypes.unit), 'Each adjacent [unit]:', {20:1, 21:1, 22:1}),
  ),
  new Building('20a', 20, BuildingTypes.tower, 'Housing Project', 
    new ScoreForEachAdjacent(isCentury(19), 'Each adjacent [19th] century property:', {20:2, 21:2, 22:2}),
  ),
  new Building('20f', 20, BuildingTypes.fancy, 'Gothic House', 
    new Score('Gain:', {20:4, 21:4, 22:4}),
  ),
  new Building('20c', 20, BuildingTypes.commercial, 'Shopping Strip', 
    new ScoreIfNotAdjacent(isBorder, 'If not adjacent to border:', {20:2, 21:1, 22:1}),
    new ScoreForEachAdjacent(isCommercial, 'Each adjacent [commercial]:', {20:1, 21:1, 22:1}),
  ),
  new Building('20i', 20, BuildingTypes.improvement, 'Heritage Status', 
    new OtherText('Improves existing property. Property cannot be replaced or modernized in future.'),
    new Score('Gain:', {20:2, 21:2, 22:2}),
  ),
  new Building('21h', 21, BuildingTypes.house, 'Contemporary House', 
    new Score('Gain:', {21:2}),
  ),
  new Building('21g', 21, BuildingTypes.townhouse, 'Town House', 
    new Score('Gain:', {21:1}),
    new ScoreForEachAdjacent(is(BuildingTypes.townhouse), 'Each adjacent [townhouse]:', {21:1, 22:1}),
  ),
  new Building('21a', 21, BuildingTypes.tower, 'Apartment Tower', 
    new ScoreForEachAdjacent(isCentury(19), 'Each adjacent [19th] century property:', {21:4, 22:4}),
    new ScoreForEachAdjacent(isCentury(20), 'Each adjacent [20th] century property:', {21:2, 22:2}),
  ),
  new Building('21f', 21, BuildingTypes.fancy, 'Neo-futuristic Mansion', 
    new Score('Gain:', {21:6, 22:6}),
    new ScoreForEachAdjacent(isBorder, 'Each adjacent border:', {21:-2, 22:-2}),
    new ScoreForEachAdjacent(is(BuildingTypes.fancy), 'Each adjacent [fancy]:', {21:-2, 22:-2}),
  ),
  new Building('21c', 21, BuildingTypes.commercial, 'Outdoor Mall', 
    new ScoreIfNotAdjacent(isBorder, 'If not adjacent to border:', {21:2, 22:1}),
    new ScoreForEachAdjacent(isCommercial, 'Each adjacent [commercial]:', {21:1, 22:1}),
  ),
  new Building('21i', 21, BuildingTypes.improvement, 'Modernization', 
    new OtherText('Improves existing property.'),
    new Score('Gain:', {21:3, 22:3}),
  ),
  new Building('22h', 22, BuildingTypes.house, 'Contemporary House', 
    new ScoreIf(isWater, 'If in water:', {22:3}),
    new ScoreIf(isLand, 'If on land:', {22:2}),
  ),
  new Building('22g', 22, BuildingTypes.marina, 'Marina Community', 
    new ScoreIf(isWater, 'If in water:', {22:1}),
    new ScoreForEachAdjacent(is(BuildingTypes.marina), 'Each adjacent [marina]:', {22:1}),
    new ScoreIfAnyAdjacent(isOcean, 'If adjacent to open ocean:', {22:1}),
  ),
  new Building('22a', 22, BuildingTypes.farm, 'Kelp Farm', 
    new ScoreIf(isWater, 'If in water:', {22:2}),
    new ScoreForEachAdjacent(isVacantWater, 'Each adjacent vacant water:', {22:4}),
  ),
  new Building('22f', 22, BuildingTypes.fancy, 'Submersible Estate', 
    new ScoreIf(isWater, 'If in water:', {22:6}),
    new ScoreForEachAdjacent(isWater, 'Each adjacent water:', {22:2}),
  ),
  new Building('22c', 22, BuildingTypes.commercial, 'Trading Hub', 
    new ScoreIf(isWater, 'If in water:', {22:2}),
    new ScoreForEachAdjacent(isCommercial, 'Each adjacent [commercial]:', {22:1}),
  ),
  new Building('22i', 22, BuildingTypes.improvement, 'Environmental Retrofit', 
    new OtherText('Protects existing property from water damage.'),
    new Score('Gain:', {22:1}),
  ),
].reduce(
  (map, cardMaster) => { map[cardMaster.id] = cardMaster; return map;},
  {} as {[id: string]: Building}
);