export class TrainingPrograms{
  constructor(
    public id: string,
    public title: string,
    public date: string,
    public description: string,
    public availability: string[],
    public venue: string,
    public email: string){}
}
