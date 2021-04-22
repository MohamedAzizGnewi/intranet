import { Component, OnInit } from '@angular/core';

 

import {FormGroup, FormControl} from '@angular/forms';

 

@Component({

 

  selector: 'app-home',

 

  templateUrl: './home.component.html',

 

  styleUrls: ['./home.component.css']

 

})

 

export class HomeComponent implements OnInit {

  class:string;

  class_like:string="btn button-like col-4";

  class_event:string="btn btn-default btn-lg col-sm-6 col-lg-4 button-event ml-2";

  nombre_click_like=0;

 checkbox = {Online: true};

 show_comment=false;

 credentials = {actuality: 'actuality', event: '',comment:''};

 

  values: any[] = [

 

    {value: 'public', viewValue: ' public'},

 

    {value: 'Tunis', viewValue: 'Tunis'},

 

    {value: 'France', viewValue: 'France'},

 

    {value: 'Singapour', viewValue: 'Singapour'},

 

    {value: 'Genéve', viewValue: 'Genéve'},

 

  ];

 

  images: any[] = [

 

    {

 

      "number": 0,

 

      "src": '../../../assets/images/h.jfif',

 

      "alt": 'First slide',

 

      "style":"none"

 

    },

 

    {

 

      "number": 1,

 

      "src": '../../../assets/images/t.jpg',

 

      "alt": 'Second slide',

 

      "style":"none"

 

    },

 

    {

 

      "number": 2,

 

      "src": '../../../assets/images/wom.jpg',

 

      "alt": 'Third slide',

 

      "style":"none"

 

    },

 

    {

 

      "number": 3,

 

      "src": '../../../assets/images/p.jpg',

 

      "alt": 'Fourth slide',

 

      "style":"none"

 

    },

 

  

 

  ];

 

  current=0;

 

  constructor() { }




  ngOnInit(): void {

   

 

  }

  add_event() {

    this.class_event="btn btn-default btn-lg col-4 button-event ml-2 button-event-click";

  }

  comment() {

    this.show_comment=true;

  }

  like() {

    this.nombre_click_like=this.nombre_click_like+1;

    if(this.nombre_click_like%2==0) {

      

      this.class_like="btn btn-default btn-lg col-4 button-like";

    }

    else {

      this.class_like="btn btn-default btn-lg col-4 button-like-click ";

    }

   

  }

  keyPress() {

    console.log("keyPress");

    var text = document.getElementById('text');

    text.style.height = "5px";

    text.style.height = (text.scrollHeight)+"px";

 

  }

  ngDoCheck(): void {

    if(this.credentials.actuality=="actuality")

    {this.class="row container-post";}

    else if (this.credentials.actuality=="event")

    {

      this.class= "row container-post2"

    }

 

  }

  range = new FormGroup({

 

    start: new FormControl(),

 

    end: new FormControl()

 

  });

 

 plusSlides() {

 

  var j;

 

  var slideIndex = this.current+1;

 

  var lenght=this.images.length;

 

  if (slideIndex > lenght-1) {slideIndex = 0}

 

  for (j = 0; j < lenght; j++) {

 

    this.images[j].style = "none";}

 

    this.images[slideIndex].style = "block";

 

    this.current=slideIndex;




  }

 

  moinsSlides() {

 

    var j;

 

    var slideIndex = this.current-1;

 

    var lenght=this.images.length;

 

    if (slideIndex <0 ) {slideIndex = lenght-1}

 

    for (j = 0; j < lenght; j++) {

 

      this.images[j].style = "none";}

 

      this.images[slideIndex].style = "block";

 

      this.current=slideIndex;

 

  

 

    }

 

  




  display(i) {

 

    

 

    console.log(i);

 

    var j;

 

    var slideIndex = i;

 

    var lenght=this.images.length

 

    for (j = 0; j < lenght; j++) {

 

      this.images[j].style = "none";

 

     }

 

     console.log("oko");

 

  this.images[i].style = "block";

 

  console.log("okeeeo");

 

  this.current=slideIndex;

 

  console.log("rrrrrrr");




  }

 

  selectFile(event) {

 

    console.log("rr0"+event.target.files.item(0));

 

  }

 

  onSubmit() {

 

    console.log(this.credentials.actuality);

 

  }

 

}