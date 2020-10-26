import { Component, OnInit } from '@angular/core';
import { PositionService } from '../data/position.service';
import { Position } from '../data/position';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {
  
  positions: Position[];
  getPositionsSub: any;
  loadingError: boolean = false;

  constructor(private p: PositionService) { }

  ngOnInit() {
    this.getPositionsSub = this.p.getPositions().subscribe(data => {
      this.positions = data
    },
    function(p){
      this.loadingError = true;
    })
  }

  ngOnDestroy(){
    if(this.getPositionsSub != "undefined") this.getPositionsSub.unsubscribe();
  }

}
