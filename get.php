<?php
if( $_GET["id"] == "000-001" ) {
   //echo "Welcome ". $_GET['name']. "<br />";
   echo '{ "id": "000-001", "body": "{\"subject\":\"Computer Science\",\"description\":\"Mock exam for Computer Science.\",\"submit\":true,\"submit_info\":{\"email\":\"your_mom@gmail.com\",\"rules\":[\"gmail.com\",\"school.edu\",\"domain.com\"]},\"questions\":[{\"type\":\"multiple_choice\",\"question\":\"How do you pronounce SQL?\",\"c\":3,\"choices\":[{\"type\":\"answer\",\"text\":\"Sequel\",\"correct\":true},{\"type\":\"answer\",\"text\":\"Ess que ell\",\"correct\":false},{\"type\":\"answer\",\"text\":\"Squirre\",\"correct\":false}],\"marks_awarded\":1},{\"type\":\"multiple_choice\",\"question\":\"How is C# pronounced?\",\"c\":3,\"choices\":[{\"type\":\"answer\",\"text\":\"see hashtag\",\"correct\":false},{\"type\":\"answer\",\"text\":\"see number\",\"correct\":false},{\"type\":\"answer\",\"text\":\"see sharp\",\"correct\":true}],\"marks_awarded\":1}]}" }';
   
   exit();
}
?>