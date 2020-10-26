import { Component, OnInit } from '@angular/core';
import { PositionService } from '../data/position.service';
import { Position } from '../data/position';
import { Router } from '@angular/router';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {
  
  positions: Position[];
  getPositionsSub: any;
  loadingError: boolean = false;

  constructor(private p: PositionService, private router: Router) { }

  ngOnInit() {
    this.getPositionsSub = this.p.getPositions().subscribe(data => {
      this.positions = data
    },
    function(p){
      this.loadingError = true;
    })
  }

  routePosition(id: string) {
    this.router.navigate(['/position/', id]);
  }

  ngOnDestroy(){
    if(this.getPositionsSub != "undefined") this.getPositionsSub.unsubscribe();
  }
}
