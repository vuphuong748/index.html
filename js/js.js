
/*Hàm thêm sản phẩm vào Giỏ hàng**/


var itemList={ 
    "sp001":{"name":"Ấm Đun Nước Siêu Tốc","price":89000,"photo":"danh muc sp/Gia dung/amSieuToc3.jpg"},
    "sp002":{"name":"Đèn xếp cao cấp","price":97000,"photo":"danh muc sp/Hoc tap/spdenhoc.jpg"},
    
    };
    
    
    function addCart(code)
    {
        var number=parseInt(document.getElementById(code).value);
        var name=itemList[code].name;
        if(number==0)
        return;
    
        if(typeof localStorage[code] === "undefined"){
            window.localStorage.setItem(code,number); 
        }
        else{
            var current=parseInt(window.localStorage.getItem(code));
    
            if(current+number>100){
                window.localStorage.setItem(code,100);
                alert("Mỗi mặt hàng chỉ có thể đặt 100 sản phẩm cho mỗi đơn hàng. Bạn đã đặt 100 sản phẩm của "+name+" này.");
                return; 
            }
            else
                window.localStorage.setItem(code,current+number);
        }
        alert("Đã cập nhật sản phẩm "+name+" với số lượng "+number+" vào giỏ hàng. Số lượng sản phẩm "+name+" đã đặt là "+parseInt(window.localStorage.getItem(code))+".");
    }
    
    // DON HANG
    function openCart(){
        window.location.href = "../giohang.html";
    }
    
    function getDiscountRate()
    {
        var d=new Date();//lấy ngày hiện tại của máy tính
        var weekday=d.getDay();//lấy ngày trong tuần
        var totalMins=d.getHours()*60+d.getMinutes();//đổi thời gian hiện tại ra số phút trong ngày.
        if(weekday>=1&&weekday<=3&&((totalMins>=420&&totalMins<=660)||(totalMins>=780&&totalMins<=1020)))
        return 0.1;
        return 0;
    }
    
    // HÀM HIỂN THỊ NỘI DUNG GIỎ HÀNG
    function showCart()
    {
        var formatter = new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'});
        var container=document.getElementById("cartDetail").getElementsByTagName('tbody')[0];
        container.innerHTML="";
        var sum=0;//tổng mỗi mặt hàng
        var totalPreTax=0;//tổng trước thuế
        var discountRate=getDiscountRate();//tỉ lệ khuyến mãi
        var taxRate=0.1;//tỉ lệ thuế
        var discount=0;//tiền giảm giá
        var tax=0;//tiền thuế.       

        for(var i=0;i<window.localStorage.length;i++)
        {
            if(typeof itemList[localStorage.key(i)] === "undefined")
                continue;
            var tr=document.createElement("tr");
            var photoCell=document.createElement("td");
            var nameCell=document.createElement("td");
            var priceCell=document.createElement("td");
            var numberCell=document.createElement("td");
            var sumCell=document.createElement("td");
            var removeCell=document.createElement("td");
            var removeLink=document.createElement("a");
            var item=itemList[localStorage.key(i)];
            var number=localStorage.getItem(localStorage.key(i));
            photoCell.style.textAlign="center";
            photoCell.innerHTML="<td class='row'><img src='"+item.photo+"' class='img-responsive'  height='300'/> </td>";

            nameCell.innerHTML=item.name;
            //nameCell.innerHTML="<td class='pt-5 ps-5' >"+item.name + "</td>";

            
            priceCell.innerHTML=formatter.format(item.price);            
           
            numberCell.innerHTML=number;           

            sum=number*item.price;
            sumCell.innerHTML=formatter.format(sum);            

            removeLink.innerHTML="<i class='fa fa-trash icon-pink'></i>";
            removeLink.setAttribute("href","#");
            removeLink.setAttribute("data-code",localStorage.key(i));
            removeLink.onclick=function(){
                removeCart(this.dataset.code);
            };
           
            removeCell.appendChild(removeLink);
            tr.appendChild(photoCell);
            tr.appendChild(nameCell);
            tr.appendChild(numberCell);
            tr.appendChild(priceCell);
            tr.appendChild(sumCell);
            tr.appendChild(removeCell);
            container.appendChild(tr);
            totalPreTax+=sum; 
        }
            var discount=totalPreTax*discountRate;
            var tax=(totalPreTax-discount)*taxRate;
            document.getElementById("bill_pre_tax_total").innerHTML=formatter.format(totalPreTax);
            document.getElementById("bill_discount").innerHTML=discountRate+" x A= "+formatter.format(discount);
            document.getElementById("bill_tax").innerHTML=formatter.format(tax);
            document.getElementById("bill_total").innerHTML=formatter.format(totalPreTax-discount+tax   );
            
        }
    
    //Hàm xóa sản phẩm khỏi đơn hàng:
    
    function removeCart(code)
    {
        if(typeof window.localStorage[code] !== "undefined"){
            //xóa sản phẩm khỏi localStorage
            window.localStorage.removeItem(code);
            //Xóa nội dung của phần thân của bảng (<tbody>)
            document.getElementById("cartDetail").getElementsByTagName('tbody')[0].innerHTML="";
            //Hiển thị lại nội dung của đơn hàng
           
            showCart();
        } 
    }




    
// Lien he

function contactValidate(frm)
{
    var emailReg = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(frm.name.value.length < 4){
        alert("Vui long nhap ten cua ban!!");
        frm.name.focus();
        return false;
    }

    if(emailReg.test(frm.email.value)==false){
        alert("Nhap mail khong hop le!!");
        frm.email.focus();
        return false;
    }
    
    if(frm.message.value.length < 10){
        alert("Noi dung qua ngan, vui long nhap tu 10 ky tu tro len!!");
        frm.message.focus();
        return false;
    }

    alert("Ban da gui lien he!!");
    return true;
}