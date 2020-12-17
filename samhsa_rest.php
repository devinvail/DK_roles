<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, origin");

$requestMethod = $_SERVER["REQUEST_METHOD"];

function callAPI($method, $url, $data){
   $curl = curl_init();
   curl_setopt($curl, CURLOPT_POST, 1);
   curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
   // OPTIONS:
   curl_setopt($curl, CURLOPT_URL, $url);
   curl_setopt($curl, CURLOPT_HTTPHEADER, array(
      'Content-Type: application/x-www-form-urlencoded',
   ));
   curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
   curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
   // EXECUTE:
   $result = curl_exec($curl);
   if(!$result){die("Connection Failure");}
   curl_close($curl);
   return $result;
}

if($requestMethod == 'POST') {
   $data = json_decode(file_get_contents("php://input"));

   $body = "sType=".$data->sType."&sAddr=".$data->lat."%2C".$data->long."&pageSize=".$data->pagesize."&page=".$data->page."&sort=".$data->sort;

   if(!empty($data->includeHRSA)){
      $body .= "&includeHRSA=".$data->includeHRSA;
   }

    if(!empty($data->includeBupren)){
      $body .= "&includeBupren=".$data->includeBupren;
   }

   if(!empty($data->limitValue)){
      $body .= "&limitValue=".$data->limitValue;
   }

    if(!empty($data->sCodes)){
      $body .= "&sCodes=".$data->sCodes;
   }
     if(!empty($data->sLanguages)){
      $body .= "&sLanguages=".$data->sLanguages;
   }




   $apiData = callAPI("POST","https://findtreatment.samhsa.gov/locator/listing", $body);
   echo $apiData;
} else {
   $response = array(
      "code" => 400,
      "data" => array(),
      "msg" => "Invalid Request"
   );
   echo json_encode($response);
}
