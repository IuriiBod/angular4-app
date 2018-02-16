import { Component, OnInit } from '@angular/core';

import { LeadsService } from '../../services/leads.service';

import { Lead } from '../../models/leads.model';

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.css']
})
export class LeadsComponent implements OnInit {
  leads: Lead[];
  filterLeads: Lead[];
  pageLeads: Lead[];
  itemPerPage = 2;
  currentPage = 1;
  pages: number[] = [];
  pageNumbers: number;

  constructor(private leadsService: LeadsService) { }

  ngOnInit() {
    this.leadsService.getLeads().subscribe(leads => this.leads = leads);
    if (this.leads) {
      this.filterLeads = this.leads.slice();
      this.buildPages();
    }
  }

  onSearch(event: any) {
    const value = event.target.value;

    if (!this.leads) {
      return;
    }

    this.filterLeads = this.leads.filter(lead => {
      return lead['email'].indexOf(value) >= 0 ||
             lead['full_name'].indexOf(value) >= 0 ||
             lead['phone'].indexOf(value) >= 0;
    });

    this.currentPage = 1;
    this.buildPages();
  }

  buildPages() {
    this.pages = [];
    this.pageNumbers = this.filterLeads.length / this.itemPerPage;
    let i = 0;

    while (i < this.pageNumbers) {
      this.pages[i] = i + 1;
      i++;
    }

    this.showCurrentPage();
  }

  showCurrentPage() {
    if (!this.filterLeads || this.filterLeads.length === 0) {
      return;
    }

    const start = (this.currentPage - 1 ) * this.itemPerPage;
    const end = start + this.itemPerPage;
    this.pageLeads = this.filterLeads.slice(start, end);
  }

  onSelectPage(page: number) {
    this.currentPage = page;
    this.showCurrentPage();
  }

  onPreviousPage() {
    if (this.currentPage === 1) {
      return;
    } else {
      this.currentPage -= 1;
      this.showCurrentPage();
    }
  }

  onNextPage() {
    if (this.currentPage === this.pageNumbers) {
      return;
    } else {
      this.currentPage += 1;
      this.showCurrentPage();
    }
  }

}
