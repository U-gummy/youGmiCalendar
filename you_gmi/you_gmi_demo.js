let youGmiCalendar = function (option) {
    Date.prototype.format = function(f) {
        if (!this.valueOf()) return " ";
    
        var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
        var weekNameShort = ["일", "월", "화", "수", "목", "금", "토"];
        var weekNameEng = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
        var d = this;
    
        return f.replace(/(yyyy|yy|MM|dd|EE|E|e|hh|mm|ss|mi|a\/p)/gi, function($1) {
            switch ($1) {
                case "yyyy": return d.getFullYear();
                case "yy": return (d.getFullYear() % 1000).zf(2);
                case "MM": return (d.getMonth() + 1).zf(2);
                case "dd": return d.getDate().zf(2);
                case "E": return weekNameShort[d.getDay()];
                case "EE": return weekName[d.getDay()];
                case "e": return weekNameEng[d.getDay()];
                case "HH": return d.getHours().zf(2);
                case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
                case "mm": return d.getMinutes().zf(2);
                case "ss": return d.getSeconds().zf(2);
                case "mi": return d.getMilliseconds().zf(3);
                case "a/p": return d.getHours() < 12 ? "오전" : "오후";
                default: return $1;
            }
        });
    };
    
    String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
    String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
    Number.prototype.zf = function(len){return this.toString().zf(len);};
    
    
    this.elId = option.elId; 
    if (!this.elId) return false;

    //디폴트
    this.dateStr = new Date(); // 보여지는 기준일 
    this.type = "M"; // 캘린더 타입
    this.selectAble = false; // 달력선택 가능여부
    this.isChangeBtn = false; // 이전다음버튼 유무

    if (option.dateStr) this.dateStr = new Date(option.dateStr); // 보여지는 기준일 
    if (option.type) this.type = option.type; // 캘린더 타입
    if (option.selectAble) this.selectAble = option.selectAble; // 달력선택 가능여부
    if (option.isChangeBtn) this.isChangeBtn = option.isChangeBtn; // 이전다음버튼 유무
   
    // 주 캘린더 마크업 
    this.mkWeekCalenar = function(){
        var weekDateList = this.getWeek();
        var headTxt = weekDateList[0].getMonth()+1;
        var toolbarHtml = ``;
        var tableHtml = ``;
        toolbarHtml += ` <div class="ygm-c-toolbar"><h2>${headTxt}월</h2></div>`;
        tableHtml += `
            <table class="ygm-c-content type-week">
            <thead class="ygm-c-head">
            <tr>
            <th class="cell-day type-week">시간</th>
        `;
        for(var i = 0; i < 7; i++) {
            var day = "";
            if (weekDateList[i].getDay() == 0) day = "일";
            else if (weekDateList[i].getDay() == 1) day = "월";
            else if (weekDateList[i].getDay() == 2) day = "화";
            else if (weekDateList[i].getDay() == 3) day = "수";
            else if (weekDateList[i].getDay() == 4) day = "목";
            else if (weekDateList[i].getDay() == 5) day = "금";
            else if (weekDateList[i].getDay() == 6) day = "토";
            tableHtml += `<th class="cell-day type-week">${day}</th>`;
        }
        tableHtml += `</tr></thead>
                <tbody class="ygm-c-body">
        `;
        for(var i = 0; i < 24; i++) {
            tableHtml += `<tr>`;
            tableHtml += i < 10 ? `<td>0${i}시</td>` : `<td>${i}시</td>`;
            for (var j = 0; j < 7; j++) {
                tableHtml += `<td></td>`;
            }
            tableHtml += `</tr>`;
        }
        tableHtml += `
                </tbody>
            </table>
        `;
        $("#"+this.elId).append("<div class='ygm-calendar-wrapper'></div>");
        $(".ygm-calendar-wrapper").append("<div class='ygm-calendar-wrap'></div>");
        $(".ygm-calendar-wrap").append(toolbarHtml);
        $(".ygm-calendar-wrap").append("<div class='ygm-c-view-container'></div>");
        $(".ygm-c-view-container").append("<div class='ygm-c-view-box'></div>");
        $(".ygm-c-view-box").append(tableHtml);

    }

    // 월 캘린더 마크업 
    this.mkMonthCalenar = function(){
        var MonthDateList = this.getMonth();
        var headTxt = this.dateStr.getMonth()+1;
        var toolbarHtml = ``;
        var tableHtml = ``;
        var startDay = MonthDateList[0].getDay();
        var length = MonthDateList.length-1;
        var endDay = 6 - (MonthDateList[length].getDay());
        var total = startDay + length + endDay;
        if(this.isChangeBtn) { //이전다음버튼 true  
            toolbarHtml += `<div class="ygm-c-toolbar">
                                <button type="button" class="btn-change prev">이전</button>
                                <h2 class="title">${headTxt}</h2>
                                <button type="button" class="btn-change next">다음</button>
                            </div>
            `;
        } else {
            toolbarHtml += `<div class="ygm-c-toolbar"><h2 class="title">${headTxt}</h2></div>`;
        }
        tableHtml += `
            <table class="ygm-c-content type-month">
                <thead class="ygm-c-head"> 
                    <tr>
        `;
        for(var i = 0; i < 7; i++) {
            var day = "";
            if (MonthDateList[i].getDay() == 0) day = "일";
            else if (MonthDateList[i].getDay() == 1) day = "월";
            else if (MonthDateList[i].getDay() == 2) day = "화";
            else if (MonthDateList[i].getDay() == 3) day = "수";
            else if (MonthDateList[i].getDay() == 4) day = "목";
            else if (MonthDateList[i].getDay() == 5) day = "금";
            else if (MonthDateList[i].getDay() == 6) day = "토";
            tableHtml += `<th class="cell-day type-month">${day}</th>`;
        }
        tableHtml += `</tr></thead><tbody class="ygm-c-body">`;
        for (var i = 0; i <= total; i++) {
            var calcIdx = i - startDay;
            if (i == 0 || i % 7 == 0) {
                tableHtml += MonthDateList[calcIdx] ? `<tr><td class="cell-day type-month" date="${MonthDateList[calcIdx].format('yyyy-MM-dd')}">${MonthDateList[calcIdx].getDate()}</td>` : `<tr><td class="cell-day type-month"></td>`;
            } else {
                tableHtml += MonthDateList[calcIdx] ? `<td class="cell-day type-month" date="${MonthDateList[calcIdx].format('yyyy-MM-dd')}">${MonthDateList[calcIdx].getDate()}</td>` : `<td class="cell-day type-month"></td>`;
                if(i != 0 & i % 7 == 6 ) {
                    tableHtml += `</tr>`;
                }
            }
        }
        tableHtml += `</tbody></table>`;
        $("#"+this.elId).append("<div class='ygm-calendar-wrapper'></div>");
        $(".ygm-calendar-wrapper").append("<div class='ygm-calendar-wrap'></div>");
        $(".ygm-calendar-wrap").append(toolbarHtml);
        $(".ygm-calendar-wrap").append("<div class='ygm-c-view-container'></div>");
        $(".ygm-c-view-container").append("<div class='ygm-c-view-box'></div>");
        $(".ygm-c-view-box").append(tableHtml);

    }

    // 해당일의 주
    this.getWeek = function(){
        var weekArr  = [];
        var y = this.dateStr.getFullYear();
        var m = this.dateStr.getMonth();
        var d = this.dateStr.getDate(); 
        var day = this.dateStr.getDay();
        var weekD = d - day;
        for (var i = 0; i < 7; i++) {
            var wDate = new Date(y,m,weekD+i)
            weekArr.push(wDate);
        }
        return weekArr;
    }

    // 해당일의 월
    this.getMonth = function(){
        var monthArr  = [];
        var y = this.dateStr.getFullYear();
        var m = this.dateStr.getMonth();
        var monthLastDay =  new Date(y,m+1,0).getDate();  
        for (var i = 1; i <= monthLastDay; i++) { 
            var mDate = new Date(y,m,i)
            monthArr.push(mDate);
        }
        return monthArr;
    }

    // 달력 선택 함수
    this.selectEvent = function(){
        $(document).on("click",".cell-day",function(){
            if($(this).hasClass("event-active") || $(this).text() == "") {
                $(this).removeClass("event-active")
            } else {
                $(this).addClass("event-active")
            }
        });
    }

    //선택한 일자 모두 가져오기 return type Date
    this.getSelectedDate = function(){
        var dayArr = []; 
        $(".cell-day.event-active").each(function(i,item){
            dayArr.push($(item).attr("date"));
        });
        console.log('dayArr: ', dayArr);
        return dayArr;
    }
    //이벤트 등록 
    this.addEvent = function(event){
        var tempThis = this;
        $(".cell-day").each(function(i,item){
            var html = ``;
            if($(item).attr("date") == event.date) {
                html += `<span class="event-badge" data-event='${JSON.stringify(event)}'>${event.title}</span>`;
                if (tempThis.type == "W") {
                    $(item).find(".remarks").append(html);
                }else {
                    $(item).append(html);
                }
            }
        })

    };
     //해당날짜의 이벤트 조회 return type Array Date
     this.getEvent = function(eventDate){
         var eventList = [];
        $(".event-badge").each(function(i,item){ 
            var event = JSON.parse($(item).attr("data-event"));
            if(eventDate == event.date){
                eventList.push(event);
            }
        });
        console.log("eventList",eventDate,eventList);
     }

     //모든 이벤트 조회 return type Array Date
     this.getAllEvent = function(){
        var eventAllList = [];
       $(".event-badge").each(function(i,item){
           var event = JSON.parse($(item).attr("data-event"));
           eventAllList.push(event);
       });
       console.log("eventAllList",eventAllList);
    }

    this.Eventbind = function(){
        $(document).on("click",".btn-change",function(e){
            if ($(e.target).hasClass("prev")) {
                console.log("prev");
                
            } else if ($(e.target).hasClass("next")) {
                console.log("next");
            }
        }.bind(this))

    }
    //일자 설정
    //설정후에는 자동으로 초기화 되어 해당 일자가 포함된 월이 표기됨
    // this.setDate = function (dateStr){
    //     this.dateStr = dateStr;
    //     this.mkMonthCalenar();
    // }
    // 초기화 함수
    this.init = function(){
        // 달력타입
        if (this.type == "M") this.mkMonthCalenar();
        else if (this.type == "W") this.mkWeekCalenar();
        
        // 달력선택 
        if (this.selectAble) this.selectEvent();

        this.getSelectedDate();
        this.Eventbind(); // 이벤트
    } 

    // //모든 이벤트 조회 return type Array<Date>
    // this.getAllEvent();
    // //지정 일자 이벤트 조회 return type eventObject
    // this.getEvent("2019-05-20");

    // /*EVENTS*/
    // //일자를 선택 할 때 콜백
    // this.onSelected(function (date) {
    //     console.log(date)
    // });
    // //일자를 선택 해제 할 때 콜백
    // this.onUnselected(function (date) {
    //     console.log(date)
    // });



    this.init();

};
