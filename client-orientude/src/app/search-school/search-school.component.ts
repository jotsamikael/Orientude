import { Component, OnInit } from '@angular/core';
import { School } from '../types';
import { UniversityService } from '../university.service';

@Component({
  selector: 'app-search-school',
  templateUrl: './search-school.component.html',
  styleUrls: ['./search-school.component.scss']
})
export class SearchSchoolComponent implements OnInit {

  constructor(private universityService: UniversityService) { }
  searchInputValue: string;
  searchResults: School[];

  ngOnInit(): void {
    this.universityService.getSchools();
  }



}
