export class BuildingType {

  public readonly backColor: string;
  
  public readonly name: string;

  public constructor(name: string, hue: number) {
    this.backColor = `hsl(${hue + 0},60%,70%)`;
    this.name = name;
  }
}

export const BuildingTypes: {[buildingType: string]: BuildingType} = [
  new BuildingType('house'      , 120),
  new BuildingType('farm'       ,   0),
  new BuildingType('tower'      ,   0),
  new BuildingType('cottage'    ,  60),
  new BuildingType('unit'       ,  60),
  new BuildingType('townhouse'  ,  60),
  new BuildingType('marina'     ,  60),
  new BuildingType('fancy'      , 300),
  new BuildingType('commercial' , 240),
  new BuildingType('park'       , 180),
  new BuildingType('improvement', 180),
].reduce(
  (map, buildingType) => { map[buildingType.name] = buildingType; return map;},
  {} as {[buildingType: string]: BuildingType}
);