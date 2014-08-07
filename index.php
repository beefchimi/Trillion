<?php include('includes/site_header.php'); ?>

	<main id="site_content" data-site="main" role="main">

		<section id="intro" class="section_intro">

			<aside id="stats" class="sidebar_stats">

				<h1>Current Sector Data</h1>

				<ul id="stats_list">

					<li id="stats_type" class="stats_type">...</li>

					<li id="stats_content" class="stats_content"></li>

					<li id="stats_num" class="stats_num"></li>

				</ul>

			</aside>

			<?php include('includes/snips/main_grid-table.php'); ?>

			<nav id="player_travel" class="player_travel">

				<ul class="clearfix">

					<li class="travel_btn travel_up">
						<a href="#" id="travel_up" class="travel_link" data-direction="up" title="Travel Up"></a>
					</li>

					<li class="travel_btn travel_down">
						<a href="#" id="travel_down" class="travel_link" data-direction="down" title="Travel Down"></a>
					</li>

					<li class="travel_btn travel_left">
						<a href="#" id="travel_left" class="travel_link" data-direction="left" title="Travel Left"></a>
					</li>

					<li class="travel_btn travel_right">
						<a href="#" id="travel_right" class="travel_link" data-direction="right" title="Travel Right"></a>
					</li>

				</ul>

			</nav>

			<div id="poop_pad" class="poop_pad">

				<h1>poopPad</h1>

				<ul id="poop_list">

					<li id="poop_type" class="poop_type">...</li>

					<li id="poop_content" class="poop_content"></li>

					<li id="poop_num" class="poop_num"></li>

				</ul>

			</div>

			<form id="command_terminal" class="command_terminal clearfix">

				<label for="command_input" class="visuallyhidden">Command Line</label>
				<input type="text" id="command_input" name="command_input" placeholder="..."/>

				<input type="submit" id="command_submit" value="!" />

			</form>

		</section>

	</main>

<?php include('includes/site_footer.php'); ?>