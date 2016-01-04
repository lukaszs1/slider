/* JavaScript Document */
var slider ={
	sSize:'',
	width:0,
	mobSize: 700,
	autoPlay: true,
	cSlide:1,
	totalSlides: 0,
	timePassed:0,
	timeToChange:60,
	duration:120,
	inTransition:false,
	slideContent:Array
};

function sliderData () {     
$('.slide_data .slide_panel').each(function(ind){
slider.totalSlides = ind +1;         
var slide_imgl = $(this).attr('data-image')+'_l.jpg';         
var slide_imgs = $(this).attr('data-image')+'_s.jpg';        
var slide_caption=$(this).html();
slider.slideContent[ind] = '<div class="slide" data-image_s="'+slide_imgs+'" style="background-image:url('+slide_imgl+')"><div class="overlay"></div><div class="caption">'+slide_caption+'</div></div>';  
console.log('yessss');
}); 
var sliderTime = setInterval(sliderAdv,100);

} 

function sliderAdv(){
	var sWidth = $('.slide').width();
	var cSize = slider.sSize;
	if (sWidth> slider.mobSize) {
		var newSize='large';
	}
	else {
		var newSize = 'small';
	}
	slider.sSize= newSize;
	if (cSize != newSize) {
		if (slider.sSize=='large') {
			sliderMulti();
		}
	}

	if (slider.timePassed == slider.timeToChange ) {
		slider.timePassed =0;
		if (slider.autoPlay==true) {
			if (slider.cSlide==slider.totalSlides) {
				$('.marquee_nav div:nth-child(1)').trigger('click');
			}
			else
				$('.marquee_nav div:nth-child('+(slider.cSlide+1)+')').trigger('click');
		};

	} else{
		slider.timePassed +=1; 
	}
	//console.dir(slider.timePassed);

}
function sliderMulti() {
	slider.timePassed =0;
	slider.autoPlay = true;
	var newH = '<div class="marquee_stage_large"><div class="mc1"></div><div class="marquee_nav"></div><div class="btn prev"></div><div class="btn next"></div></div>';
	$('.slide').html('').append(newH);

	for (var i = 0; i<slider.totalSlides; i++) {
		$('.marquee_nav').append('<div>x</div>');
	};
	$('.slide').hover(function(){
		slider.autoPlay=false;
	},function(){
		slider.autoPlay=true;
		slider.timePassed= Math.floor(slider.timeToChange /2);
	});
	$('.marquee_nav div').on('click', function(){

		if (slider.inTransition==false ) {
			slider.inTransition=true;

			

			var navClicked = $(this).index();
			slider.cSlide = navClicked +1;

			$('.marquee_nav div').removeClass('active');
			$(this).addClass('active');

			$('.marquee_stage_large').append('<div class="mc2" style="opacity:1"></div>');
			$('.mc2').html(slider.slideContent[navClicked]).animate({opacity:1},slider.duration,function(){
				$('.mc1').remove();
				$(this).addClass('mc1').removeClass('mc2');
				slider.inTransition=false;
			});
		}	
	});
	$('.marquee_nav div:first').trigger('click');
}



$(document).ready(function(){     
	sliderData(); 

});
