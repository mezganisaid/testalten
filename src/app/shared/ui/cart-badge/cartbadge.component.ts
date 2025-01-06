import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit } from '@angular/core';
import {BadgeModule} from 'primeng/badge';


@Component({
  selector: 'app-cartbadge',
  templateUrl: './cartbadge.component.html',
  standalone: true,
  imports: [BadgeModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CartbadgeComponent implements OnInit {
  @Input() qtStock!: string;

  constructor() { }

  ngOnInit(): void {
    console.log(this.qtStock);
  }


}

