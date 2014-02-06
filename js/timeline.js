/*
 * Project:     Eventure Web App
 * Date:        Jan, 8 2013
 * Description  Timeline Prototype
 * Author:      Jeff Shoemaker
 */

//DATA FOR TIMELINE HOVER LAYER BULLET
var dateImages = {
   '2012-09-22' : {image:[
                  {id:'1',caption:'This is the test caption here'},
                  {id:'2',caption:'This is the test caption here'},
                  {id:'total',caption:'12'}
         ]
   },
   '2012-10-01' : {image:[
                  {id:'3',caption:'This is the test caption here'},
                  {id:'4',caption:'This is the test caption here'},
                  {id:'total',caption:'3'}
         ]
   },
   '2012-10-05' : {image:[
                  {id:'5',caption:'This is the test caption here'},
                  {id:'6',caption:'This is the test caption here'},
                  {id:'total',caption:'11'}
         ]
   },
   '2012-10-07' : {image:[
                  {id:'7',caption:'This is the test caption here'},
                  {id:'8',caption:'This is the test caption here'},
                  {id:'total',caption:'18'}
         ]
   },
   '2012-10-11' : {image:[
                  {id:'9',caption:'This is the test caption here'},
                  {id:'10',caption:'This is the test caption here'},
                  {id:'total',caption:'23'}
         ]
   },
   '2012-10-14' : {image:[
                  {id:'11',caption:'This is the test caption here'},
                  {id:'12',caption:'This is the test caption here'},
                  {id:'total',caption:'20'}
         ]
   },
   '2012-10-22' : {image:[
                  {id:'13',caption:'This is the test caption here'},
                  {id:'14',caption:'This is the test caption here'},
                  {id:'total',caption:'23'}
         ]
   },
   '2012-10-28' : {image:[
                  {id:'15',caption:'This is the test caption here'},
                  {id:'16',caption:'This is the test caption here'},
                  {id:'total',caption:'23'}
         ]
   },
   '2012-11-06' : {image:[
                  {id:'17',caption:'This is the test caption here'},
                  {id:'18',caption:'This is the test caption here'},
                  {id:'total',caption:'7'}
         ]
   },
   '2012-11-13' : {image:[
                  {id:'19',caption:'This is the test caption here'},
                  {id:'20',caption:'This is the test caption here'},
                  {id:'total',caption:'16'}
         ]
   },
   '2012-11-17' : {image:[
                  {id:'21',caption:'This is the test caption here'},
                  {id:'22',caption:'This is the test caption here'},
                  {id:'total',caption:'2'}
         ]
   },
   '2012-11-21' : {image:[
                  {id:'23',caption:'This is the test caption here'},
                  {id:'24',caption:'This is the test caption here'},
                  {id:'total',caption:'9'}
         ]
   },
   '2012-11-26' : {image:[
                  {id:'25',caption:'This is the test caption here'},
                  {id:'26',caption:'This is the test caption here'},
                  {id:'total',caption:'12'}
         ]
   },
   '2012-12-02' : {image:[
                  {id:'27',caption:'This is the test caption here'},
                  {id:'28',caption:'This is the test caption here'},
                  {id:'total',caption:'11'}
         ]
   },
   '2012-12-06' : {image:[
                  {id:'29',caption:'This is the test caption here'},
                  {id:'30',caption:'This is the test caption here'},
                  {id:'total',caption:'17'}
         ]
   },
   '2012-12-16' : {image:[
                  {id:'31',caption:'This is the test caption here'},
                  {id:'32',caption:'This is the test caption here'},
                  {id:'total',caption:'5'}
         ]
   },
   '2012-12-19' : {image:[
                  {id:'33',caption:'This is the test caption here'},
                  {id:'34',caption:'This is the test caption here'},
                  {id:'total',caption:'32'}
         ]
   },
   '2012-12-31' : {image:[
                  {id:'35',caption:'This is the test caption here'},
                  {id:'36',caption:'This is the test caption here'},
                  {id:'total',caption:'39'}
         ]
   },
   '2013-01-01' : {image:[
                  {id:'37',caption:'This is the test caption here'},
                  {id:'38',caption:'This is the test caption here'},
                  {id:'total',caption:'8'}
         ]
   }
};



//CACHE RE-USED PAGE DOM OBJECTS ONLOAD
var Cache = function() {
  $_div_timeline = $('#hover_layer');
};


//TIMELINE FUNCTIONS
var Timeline = (function()
{

    var obj = {}

    //HOVER HTML TEMPLATE
    obj.html = '';

    //ACTIVE HOVER LAYER
    obj.active = '';

    obj.bulletClick = function(data) 
    {
        //NOT USED
    };

    //WHEN THE TIMELINE IS ZOOMED, KILL HOVER LAYER
    obj.scaled = function(data)
    {
        if($('.popover').is(':visible')) { $_div_timeline.popover('destroy'); }
    };
    obj.rolledOverBullet = function(data)
    {
        var x = data.chart.mouseX - 10;
        var y = data.chart.mouseY - 10;
        var numEvents = data.item.values.value;
        var inMonth = data.item.dataContext.date;
        var formatted = inMonth.getMonth()+1+'/'+inMonth.getFullYear();

        var monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
           "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

        var dateString = inMonth.getFullYear() + '-'
             + ('0' + (inMonth.getMonth()+1)).slice(-2) + '-' + ('0' + (inMonth.getDate())).slice(-2);

        var boxDate = monthNames[inMonth.getMonth()]+' '+('0' + (inMonth.getDate())).slice(-2)+', '+inMonth.getFullYear();

        //IF LAYER IS ALREADY UP FOR PASSED IN DATE, EXIT=
        if(dateString===obj.active && $('.popover').is(':visible')) { return; }

        //KILL EXISTING LAYER
        $_div_timeline.popover('destroy');

        //SET THE ACTIVE DATE LAYER
        obj.active = dateString;

        //GET IMAGES TO SHOW FROM dateImages JSON OBJECT BASED ON PASSED DATA DATE
        var jsonImages = dateImages[dateString];
        var thumbHtml = '';
        var loopCount = 0;
        for (var key in jsonImages.image) { 

          if(jsonImages.image[key].id != 'total') {
              thumbHtml+= '<li class="thumb" title="'+jsonImages.image[key].caption+'" period="'+dateString+'">'+
                      '<img src="'+jsonImages.image[key].id+'.jpg"></li>';
					
          }
          else {
             thumbHtml += '<li class="thumb">'+
                          '<span><ins class="date">'+ boxDate +'</ins><ins class="number">'+jsonImages.image[key].caption+'</ins>'+
                          '<ins class="type">PHOTOS</ins></span></li>';
             break;
          }

          loopCount++; if(loopCount > 2) { break; }
        }
        //POPULATE HTML TEMPLATE WITH ABOVE VALUES
        var imageHTML = obj.html;
        imageHTML = imageHTML.replace('%%THUMBS%%', thumbHtml);

        $_div_timeline.css({'top':y+'px','left':x+'px'});
        $_div_timeline.popover({
                html:true,
                content: imageHTML,
                placement : function (tip, element) {
                    var offset = $(element).offset();
                    height = $(document).outerHeight();
                    width = $(document).outerWidth();
                    vert = 0.5 * height - offset.top;
                    vertPlacement = vert > 0 ? 'bottom' : 'top';
                    horiz = 0.5 * width - offset.left;
                    horizPlacement = horiz > 0 ? 'right' : 'left';
                    placement = Math.abs(horiz) > Math.abs(vert) ?  horizPlacement : vertPlacement;
                    return placement;
              }
        });
        $_div_timeline.popover('show');
    };
    
    return obj;
})();



//EVENT LISTENERS
$(function() {
  Cache(); //CACHE RE-USED PAGE DOM OBJECTS

  //CLOSE TIMELINE HOVER LAYER ON X CLICK
 /* $('button.close').live('click', function() { 
      $_div_timeline.popover('destroy');
  }); */

  //SET TIMELINE HOVER HTML
  Timeline.html = $('#timeline_hover_html').html();  

  //HIDE AMCHARTS TEXT
  setTimeout(function() { $('#chartdiv').find('tspan:last').text('');}, 500);


   //CUSTOM DROPDOWN LISTENRS
   $('.dropdown-menu li').click(function(evt) {
      var
        $obj = $(evt.target),
        $ul = $obj.closest('ul'),
        $li = $obj.closest('li'),
        index = $ul.children('li').index($li);
		
        if(index==-1) { return; }
        if(index==0) {
           $('a.dropdown-toggle').html(' Photos <span class="caret"></span>');
           $_div_timeline.popover('destroy');
           zoomChart();
        }
        else {
           $('a.dropdown-toggle').html(' Videos <span class="caret"></span>');
           $_div_timeline.popover('destroy');
           zoomChart();
        }
   });

   //HOVER LAYER CLICK LISTENER
   /*$('.popover').live('click',function(evt) {
       var $obj = $(evt.target);
       if($obj.is('button')) { return; }
       alert("call javascript function Timeline.viewDate('"+Timeline.active+"'); ");
   });*/

});