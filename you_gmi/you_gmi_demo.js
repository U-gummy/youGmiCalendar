

let youGmiCalendar = function (option) {

    this.elId = option.elId;
    if (!this.elId) return false;

    this.dateStr = new Date(option.dateStr);
    this.type = option.type;
 
    // 주 캘린더 마크업 
    this.mkWeekCalenar = function(){
        var weekDateList = this.getWeek();
        var headTxt = weekDateList[0].getMonth()+1; // 확인이 필요하지요 (몇월 몇번쨰 주 를 써야할까 .... )
        var toolbarHtml = ``;
        var tableHtml = ``;
        toolbarHtml += ` <div class="ygm-c-toolbar"><h2>${headTxt}월</h2></div>`;
        tableHtml += `
            <table class="ygm-c-content type-week">
                <tbody class="ygm-c-body">
        `;
        for (var i = 0; i < weekDateList.length; i++) {
            var day = "";
            if (weekDateList[i].getDay() == 0) day = "일";
            else if (weekDateList[i].getDay() == 1) day = "월";
            else if (weekDateList[i].getDay() == 2) day = "화";
            else if (weekDateList[i].getDay() == 3) day = "수";
            else if (weekDateList[i].getDay() == 4) day = "목";
            else if (weekDateList[i].getDay() == 5) day = "금";
            else if (weekDateList[i].getDay() == 6) day = "토";
            tableHtml += `
                <tr>
                    <th class="cell-day type-week">${day}</th>
                    <td class="cell-day type-week">${weekDateList[i].getDate()}일</td>
                    <td></td>
                </tr>
            `;
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
        toolbarHtml += ` <div class="ygm-c-toolbar"><h2>${headTxt}</h2></div>`;
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
                tableHtml += MonthDateList[calcIdx] ? `<tr><td class="cell-day type-month">${MonthDateList[calcIdx].getDate()}</td>` : `<tr><td class="cell-day type-month"></td>`;
            } else {
                tableHtml += MonthDateList[calcIdx] ? `<td class="cell-day type-month">${MonthDateList[calcIdx].getDate()}</td>` : `<td class="cell-day type-month"></td>`;
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
    this.init = function(){
        if (this.type == "M") this.mkMonthCalenar();
        else if (this.type == "W") this.mkWeekCalenar();
    } 
    // //선택한 일자 모두 가져오기 return type Date
    // this.getSelectedDate();
    // //이벤트 등록 return type void
    // this.setEvent({
    //     date: "2019-05-20",
    //     desc: "생일"
    // });6
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
