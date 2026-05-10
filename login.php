<?php
$email = isset($_POST['email']) ? $_POST['email'] : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';

if ($email == "b251210093@sakarya.edu.tr" && $password == "b251210093") {
    
    header("Location: index.html"); 
    exit();

} else {
    echo "<script>
            alert('Hatalı e-posta veya şifre!');
            window.location.href = 'login.html';
          </script>";
    exit();
}
?>