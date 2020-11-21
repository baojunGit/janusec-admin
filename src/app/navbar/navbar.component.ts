import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ApplicationService } from '../application.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logoPath: string;
  personIcon: string;
  
  constructor(
    public applicationService: ApplicationService,
    private http: HttpClient,
    private router: Router) {    
    this.logoPath = 'assets/images/logo.png';
    this.personIcon = 'assets/images/person_1x.png';
   }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  ngOnInit() {
    var lang = localStorage.getItem('lang');
    if(lang==null && navigator.language.indexOf('zh')>-1) {
        localStorage.setItem('lang', 'zh-cn');
        window.location.reload();
    }
  }

  switchLanguage() {    
    var lang = localStorage.getItem('lang');
    if(lang==null ||lang=="" || lang=="en") {
      localStorage.setItem('lang', 'zh-cn');
    } else {
      localStorage.setItem('lang', 'en');
    }
    window.location.reload();
  }

  logout() {
    const body={action: 'logout'};  
    let self=this;
    this.applicationService.getResponse('logout',function(){
      //
    },null,null);
    self.applicationService.auth_user={
      user_id:0, 
      username:"",
      passwd:"",
      logged:false, 
      is_super_admin:false, 
      is_cert_admin:false, 
      is_app_admin:false,
      need_modify_pwd:false
    };
    self.router.navigate(['/login']);
  }

}
