import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  movies: any;
  page: number = 1;

  constructor(private http: HttpClient, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.loadInitPage();
  }
  loadInitPage() {
    const url = 'https://api.themoviedb.org/3/discover/movie?api_key=fc280acd5be16bfd03a033da11fbe8b8&primary_release_year=2016&sort_by=vote_average.desc&page='+this.page;
    this.http.get(url).subscribe((data) => {
      this.movies = (data as any).results;
    });
  }
  onScroll() {
      this.spinner.show();
      this.page++;
      this.loadNextPage();
  }
  loadNextPage() {
    const url = 'https://api.themoviedb.org/3/discover/movie?api_key=fc280acd5be16bfd03a033da11fbe8b8&primary_release_year=2016&sort_by=vote_average.desc&page='+this.page; 
    this.http.get(url).subscribe((data) => {
      for(let i = 0;i<(data as any).results.length;i++) {    
        this.movies.push((data as any).results[i]);
      }
    });
  }

}
