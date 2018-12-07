<?php
include "connect.php";

$type=isset($_GET['type'])?$_GET['type']:"";

$id=isset($_GET['id'])?$_GET['id']:"";

$num=isset($_GET['num'])?$_GET['num']:"";


/*先查找列表获取值，再加入购物车表*/
if($type=="add"){
    $sql6="SELECT * FROM user_car WHERE id='$id'";
    $res6=$conn->query($sql6);
    $row=$res6->num_rows;
    if($row==0){
        $sql="INSERT INTO user_car(id,title,isbn,imgurl,category,newprice,stock,stocknum,discount,save) SELECT booklists.id,booklists.title,booklists.isbn,booklists.imgurl,booklists.category,booklists.newprice,booklists.stock,booklists.stocknum,booklists.discount,booklists.save FROM booklists where booklists.id='$id'";
        $res=$conn->query($sql);
        $sql13="UPDATE user_car SET num='$num' WHERE id='$id'";
        $res13=$conn->query($sql13);
    }else if($row>0){
        /*从数据库获取num值*/
        $sql33="SELECT num FROM user_car WHERE id='$id'";
        $res33=$conn->query($sql33);
        // $data=$res33->fectch_all(MYSQL_ASSOC);
        while($row33 = $res33->fetch_assoc()) {
            $n=$row33['num']+$num;
        }
        $sql23="UPDATE user_car SET num='$n' WHERE id='$id'";
        $res23=$conn->query($sql23);
    }
    $conn->close();
    echo $id;
    echo $num;
}
/*购物车页从购物车表请求值渲染*/
if($type=="show"){
    $sql2="SELECT * FROM user_car";
    $res2=$conn->query($sql2);
    $data2=$res2->fetch_all(MYSQL_ASSOC);
    $goodlist=array(
        'datalist'=>$data2
    );
    echo json_encode($goodlist,JSON_UNESCAPED_UNICODE);
    $res2->close();
    $conn->close();
}

/*购物车单一商品加减数量更新*/
if($type=="update"){
    $sql3="UPDATE  user_car SET num=$num WHERE id='$id'";
    $res3=$conn->query($sql3);
    // $res3->close();
    $conn->close();
}

/*购物车单一商品被删除*/
if($type=="one_delete"){
    $sql4="DELETE FROM user_car WHERE id='$id'";
    $res4=$conn->query($sql4);
    // $res4->close();
    $conn->close();
}

/*购物车清空*/
if($type=="all_delete"){
    $sql5="DELETE FROM user_car";
    $res5=$conn->query($sql5);
    // $res5->close();
    $conn->close();
}

?>