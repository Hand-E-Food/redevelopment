export class Century {

  public readonly backColor: string;

  public readonly number: number;

  public readonly text: string;
  
  public readonly textColor: string;
  
  public constructor(number: number, text: string, hue: number, light: boolean) {
    this.backColor = `hsl(${hue + 21},70%,${light ? 70 : 30}%)`;
    this.number = number;
    this.textColor = light ? 'black' : 'white';
  }
}

export const Centuries: {[number: number]: Century} = [
  new Century(19, '19th',   0, true ),
  new Century(20, '20th', 120, true ),
  new Century(21, '21st', 240, true ),
  new Century(22, '22nd', 180, false),
  new Century(23, '23rd',  60, false),
  new Century(24, '24th', 300, false),
].reduce(
  (map, century) => { map[century.number] = century; return map;},
  {} as {[number: number]: Century}
);