import { Injectable } from "@angular/core";

@Injectable()
export class OtherService {
    clicked: boolean = false;

    setClicked(bool : boolean){
        this.clicked = bool;
    }
}