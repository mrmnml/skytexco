<?php

require_once __DIR__ . '/../vendor/autoload.php';
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

$app = new Silex\Application();
$app->register(new Silex\Provider\DoctrineServiceProvider(), array(
    'db.options' => array(
        'driver' => 'pdo_sqlite',
        'path' => __DIR__ . '/../data/app.db',
        'dbname' => 'stc'
    ),
));
$app['debug'] = true;
$app['albumMap'] = array(
    'nsm' => 'Noble Skyrim',
    'olt' => 'Osmodius',
    'vanilla' => 'Vanilla',
    '2017' => 'Skyrim 2017',
    'skyland' => 'Skyland v1',
    'yalo' => 'Yalo'
);


$app->get('/upload', function () use ($app) {
    return file_get_contents('upload.html');
});

$app->get('/', function () use ($app) {
    return file_get_contents('index.html');
});

$app->get('/api/albums', function () use ($app) {
    $res = array();
    $albumList = glob('images/packs/*', GLOB_ONLYDIR);
    foreach ($albumList as $album) {
        $id = substr($album, 13);
        $res[$id] = array(
            'title' => $app['albumMap'][$id],
            'id' => $id
        );
    }
    return $app->json($res);
});

$app->post('api/upload', function (Request $request) use ($app) {
    print_r($app['db']);
    exit;
//    $request = new \Symfony\Component\HttpFoundation\Request;
//    $res = array('status' => 'ok');
    $album = $request->request->all();
    $file = $request->files->get('file');
    $file->move('%s/../data/%s/%s/', __DIR__, $album['name'], uniqid() . '.' . $file->getClientOriginalExtension());
    $res = new Response();
    return $res->setContent('ok');
});

$app->run();