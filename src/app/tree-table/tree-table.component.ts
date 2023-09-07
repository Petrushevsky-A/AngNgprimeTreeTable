import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';

import { single } from 'itertools-ts';

import { HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.css']
})
export class TreeTableComponent implements OnInit {
  sales!: TreeNode[];
  colspan_price!: number;
  price_column!: string[];
  years!: string[];
  months!: string[];
  days!: string[];
  column_name_price!: Map<string, string>;
  unpuck_name_price!: string[];
  unpack_name_year!: Map<string, string>;
  count_column_price!:number;
  unpack_name_month!:Map<string, string>;
  unpack_name_day!:Map<string, string>;
  constructor(private http: HttpClient){}
  getData(url: string){
    return this.http.get(url)
  }
  ngOnInit() {
    let name_column: Map<string, string> = new Map<string, string>();
    name_column.set('total_price', 'Сумма общая');
    name_column.set('smr_price', 'Сумма СМР');
    name_column.set('pir_price', 'Сумма ПИР');
    name_column.set('oto_price', 'Сумма ОТО');
    name_column.set('other_price', 'Сумма прочее');

    let baseUrl: string = 'http://127.0.0.1:8000/'
    let pk: number = 2

    let frequency: Map<string, string> = new Map<string, string>();
    frequency.set('year', 'YEARLY');
    frequency.set('month', 'MONTHLY');
    frequency.set('day', 'DAILY');


    this.price_column = ["total_price", "pir_price"]

    let url: string = `${baseUrl}/budget/get_transposed_budget/?pk=${pk}&frequency=${frequency.get('year')}&fields_price=(${this.price_column})`

    this.getData(url).subscribe({next: (data: any) => (
        this.sales = data['data'],
        this.colspan_price = data['colspan_price'],
        this.column_name_price = data['column_name_price'],
        this.unpuck_name_price = data['unpuck_name_price'],
        this.unpack_name_year = data['unpack_name_year'],
        this.unpack_name_month = data['unpack_name_month'],
        this.unpack_name_day = data['unpack_name_day']
      )});

  }
}

