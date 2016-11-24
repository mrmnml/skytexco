<?php

use Symfony\Component\HttpFoundation\Response;

require_once __DIR__ . '/../vendor/autoload.php';

$app = new Silex\Application();
$app['albumMap'] = array(
    'nsm' => 'Noble Skyrim',
    'olt' => 'Osmodius',
    'vanilla' => 'Vanilla',
    '2017' => 'Skyrim 2017',
    'skyland' => 'Skyland',
    'yalo' => 'Yalo',
);

$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => 'views',
    'twig.autoescape' => true));

$app->get('/', function () use ($app) {
    return file_get_contents('index.html');
});

$app->get('/albums', function () use ($app) {
    $res = array();
    $albumList = glob('images/*', GLOB_ONLYDIR);
    foreach($albumList as $album) {
         $res[] = array(
             'title'=>$app['albumMap'][substr($album, 7)],
             'paths' => glob($album.'/*.jpg'));
    }
    return $app->json($res);
});
//$app->get('/albums', function () use ($app) {
//    $list = glob('images/*', GLOB_ONLYDIR);
//    return $app->json($list);
//});


$app->run();