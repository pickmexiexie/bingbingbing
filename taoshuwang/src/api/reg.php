<?php
    include "connect.php";

    $usname=isset($_POST['usname'])?$_POST['usname']:"";

    $pwd=isset($_POST['password'])?$_POST['password']:"";

    $email=isset($_POST['email'])?$_POST['email']:"";

    $uore=isset($_POST['uore'])?$_POST['uore']:"";

    $type=isset($_POST['type'])?$_POST['type']:"";

    /*验证注册用户名是否存在*/

    $sql="SELECT * FROM user_inf WHERE username='$usname'";

    $res=$conn->query($sql);

    $row=$res->num_rows;

    /*验证邮箱是否存在*/

    $sql1="SELECT * FROM user_inf WHERE email='$email'";

    $res1=$conn->query($sql1);

    $row1=$res1->num_rows;

    /*验证用户名或Email是否存在*/

    $sql2="SELECT * FROM user_inf WHERE username='$uore' OR email='$uore'";

    $res2=$conn->query($sql2);

    $row2=$res2->num_rows;

    /*验证密码是否存在*/

    $sql3="SELECT * FROM user_inf WHERE password='$pwd'";

    $res3=$conn->query($sql3);

    $row3=$res3->num_rows;


    /*传参不为空时再判断,查询功能*/

    if($type=="find"){
        if(isset($_POST['usname'])){
            if($row>0){
                echo 1;
            }else if($row==0){
                echo 0;
            }
        }
        if(isset($_POST['email'])){
            if($row1>0){
                echo 1;
            }else if($row1==0){
                echo 0;
            }
        }
        if(isset($_POST['uore'])){
            if($row2>0){
                if(isset($_POST['password'])){
                    if($row3>0){
                        echo 'allok';
                    }else if($row3==0){
                        echo 'nopwd';
                    }
                }
            }else if($row2==0){
                echo 'nouser';
            }
        }
    }

    /*$insert判断注册，yes为注册，插入用户各项信息，增添功能*/
    if($type=="set"){

        $sql2="INSERT INTO user_inf(username,email,password) VALUES('$usname','$email','$pwd')";

        $res2=$conn->query($sql2);

        if($res2){
            echo "yes";
        }else{
            echo "no";
        }

    }

    $conn->close();
?>