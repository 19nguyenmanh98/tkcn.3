var tenPTBN, v_tk, phuongtien_hh1; 
var phuongtien_hh;
var lat_do, lat_phut, chiso_lat;
var long_do, long_phut, chiso_long;
var lat_do_ttk, lat_phut_ttk, chiso_lat_ttk;
var long_do_ttk, long_phut_ttk, chiso_long_ttk;
var h_gio, v_gio, h_dong, v_dong;
var ss, lantk;
var outputText;
        
        function validate() {
            // get the input
            v_tk = document.forms["input_form"]["v_tkterm"].value;//tốc độ tìm kiếm (M/h)
            phuongtien_hh1 = document.forms["input_form"]["phuongtien_hh1term"].value;//phương tiện hàng hải phương tiện tìm kiếm
            muctieu_tk = document.forms["input_form"]["muctieu_tkterm"].value;//Loại mục tiêu tìm kiếm
            phuongtien_hh = document.forms["input_form"]["phuongtien_hhterm"].value;//phương tiện hàng hải phương tiện bị nạn
            lat_do = document.forms["input_form"]["lat_doterm"].value;//độ LAT
            lat_phut = document.forms["input_form"]["lat_phutterm"].value;//phút LAT
            chiso_lat = document.forms["input_form"]["chiso_latterm"].value;//N hoặc S
            long_do = document.forms["input_form"]["long_doterm"].value;//độ LONG
            long_phut = document.forms["input_form"]["long_phutterm"].value;//phút LONG
            chiso_long = document.forms["input_form"]["chiso_longterm"].value;//E hoặc W
            lat_do_ttk = document.forms["input_form"]["lat_do_ttkterm"].value;//độ LAT (tàu tìm kiếm)
            lat_phut_ttk = document.forms["input_form"]["lat_phut_ttkterm"].value;//phút LAT
            chiso_lat_ttk = document.forms["input_form"]["chiso_lat_ttkterm"].value;//N hoặc S
            long_do_ttk = document.forms["input_form"]["long_do_ttkterm"].value;//độ LONG
            long_phut_ttk = document.forms["input_form"]["long_phut_ttkterm"].value;//phút LONG
            chiso_long_ttk = document.forms["input_form"]["chiso_long_ttkterm"].value;//E hoặc W
            h_gio = document.forms["input_form"]["h_gioterm"].value;//hướng gió (độ)
            v_gio = document.forms["input_form"]["v_gioterm"].value;//vận tốc gió (M/h)
            h_dong = document.forms["input_form"]["h_dongterm"].value;//hướng dòng (độ)
            v_dong = document.forms["input_form"]["v_dongterm"].value;//vận tốc dòng (M/h)
            lantk = document.forms["input_form"]["lantkterm"].value;//số lần tìm kiếm
            ss = document.forms["input_form"]["ssterm"].value;//sai số trôi dạt (12.5-33%)

            if (lat_do >90 || lat_do <0 || lat_do_ttk >90 || lat_do_ttk <0){
                alert ('Lỗi nhập số liệu: Giá trị độ của vĩ độ phải có giá trị từ 0÷90 (độ) (N hoặc S)! Đồng chí hãy vui lòng kiểm tra và nhập lại số liệu!');
            } else if (lat_phut >60 || lat_phut <0 || lat_phut_ttk >60 || lat_phut_ttk <0){
                alert ('Lỗi nhập số liệu: Giá trị phút của vĩ độ phải có giá trị từ 0÷60 (phút)! Đồng chí hãy vui lòng kiểm tra và nhập lại số liệu!');
            }else if (long_do >180 || long_do <0 || long_do_ttk >180 || long_do_ttk <0){
                alert ('Lỗi nhập số liệu: Giá trị độ của kinh độ phải có giá trị từ 0÷180 (độ) (E hoặc W)! Đồng chí hãy vui lòng kiểm tra và nhập lại số liệu!');
            } else if (long_phut >60 || long_phut <0 || long_phut_ttk >60 || long_phut_ttk <0){
                alert ('Lỗi nhập số liệu: Giá trị phút của kinh độ phải có giá trị từ 0÷60 (phút)! Đồng chí hãy vui lòng kiểm tra và nhập lại số liệu!');
            } else if (ss < 12.5 || ss > 33 ){
                alert ('Lỗi nhập số liệu: Sai số trôi dạt có giá trị từ 12.5÷33 (%)! Đồng chí hãy vui lòng kiểm tra và nhập lại số liệu!');
            } else {

            // loại mục tiêu tìm kiếm
            switch (muctieu_tk) {
                case "Người rơi xuống nước" : {
                    var k=0.011;
                    var hc=0.07;
                    var goclech=30;
                    break;
                }case "Người rơi xuống nước thẳng đứng" : {
                    var k=0.005;
                    var hc=0.07;
                    var goclech=18;
                    break;
                }case "Người rơi xuống nước tư thế ngồi" : {
                    var k=0.012;
                    var hc=0;
                    var goclech=18;
                    break;
                }case "Người rơi xuống nước nằm ngang, mặc đồ cứu sinh" : {
                    var k=0.014;
                    var hc=0.10;
                    var goclech=30;
                    break;
                }case "Người rơi xuống nước nằm ngang, mặc đồ lặn" : {
                    var k=0.007;
                    var hc=0.08;
                    var goclech=30;
                    break;
                }case "Người rơi xuống nước đã chết" : {
                    var k=0.015;
                    var hc=0.08;
                    var goclech=30;
                    break;
                }case "Xuồng cứu sinh không có hệ thống balát" : {
                    var k=0.042;
                    var hc=0.03;
                    var goclech=28;
                    break;
                }case "Xuồng cứu sinh không balát, không mái che, không neo nổi" : {
                    var k=0.057;
                    var hc=0.21;
                    var goclech=24;
                    break;
                }case "Xuồng cứu sinh không balát, không mái che, có neo nổi" : {
                    var k=0.044;
                    var hc=-0.20;
                    var goclech=28;
                    break;
                }case "Xuồng cứu sinh không balát, có mái che, không neo nổi" : {
                    var k=0.037;
                    var hc=0.11;
                    var goclech=24;
                    break;
                }case "Xuồng cứu sinh không balát, có mái che, có neo nổi" : {
                    var k=0.03;
                    var hc=0;
                    var goclech=28;
                    break;
                }case "Xuồng cứu sinh hệ thống balát nông và có mái che" : {
                    var k=0.029;
                    var hc=0;
                    var goclech=22;
                    break;
                }case "Xuồng cứu sinh hệ thống balát nông, có mái che, không neo nổi" : {
                    var k=0.032;
                    var hc=-0.02;
                    var goclech=22;
                    break;
                }case "Xuồng cứu sinh hệ thống balát nông, có mái che, có neo nổi" : {
                    var k=0.025;
                    var hc=0.01;
                    var goclech=22;
                    break;
                }case "Xuồng cứu sinh hệ thống balát nông, có mái che, bị lật" : {
                    var k=0.017;
                    var hc=-0.1;
                    var goclech=8;
                    break;
                }case "Xuồng cứu sinh hệ thống balát sâu và có mái che" : {
                    var k=0.03;
                    var hc=0.02;
                    var goclech=13;
                    break;
                }case "Xuồng nhỏ" : {
                    var k=0.038;
                    var hc=-0.08;
                    var goclech=22;
                    break;
                }case "Xuồng cứu sinh của USCG" : {
                    var k=0.025;
                    var hc=-0.04;
                    var goclech=7;
                    break;
                }case "Xuồng cứu sinh hàng không, không balát, có neo nổi (4-6 người)" : {
                    var k=0.037;
                    var hc=0.11;
                    var goclech=24;
                    break;
                }case "Xuồng cứu sinh hàng không, không balát, có neo nổi (46 người)" : {
                    var k=0.028;
                    var hc=-0.01;
                    var goclech=15;
                    break;
                }case "Xuồng chèo biển có người" : {
                    var k=0.011;
                    var hc=0.24;
                    var goclech=15;
                    break;
                }case "Xuồng chèo tay ván lướt có người" : {
                    var k=0.02;
                    var hc=0;
                    var goclech=15;
                    break;
                }case "Xuồng chèo tay ván buồm có người" : {
                    var k=0.023;
                    var hc=0.1;
                    var goclech=12;
                    break;
                }case "Thuyền buồm, một thân, đáy liền, mớn nước sâu" : {
                    var k=0.03;
                    var hc=0;
                    var goclech=48;
                    break;
                }case "Thuyền buồm, một thân, đáy cánh, mớn nước nông" : {
                    var k=0.04;
                    var hc=0;
                    var goclech=48;
                    break;
                }case "Thuyền máy-xuồng nhỏ, đáy bằng" : {
                    var k=0.034;
                    var hc=0.4;
                    var goclech=22;
                    break;
                }case "Thuyền máy-xuồng nhỏ, đáy chữ V, ĐK chuẩn" : {
                    var k=0.03;
                    var hc=0.08;
                    var goclech=15;
                    break;
                }case "Thuyền máy-xuồng nhỏ, đáy chữ V, ngập nước" : {
                    var k=0.017;
                    var hc=0;
                    var goclech=15;
                    break;
                }case "Thuyền máy-xuồng thể thao, cabin trước" : {
                    var k=0.069;
                    var hc=-0.08;
                    var goclech=19;
                    break;
                }case "Thuyền máy-xuồng câu cá thể thao, cabin giữa" : {
                    var k=0.06;
                    var hc=-0.09;
                    var goclech=22;
                    break;
                }case "Thuyền đánh cá thương mại" : {
                    var k=0.037;
                    var hc=0.02;
                    var goclech=48;
                    break;
                }case "Thuyền máy ba lá" : {
                    var k=0.04;
                    var hc=0;
                    var goclech=48;
                    break;
                }case "Thuyền máy kéo lưới phía sau" : {
                    var k=0.042;
                    var hc=0;
                    var goclech=48;
                    break;
                }case "Thuyền máy lưới dài" : {
                    var k=0.037;
                    var hc=0;
                    var goclech=48;
                    break;
                }case "Thuyền máy lưới đan" : {
                    var k=0.04;
                    var hc=0.01;
                    var goclech=33;
                    break;
                }case "Thuyền máy ghe mành" : {
                    var k=0.027;
                    var hc=0.1;
                    var goclech=48;
                    break;
                }case "Thuyền máy vận tải ven biển" : {
                    var k=0.028;
                    var hc=0;
                    var goclech=48;
                    break;
                }case "Các mảnh ván vỡ của tàu cá" : {
                    var k=0.02;
                    var hc=0;
                    var goclech=10;
                    break;
                }case "Thùng đựng đá 1m3" : {
                    var k=0.013;
                    var hc=0.27;
                    var goclech=31;
                    break;
                }case "Thùng đựng đá 1m3, chất không đầy" : {
                    var k=0.026;
                    var hc=0.18;
                    var goclech=15;
                    break;
                }case "Thùng đựng đá 1m3, chất đầy" : {
                    var k=0.016;
                    var hc=0.16;
                    var goclech=33;
                    break;
                }
            }
            //sai số vị trí tàu bị nạn (x)
            switch (phuongtien_hh) {
                case "GPS" : {
                    var x = 0.1;
                    break;
                }case "Radar" : {
                    var x = 1;
                    break;
                }case "Quan sát địa văn" : {
                    var x = 1;
                    break;
                }case "Quan sát thiên văn" : {
                    var x = 2;
                    break;
                }case "Phao vô tuyến hàng hải" : {
                    var x = 4;
                    break;
                }case "LORAN C" : {
                    var x = 1;
                    break;
                }case "Tàu Hải quân, tàu ngầm Hải quân" : {
                    var x = 5;
                    break;
                }case "Tàu biển" : {
                    var x = 10;
                    break;
                }
            }
            // sai số vị trí của tàu tìm kiếm (Y)
            switch (phuongtien_hh1) {
                case "GPS" : {
                    var y = 0.1;
                    break;
                }case "Radar" : {
                    var y = 1;
                    break;
                }case "Quan sát địa văn" : {
                    var y = 1;
                    break;
                }case "Quan sát thiên văn" : {
                    var y = 2;
                    break;
                }case "Phao vô tuyến hàng hải" : {
                    var y = 4;
                    break;
                }case "LORAN C" : {
                    var y = 1;
                    break;
                }case "Tàu Hải quân, tàu ngầm Hải quân" : {
                    var y = 5;
                    break;
                }case "Tàu biển" : {
                    var y = 10;
                    break;
                }
            }
            // hiệu chỉnh lat_do (tàu bị nạn)
            switch (chiso_lat) {
                case "N" : {
                    var lat_do_hieuchinh = lat_do;
                    var lat_phut_hieuchinh = lat_phut;
                    break;
                }case "S" : {
                    var lat_do_hieuchinh = -lat_do;
                    var lat_phut_hieuchinh = -lat_phut;
                    break;
                }
            }
            //hiệu chỉnh long_do (tàu bị nạn)
            switch (chiso_long){
                case "E" : {
                    var long_do_hieuchinh = long_do;
                    var long_phut_hieuchinh = long_phut;
                    break;
                }case "W" : {
                    var long_do_hieuchinh = -long_do;
                    var long_phut_hieuchinh = -long_phut;
                    break;
                }
            }
            // hiệu chỉnh lat_do (tàu tìm kiếm)
             switch (chiso_lat_ttk) {
                case "N" : {
                    var lat_do_ttk_hieuchinh = lat_do_ttk;
                    var lat_phut_ttk_hieuchinh = lat_phut_ttk;
                    break;
                }case "S" : {
                    var lat_do_ttk_hieuchinh = -lat_do_ttk;
                    var lat_phut_ttk_hieuchinh = -lat_phut_ttk;
                    break;
                }
            }
            //hiệu chỉnh long_do (tàu tìm kiếm)
            switch (chiso_long_ttk){
                case "E" : {
                    var long_do_ttk_hieuchinh = long_do_ttk;
                    var long_phut_ttk_hieuchinh = long_phut_ttk;
                    break;
                }case "W" : {
                    var long_do_ttk_hieuchinh = -long_do_ttk;
                    var long_phut_ttk_hieuchinh = -long_phut_ttk;
                    break;
                }
            }
            // Tính khoảng cách
            var lat_hieu = (lat_do_hieuchinh*60 + lat_phut_hieuchinh/1) - (lat_do_ttk_hieuchinh*60 + lat_phut_ttk_hieuchinh/1);
            var long_hieu = (long_do_hieuchinh*60 + long_phut_hieuchinh/1) - (long_do_ttk_hieuchinh*60 + long_phut_ttk_hieuchinh/1);
            var _S = Math.sqrt(Math.pow(lat_hieu,2)+Math.pow(long_hieu,2));
            var kc = _S;
            //Tính phương vị
            if (long_hieu == 0 && 0 < lat_hieu ) {
                    var _PT_tinhtoan = 0;
                } else if (long_hieu == 0 && 0 > lat_hieu ){
                    var _PT_tinhtoan = 180;
                } else if(lat_hieu  == 0 && 0 < long_hieu){
                    var _PT_tinhtoan = 90;
                } else if(lat_hieu  == 0 && long_hieu < 0) {
                    var _PT_tinhtoan = 270;
                } else if (0 < long_hieu && 0 < lat_hieu ){
                    var _PT_tinhtoan = Math.atan(long_hieu/lat_hieu )*180/Math.PI;
                } else if (0 < long_hieu && 0 > lat_hieu ){
                    var _PT_tinhtoan = Math.atan(-lat_hieu /long_hieu)*180/Math.PI + 90;
                } else if (0 > long_hieu && 0 > lat_hieu ){
                    var _PT_tinhtoan = 270 - Math.atan(-lat_hieu /-long_hieu)*180/Math.PI;
                } else if (0 > x_dattonghop && 0 < lat_hieu ){
                    var _PT_tinhtoan = Math.atan(lat_hieu /-long_hieu)*180/Math.PI + 270;
                }
            var _PT = _PT_tinhtoan;
            //Hệ số an toàn theo các lần tìm kiếm
            switch (lantk) {
                case "1" : {
                    var f = 1.1;
                    break;
                } case "2" : {
                    var f = 1.6;
                    break;
                } case "3" : {
                    var f = 2;
                    break;
                }case "4" : {
                    var f = 2.3;
                    break;
                }case "5" : {
                    var f = 2.5;
                    break;
                }
            }
            //chiếu dòng chảy SC (1)
                if (0 <= h_dong && h_dong <= 90){
                    var x1 = v_dong*Math.sin(h_dong*3.14/180);
                    var y1 = v_dong*Math.cos(h_dong*3.14/180);
                } else if (90 < h_dong && h_dong < 180){
                    var x1 = v_dong*Math.cos((h_dong-90)*3.14/180);
                    var y1 = -v_dong*Math.sin((h_dong-90)*3.14/180);
                } else if (180 <= h_dong && h_dong < 270){
                    var x1 = -v_dong*Math.sin((h_dong-180)*3.14/180);
                    var y1 = -v_dong*Math.cos((h_dong-180)*3.14/180);
                } else if (270 <= h_dong && h_dong < 360){
                    var x1 = -v_dong*Math.cos((h_dong-270)*3.14/180);
                    var y1 = v_dong*Math.sin((h_dong-270)*3.14/180);
                }
            //tính hướng gió ngược
                if (0 <= h_gio && h_gio < 180){
                    var h_gio_nguoc = h_gio/1 + 180;
                } else if (180 <= h_gio && h_gio <= 360){
                    var h_gio_nguoc = h_gio/1 - 180;
                }
            //tính hướng của dòng do gió (WC)
                if (lat_do > 9 && 0 <= lat_phut){
                    var h_dongdogio1 = h_gio_nguoc/1 + 30;
                    var gocdongdogio = 30;
                } else if (lat_do < 10) {
                    var h_dongdogio1 = h_gio_nguoc; 
                    var gocdongdogio = 0;
                }
                if (360 <= h_dongdogio1){
                    var h_dongdogio = h_dongdogio1/1 - 360;
                } else if (0 <= h_dongdogio1 && h_dongdogio1 < 360){
                    var h_dongdogio = h_dongdogio1;
                }
            var v_dongdogio = 0.036*v_gio;// vận tốc dạt dòng do gió
            //chiếu dòng do gió WC (2)
                if (0 <= h_dongdogio && h_dongdogio <= 90){
                    var x2 = v_dongdogio*Math.sin(h_dongdogio*3.14/180);
                    var y2 = v_dongdogio*Math.cos(h_dongdogio*3.14/180);
                } else if (90 < h_dongdogio && h_dongdogio < 180){
                    var x2 = v_dongdogio*Math.cos((h_dongdogio-90)*3.14/180);
                    var y2 = -v_dongdogio*Math.sin((h_dongdogio-90)*3.14/180);
                } else if (180 <= h_dongdogio && h_dongdogio < 270){
                    var x2 = -v_dongdogio*Math.sin((h_dongdogio-180)*3.14/180);
                    var y2 = -v_dongdogio*Math.cos((h_dongdogio-180)*3.14/180);
                } else if (270 <= h_dongdogio && h_dongdogio < 360){
                    var x2 = -v_dongdogio*Math.cos((h_dongdogio-270)*3.14/180);
                    var y2 = v_dongdogio*Math.sin((h_dongdogio-270)*3.14/180);
                }
            //tính TWC (SC+WC)
                var x_TWC = x1 + x2;
                var y_TWC = y1 + y2;
                var v_TWC = Math.sqrt(Math.pow(x_TWC,2)+Math.pow(y_TWC,2));
            // vận tốc dạt do gió
                var v_datgio = k * v_gio + hc/1;
                var v_LW = v_datgio*Math.cos(goclech*3.14/180);
            //chiếu LW (5)
                if (0 <= h_gio_nguoc && h_gio_nguoc <= 90){
                    var x5 = v_LW*Math.sin(h_gio_nguoc*3.14/180);
                    var y5 = v_LW*Math.cos(h_gio_nguoc*3.14/180);
                } else if (90 < h_gio_nguoc && h_gio_nguoc < 180){
                    var x5 = v_LW*Math.cos((h_gio_nguoc-90)*3.14/180);
                    var y5 = -v_LW*Math.sin((h_gio_nguoc-90)*3.14/180);
                } else if (180 <= h_gio_nguoc && h_gio_nguoc < 270){
                    var x5 = -v_LW*Math.sin((h_gio_nguoc-180)*3.14/180);
                    var y5 = -v_LW*Math.cos((h_gio_nguoc-180)*3.14/180);
                } else if (270 <= h_gio_nguoc && h_gio_nguoc < 360){
                    var x5 = -v_LW*Math.cos((h_gio_nguoc-270)*3.14/180);
                    var y5 = v_LW*Math.sin((h_gio_nguoc-270)*3.14/180);
                }
            // Độ dạt tổng hợp (TWC+LW)
                var x_dattonghop = x_TWC + x5;
                var y_dattonghop = y_TWC + y5;
                var v_dattonghop = Math.sqrt(Math.pow(x_dattonghop,2)+Math.pow(y_dattonghop,2));
            // tính hướng dạt tổng hợp
                if (x_dattonghop == 0 && 0 < y_dattonghop ) {
                var h_dattonghop = 0;
                } else if (x_dattonghop == 0 && 0 > y_dattonghop){
                var h_dattonghop = 180;
                } else if(y_dattonghop == 0 && 0 < x_dattonghop){
                var h_dattonghop = 90;
                } else if(y_dattonghop == 0 && x_dattonghop < 0) {
                    var h_dattonghop = 270;
                } else if (0 < x_dattonghop && 0 < y_dattonghop){
                var h_dattonghop = Math.atan(x_dattonghop/y_dattonghop)*180/Math.PI;
                } else if (0 < x_dattonghop && 0 > y_dattonghop){
                    var h_dattonghop = Math.atan(-y_dattonghop/x_dattonghop)*180/Math.PI + 90;
                } else if (0 > x_dattonghop && 0 > y_dattonghop){
                    var h_dattonghop = 270 - Math.atan(-y_dattonghop/-x_dattonghop)*180/Math.PI;
                } else if (0 > x_dattonghop && 0 < y_dattonghop){
                    var h_dattonghop = Math.atan(y_dattonghop/-x_dattonghop)*180/Math.PI + 270;
                }
            var lamtron_hdattonghop = parseFloat(h_dattonghop); var h_dattonghop1 = Math.round(lamtron_hdattonghop * 100)/100;//làm tròn h_dattonghop
            // tính Phương vị ngược
                var _PTnguoc1 = _PT/1 + 180;
            if (_PTnguoc1 > 360){
                var _PTnguoc = _PTnguoc1 - 360;
            } else {
                var _PTnguoc = _PTnguoc1;
            }
                var hieu = Math.abs (_PTnguoc - h_dattonghop)

            // tính thời gian t
            if (hieu != 0 && hieu != 180){
                var kq = "Đón đường xiên góc!";
            } else {
                switch (hieu){
                case 0 :{
                    var kq = "Đón đường đối đầu!";
                    break;
                }case 180 : {
                    var kq = "Đón đường vượt trước!";
                    break;
                } 
                }
            }
            switch (kq) {
                case "Đón đường đối đầu!" :{
                    var t = kc/(v_tk + v_dattonghop);
                    break;
                } case "Đón đường vượt trước!" :{
                    var t = kc/(v_tk-v_dattonghop);
                    break;
                } case "Đón đường xiên góc!":{
                    var t = 2*kc/(2*v_dattonghop*Math.cos(hieu)+Math.sqrt(Math.pow(2*v_dattonghop*Math.cos(hieu),2)-4*(Math.pow(v_dattonghop,2)-Math.pow(v_tk,2))));
                    break;
                }
            }
            // LW trái, LW phải
            var lw_trai1 = h_gio_nguoc/1 - goclech;// hướng Lw trái
            var lw_phai1 = h_gio_nguoc/1 + goclech;// hướng LW phải
            //lấy giá trị dương của LW trái và LW phải
            if (360 <= lw_phai1) {
                var lw_phai = lw_phai1 - 360;
            } else if (0 <= lw_phai1 <360) {
                var lw_phai = lw_phai1;
            }
            if (360 <= lw_trai1) {
                var lw_trai2 = lw_trai1 - 360;
            } else if (0 <= lw_trai1 <360) {
                var lw_trai2 = lw_trai1;
            }
            if (lw_trai2 < 0){
                var lw_trai = lw_trai2 + 360;
            } else if (0 <= lw_trai2){
                var lw_trai = lw_trai2;
            }
            //chiếu LW trái (3)
            if (0 <= lw_trai && lw_trai <= 90){
                var x3 = v_datgio*Math.sin(lw_trai*3.14/180);
                var y3 = v_datgio*Math.cos(lw_trai*3.14/180);
            } else if (90 < lw_trai && lw_trai < 180){
                var x3 = v_datgio*Math.cos((lw_trai-90)*3.14/180);
                var y3 = -v_datgio*Math.sin((lw_trai-90)*3.14/180);
            } else if (180 <= lw_trai && lw_trai < 270){
                var x3 = -v_datgio*Math.sin((lw_trai-180)*3.14/180);
                var y3 = -v_datgio*Math.cos((lw_trai-180)*3.14/180);
            } else if (270 <= lw_trai && lw_trai < 360){
                var x3 = -v_datgio*Math.cos((lw_trai-270)*3.14/180);
                var y3 = v_datgio*Math.sin((lw_trai-270)*3.14/180);
            }
            //chiếu LW phải (4)
            if (0 <= lw_phai && lw_phai <= 90){
                var x4 = v_datgio*Math.sin(lw_phai*3.14/180);
                var y4 = v_datgio*Math.cos(lw_phai*3.14/180);
            } else if (90 < lw_phai && lw_phai < 180){
                var x4 = v_datgio*Math.cos((lw_phai-90)*3.14/180);
                var y4 = -v_datgio*Math.sin((lw_phai-90)*3.14/180);
            } else if (180 <= lw_phai && lw_phai < 270){
                var x4 = -v_datgio*Math.sin((lw_phai-180)*3.14/180);
                var y4 = -v_datgio*Math.cos((lw_phai-180)*3.14/180);
            } else if (270 <= lw_phai && lw_phai < 360){
                var x4 = -v_datgio*Math.cos((lw_phai-270)*3.14/180);
                var y4 = v_datgio*Math.sin((lw_phai-270)*3.14/180);
            }
            // TÍNH BÁN KÍNH VÀ DIỆN TÍCH TÌM KIẾM
            //tính Dt (_Dt) và dt
                var x_Dt = x_TWC + x3;
                var y_Dt = y_TWC + y3;
                var _Dt = Math.sqrt(Math.pow(x_Dt,2)+Math.pow(y_Dt,2)); // chưa nhân thời gian t
                var dt = ss/100 * _Dt * t;
            // tính Dp (_Dp) và dp
                var x_Dp = x_TWC + x4;
                var y_Dp = y_TWC + y4;
                var _Dp = Math.sqrt(Math.pow(x_Dp,2)+Math.pow(y_Dp,2));// chưa nhân thời gian t
                var dp = ss/100 * _Dp * t;
                var _Dtp = 2*v_datgio*t*Math.sin(goclech*3.14/180);//tính Dtp(_Dtp)
                var _De = (dt/1 + dp/1 + _Dtp/1)/2;//tính De (_De)
                var e1 = Math.sqrt(Math.pow(x,2)+Math.pow(y,2)+Math.pow(_De,2));//tính E
                var m = parseFloat(e1); var e = Math.round(m * 1000)/1000;
                var r = Math.ceil(e*f);// tính bán kính KVTK và làm tròn
                var _DT = 4 * Math.pow(r,2); // tính diện tích tìm kiếm

                var s_x_dattonghop = x_dattonghop*t;
                var s_y_dattonghop = y_dattonghop*t;
                 //tính LAT tìm kiếm
            if (0 <= s_y_dattonghop){
                if (lat_do_hieuchinh >= 0){
                    var lat_dotk1 = lat_do_hieuchinh/1 + Math.floor(s_y_dattonghop/60);
                    var lat_phuttk1 = lat_phut/1 + (s_y_dattonghop - Math.floor(s_y_dattonghop/60)*10);
                } else if (lat_do_hieuchinh < 0){
                    var lat_dotk1 = lat_do_hieuchinh/1 + Math.floor(s_y_dattonghop/60);
                    var lat_phuttk1 = lat_phut/1 - (s_y_dattonghop - Math.floor(s_y_dattonghop/60)*10); 
                }
            } else if ( 0 > s_y_dattonghop){
                if (lat_do_hieuchinh >= 0){
                    var lat_dotk1 = lat_do_hieuchinh/1 - Math.floor(-s_y_dattonghop/60);
                    var lat_phuttk1 = lat_phut/1 - (-s_y_dattonghop - Math.floor(-s_y_dattonghop/60)*10);
                } else if (lat_do_hieuchinh < 0){
                    var lat_dotk1 = lat_do_hieuchinh/1 - Math.floor(-s_y_dattonghop/60);
                    var lat_phuttk1 = lat_phut/1 + (-s_y_dattonghop - Math.floor(-s_y_dattonghop/60)*10); 
                }
            }
            // tính toán độ và phút của LAT khi lat_phut>60
            if (lat_do_hieuchinh >=0){
                if (0 > lat_phuttk1){
                    var lat_dotk2 = lat_dotk1 - 1;
                    var lat_phuttk2 = lat_phuttk1/1 + 60;
                } else if ( lat_phuttk1 >= 60){
                    var lat_dotk2 = lat_dotk1 + 1;
                    var lat_phuttk2 = lat_phuttk1 - 60;
                } else {
                    var lat_dotk2 = lat_dotk1;
                    var lat_phuttk2 = lat_phuttk1;
                }
            } else {
                if (0 > lat_phuttk1){
                    var lat_dotk2 = lat_dotk1 + 1;
                    var lat_phuttk2 = lat_phuttk1 + 60;
                } else if (lat_phuttk1 >= 60){
                    var lat_dotk2 = lat_dotk1 - 1;
                    var lat_phuttk2 = lat_phuttk1 -60;
                } else {
                    var lat_dotk2 = lat_dotk1;
                    var lat_phuttk2 = lat_phuttk1;
                }
            } 
            var lamtron_lat_phuttk2 = parseFloat(lat_phuttk2); var lat_phuttk3 = Math.round(lamtron_lat_phuttk2 * 100)/100;
            // lấy độ và chỉ số của LAT tìm kiếm
            if (0 <= lat_dotk2){
                var lat_dotk = lat_dotk2;
                var chiso_lattk = "N";
            } else if (lat_dotk2 < 0){
                var lat_dotk = -lat_dotk2;
                var chiso_lattk = "S";
            }
            //tính LONG tìm kiếm
            if (0 <= s_x_dattonghop){
                if (long_do_hieuchinh >= 0){
                    var long_dotk1 = long_do_hieuchinh/1 + Math.floor(s_x_dattonghop/60);
                    var long_phuttk1 = long_phut/1 + (s_x_dattonghop - Math.floor(s_x_dattonghop/60)*10);
                } else if (long_do_hieuchinh < 0){
                    var long_dotk1 = long_do_hieuchinh/1 + Math.floor(s_x_dattonghop/60);
                    var long_phuttk1 = long_phut/1 - (s_x_dattonghop - Math.floor(s_x_dattonghop/60)*10); 
                }
            } else if ( 0 > s_x_dattonghop){
                if (long_do_hieuchinh >= 0){
                    var long_dotk1 = long_do_hieuchinh/1 - Math.floor(-s_x_dattonghop/60);
                    var long_phuttk1 = long_phut/1 - (-s_x_dattonghop - Math.floor(-s_x_dattonghop/60)*10);
                } else if (long_do_hieuchinh < 0){
                    var long_dotk1 = long_do_hieuchinh/1 - Math.floor(-s_x_dattonghop/60);
                    var long_phuttk1 = long_phut/1 + (-s_x_dattonghop - Math.floor(-s_x_dattonghop/60)*10); 
                }
            }
            // tính toán độ và phút của LONG khi long_phut>60
            if (long_do_hieuchinh >=0){
                if (0 > long_phuttk1){
                    var long_dotk2 = long_dotk1 - 1;
                    var long_phuttk2 = long_phuttk1/1 + 60;
                } else if ( long_phuttk1 >= 60){
                    var long_dotk2 = long_dotk1 + 1;
                    var long_phuttk2 = long_phuttk1 - 60;
                } else {
                    var long_dotk2 = long_dotk1;
                    var long_phuttk2 = long_phuttk1;
                }
            } else {
                if (0 > long_phuttk1){
                    var long_dotk2 = long_dotk1 + 1;
                    var long_phuttk2 = long_phuttk1 + 60;
                } else if (long_phuttk1 >= 60){
                    var long_dotk2 = long_dotk1 - 1;
                    var long_phuttk2 = long_phuttk1 -60;
                } else {
                    var long_dotk2 = long_dotk1;
                    var long_phuttk2 = long_phuttk1;
                }
            } 
            var lamtron_long_phuttk2 = parseFloat(long_phuttk2); var long_phuttk3 = Math.round(lamtron_long_phuttk2 * 100)/100;
            // lấy độ và chỉ số của LONG tìm kiếm
            if (0 <= long_dotk2){
                var long_dotk = long_dotk2;
                var chiso_longtk = "E";
            } else if (long_dotk2 < 0){
                var long_dotk = -long_dotk2;
                var chiso_longtk = "W";
            }
            var s_diem = Math.sqrt(2)*r;
            // TÍNH ĐIỂM A
            var h_A1 = h_dattonghop + 45; // góc A
            if (360 <= h_A1) {
                var h_A = h_A1 - 360;
            } else if (0 <= h_A1 <360) {
                var h_A = h_A1;
            }
            // chiếu A
            if (0 <= h_A && h_A <= 90){
                var xA = s_diem*Math.sin(h_A*3.14/180);
                var yA = s_diem*Math.cos(h_A*3.14/180);
            } else if (90 < h_A && h_A < 180){
                var xA = s_diem*Math.cos((h_A-90)*3.14/180);
                var yA = -s_diem*Math.sin((h_A-90)*3.14/180);
            } else if (180 <= h_A && h_A < 270){
                var xA = -s_diem*Math.sin((h_A-180)*3.14/180);
                var yA = -s_diem*Math.cos((h_A-180)*3.14/180);
            } else if (270 <= h_A && h_A < 360){
                var xA = -s_diem*Math.cos((h_A-270)*3.14/180);
                var yA = s_diem*Math.sin((h_A-270)*3.14/180);
            }
            // tọa độ lat_A
            if (0 <= yA){
                if (lat_dotk2 >= 0){
                    var lat_doA1 = lat_dotk2/1 + Math.floor(yA/60);
                    var lat_phutA1 = lat_phuttk2/1 + (yA - Math.floor(yA/60)*10);
                } else if (lat_dotk2 < 0){
                    var lat_doA1 = lat_dotk2/1 + Math.floor(yA/60);
                    var lat_phutA1 = lat_phuttk2/1 - (yA - Math.floor(yA/60)*10); 
                }
            } else if ( 0 > yA){
                if (lat_dotk2 >= 0){
                    var lat_doA1 = lat_dotk2/1 - Math.floor(-yA/60);
                    var lat_phutA1 = lat_phuttk2/1 - (-yA - Math.floor(-yA/60)*10);
                } else if (lat_dotk2 < 0){
                    var lat_doA1 = lat_dotk2/1 - Math.floor(-yA/60);
                    var lat_phutA1 = lat_phuttk2/1 + (-yA - Math.floor(-yA/60)*10); 
                }
            }
            // tính toán độ và phút của lat_A khi lat_phutA > 60
            if (lat_dotk2 >=0){
                if (0 > lat_phutA1){
                    var lat_doA2 = lat_doA1 - 1;
                    var lat_phutA2 = lat_phutA1/1 + 60;
                } else if ( lat_phutA1 >= 60){
                    var lat_doA2 = lat_doA1 + 1;
                    var lat_phutA2 = lat_phutA1 - 60;
                } else {
                    var lat_doA2 = lat_doA1;
                    var lat_phutA2 = lat_phutA1;
                }
            } else {
                if (0 > lat_phutA1){
                    var lat_doA2 = lat_doA1 + 1;
                    var lat_phutA2 = lat_phutA1 + 60;
                } else if (lat_phutA1 >= 60){
                    var lat_doA2 = lat_doA1 - 1;
                    var lat_phutA2 = lat_phutA1 -60;
                } else {
                    var lat_doA2 = lat_doA1;
                    var lat_phutA2 = lat_phutA1;
                }
            } 
            var lamtron_lat_phutA2 = parseFloat(lat_phutA2); var lat_phutA3 = Math.round(lamtron_lat_phutA2 * 100)/100;
            // lấy độ và chỉ số của lat_A
            if (0 <= lat_doA2){
                var lat_doA = lat_doA2;
                var chiso_latA = "N";
            } else if (lat_doA2 < 0){
                var lat_doA = -lat_doA2;
                var chiso_latA = "S";
            }
            // tọa độ long_A
            if (0 <= xA){
                if (long_dotk2 >= 0){
                    var long_doA1 = long_dotk2/1 + Math.floor(xA/60);
                    var long_phutA1 = long_phuttk2/1 + (xA - Math.floor(xA/60)*10);
                } else if (long_dotk2 < 0){
                    var long_doA1 = long_dotk2/1 + Math.floor(xA/60);
                    var long_phutA1 = long_phuttk2/1 - (xA - Math.floor(xA/60)*10); 
                }
            } else if ( 0 > xA){
                if (long_dotk2 >= 0){
                    var long_doA1 = long_dotk2/1 - Math.floor(-xA/60);
                    var long_phutA1 = long_phuttk2/1 - (-xA - Math.floor(-xA/60)*10);
                } else if (long_dotk2 < 0){
                    var long_doA1 = long_dotk2/1 - Math.floor(-xA/60);
                    var long_phutA1 = long_phuttk2/1 + (-xA - Math.floor(-xA/60)*10); 
                }
            }
            // tính toán độ và phút của long_A khi long_phutA > 60
            if (long_dotk2 >=0){
                if (0 > long_phutA1){
                    var long_doA2 = long_doA1 - 1;
                    var long_phutA2 = long_phutA1/1 + 60;
                } else if ( long_phutA1 >= 60){
                    var long_doA2 = long_doA1 + 1;
                    var long_phutA2 = long_phutA1 - 60;
                } else {
                    var long_doA2 = long_doA1;
                    var long_phutA2 = long_phutA1;
                }
            } else {
                if (0 > long_phutA1){
                    var long_doA2 = long_doA1 + 1;
                    var long_phutA2 = long_phutA1 + 60;
                } else if (long_phutA1 >= 60){
                    var long_doA2 = long_doA1 - 1;
                    var long_phutA2 = long_phutA1 -60;
                } else {
                    var long_doA2 = long_doA1;
                    var long_phutA2 = long_phutA1;
                }
            } 
            var lamtron_long_phutA2 = parseFloat(long_phutA2); var long_phutA3 = Math.round(lamtron_long_phutA2 * 100)/100;
            // lấy độ và chỉ số của long_A
            if (0 <= long_doA2){
                var long_doA = long_doA2;
                var chiso_longA = "E";
            } else if (long_doA2 < 0){
                var long_doA = -long_doA2;
                var chiso_longA = "W";
            }
            // TÍNH ĐIỂM D
            var h_D1 = h_dattonghop + 135; // góc D
            if (360 <= h_D1) {
                var h_D = h_D1 - 360;
            } else if (0 <= h_D1 <360) {
                var h_D = h_D1;
            }
            // chiếu D
            if (0 <= h_D && h_D <= 90){
                var xD = s_diem*Math.sin(h_D*3.14/180);
                var yD = s_diem*Math.cos(h_D*3.14/180);
            } else if (90 < h_D && h_D < 180){
                var xD = s_diem*Math.cos((h_D-90)*3.14/180);
                var yD = -s_diem*Math.sin((h_D-90)*3.14/180);
            } else if (180 <= h_D && h_D < 270){
                var xD = -s_diem*Math.sin((h_D-180)*3.14/180);
                var yD = -s_diem*Math.cos((h_D-180)*3.14/180);
            } else if (270 <= h_D && h_D < 360){
                var xD = -s_diem*Math.cos((h_D-270)*3.14/180);
                var yD = s_diem*Math.sin((h_D-270)*3.14/180);
            }
            // tọa độ lat_D
            if (0 <= yD){
                if (lat_dotk2 >= 0){
                    var lat_doD1 = lat_dotk2/1 + Math.floor(yD/60);
                    var lat_phutD1 = lat_phuttk2/1 + (yD - Math.floor(yD/60)*10);
                } else if (lat_dotk2 < 0){
                    var lat_doD1 = lat_dotk2/1 + Math.floor(yD/60);
                    var lat_phutD1 = lat_phuttk2/1 - (yD - Math.floor(yD/60)*10); 
                }
            } else if ( 0 > yD){
                if (lat_dotk2 >= 0){
                    var lat_doD1 = lat_dotk2/1 - Math.floor(-yD/60);
                    var lat_phutD1 = lat_phuttk2/1 - (-yD - Math.floor(-yD/60)*10);
                } else if (lat_dotk2 < 0){
                    var lat_doD1 = lat_dotk2/1 - Math.floor(-yD/60);
                    var lat_phutD1 = lat_phuttk2/1 + (-yD - Math.floor(-yD/60)*10); 
                }
            }
            // tính toán độ và phút của lat_D khi lat_phutD > 60
            if (lat_dotk2 >=0){
                if (0 > lat_phutD1){
                    var lat_doD2 = lat_doD1 - 1;
                    var lat_phutD2 = lat_phutD1/1 + 60;
                } else if ( lat_phutD1 >= 60){
                    var lat_doD2 = lat_doD1 + 1;
                    var lat_phutD2 = lat_phutD1 - 60;
                } else {
                    var lat_doD2 = lat_doD1;
                    var lat_phutD2 = lat_phutD1;
                }
            } else {
                if (0 > lat_phutD1){
                    var lat_doD2 = lat_doD1 + 1;
                    var lat_phutD2 = lat_phutD1 + 60;
                } else if (lat_phutD1 >= 60){
                    var lat_doD2 = lat_doD1 - 1;
                    var lat_phutD2 = lat_phutD1 -60;
                } else {
                    var lat_doD2 = lat_doD1;
                    var lat_phutD2 = lat_phutD1;
                }
            } 
            var lamtron_lat_phutD2 = parseFloat(lat_phutD2); var lat_phutD3 = Math.round(lamtron_lat_phutD2 * 100)/100;
            // lấy độ và chỉ số của lat_D
            if (0 <= lat_doD2){
                var lat_doD = lat_doD2;
                var chiso_latD = "N";
            } else if (lat_doD2 < 0){
                var lat_doD = -lat_doD2;
                var chiso_latD = "S";
            }
            // tọa độ long_D
            if (0 <= xD){
                if (long_dotk2 >= 0){
                    var long_doD1 = long_dotk2/1 + Math.floor(xD/60);
                    var long_phutD1 = long_phuttk2/1 + (xD - Math.floor(xD/60)*10);
                } else if (long_dotk2 < 0){
                    var long_doD1 = long_dotk2/1 + Math.floor(xD/60);
                    var long_phutD1 = long_phuttk2/1 - (xD - Math.floor(xD/60)*10); 
                }
            } else if ( 0 > xD){
                if (long_dotk2 >= 0){
                    var long_doD1 = long_dotk2/1 - Math.floor(-xD/60);
                    var long_phutD1 = long_phuttk2/1 - (-xD - Math.floor(-xD/60)*10);
                } else if (long_dotk2 < 0){
                    var long_doD1 = long_dotk2/1 - Math.floor(-xD/60);
                    var long_phutD1 = long_phuttk2/1 + (-xD - Math.floor(-xD/60)*10); 
                }
            }
            // tính toán độ và phút của long_D khi long_phutD > 60
            if (long_dotk2 >=0){
                if (0 > long_phutD1){
                    var long_doD2 = long_doD1 - 1;
                    var long_phutD2 = long_phutD1/1 + 60;
                } else if ( long_phutD1 >= 60){
                    var long_doD2 = long_doD1 + 1;
                    var long_phutD2 = long_phutD1 - 60;
                } else {
                    var long_doD2 = long_doD1;
                    var long_phutD2 = long_phutD1;
                }
            } else {
                if (0 > long_phutD1){
                    var long_doD2 = long_doD1 + 1;
                    var long_phutD2 = long_phutD1 + 60;
                } else if (long_phutD1 >= 60){
                    var long_doD2 = long_doD1 - 1;
                    var long_phutD2 = long_phutD1 -60;
                } else {
                    var long_doD2 = long_doD1;
                    var long_phutD2 = long_phutD1;
                }
            } 
            var lamtron_long_phutD2 = parseFloat(long_phutD2); var long_phutD3 = Math.round(lamtron_long_phutD2 * 100)/100;
            // lấy độ và chỉ số của long_D
            if (0 <= long_doD2){
                var long_doD = long_doD2;
                var chiso_longD = "E";
            } else if (long_doD2 < 0){
                var long_doD = -long_doD2;
                var chiso_longD = "W";
            }
            // TÍNH ĐIỂM C
            var h_C1 = h_dattonghop + 225; // góc C
            if (360 <= h_C1) {
                var h_C = h_C1 - 360;
            } else if (0 <= h_C1 <360) {
                var h_C = h_C1;
            }
            // chiếu C
            if (0 <= h_C && h_C <= 90){
                var xC = s_diem*Math.sin(h_C*3.14/180);
                var yC = s_diem*Math.cos(h_C*3.14/180);
            } else if (90 < h_C && h_C < 180){
                var xC = s_diem*Math.cos((h_C-90)*3.14/180);
                var yC = -s_diem*Math.sin((h_C-90)*3.14/180);
            } else if (180 <= h_C && h_C < 270){
                var xC = -s_diem*Math.sin((h_C-180)*3.14/180);
                var yC = -s_diem*Math.cos((h_C-180)*3.14/180);
            } else if (270 <= h_C && h_C < 360){
                var xC = -s_diem*Math.cos((h_C-270)*3.14/180);
                var yC = s_diem*Math.sin((h_C-270)*3.14/180);
            }
            // tọa độ lat_C
            if (0 <= yC){
                if (lat_dotk2 >= 0){
                    var lat_doC1 = lat_dotk2/1 + Math.floor(yC/60);
                    var lat_phutC1 = lat_phuttk2/1 + (yC - Math.floor(yC/60)*10);
                } else if (lat_dotk2 < 0){
                    var lat_doC1 = lat_dotk2/1 + Math.floor(yC/60);
                    var lat_phutC1 = lat_phuttk2/1 - (yC - Math.floor(yC/60)*10); 
                }
            } else if ( 0 > yC){
                if (lat_dotk2 >= 0){
                    var lat_doC1 = lat_dotk2/1 - Math.floor(-yC/60);
                    var lat_phutC1 = lat_phuttk2/1 - (-yC - Math.floor(-yC/60)*10);
                } else if (lat_dotk2 < 0){
                    var lat_doC1 = lat_dotk2/1 - Math.floor(-yC/60);
                    var lat_phutC1 = lat_phuttk2/1 + (-yC - Math.floor(-yC/60)*10); 
                }
            }
            // tính toán độ và phút của lat_C khi lat_phutC > 60
            if (lat_dotk2 >=0){
                if (0 > lat_phutC1){
                    var lat_doC2 = lat_doC1 - 1;
                    var lat_phutC2 = lat_phutC1/1 + 60;
                } else if ( lat_phutC1 >= 60){
                    var lat_doC2 = lat_doC1 + 1;
                    var lat_phutC2 = lat_phutC1 - 60;
                } else {
                    var lat_doC2 = lat_doC1;
                    var lat_phutC2 = lat_phutC1;
                }
            } else {
                if (0 > lat_phutC1){
                    var lat_doC2 = lat_doC1 + 1;
                    var lat_phutC2 = lat_phutC1 + 60;
                } else if (lat_phutC1 >= 60){
                    var lat_doC2 = lat_doC1 - 1;
                    var lat_phutC2 = lat_phutC1 -60;
                } else {
                    var lat_doC2 = lat_doC1;
                    var lat_phutC2 = lat_phutC1;
                }
            } 
            var lamtron_lat_phutC2 = parseFloat(lat_phutC2); var lat_phutC3 = Math.round(lamtron_lat_phutC2 * 100)/100;
            // lấy độ và chỉ số của lat_C
            if (0 <= lat_doC2){
                var lat_doC = lat_doC2;
                var chiso_latC = "N";
            } else if (lat_doC2 < 0){
                var lat_doC = -lat_doC2;
                var chiso_latC = "S";
            }
            // tọa độ long_C
            if (0 <= xC){
                if (long_dotk2 >= 0){
                    var long_doC1 = long_dotk2/1 + Math.floor(xC/60);
                    var long_phutC1 = long_phuttk2/1 + (xC - Math.floor(xC/60)*10);
                } else if (long_dotk2 < 0){
                    var long_doC1 = long_dotk2/1 + Math.floor(xC/60);
                    var long_phutC1 = long_phuttk2/1 - (xC - Math.floor(xC/60)*10); 
                }
            } else if ( 0 > xC){
                if (long_dotk2 >= 0){
                    var long_doC1 = long_dotk2/1 - Math.floor(-xC/60);
                    var long_phutC1 = long_phuttk2/1 - (-xC - Math.floor(-xC/60)*10);
                } else if (long_dotk2 < 0){
                    var long_doC1 = long_dotk2/1 - Math.floor(-xC/60);
                    var long_phutC1 = long_phuttk2/1 + (-xC - Math.floor(-xC/60)*10); 
                }
            }
            // tính toán độ và phút của long_C khi long_phutC > 60
            if (long_dotk2 >=0){
                if (0 > long_phutC1){
                    var long_doC2 = long_doC1 - 1;
                    var long_phutC2 = long_phutC1/1 + 60;
                } else if ( long_phutC1 >= 60){
                    var long_doC2 = long_doC1 + 1;
                    var long_phutC2 = long_phutC1 - 60;
                } else {
                    var long_doC2 = long_doC1;
                    var long_phutC2 = long_phutC1;
                }
            } else {
                if (0 > long_phutC1){
                    var long_doC2 = long_doC1 + 1;
                    var long_phutC2 = long_phutC1 + 60;
                } else if (long_phutC1 >= 60){
                    var long_doC2 = long_doC1 - 1;
                    var long_phutC2 = long_phutC1 -60;
                } else {
                    var long_doC2 = long_doC1;
                    var long_phutC2 = long_phutC1;
                }
            } 
            var lamtron_long_phutC2 = parseFloat(long_phutC2); var long_phutC3 = Math.round(lamtron_long_phutC2 * 100)/100;
            // lấy độ và chỉ số của long_C
            if (0 <= long_doC2){
                var long_doC = long_doC2;
                var chiso_longC = "E";
            } else if (long_doC2 < 0){
                var long_doC = -long_doC2;
                var chiso_longC = "W";
            }
            // TÍNH ĐIỂM B
            var h_B1 = h_dattonghop + 315; // góc B
            if (360 <= h_B1) {
                var h_B = h_B1 - 360;
            } else if (0 <= h_B1 <360) {
                var h_B = h_B1;
            }
            // chiếu B
            if (0 <= h_B && h_B <= 90){
                var xB = s_diem*Math.sin(h_B*3.14/180);
                var yB = s_diem*Math.cos(h_B*3.14/180);
            } else if (90 < h_B && h_B < 180){
                var xB = s_diem*Math.cos((h_B-90)*3.14/180);
                var yB = -s_diem*Math.sin((h_B-90)*3.14/180);
            } else if (180 <= h_B && h_B < 270){
                var xB = -s_diem*Math.sin((h_B-180)*3.14/180);
                var yB = -s_diem*Math.cos((h_B-180)*3.14/180);
            } else if (270 <= h_B && h_B < 360){
                var xB = -s_diem*Math.cos((h_B-270)*3.14/180);
                var yB = s_diem*Math.sin((h_B-270)*3.14/180);
            }
            // tọa độ lat_B
            if (0 <= yB){
                if (lat_dotk2 >= 0){
                    var lat_doB1 = lat_dotk2/1 + Math.floor(yB/60);
                    var lat_phutB1 = lat_phuttk2/1 + (yB - Math.floor(yB/60)*10);
                } else if (lat_dotk2 < 0){
                    var lat_doB1 = lat_dotk2/1 + Math.floor(yB/60);
                    var lat_phutB1 = lat_phuttk2/1 - (yB - Math.floor(yB/60)*10); 
                }
            } else if ( 0 > yB){
                if (lat_dotk2 >= 0){
                    var lat_doB1 = lat_dotk2/1 - Math.floor(-yB/60);
                    var lat_phutB1 = lat_phuttk2/1 - (-yB - Math.floor(-yB/60)*10);
                } else if (lat_dotk2 < 0){
                    var lat_doB1 = lat_dotk2/1 - Math.floor(-yB/60);
                    var lat_phutB1 = lat_phuttk2/1 + (-yB - Math.floor(-yB/60)*10); 
                }
            }
            // tính toán độ và phút của lat_B khi lat_phutB > 60
            if (lat_dotk2 >=0){
                if (0 > lat_phutB1){
                    var lat_doB2 = lat_doB1 - 1;
                    var lat_phutB2 = lat_phutB1/1 + 60;
                } else if ( lat_phutB1 >= 60){
                    var lat_doB2 = lat_doB1 + 1;
                    var lat_phutB2 = lat_phutB1 - 60;
                } else {
                    var lat_doB2 = lat_doB1;
                    var lat_phutB2 = lat_phutB1;
                }
            } else {
                if (0 > lat_phutB1){
                    var lat_doB2 = lat_doB1 + 1;
                    var lat_phutB2 = lat_phutB1 + 60;
                } else if (lat_phutB1 >= 60){
                    var lat_doB2 = lat_doB1 - 1;
                    var lat_phutB2 = lat_phutB1 -60;
                } else {
                    var lat_doB2 = lat_doB1;
                    var lat_phutB2 = lat_phutB1;
                }
            } 
            var lamtron_lat_phutB2 = parseFloat(lat_phutB2); var lat_phutB3 = Math.round(lamtron_lat_phutB2 * 100)/100;
            // lấy độ và chỉ số của lat_B
            if (0 <= lat_doB2){
                var lat_doB = lat_doB2;
                var chiso_latB = "N";
            } else if (lat_doB2 < 0){
                var lat_doB = -lat_doB2;
                var chiso_latB = "S";
            }
            // tọa độ long_B
            if (0 <= xB){
                if (long_dotk2 >= 0){
                    var long_doB1 = long_dotk2/1 + Math.floor(xB/60);
                    var long_phutB1 = long_phuttk2/1 + (xB - Math.floor(xB/60)*10);
                } else if (long_dotk2 < 0){
                    var long_doB1 = long_dotk2/1 + Math.floor(xB/60);
                    var long_phutB1 = long_phuttk2/1 - (xB - Math.floor(xB/60)*10); 
                }
            } else if ( 0 > xB){
                if (long_dotk2 >= 0){
                    var long_doB1 = long_dotk2/1 - Math.floor(-xB/60);
                    var long_phutB1 = long_phuttk2/1 - (-xB - Math.floor(-xB/60)*10);
                } else if (long_dotk2 < 0){
                    var long_doB1 = long_dotk2/1 - Math.floor(-xB/60);
                    var long_phutB1 = long_phuttk2/1 + (-xB - Math.floor(-xB/60)*10); 
                }
            }
            // tính toán độ và phút của long_B khi long_phutB > 60
            if (long_dotk2 >=0){
                if (0 > long_phutB1){
                    var long_doB2 = long_doB1 - 1;
                    var long_phutB2 = long_phutB1/1 + 60;
                } else if ( long_phutB1 >= 60){
                    var long_doB2 = long_doB1 + 1;
                    var long_phutB2 = long_phutB1 - 60;
                } else {
                    var long_doB2 = long_doB1;
                    var long_phutB2 = long_phutB1;
                }
            } else {
                if (0 > long_phutB1){
                    var long_doB2 = long_doB1 + 1;
                    var long_phutB2 = long_phutB1 + 60;
                } else if (long_phutB1 >= 60){
                    var long_doB2 = long_doB1 - 1;
                    var long_phutB2 = long_phutB1 -60;
                } else {
                    var long_doB2 = long_doB1;
                    var long_phutB2 = long_phutB1;
                }
            } 
            var lamtron_long_phutB2 = parseFloat(long_phutB2); var long_phutB3 = Math.round(lamtron_long_phutB2 * 100)/100;
            // lấy độ và chỉ số của long_B
            if (0 <= long_doB2){
                var long_doB = long_doB2;
                var chiso_longB = "E";
            } else if (long_doB2 < 0){
                var long_doB = -long_doB2;
                var chiso_longB = "W";
            }
            // Tính các giá trị phụ
            var s_dongchay1=v_dong*t;
            var lamtron_s_dongchay = parseFloat(s_dongchay1); var s_dongchay = Math.round(lamtron_s_dongchay * 100)/100;
            var s_dongdogio1 = 0.036*v_gio*t;// độ dạt dòng do gió sau t
            var c = parseFloat(s_dongdogio1); var s_dongdogio = Math.round(c * 100)/100;
            var s_datgio1 = t*(k * v_gio + hc/1);//độ dạt do gió
            var a = parseFloat(s_datgio1); var s_datgio = Math.round(a * 100)/100;// làm tròn s_datgio1
            var s_dattonghop = v_dattonghop * t;
            var lamtron_s_dattonghop = parseFloat(s_dattonghop); var s_dattonghop1 = Math.round(lamtron_s_dattonghop*100)/100;// làm tròn s_dattonghop
            var lamtron_t = parseFloat(t); var t1 = Math.round(lamtron_t*100)/100;// làm tròn thời gian trôi dạt t
            var lamtron_v_dattonghop = parseFloat(v_dattonghop); var v_dattonghop1= Math.round(lamtron_v_dattonghop*100)/100;
            var lamtron_v_dongdogio = parseFloat(v_dongdogio); var v_dongdogio1= Math.round(lamtron_v_dongdogio*100)/100;
            var lamtron_v_datgio = parseFloat(v_datgio); var v_datgio1 = Math.round(lamtron_v_datgio*100)/100;
            var lamtron_Dt = parseFloat(_Dt); var _Dt1 = Math.round(lamtron_Dt*100)/100;
            var lamtron_Dp = parseFloat(_Dp); var _Dp1 = Math.round(lamtron_Dp*100)/100;
            var lamtron_dt = parseFloat(dt); var dt1 = Math.round(lamtron_dt*100)/100;
            var lamtron_dp = parseFloat(dp); var dp1 = Math.round(lamtron_dp*100)/100;
            var lamtron_Dtp = parseFloat(_Dtp); var _Dtp1 = Math.round(lamtron_Dtp*100)/100;
            var lamtron_De = parseFloat(_De); var _De1 = Math.round(lamtron_De*100)/100;
            // hiệu chỉnh lat_dotk (tâm tìm kiếm)
            switch (chiso_lattk) {
                case "N" : {
                    var lat_do_tam_hieuchinh = lat_dotk;
                    var lat_phut_tam_hieuchinh = lat_phuttk2;
                    break;
                }case "S" : {
                    var lat_do_tam_hieuchinh = -lat_do_ttk;
                    var lat_phut_tam_hieuchinh = -lat_phuttk2;
                    break;
                }
            }
            // hiệu chỉnh long_dotk (tâm tìm kiếm)
            switch (chiso_longtk) {
                case "E" : {
                    var long_do_tam_hieuchinh = long_do_ttk;
                    var long_phut_tam_hieuchinh = long_phuttk2;
                    break;
                }case "W" : {
                    var long_do_tam_hieuchinh = -long_do_ttk;
                    var long_phut_tam_hieuchinh = -long_phuttk2;
                    break;
                }
            }
            //Tính hướng đón đường
            var lat_hieu_tk = (lat_do_tam_hieuchinh*60 + lat_phut_tam_hieuchinh/1) - (lat_do_ttk_hieuchinh*60 + lat_phut_ttk_hieuchinh/1);
            var long_hieu_tk = (long_do_tam_hieuchinh*60 + long_phut_tam_hieuchinh/1) - (long_do_ttk_hieuchinh*60 + long_phut_ttk_hieuchinh/1);
            // //Tính phương vị
            if (long_hieu_tk == 0 && 0 < lat_hieu_tk ) {
                    var _HT_donduong = 0;
                } else if (long_hieu_tk == 0 && 0 > lat_hieu_tk ){
                    var _HT_donduong = 180;
                } else if(lat_hieu_tk  == 0 && 0 < long_hieu_tk){
                    var _HT_donduong = 90;
                } else if(lat_hieu_tk  == 0 && long_hieu_tk < 0) {
                    var _HT_donduong = 270;
                } else if (0 < long_hieu_tk && 0 < lat_hieu_tk ){
                    var _HT_donduong = Math.atan(long_hieu_tk/lat_hieu_tk )*180/Math.PI;
                } else if (0 < long_hieu_tk && 0 > lat_hieu_tk ){
                    var _HT_donduong = Math.atan(-lat_hieu_tk /long_hieu_tk)*180/Math.PI + 90;
                } else if (0 > long_hieu_tk && 0 > lat_hieu_tk ){
                    var _HT_donduong = 270 - Math.atan(-lat_hieu_tk /-long_hieu_tk)*180/Math.PI;
                } else if (0 > long_hieu_tk && 0 < lat_hieu_tk ){
                    var _HT_donduong = Math.atan(lat_hieu_tk /-long_hieu_tk)*180/Math.PI + 270;
                }
            var lamtron_HTdonduong = parseFloat(_HT_donduong); var _HT_donduong1 = Math.round(lamtron_HTdonduong * 10)/10;

            // hiện thị kết quả
            outputText_PT =_PT + " độ";
            outputText_khoangcach = _S + " M";
            outputText_thoigiantroidat = t1 + " giờ";
            outputText_troidatdongchay = h_dong + " độ; " + s_dongchay + " M";
            outputText_gionguoc = h_gio_nguoc + " độ";
            outputText_gocdongdogio = "+" + gocdongdogio + " độ";
            outputText_dongdogio = h_dongdogio + " độ; "+ v_dongdogio1 + " M/h";
            outputText_troidatdongdogio = h_dongdogio + " độ; " + t1 + " x " + v_dongdogio1  + " = " + s_dongdogio + " M";
            outputText_goclech = "±" + goclech + " độ";
            outputText_LWtrai = "LW trái: " + lw_trai + " độ";
            outputText_LWphai = "LW phải: " + lw_phai + " độ"; 
            outputText_v_datgio = k + " x " + v_gio + " + " + hc + " = "+ v_datgio1 + " M/h";
            outputText_s_datgio = s_datgio + " M";
            outputText_kc_trai = _Dt1 + " M";
            outputText_kc_phai = _Dp1 + " M";
            outputText_dt = dt1 + " M";
            outputText_dp = dp1 + " M";
            outputText_kc_traiphai = _Dtp1 + " M";
            outputText_De = _De1 + " M";
            outputText_ssPTBN = x + " M";
            outputText_ssPTTKCN = y + " M";
            outputText_tongss = e + " M";
            outputText_hesoantoan = f;
            outputText_bankinh = r + " M";
            outputText_dientich = _DT + " hải lý vuông";
            outputText_huongtroidat = h_dattonghop1 + " độ";
            outputText_quangduongtroidat = s_dattonghop1 + " M";
            outputText_ppdonduong = kq;
            outputText_huongdonduong = _HT_donduong1 + " độ";
            outputTextlat_gap = lat_dotk + " độ " + lat_phuttk3 +" phút " + chiso_lattk;
            outputTextlong_gap = long_dotk + " độ " + long_phuttk3 + " phút " + chiso_longtk;
            outputTextlat_A = lat_doA + " độ " + lat_phutA3 + " phút " + chiso_latA;
            outputTextlong_A = long_doA + " độ " + long_phutA3 + " phút " + chiso_longA; 
            outputTextlat_B = lat_doB + " độ " + lat_phutB3 + " phút " + chiso_latB;
            outputTextlong_B = long_doB + " độ " + long_phutB3 + " phút " + chiso_longB;
            outputTextlat_C = lat_doC + " độ " + lat_phutC3 + " phút " + chiso_latC;
            outputTextlong_C = long_doC + " độ " + long_phutC3 + " phút " + chiso_longC;
            outputTextlat_D = lat_doD + " độ " + lat_phutD3 + " phút " + chiso_latD;
            outputTextlong_D = long_doD + " độ " + long_phutD3 + " phút " + chiso_longD;

            document.getElementById("output_text_PT").innerHTML = outputText_PT;
            document.getElementById("output_text_khoangcach").innerHTML = outputText_khoangcach;
            document.getElementById("output_text_thoigiantroidat").innerHTML = outputText_thoigiantroidat;
            document.getElementById("output_text_troidatdongchay").innerHTML = outputText_troidatdongchay;
            document.getElementById("output_text_gionguoc").innerHTML = outputText_gionguoc;
            document.getElementById("output_text_gocdongdogio").innerHTML = outputText_gocdongdogio;
            document.getElementById("output_text_dongdogio").innerHTML = outputText_dongdogio;
            document.getElementById("output_text_troidatdongdogio").innerHTML = outputText_troidatdongdogio;
            document.getElementById("output_text_goclech").innerHTML = outputText_goclech;
            document.getElementById("output_text_LWtrai").innerHTML = outputText_LWtrai;
            document.getElementById("output_text_LWphai").innerHTML = outputText_LWphai;
            document.getElementById("output_text_v_datgio").innerHTML = outputText_v_datgio;
            document.getElementById("output_text_s_datgio").innerHTML = outputText_s_datgio;
            document.getElementById("output_text_kc_trai").innerHTML = outputText_kc_trai;
            document.getElementById("output_text_kc_phai").innerHTML = outputText_kc_phai;
            document.getElementById("output_text_dt").innerHTML = outputText_dt;
            document.getElementById("output_text_dp").innerHTML = outputText_dp;
            document.getElementById("output_text_kc_traiphai").innerHTML = outputText_kc_traiphai;
            document.getElementById("output_text_De").innerHTML = outputText_De;
            document.getElementById("output_text_ssPTBN").innerHTML = outputText_ssPTBN;
            document.getElementById("output_text_ssPTTKCN").innerHTML = outputText_ssPTTKCN;
            document.getElementById("output_text_tongss").innerHTML = outputText_tongss;
            document.getElementById("output_text_hesoantoan").innerHTML = outputText_hesoantoan;
            document.getElementById("output_text_bankinh").innerHTML = outputText_bankinh;
            document.getElementById("output_text_dientich").innerHTML = outputText_dientich;
            document.getElementById("output_text_huongtroidat").innerHTML = outputText_huongtroidat;
            document.getElementById("output_text_quangduongtroidat").innerHTML = outputText_quangduongtroidat;
            document.getElementById("output_text_ppdonduong").innerHTML = outputText_ppdonduong;
            document.getElementById("output_text_huongdonduong").innerHTML = outputText_huongdonduong;
            document.getElementById("output_textlat_gap").innerHTML = outputTextlat_gap;
            document.getElementById("output_textlong_gap").innerHTML = outputTextlong_gap;
            document.getElementById("output_textlat_A").innerHTML = outputTextlat_A;
            document.getElementById("output_textlong_A").innerHTML = outputTextlong_A;
            document.getElementById("output_textlat_B").innerHTML = outputTextlat_B;
            document.getElementById("output_textlong_B").innerHTML = outputTextlong_B;
            document.getElementById("output_textlat_C").innerHTML = outputTextlat_C;
            document.getElementById("output_textlong_C").innerHTML = outputTextlong_C;
            document.getElementById("output_textlat_D").innerHTML = outputTextlat_D;
            document.getElementById("output_textlong_D").innerHTML = outputTextlong_D;
        }
    }