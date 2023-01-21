import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $(document).ready(function(){
            
            
            
        
        var down = false;
        
        $('#bell').click(function(e){
          
            var color = $(this).text();
            if(down){
                
                $('#box').css('height','0px');
                $('#box').css('opacity','0');
                down = false;
            }else{
                
                $('#box').css('height','auto');
                $('#box').css('opacity','1');
                down = true;
                
            }
            
        });
            
            });
  }

}
 