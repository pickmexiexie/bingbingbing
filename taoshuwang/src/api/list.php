<?php
include "connect.php";
/*获取书的分类*/
$kind=isset($_GET['kind'])?$_GET['kind']:"";

$id=isset($_GET['id'])?$_GET['id']:"";

$page=isset($_GET['page'])?$_GET['page']:"";

$qty=isset($_GET['qty'])?$_GET['qty']:"";

$sort=isset($_GET['sort'])?$_GET['sort']:"";

/*首页渲染，利用书块分类渲染（kind）*/
if(isset($_GET['kind'])){
    $sql="SELECT * FROM booklists WHERE kind='$kind'";

    $res=$conn->query($sql);

    $data=$res->fetch_all(MYSQLI_ASSOC);

    $goodlist=array(
        'datalist'=>$data
    );

    echo json_encode($goodlist,JSON_UNESCAPED_UNICODE);

    $res->close();//关掉结果集
    $conn->close();//断开连接
}

/*详情渲染，利用id号分类（id）*/
if(isset($_GET['id'])){
    /*新书*/
    $sql1="SELECT * FROM booklists WHERE id='$id'";

    $res1=$conn->query($sql1);

    $data1=$res1->fetch_all(MYSQLI_ASSOC);

    $goodlist1=array(
        'datalist'=>$data1  
    );

    echo json_encode($goodlist1,JSON_UNESCAPED_UNICODE);

    $res1->close();//关掉结果集
    $conn->close();//断开连接
}

/*列表页渲染*/
if(isset($_GET['page']) && isset($_GET['qty'])){

    $index=($page-1)*$qty;

    $sql2="SELECT * FROM booklists LIMIT $index,$qty";

    if($sort=="id"){
        $sql2="SELECT * FROM booklists ORDER BY id ASC LIMIT $index,$qty";
    }

    if($sort=="sell"){
        $sql2="SELECT * FROM booklists ORDER BY sell DESC LIMIT $index,$qty";
    }

    if($sort=="newprice"){
        $sql2="SELECT * FROM booklists ORDER BY newprice ASC LIMIT $index,$qty";
    }

    if($sort=="discount"){
        $sql2="SELECT * FROM booklists ORDER BY discount ASC LIMIT $index,$qty";
    }

    if($sort=="ptime"){
        $sql2="SELECT * FROM booklists ORDER BY ptime DESC LIMIT $index,$qty";
    }

    $res2=$conn->query($sql2);

    $data2=$res2->fetch_all(MYSQLI_ASSOC);

    $sql3="SELECT * FROM booklists";

    $res3=$conn->query($sql3);

    $row3=$res3->num_rows;

    $goodlist2=array(
        'total'=>$row3,
        'datalist'=>$data2  
    );

    echo json_encode($goodlist2,JSON_UNESCAPED_UNICODE);

    $res2->close();//关掉结果集
    $res3->close();
    $conn->close();//断开连接
}

?>