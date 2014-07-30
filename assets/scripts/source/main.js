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

			// assign currentRandomInt as html content and data-celltype attribute
			$(this).html(currentRandomInt)
				   .attr('data-celltype', currentRandomInt);

		});

		// now, assign the special cells
		specialGridCells();

	}


/*

	generate basic numbers between 1 and 10
	to fill 100 cells minus the length of special cells
	97 cells need to be filled
	each basic number has a specified priority

*/


	/* Trillion (child): Assign Special Cell Data
	---------------------------------------------------------------------------- */
	function specialGridCells() {

		var specialCellValues = ['a', 'b', 'c'],
			previousCells = [],
			randomCell,
			i = 0;

		// find a position for each special cell until we reach the length of the specialCellValues
		while (i < specialCellValues.length) {

			// '100' is dependent on the number of cells...
			// need a more universal approach to defining this value

			// get a random interger between 100 and 1
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
						  .attr('data-celltype', specialCellValues[i]) // add current iteration of specialCellValues as data-celltype attribute,
						  .addClass('cell_special'); // and apply "cell_special" class

				i++;

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

			var cellDataNum = $(this).attr('data-celltype');

			// apparently, isNaN is not reliable...
			// seems to work for my case, but might want to reconsider
			if ( isNaN(cellDataNum) ) {
				var cellTypeData = cellTypesSpecial['celltype_' + cellDataNum];
			} else {
				var cellTypeData = cellTypesBasic['celltype_' + cellDataNum];
			}

			printStats(cellTypeData, cellDataNum);

			return false; // is this necessary for a <td> element?

		});

	}


	/* Trillion (child): Print To Stats List
	---------------------------------------------------------------------------- */
	function printStats(_cellTypeData, _cellDataNum) {

		// console.log(_cellTypeData);

		// this function will eventually be used to pull in all cell data more dynamically

		$('#stats_type').html(_cellTypeData['type']);
		$('#stats_content').html(_cellTypeData['content']);
		$('#stats_num').html(_cellDataNum);

	}



	function playerTravel() {

		var playerPos = startPos;



/*

	if this is a grid of 100 cells, we know we have 10 columns and 10 rows

	finding adjacent elements is easy enough:
	get 'data-cell' value
	if 1, there is no moving left
	if 10, there is no moving right
	otherwise, both left and right can be made
	- left or right is determined by subtracting or adding 1 to the current 'data-cell' value...
	- but can be achieved using jQuery adjacent selectors

	finding rows above or below:
	go to parent <tr> and get 'data-row' value
	if 1, there is no moving up
	if 10, there is no moving down
	otherwise, both up and down can be made
	- up or down is determined by subtracting or adding 1 to the current 'data-row' value...
	- then finding the <td> within that row with the same 'data-cell' value

*/

	}


	/* Window Load: Function Initialization
	---------------------------------------------------------------------------- */
	$window.load(function() {

		// initPreLoader();

		assignGridCells();

	});


});