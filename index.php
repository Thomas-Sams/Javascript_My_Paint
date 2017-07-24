<!DOCTYPE html>
<html>
<head>
	<title>My Paint</title>
	<link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>

	<canvas id="canvas" width="800" height="500"></canvas>
	<div>
		<button id="clear">Effacer</button>
		<button id="pinceau">Pinceau</button>
		<button id="trait">Trait</button>
		<button id="square">Carre</button>
		<button id="circle">Cercle</button>
		<button id="gomme">Gomme</button>
		<input type="color" value="#fad345" name="textcolor" id="color">
		<input id="width_trait" type="range" min="2" max="50" value="5" />
	</div>
	<div>
		<label>
			Forme pleine : 
			<input type="checkbox" id="forme">
		</label>
	</div>
	<p>Telecharger<a id="downloadPng" href="#"> ici</a> en PNG, ou <a id="downloadJpg" href="#">ici</a> en JPG.</p>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	<script src="js/script.js"></script>
</body>
</html>