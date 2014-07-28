<!doctype html>
<html lang="en">

<?php

	$requestURI     = $_SERVER['REQUEST_URI'];
	$directoryArray = explode('/',$requestURI);
	$hostPath       = "http://" . $_SERVER['HTTP_HOST'] . "/" . $directoryArray[1];

	end($directoryArray);

	$directoryTitle = prev($directoryArray);
	$fileName       = basename($requestURI);

	$fileParts = explode(".", $fileName);
	$pageTitle = ucfirst($fileParts[0]);

	if ( substr($fileParts[0], 0, 1) != '?' ) {
		$bodyClass = $fileParts[0];
	} else {
		$bodyClass = $directoryTitle;
	}

/*
if (dev) {

	$folder = 'build';

} else {

	$folder = 'source';
}
*/

?>

<head>

	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">

	<title>TRILLION - Video Game Prototype v0.1</title>

	<meta name="description" content="You’re a fledgling space pirate trying to get whats yours in a crazy universe.">
	<meta name="viewport" content="width=device-width, initial-scale=1">

<!--
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="format-detection" content="telephone=no">

	<meta name="application-name" content="Grunt Test">
	<meta name="msapplication-TileColor" content="#000">
	<meta name="msapplication-TileImage" content="assets/img/main/win8-tile-icon.png">
-->

	<link rel="stylesheet" href="assets/styles/build/styles.css">

	<?php // include('includes/snips/header_script-webfonts.php'); ?>
	<?php // include('includes/snips/header_script-bugherd.php'); ?>

</head>

<body id="page-id">

	<header id="site_header" data-site="header">

<?php
/*
		echo '<ul class="echo-list">';

			echo '<li><strong>request uri:</strong> ' . $requestURI . '</li>';
			echo '<li><strong>host path:</strong> ' . $hostPath . '</li>';
			echo '<li><strong>directory title:</strong> ' . $directoryTitle . '</li>';
			echo '<li><strong>file name:</strong> ' . $fileName . '</li>';

		echo '</ul>';
*/
?>

	</header>
