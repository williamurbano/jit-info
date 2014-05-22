<?php

// Servidor SMTP
define(SMTP_HOST         , "smtp.dominio.com.br");
// Usuário de autenticação SMTP
define(SMTP_USERNAME     , "username@dominio.com.br");
// Senha do usuário SMTP
define(SMTP_PASSWORD     , "p455w0rd");
// E-mail de destino do contato
define(SMTP_DESTINO_EMAIL, "username@dominio.com.br");
// Nome do usuário de destino
define(SMTP_DESTINO_NOME , "User Name");

if($_SERVER['REQUEST_METHOD'] == 'POST') {
  require('phpmailer/class.phpmailer.php');

  // obtém os dados de contato
  $contato['nome'] = isset($_POST['contato']['nome']) ? $_POST['contato']['nome'] : "";
  $contato['email'] = isset($_POST['contato']['email']) ? $_POST['contato']['email'] : "";
  $contato['assunto'] = isset($_POST['contato']['assunto']) ? $_POST['contato']['assunto'] : "";
  $contato['mensagem'] = isset($_POST['contato']['mensagem']) ? $_POST['contato']['mensagem'] : "";

  $mail = new PHPMailer();
  $mail->isSMTP();
  $mail->Host     = SMTP_HOST;
  $mail->SMTPAuth = true;
  $mail->Username = SMTP_USERNAME;
  $mail->Password = SMTP_PASSWORD;

  $mail->From = $contato["email"];
  $mail->FromName = $contato["nome"];

  $mail->AddAddress(SMTP_DESTINO_EMAIL, SMTP_DESTINO_NOME);

  $mail->Subject = sprintf("Via JIT-INFO.COM.BR: %s", $contato["assunto"]);
  $mail->Body = "Mensagem do site JIT-INFO.COM.BR:\n";
  $mail->Body.= "Nome: " . $contato["nome"] . "\n";
  $mail->Body.= "E-mail: " . $contato["email"] . "\n";
  $mail->Body.= "Mensagem:\n" . $contato["mensagem"] . "\n";

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