<?php
header('Content-Type: application/json');

$host = '145.14.151.1';
$db = 'u335921272_produccion';
$user = 'u335921272_produccion';
$pass = '@Desarrollo123';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $obj=[];
        $stmt = $pdo->query('select e.idempresa, e.nombre_emp, e.ubicacion from empresa as e');
        
        $js = $stmt->fetchAll();
            
        echo json_encode($js);
        break;

    case 'POST':
        echo "post";
        break;

    // Agrega más casos para PUT, DELETE, etc.
}

?>
