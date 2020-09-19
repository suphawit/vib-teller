import {
    AfterViewInit,
    Component,
    OnInit,
    ViewChild,
    OnDestroy
} from '@angular/core';

import {Router} from "@angular/router"; 

@Component({
    selector: 'vib-remote',
    templateUrl: './remote.component.html',
    styleUrls: ['./remote.component.sass']
})
export class RemoteComponent implements OnInit , OnDestroy{
 
    ngOnInit(){
        
        //Remote.startSubscript();       
        //$("#remote-container").html("123")
    }

    ngOnDestroy(){

    }
}