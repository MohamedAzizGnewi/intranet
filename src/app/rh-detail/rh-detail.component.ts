import { Component, OnInit,ViewChild, Input,ViewEncapsulation  } from '@angular/core';
import {Directory2Service} from "../././_services/directory2.service";
import {FileService} from "../././_services/file.service";
import {SharedService} from "../_services/shared.service";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {NewfolderDialogComponent} from "../newfolder-dialog/newfolder-dialog.component";
import {UploadDialogComponent} from "../upload-dialog/upload-dialog.component";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {SubdirectoryService} from "../././_services/subdirectory.service";
import {Subdirectory} from "../_models/subdirectory";
import {MatTable} from '@angular/material/table';
import { PagerSettings } from '@progress/kendo-angular-listview';
import { destinations } from '../shared/destinations';
import {ToolService} from "../_services/tool.service";
import {UpdateToolComponent} from "../update-tool/update-tool.component";
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import {UserinfoService} from "../_services/userinfo.service";
import {TokenStorageService} from "../_services/token-storage.service";
import {ProfileService} from "../_services/profile.service";
import * as fileSaver from 'file-saver';
const is = (fileName: string, ext: string) => new RegExp(`.${ext}\$`).test(fileName);

@Component({
  selector: 'app-rh-detail',
  templateUrl: './rh-detail.component.html',
  styleUrls: ['./rh-detail.component.css']
})
export class RhDetailComponent implements OnInit {

  public pagerSettings: PagerSettings = {
    previousNext: false,
    pageSizeValues: false,
    buttonCount: 9
};
array_url=[];
array_file=[];
array_directory=[];
array_id: any[]=[];

public buttons = [
 
 
];
@Input() change ; 
isadmin:boolean=false;
wait:boolean;
permissions;
  public pageSize = 3;
  item=4;
  selected="directory";
  id=4;
  currentItem = 'Television';
  ELEMENT_DATA: Subdirectory[]=[];
  fileAction=false;
modal1: any = {
  folder: null,
  subfolder: null
};
 checked;

displayedColumns: string[] = ['select','position','type','name', 'modified', 'size' ];
dataSource = new MatTableDataSource();
selection = new SelectionModel<any>(true, []);
@ViewChild(MatTable) table: MatTable<any>;

@ViewChild(MatPaginator) paginator: MatPaginator;
  public data: any[] = [{
    id: 1,
    name: 'My Documents',
    directorys: [
    {
        id: 1,
        name: "direc1",
        lastUpdate: "2021-06-02 17:01:21",
        size: 0,
        files: [],
        directorys: [],
        permissions: []
    },
  
    {
        id: 4,
        name: "TEST",
        lastUpdate: "2021-06-01 16:46:39",
        size: 0,
        files: [],
        directorys: [],
        permissions: []
    }]
}];
public data3: any[] = [{
    id:1,
    name:"confluence",
    image:"../../assets/images/conf.png",
    link:"https://confluence.newaccess.linkyard-cloud.ch/display/IT/IT-DOCUMENTATION+Home",
    description:'An openconnected structure allows information to flow freely among everyone at the organization',


  },
  {  id:2,
    name:"vpn",
    image:"../../assets/images/vpn.png",
    link:"https://confluence.newaccess.linkyard-cloud.ch/display/IT/IT-DOCUMENTATION+Home",
     description:'A Virtual Private Network is a secure tunnel within a network (especially the Internet). It allows information to be exchanged securely and anonymously using an IP address different from that of your computer',

  },
  {  id:3,
    name:"sharepoint",
    image:"../../assets/images/sharepoint.png",
    link:"https://newaccess.sharepoint.com",
     description:'SharePoint is a series of software for web applications and portals developed by Microsoft. The functionalities of SharePoint products are content management, search engines, electronic document management, forums, the ability to create forms and decision-making statistics1.',

  },
  {  id:4,
    name:"jira",
    image:"../../assets/images/jira.png",
    link:"https://jira.newaccess.linkyard-cloud.ch/secure/Dashboard.jspa",
     description:'Jira is a bug tracking system, incident management system, and project management system developed by Atlassian.',

  },
  {  id:6,
    name:"glpi",
    image:"../../assets/images/glpi.png",
    link:"https://glpi.newaccess.ch/",
     description:'GLPI (Gestionnaire Libre de Parc Informatique)2 est un logiciel libre de gestion des services informatiques (ITSM) et de gestion des services',

  },
  
  {  id:7,
    name:"amt",
    image:"../../assets/images/management-removebg-preview.png",
    link:"http://emeagvasv05/ApsysManagementTool//login/LdapIdentification/index.php",
     description:'APSYS Management Tool is a software designed to facilitate project management work, automate backup tasks and / or time management',

  },
  {  id:8,
    name:"intranet",
    image:"../../assets/images/intranet2.png",
    link:"http://chgbcint03/dashboard.php",
     description:'APSYS INTRANET ',

  },
 ];
public data1: any[] = [{
id: 1,
name: 'My Documents',
directorys: [
    {
        name: 'Kendo UI Project',
        directorys: [
            { name: 'about.html' },
            { name: 'index.html' },
            { name: 'logo.png' }
        ]
    },
    {
        name: 'New Web Site',
        directorys: [
            { name: 'mockup.jpg' },
            { name: 'Research.pdf' }
        ]
    },
    {
        name: 'Reports',
        directorys: [
            { name: 'February.pdf' },
            { name: 'March.pdf' },
            { name: 'April.pdf' }
        ]
    }
]
}];
  constructor(public profileService:ProfileService,public tokenStorageService :TokenStorageService,public userinfoService:UserinfoService,private directoryService: Directory2Service,public sharedsevice: SharedService,public dialog: MatDialog,private fileService: FileService, private route: ActivatedRoute,private router: Router,private subdirectoryService: SubdirectoryService,private toolService:ToolService) { }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  closefileaction() {
    this.fileAction=false;
  }
  public selectedChange(e, btn) {
    console.log(btn);
    this.getSubdirectorys(btn.id);
  }
  openDialogUpload():void {
    const dialogRef = this.dialog.open(UploadDialogComponent, {
      data: {selected: this.selected,id:this.id},
   
    });
    dialogRef.afterClosed().subscribe(
      
      val => {
        console.log(val)
    

 
   const data = {
     
    name_directory: "val.name_directory",
    permission_requests: val.permission_requests,
   
  };
  console.log(data);
    
    this.fileService.create(val.file,data,this.id).subscribe(
    response => {
      console.log(response);
      this.getDirectorys(this.item);
      this.getSubdirectorys(this.id);
     
    },
    error => {
      console.log(error);
    }


  );
    
    
    
    


    
  }





      
    
  );
  }
  f1() {
    this.id=1;
  }
  openDialogNewFolder(): void {
    const dialogRef = this.dialog.open(NewfolderDialogComponent, {
      data: {selected: this.selected,id:this.id},
     
    });
    dialogRef.afterClosed().subscribe(
      
      val => {
        console.log(val)
    

 
   const data = {
    name_directory: val.name_directory,
    permission_requests: val.permission_requests,
   
  };
    
    this.directoryService.create(data,this.id).subscribe(
    response => {
      console.log(response);
       this.getDirectorys(this.item);
       this.getSubdirectorys(this.id)
     
    },
    error => {
      console.log(error);
    }


  );  
  }    
  );

}
openDialogeditTool(id) {
  console.log(id);
 
  const dialogRef = this.dialog.open(UpdateToolComponent, {
    data: {id:this.id},
    width: '25%',
  });
  dialogRef.afterClosed().subscribe(
      
    val => {
      console.log(val)
  


 const data = val.link;
  
  this.toolService.update2(this.id,id,data).subscribe(
  response => {
    console.log(response);
    this.getTools(this.item);
   
  },
  error => {
    console.log(error);
  }

 
);  
}    
);
}
downloadFile() {
  console.log(this.selection.selected);
   for (var val of this.selection.selected) {
     
     this.array_id.push(val.id);
   }  
     for (var val of this.array_id) {
     this.getFile(val);
   }
  
    this.array_id=[];
  
 
 
 
 
 
 
 
 
 }   
 getFile(item) {
 
  this.fileService.getFile(item)
    .subscribe(
      data => {
        console.log(data);
      
         
          const b64Data=data.base64;
          console.log(b64Data);
             const byteCharacters = atob(b64Data);
             const byteNumbers = new Array(byteCharacters.length);
             for (let i = 0; i < byteCharacters.length; i++) {
                 byteNumbers[i] = byteCharacters.charCodeAt(i);
             }
          
             const byteArray = new Uint8Array(byteNumbers)
           
             
               const blob = new Blob([byteArray], { type: data.type  });
              /* const url= window.URL.createObjectURL(blob);*/
               
               fileSaver.saveAs(blob, data.name);
               /*window.open(url, '_blank');*/
       
       
    
       
        
        
      
      
     
        },
      
      error => {
        console.log(error);
      });
    
     
     
  }

  getDirectorys(item) {
    this.directoryService.getAll3(item)
      .subscribe(
        data => {
          let permission=this.permissions - 1
          if(!this.isadmin) {
            for (var val of data ) {
              let array=[];
              
              for (var val2 of val.directorys ) {
                var sortedArray: any[] = val2.permissions.sort((n1,n2) => n1.id - n2.id);
               if(sortedArray[permission].permission==1)
               {  console.log("true")
                 array.push(val2)
               }
               val["directoryss"]=array;
  
              } 
  
            }
             this.data=data;
             this.buttons.push(  { text: "Away", icon: "k-i-clock", color: "#f0c505",id:this.data[0].id });
          }
          else {
            for (var val of data ) {
              let array=[];
              for (var val2 of val.directorys ) {
           
             
                 array.push(val2)
         
              
  
            
  
            }  
             this.data=data;
          }
      
          console.log(data);
          
          }},
        error => {
          console.log(error);
        });
     
          
    }

    

    getCategories(item) {
      this.directoryService.getAll3(item)
        .subscribe(
          data => {
             this.data1=data;
            console.log(data);
            },
          error => {
            console.log(error);
          });
       
            
      }
  getTools(item) {
    this.toolService.getAll2(item)
    .subscribe(
      data => {
        this.data3=data;
        console.log(data);
        },
      error => {
        console.log(error);
      });
  }

getProfile() {
  this.profileService.getProfile().subscribe(
      response => {
        console.log(response);
       
        this.userinfoService.getUser2(response.mail).subscribe((data) => {
          console.log(data);
          if(data.roles[0].name=='ROLE_RH')
          {
            this.isadmin=true;
          }
          else {
            this.isadmin=false;
          }
          this.permissions=data.departement.id;

          this.getDirectorys(this.item);
          this.getTools(this.item);
         
         
          
         
        });
       
      },
      error => {
        console.log(error);
      }
  
    
    );
}
  ngOnInit(): void {
      this.getProfile();
     console.log("solution"+this.item);
    
   
      let numbercaroussel ;
      numbercaroussel=this.data3.length/3;
      console.log(numbercaroussel);
      
  }
  ngOnChanges() {
 
    
   
    this.getTools(this.item);
  }
  openNewPage(link) {
    window.open( 
      link, "_blank");
     
  

}
  public handleSelection({ dataItem }: any): void {
    console.log(dataItem.id);
    this.id=dataItem.id;
    if(this.isadmin) {
      this.getSubdirectorys2(dataItem.id);
      this.selection.clear();
    }
    else {
      this.getSubdirectorys(dataItem.id);
      this.selection.clear();
    }
   


  
    
   
  }

  iconClass({ name, directorys }: any): any {
    return {
        'k-i-file-pdf': is(name, 'pdf'),
        'k-i-folder': directorys !== undefined,
        'k-i-html': is(name, 'html'),
        'k-i-image': is(name, 'jpg|png'),
        'k-icon': true
    };
}


getSubdirectorys(id) {
  
  let i=1;
  let permission=this.permissions - 1
  this.directoryService.getDirectorys(id)
           
    .subscribe(
      data => {
       console.log(data);
        let array1=[];
        for (var val of data ) {
          var sortedArray: any[] = val.permissions.sort((n1,n2) => n1.id - n2.id);
    
           if(sortedArray[permission].permission==1)
           {  
            array1.push(val)
           }
         

       

        }
        let array=[];
        for (var val of array1) {  
          array.push({"id":val.id,"position":i,"name":val.name,"logo":"../../assets/images/folder.png",type:"folder","lastUpdate":val.lastUpdate,"size":val.size});
          i++;
        }
        
        this.directoryService.getFiles(id)
        .subscribe(
          
          data => {
            let array1=[];
            let array2=[];
            let files=[];
            for (var val of data ) {
              var sortedArray: any[] = val.permissions.sort((n1,n2) => n1.id - n2.id);
        
               if(sortedArray[permission].permission==1)
               {  
                files.push(val)
               }
             
      
           
    
            }
            for (var val of files) {
              var ext =  val.name.split('.').pop();
              if((ext=="docx")||(ext=="dotx"))
              {array1.push({"id":val.id,"position":i,"name":val.name,"logo":"../../assets/images/word2.png","type":"file","lastUpdate":new Date (val.lastUpdate).getDate()+"/"+new Date (val.lastUpdate).getMonth()+"/"+new Date (val.lastUpdate).getFullYear(),"size":val.size});
              i++;
            
            }
              else if(ext==="pdf")
              {
                array1.push({"id":val.id,"position":i,"name":val.name,"logo":"../../assets/images/pfd.png","type":"file","lastUpdate":new Date (val.lastUpdate).getDate()+"/"+new Date (val.lastUpdate).getMonth()+"/"+new Date (val.lastUpdate).getFullYear(),"size":val.size});
                i++;
              }
              else if(ext==="xlsx") {
                array1.push({"id":val.id,"position":i,"name":val.name,"logo":"../../assets/images/excel2.png","type":"file","lastUpdate":new Date (val.lastUpdate).getDate()+"/"+new Date (val.lastUpdate).getMonth()+"/"+new Date (val.lastUpdate).getFullYear(),"size":val.size});
                i++;
              }
              else if(ext==="pptx") {
                array1.push({"id":val.id,"position":i,"name":val.name,"logo":"../../assets/images/powerpoint2.png","type":"file","lastUpdate":new Date (val.lastUpdate).getDate()+"/"+new Date (val.lastUpdate).getMonth()+"/"+new Date (val.lastUpdate).getFullYear(),"size":val.size});
                i++;
              }
              else if(ext==="png") {
                array1.push({"id":val.id,"position":i,"name":val.name,"logo":"../../assets/images/image.png","type":"file","lastUpdate":new Date (val.lastUpdate).getDate()+"/"+new Date (val.lastUpdate).getMonth()+"/"+new Date (val.lastUpdate).getFullYear(),"size":val.size});
                i++;
              }
            }
            array2 = array.concat(array1);
            this.dataSource.data=array2;
            console.log(this.dataSource.data);
         
     
            },
          
          error => {
            console.log(error);
          });
        },
      
      error => {
        console.log(error);
      });
 
      
  }

  getSubdirectorys2(id) {
  
    let i=1;
  
    this.directoryService.getDirectorys(id)
             
      .subscribe(
        data => {
          console.log(data);
          let array1=[];
          for (var val of data ) {
           
      
             
              array1.push(val)
         
           
  
         
  
          }
          let array=[];
          for (var val of array1) {  
            array.push({"id":val.id,"position":i,"name":val.name,"logo":"../../assets/images/folder.png",type:"folder","lastUpdate":val.lastUpdate,"size":val.size});
            i++;
          }
          
          this.directoryService.getFiles(id)
          .subscribe(
            
            data => {
              let array1=[];
              let array2=[];
             
              for (var val of data) {
                var ext =  val.name.split('.').pop();
                if((ext=="docx")||(ext=="dotx"))
                {array1.push({"id":val.id,"position":i,"name":val.name,"logo":"../../assets/images/word2.png","type":"file","lastUpdate":new Date (val.lastUpdate).getDate()+"/"+new Date (val.lastUpdate).getMonth()+"/"+new Date (val.lastUpdate).getFullYear(),"size":val.size});
                i++;
              
              }
                else if(ext==="pdf")
                {
                  array1.push({"id":val.id,"position":i,"name":val.name,"logo":"../../assets/images/pfd.png","type":"file","lastUpdate":new Date (val.lastUpdate).getDate()+"/"+new Date (val.lastUpdate).getMonth()+"/"+new Date (val.lastUpdate).getFullYear(),"size":val.size});
                  i++;
                }
                else if(ext==="xlsx") {
                  array1.push({"id":val.id,"position":i,"name":val.name,"logo":"../../assets/images/excel2.png","type":"file","lastUpdate":new Date (val.lastUpdate).getDate()+"/"+new Date (val.lastUpdate).getMonth()+"/"+new Date (val.lastUpdate).getFullYear(),"size":val.size});
                  i++;
                }
                else if(ext==="pptx") {
                  array1.push({"id":val.id,"position":i,"name":val.name,"logo":"../../assets/images/powerpoint2.png","type":"file","lastUpdate":new Date (val.lastUpdate).getDate()+"/"+new Date (val.lastUpdate).getMonth()+"/"+new Date (val.lastUpdate).getFullYear(),"size":val.size});
                  i++;
                }
                else if(ext==="png") {
                  array1.push({"id":val.id,"position":i,"name":val.name,"logo":"../../assets/images/image.png","type":"file","lastUpdate":new Date (val.lastUpdate).getDate()+"/"+new Date (val.lastUpdate).getMonth()+"/"+new Date (val.lastUpdate).getFullYear(),"size":val.size});
                  i++;
                }
              }
              array2 = array.concat(array1);
              this.dataSource.data=array2;
              console.log(this.dataSource.data);
              this.wait=false;
       
              },
            
            error => {
              console.log(error);
            });
          },
        
        error => {
          console.log(error);
        });
   
        
    }
list: Array<String> = []; 

file=false;



display(row) {
 
   this.fileAction=true;
  console.log(this.selection.selected);

}
doubleClick(row)
{
 if(row.type==="folder")
{console.log("double"+row.id);
this.dataSource.data=[];
if(this.isadmin) {
  this.getSubdirectorys2(row.id);
  
}
else {
  this.getSubdirectorys(row.id);
  this.buttons.push(  { text: "2", icon: "k-i-clock", color: "#f0c505",id:row.id });
  this.selectedChange(null,this.buttons[this.buttons.length-1])
}
}
else {
  window.open( 
    "/pdf"+"/"+row.id, "_blank");
  
}
}
isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.dataSource.data.length;
  return numSelected === numRows;
}
masterToggle() {
  this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
}
checkboxLabel(row?: Subdirectory): string {
  if (!row) {
    return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
  }
  return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
}

handleMouseOver(row) {
  const position = row.position;
  this.dataSource.data.map((data: any) => {
    if (data.position === position) {
      data.show = true;
    }
  });
}

handleMouseLeave(row) {
  const position = row.position;
  this.dataSource.data.map((data: any) => {
    if (data.position === position) {
      data.show = false;
    }
  });
  
}

addShowCheckboxProperty() {

  this.dataSource.data.map((data: any) => {
    data.show = false
  });
}
applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
delete2(l1,l2) {
  let i1=0;
  let i2=0;
  this.wait=true;
 if(l1==0) {
   for (var val2 of this.array_file) {
             
     this.directoryService.deletefile(val2).subscribe(
       response => {
       
        i2++;
        if(i2==l2)
        { console.log("deleted")
          this.getSubdirectorys2(this.id);
          this.getDirectorys(this.item);
          this.selection.clear();}
        
       },
       error => {
         console.log(error);
       }
   
   
     );
   }
 }
 else {
   for (var val of this.array_directory) {
     this.directoryService.deletedirectory(val).subscribe(
       response => {
         
        i1++;
        if(i1==l1) {
          if(l2==0) {
           this.getSubdirectorys2(this.id);
           this.getDirectorys(this.item);
           this.selection.clear();
          }
          else {
           for (var val2 of this.array_file) {
             
             this.directoryService.deletefile(val2).subscribe(
               response => {
               
                i2++;
                if(i2==l2)
                { console.log("deleted")
                  this.getSubdirectorys2(this.id);
                  this.getDirectorys(this.item);
                  this.selection.clear();}
                
               },
               error => {
                 console.log(error);
               }
           
           
             );
           }
          }
        
        }
        else {
         console.log("passe");
        }
       },
       error => {
         console.log(error);
       }
   
   
     );
   }
 }



 



}  
delete() {
  this.array_file=[];
  this.array_directory=[];

   for (var val of this.selection.selected) {
     
    if(val.type=="file")
    {  
       this.array_file.push(val.id);
     
    }
    else {
   
      this.array_directory.push(val.id);
    }
 
   }

   console.log(this.array_file);
   console.log(this.array_directory);
   let length1=this.array_directory.length;
   let length2=this.array_file.length;
  this.delete2(length1,length2);
  
    
 
 
 
 
 
 
 
 
 }
}
