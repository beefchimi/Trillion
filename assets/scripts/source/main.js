jQuery(document).ready(function($) {


	/* Global: Cache Variables for Speed
	---------------------------------------------------------------------------- */
	var $html     = $('html'),
		$body     = $('body'),
		$document = $(document),
		$window   = $(window);

	// global special variables
	var $gridCells = $('td.grid_cell');

	// cell-types.js
	var cellTypes={celltype_1:{name:'empty',content:'Take the train to candy land.'},celltype_2:{name:'ship',content:'Sponge shoppin\' for a brand new Springfield.'},celltype_3:{name:'junkyard',content:'Look at all those chickens!'},celltype_4:{name:'debris field',content:'Holy shit! A fucking debris field!'},celltype_5:{name:'blackhole',content:'You will never escape. You will never find love.'},celltype_6:{name:'stranded citizen',content:'Help this helpless citizen! Or kill him and loot his stuff.'},celltype_7:{name:'bandits',content:'Bandits are attempting to hijack your ship! They are not looking for a fight.'},celltype_8:{name:'battle',content:'There is a doin\'s a-transpirin\'! Take part in the battle or slip on past?'},celltype_9:{name:'trading post',content:'Well look here partner, this be a tradin\' post, shuck-a-muck!'},celltype_10:{name:'corn diamond',content:'You found the lethal corn diamond! Disperse!'}};


	/* Helper: Random Integer Between Range
	---------------------------------------------------------------------------- */
	function randomIntBetween(max, min) {

		return Math.floor( Math.random() * (max - min + 1) ) + min;

	}


	/* Trillion: Assign Initial Cell Data
	---------------------------------------------------------------------------- */
	function assignGridCells() {

		$gridCells.each(function() {

			var currentRandomInt = randomIntBetween(10, 1);

			// assign currentRandomInt as html content and data-cell attribute
			$(this).html(currentRandomInt)
				   .attr('data-cell', currentRandomInt);

		});

		// now, assign the special cells
		specialGridCells();

	}


	/* Trillion (child): Assign Special Cell Data
	---------------------------------------------------------------------------- */
	function specialGridCells() {

		var specialCellValues = ['a', 'b', 'c'],
			previousCells = [],
			randomCell;

		for (i = 0; i < specialCellValues.length; i++) {

			randomCell = randomIntBetween(100, 1) - 1;

			// capture player starting position
			if (i === 0) {
				var startPos = randomCell;
			}

			// if previousCells does not yet contain this randomCell...
			if (previousCells.indexOf(randomCell) <= -1) {

				// push current randomCell into previousCells
				previousCells.push(randomCell);

				// for this gridCell:
				$gridCells.eq(randomCell)
						  .html(specialCellValues[i]) // add current iteration of specialCellValues as html content,
						  .attr('data-cell', specialCellValues[i]) // add current iteration of specialCellValues as data-cell attribute,
						  .addClass('cell_special'); // and apply "cell_special" class

			}

		}

		// pass startPos to youAreHere()
		youAreHere(startPos);

		// allow for cell clicks
		clickCell();

	}


	/* Trillion (child): 'You Are Here' Marker
	---------------------------------------------------------------------------- */
	function youAreHere(_startPos) {

		// add 'grid_cell-current' to starting position
		$gridCells.eq(_startPos).addClass('grid_cell-current');

	}


	/* Trillion (child): Click Cell for Data
	---------------------------------------------------------------------------- */
	function clickCell() {

		$gridCells.on('click', function() {

			var cellDataNum = $(this).attr('data-cell');

			if ( $(this).hasClass('cell_special') ) {

				// get data from special source
				console.log('this is a special cell');

			} else {

				console.log(cellTypes['celltype_' + cellDataNum]);

			}

			console.log('CLICK!');

			return false;

		});

	}


	/* Window Load: Function Initialization
	---------------------------------------------------------------------------- */
	$window.load(function() {

		// initPreLoader();

		assignGridCells();

	});


});