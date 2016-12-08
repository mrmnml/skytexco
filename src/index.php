<?php

require_once __DIR__ . '/../vendor/autoload.php';

$app = new Silex\Application();
$app['albumMap'] = array(
    'nsm' => 'Noble Skyrim',
    'olt' => 'Osmodius',
    'vanilla' => 'Vanilla',
    '2017' => 'Skyrim 2017',
    'skyland' => 'Skyland v1',
    'yalo' => 'Yalo'
);


$app->get('/', function () use ($app) {
    return file_get_contents('index.html');
});

$app->get('/albums', function () use ($app) {
    $res = array();
    $albumList = glob('images/packs/*', GLOB_ONLYDIR);
    foreach ($albumList as $album) {
        $id = substr($album,13);
        $res[$id] = array(
            'title' => $app['albumMap'][$id],
            'id' => $id
        );
    }
    return $app->json($res);
});

$app->run();