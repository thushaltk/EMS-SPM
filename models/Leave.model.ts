export class Leave{
    constructor(
      public id: string,
      public empID: string,
      public time: string,
      public startDate: string,
      public endDate: string,
      public reason: string,
      public status: string){}
  }
  