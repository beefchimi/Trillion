jQuery(document).ready(function($) {


	/* Global: Cache Variables for Speed
	---------------------------------------------------------------------------- */
	var $html     = $('html'),
		$body     = $('body'),
		$document = $(document),
		$window   = $(window);

	// global special variables
	var $gridCells = $('td.grid_cell'),
		$mapGrid   = $('#map_grid');

	// cell-types.js
	var cellTypesBasic={celltype_1:{type:'empty',content:'Take the train to candy land.'},celltype_2:{type:'ship',content:'Sponge shoppin\' for a brand new Springfield.'},celltype_3:{type:'junkyard',content:'Look at all those chickens!'},celltype_4:{type:'debris field',content:'Holy shit! A fucking debris field!'},celltype_5:{type:'blackhole',content:'You will never escape. You will never find love.'},celltype_6:{type:'stranded citizen',content:'Help this helpless citizen! Or kill him and loot his stuff.'},celltype_7:{type:'bandits',content:'Bandits are attempting to hijack your ship! They are not looking for a fight.'},celltype_8:{type:'battle',content:'There is a doin\'s a-transpirin\'! Take part in the battle or slip on past?'},celltype_9:{type:'trading post',content:'Well look here partner, this be a tradin\' post, shuck-a-muck!'},celltype_10:{type:'corn diamond',content:'You found the lethal corn diamond! Disperse!'}};

	var cellTypesSpecial={celltype_a:{type:'stardock',content:'This is your spawn point. Cherish it forever.'},celltype_b:{type:'light bank',content:'Where all your legal financial transactions take place.'},celltype_c:{type:'dark bank',content:'Criminal shit goes on here. Its like the Omega in Mass Effect.'}};


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

			// assign currentRandomInt as html content and data-cellType attribute
			$(this).html(currentRandomInt)
				   .attr('data-cellType', currentRandomInt);

		});

		// now, assign the special cells
		specialGridCells();

		/*

			generate basic numbers between 1 and 10
			to fill 100 cells minus the length of special cells
			97 cells need to be filled
			each basic number has a specified priority

		*/

	}


	/* Trillion (child): Assign Special Cell Data
	---------------------------------------------------------------------------- */
	function specialGridCells() {

		var specialCellValues = ['a', 'b', 'c'],
			previousCells = [],
			randomInteger,
			i = 0;

		// find a position for each special cell until we reach the length of the specialCellValues
		while (i < specialCellValues.length) {

			/*

				'100' is dependent on the number of cells...
				need a more universal approach to defining this value

			*/

			// get a random interger between 100 and 1, subtract 1 to account for 0-based index [0 - 99]
			randomInteger = randomIntBetween(100, 1) - 1;

			// capture player starting position
			if (i === 0) {

				var startSectorBase0 = randomInteger,
					startSectorBase1 = randomInteger + 1, // remove 0-based index (1 - 100)
					startRowPos      = parseInt( $gridCells.eq(startSectorBase0).parent().attr('data-row') ),
					startColumnPos   = parseInt( $gridCells.eq(startSectorBase0).attr('data-column') );

			}

			// if previousCells array does not yet contain this randomInteger...
			if (previousCells.indexOf(randomInteger) <= -1) {

				// push current randomInteger into previousCells
				previousCells.push(randomInteger);

				// for 'this' gridCell:
				$gridCells.eq(randomInteger)
						  .html(specialCellValues[i]) // add current iteration of specialCellValues as html content,
						  .attr('data-cellType', specialCellValues[i]) // add current iteration of specialCellValues as data-cellType attribute,
						  .addClass('cell_special'); // and apply "cell_special" class

				i++;

			}

		}

		// update player coordinates to initiate starting position (prevSector is set to 'false')
		updateCoordinates(startSectorBase1, startRowPos, startColumnPos, false);

		// setup playerTravel
		playerTravel();

	}


	/* Trillion (child): Update Coordinates
	---------------------------------------------------------------------------- */
	function updateCoordinates(assignedSector, assignedRow, assignedColumn, prevSector) {


		console.log('assignedSector: ' + assignedSector);
		console.log('assignedRow: ' + assignedRow);
		console.log('assignedColumn: ' + assignedColumn);
		console.log('prevSector: ' + prevSector);



/*
		var newSector    = $mapGrid.attr('data-currentSector', assignedSector),
			newRowPos    = $mapGrid.attr('data-currentRow', assignedRow),
			newColumnPos = $mapGrid.attr('data-currentColumn', assignedColumn);
*/

		$mapGrid.attr('data-currentSector', assignedSector);
		$mapGrid.attr('data-currentRow', assignedRow);
		$mapGrid.attr('data-currentColumn', assignedColumn);

/*
		// if we have an empty string value for prevSector
		if (prevSector == '') {
			prevSector = false;
		}
*/

		youAreHere(assignedSector, prevSector);

/*
		if (assignedRow > 1) {
			console.log('you can travel up');
		}

		if (assignedRow < 10) {
			console.log('you can travel down');
		}

		if (assignedColumn > 1) {
			console.log('you can travel left');
		}

		if (assignedColumn < 10) {
			console.log('you can travel right');
		}
*/

	}


	/* Trillion (child): 'You Are Here' Marker
	---------------------------------------------------------------------------- */
	function youAreHere(_newSector, _prevSector) {

		var newCellIndex = _newSector - 1,
			newCellType  = $gridCells.eq(newCellIndex).attr('data-cellType'),
			newCellTypeData,
			prevSectorNumber;

/*
		// apparently, isNaN is not reliable... seems to work for my case, but might want to reconsider
		if ( isNaN(newCellType) ) {
			newCellTypeData = cellTypesSpecial['celltype_' + newCellType];
		} else {
			newCellTypeData = cellTypesBasic['celltype_' + newCellType];
		}
*/

		// if the current cell is a, b, or c...
		if ( newCellType == 'a' || newCellType == 'b' || newCellType == 'c' ) {
			newCellTypeData = cellTypesSpecial['celltype_' + newCellType];
		} else {
			newCellTypeData = cellTypesBasic['celltype_' + newCellType];
		}

		// print the new cell information to the screen
		printStats(newCellTypeData, newCellType);

		// if there is a value provided for _prevSector
		if (_prevSector) {
			prevSectorNumber = parseInt(_prevSector) - 1;
			console.log('youAreHere prevSectorNumber: ' + prevSectorNumber);
			$gridCells.eq(prevSectorNumber).removeClass('grid_cell-current');
		}

		// add 'grid_cell-current' to the current cell
		$gridCells.eq(newCellIndex).addClass('grid_cell-current');

	}


	/* Trillion (child): Player Cell Traversal
	---------------------------------------------------------------------------- */
	function playerTravel() {

		var $travelLinks = $('a.travel_link');

		// setup variables for click function
		var currentCellNumber,
			$currentCellElement,
			$currentRowElement,
			currentRowPos,
			currentColumnPos,
			updateSector,
			updateRow,
			updateColumn,
			thisDirection;

		$travelLinks.on('click', function() {

			// current cell data
			currentCellNumber   = parseInt( $mapGrid.attr('data-currentSector') );
			$currentCellElement = $gridCells.eq(currentCellNumber - 1);

			// current row data
			$currentRowElement = $currentCellElement.parent();
			currentRowPos      = parseInt( $currentRowElement.attr('data-row') );

			// current column data
			currentColumnPos = parseInt( $currentCellElement.attr('data-column') );

			// the clicked direction
			thisDirection = $(this).attr('data-direction');

			if (thisDirection == 'up' && currentRowPos > 1) {

				updateSector = currentCellNumber - 10;
				updateRow    = currentRowPos - 1;
				updateColumn = currentColumnPos;

			} else if (thisDirection == 'down' && currentRowPos < 10) {

				updateSector = currentCellNumber + 10;
				updateRow    = currentRowPos + 1;
				updateColumn = currentColumnPos;

			} else if (thisDirection == 'left' && currentColumnPos > 1) {

				updateSector = currentCellNumber - 1;
				updateRow    = currentRowPos;
				updateColumn = currentColumnPos - 1;

			} else if (thisDirection == 'right' && currentColumnPos < 10) {

				updateSector = currentCellNumber + 1;
				updateRow    = currentRowPos;
				updateColumn = currentColumnPos + 1;

			} else {
				console.log('an error has occured');
				return false;
			}

			console.log('updateCoorindates is about to run');
			updateCoordinates(updateSector, updateRow, updateColumn, currentCellNumber);

			return false;

		});

	}


	/* Trillion (child): Print To Stats List
	---------------------------------------------------------------------------- */
	function printStats(_newCellTypeData, _newCellType) {

		// this function will eventually be used to pull in all cell data more dynamically

		$('#stats_type').html(_newCellTypeData['type']);
		$('#stats_content').html(_newCellTypeData['content']);
		$('#stats_num').html(_newCellType);

	}


	/* Trillion (child) [testing purposes only]: Click Cell for Data
	---------------------------------------------------------------------------- */
	function clickCell() {

		var cellTypeData;

		$gridCells.on('click', function() {

			var thisCellType = $(this).attr('data-cellType');

			// if thisCellType is a, b, or c
			if ( thisCellType == 'a' || thisCellType == 'b' || thisCellType == 'c' ) {
				cellTypeData = cellTypesSpecial['celltype_' + thisCellType];
			} else {
				cellTypeData = cellTypesBasic['celltype_' + thisCellType];
			}

			$('#poop_type').html(cellTypeData['type']);
			$('#poop_content').html(cellTypeData['content']);
			$('#poop_num').html(thisCellType);

			return false; // is this necessary for a <td> element?

		});

	}


	/* Window Load: Function Initialization
	---------------------------------------------------------------------------- */
	$window.load(function() {

		// initPreLoader();

		assignGridCells();

		clickCell();

	});


});