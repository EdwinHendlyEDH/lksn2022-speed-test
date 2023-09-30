<?php
$data = file_get_contents('result.json');
$data = json_decode($data, true);
$messages = $data['messages'];
// top five sent words
$words = array_map(fn ($message) => preg_replace("/[^a-z ]/", '', strtolower($message['text'])), $messages);
$words = explode(" ", implode(" ", $words));
$words = array_reduce($words, function ($acc, $curr) {
    if (!isset($acc[$curr])) {
        $acc[$curr] = 0;
    }
    $acc[$curr]++;
    return $acc;
}, []);

arsort($words);
$top_five_words = array_slice($words, 0, 5, true);


// total messages sent
$ms = array_filter($messages, fn($message) => $message['from'] == 'Budi');
$acls = array_reduce($ms, fn($acc, $msg) => $acc + strlen($msg['text']), 0) / count($ms);


// total messages received
$mr = array_filter($messages, fn($message) => $message['from'] == 'Bot');
$aclr = array_reduce($mr, fn($acc, $msg) => $acc + strlen($msg['text']), 0) / count($mr);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chat Analytics</title>
    <style>
        body {
            background-color: black;
            color: white;
            font-family: Arial;
        }
    </style>
</head>

<body>
    <ul>
        <li>
            Top 5 sent words:
            <ul>
                <?php foreach ($top_five_words as $word => $count) : ?>
                    <li><?= $word?> (<?= $count?>x)</li>
                <?php endforeach; ?>
            </ul>
        </li>
        <li>Total messages sent: <?= count($ms)?></li>
        <li>Total messages received: <?= count($mr)?></li>
        <li>Average characters length sent: <?= floor($acls)?></li>
        <li>Average characters length received: <?= floor($aclr)?></li>
    </ul>
</body>

</html>