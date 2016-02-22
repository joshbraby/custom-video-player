$(document).ready(function() {

	var $video = $("#video-player");
	var $playButton = $("#play-pause");
	var $muteButton = $("#mute");
	var $fullScreenButton = $("#full-screen");
	var $seekBar = $("#seek-bar");
	var $buttonControls = $('.button-controls')
	var $videoControls = $('.video-controls');
	var $videoPlayerContainer = $('.video-player-container');
	
	setInterval(function(){

		var currentPlayTime = $video.get(0).currentTime;
		var totalPlayTime = $video.get(0).duration;

		$('#currentTime').html(formatTime(currentPlayTime));
		$('#totalTime').html(formatTime(totalPlayTime));

	},500)

	  function formatTime(seconds) {
    	minutes = Math.floor(seconds / 60);
	    minutes = (minutes >= 10) ? minutes : "0" + minutes;
	    seconds = Math.floor(seconds % 60);
	    seconds = (seconds >= 10) ? seconds : "0" + seconds;
	    return minutes + ":" + seconds;
	  }

	$playButton.click(function () {
	   if ($video.get(0).paused) {
	       $video.get(0).play();
	       $playButton.find('img').attr('src','icons/pause-icon.png');
	   } else {
	       $video.get(0).pause();
	       $playButton.find('img').attr('src','icons/play-icon.png');
	  }
	});

	$videoPlayerContainer.on("mouseover", function(){

		$buttonControls.css('display','block');
		$videoControls.css('height', '2.5rem');

	});

	$videoPlayerContainer.on("mouseleave", function() {

		if($video.get(0).paused === false) {
			$buttonControls.css('display','none');		
			$videoControls.css('height', '1.25rem');
		}

	});

	$muteButton.click(function () {

		if ($video.get(0).muted == false) {
			$video.get(0).muted = true;
			$muteButton.find('img').attr('src','icons/volume-off-icon.png');
		} else {
			$video.get(0).muted = false;
			$muteButton.find('img').attr('src','icons/volume-on-icon.png');
		}

	});

	$fullScreenButton.click(function() {

		if ($video.get(0).requestFullscreen) {
	    	$video.get(0).requestFullscreen();
		} else if ($video.get(0).mozRequestFullScreen) {
			$video.get(0).mozRequestFullScreen(); // Firefox
		} else if ($video.get(0).webkitRequestFullscreen) {
			$video.get(0).webkitRequestFullscreen(); // Chrome and Safari
		}

	});

	$seekBar.on("change click", function() {

		var time = $video.get(0).duration * ($seekBar.get(0).value / 100);

		$video.get(0).currentTime = time;

	});

	$video.on("timeupdate", function() {

	  var value = (100 / $video.get(0).duration) * $video.get(0).currentTime;

	  $seekBar.get(0).value = value;

	  console.log(value);

	  if (value === 100) {
	  	$playButton.find('img').attr('src','icons/play-icon.png')

	  }

	});

});