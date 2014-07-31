<?php include('includes/site_header.php'); ?>

	<main id="site_content" data-site="main" role="main">

		<section id="intro" class="section_intro">

			<aside id="stats" class="sidebar_stats">

				<h1>Current Cell Data</h1>

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
						<a href="#" id="travel_up" title="Travel Up"></a>
					</li>

					<li class="travel_btn travel_down">
						<a href="#" id="travel_down" title="Travel Down"></a>
					</li>

					<li class="travel_btn travel_left">
						<a href="#" id="travel_left" title="Travel Left"></a>
					</li>

					<li class="travel_btn travel_right">
						<a href="#" id="travel_right" title="Travel Right"></a>
					</li>

				</ul>

			</nav>

		</section>

	</main>

<?php include('includes/site_footer.php'); ?>