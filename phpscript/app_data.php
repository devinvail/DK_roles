<?php
header("Access-Control-Allow-Origin: *");
header("content-type: application/json");

function callAPI($method, $url, $data = array())
{
  $curl = curl_init();
  if ($method === "POST") {
    curl_setopt($curl, CURLOPT_POST, 1);
    curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
    // OPTIONS:
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_HTTPHEADER, array(
      'Content-Type: application/x-www-form-urlencoded',
    ));
    curl_setopt($curl, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
  } else {
    curl_setopt($curl, CURLOPT_URL, $url);
  }
  curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

  // EXECUTE:
  $result = curl_exec($curl);
  if (!$result) {
    die("Connection Failure");
  }
  curl_close($curl);
  return $result;
}

if ($_GET['type'] == "services") {
  $apiData = callAPI("GET", "https://findtreatment.samhsa.gov/locator/serviceCategories.json");
  echo $apiData;
} else {
  echo file_get_contents("app-data.json");
}
