<?php

$SMTP_HOST          = "smtp.jit-info.com.br"; // Servidor SMTP
$SMTP_USERNAME      = "site@jit-info.com.br"; // Usuário de autenticação SMTP
$SMTP_PASSWORD      = "s1t3@fx"; // Senha do usuário SMTP
$SMTP_DESTINO_EMAIL = "site@jit-info.com.br"; // E-mail de destino do contato
$SMTP_DESTINO_NOME  = "Site"; // Nome do usuário de destino

if($_SERVER['REQUEST_METHOD'] == 'POST') {
  require('phpmailer/class.phpmailer.php');

  // obtém os dados de contato
  $contato['nome'] = isset($_POST['contato']['nome']) ? $_POST['contato']['nome'] : "";
  $contato['email'] = isset($_POST['contato']['email']) ? $_POST['contato']['email'] : "";
  $contato['assunto'] = isset($_POST['contato']['assunto']) ? $_POST['contato']['assunto'] : "";
  $contato['mensagem'] = isset($_POST['contato']['mensagem']) ? $_POST['contato']['mensagem'] : "";

  $mail = new PHPMailer();
  $mail->isSMTP();
  $mail->Host     = $SMTP_HOST;
  $mail->SMTPAuth = true;
  $mail->Username = $SMTP_USERNAME;
  $mail->Password = $SMTP_PASSWORD;

  $mail->From = $contato["email"];
  $mail->FromName = $contato["nome"];

  $mail->AddAddress($SMTP_DESTINO_EMAIL, $SMTP_DESTINO_NOME);

  $mail->Subject = sprintf("Via JIT-INFO.COM.BR: %s", $contato["assunto"]);
  $mail->Body = "Mensagem do site JIT-INFO.COM.BR:\n";
  $mail->Body.= "Nome: " . $contato["nome"] . "\n";
  $mail->Body.= "E-mail: " . $contato["email"] . "\n";
  $mail->Body.= utf8_encode(utf8_decode("Mensagem:\n" . $contato["mensagem"] . "\n"));

  $enviado = $mail->Send();

  $mail->ClearAllRecipients();
  $mail->ClearAttachments();

  if($enviado) {
    echo json_encode(array("status" => true, "class" => "text-success", "msg" => "Mensagem enviada com sucesso!"));
  } else {
    echo json_encode(array("status" => false, "class" => "text-danger", "msg" => "Mensagem não enviada, tente novamente!"));
  }
} else {
  header("Location: contato.html");
}
?>