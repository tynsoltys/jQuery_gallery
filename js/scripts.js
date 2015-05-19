$(function() {
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

  var galleryLength = $('li.thumbnail').length;
  var galleryIndex = 6;
// Make the splash section "fold" 
// when we click the down arrow OR the splash logo

  $('.splashLogo').on('click',function(e){
    e.preventDefault();
    $("#nav").slideDown(1400, function() {
    });
    $('#splash').slideUp(1400, function() {
      console.log("SLIIIIDERRRYYY");
      });
    });

// Make the splash logo appear when you click on the nav bar

  $('.navBar').on("click", function() {
    $('#splash').slideDown(1400, function() {

    });
  });


// This is for making the thumbnail with border
// appear in the full gallery section

function fullMaker() {
  var isSelected = $("li.selected");
  if (isSelected = true) {
    var nextSrc = $("li.selected a").data('full');
    $("img.mainImage").attr("src", nextSrc);
  }
};

fullMaker();

// This is also for making the full image appear when its thumbnail is clicked on from the carousel


//This returns the LEFT position of the thumbnail
function returnPosition() {
  var caroPosition = $(".selected").position();
  console.log("THE LEFT POSITION IS ",caroPosition.left);
  var caroPositionLeft = caroPosition.left;
  console.log("Again, that value is ",caroPositionLeft);
};


// This is the start of future functionality that 
//brings the thumbnail to the center of the visible 
//carousel container when clicked

// var caroWidth = 0;
// $('li.thumbnail img').each( function(){ 
//   caroWidth += $(this).width(); });

// I am having a really hard time calculating the actual width (not only the visible width) 
// of the entire ul - this would become super easy with this info

//First of all, I need to convert all things to %s or pixels, because I will be 
//using the carouselCounter variable and need it to be consistent so the carousel scroll doesn't get confused
//Then you need to set the left position of the selected image to be left: - (1/2 width of the container) - (1/2 width of selected image) relative to its current position

// var caroContainer = $('.carouselContainer').width();
// var halfContainer = ($('.carouselContainer').width()) * 0.5;

// console.log("the ul.carousel is", caroWidth);
// console.log("the carousel <container></container> is", caroWidth);
// console.log("half of the container is", halfContainer);

// var widthLastImage = $('li.thumbnail:last img').width();
// console.log("widthLastImage is: ", widthLastImage);

// var halfLastImage = (($('li.thumbnail:last img').width()) * 0.5);
// console.log("halfLastImage is: ", halfLastImage);



// var widthFirstImage = $('li.thumbnail:first img').width();
// console.log("widthFirstImage is: ", widthFirstImage);

// var halfFirstImage = (($('li.thumbnail:first img').width()) * 0.5);
// console.log("halfFirstImage is: ", halfFirstImage);



// var widthSelectedImage = $('li.thumbnail.selected img').width();
// console.log("widthSelectedImage is: ", widthSelectedImage);

// var halfSelectedImage = (($('li.thumbnail.selected img').width()) * 0.5);
// console.log("halfSelectedImage is: ", halfSelectedImage);








  $('li.thumbnail a').on('click',function(e){
    e.preventDefault();
    var src = $(this).data('full');
    $('img.mainImage').fadeIn().attr('src',src);
    $('.selected').removeClass('selected');
    $(this).parent('li').addClass("selected");
    halfSelectedImage = (($('li.thumbnail.selected img').width()) * 0.5);
    console.log("the new halfSelectedImage is: ", halfSelectedImage);
    caroShift();
  });

  //fancybox things

  $('a.fancyLink').on('click',function(e){
    e.preventDefault();
    $('.fancybox').addClass("fancyAppear");
    $('.navBar').hide();
  });

  $('.fancybox').on('click', function(e){
    e.preventDefault();
    $(this).toggleClass('fancyAppear');
    $('.navBar').show();
  });

//Select next item (right arrow in gallery section)

  $(".rightArrowContainer a").on("click", function(e) {
    e.preventDefault();
    galleryIndex++;
    console.log(galleryIndex);
    console.log(galleryLength);
    if(galleryIndex < galleryLength) {
      $(".selected").removeClass('selected').next().addClass("selected");
      returnPosition();
      fullMaker();
    }
    else if(galleryIndex >= galleryLength) {
      $(".selected").removeClass('selected');
      $("li.thumbnail:first").addClass('selected');
      galleryIndex = 0;
      returnPosition();
      fullMaker();
    }
    //This is removing the class of selected and applying it to the next guy

  });

// select previous item (left arrow in gallery section)

  $(".leftArrowContainer a").on("click", function(e) {
  e.preventDefault();
  galleryIndex--;
  console.log(galleryIndex);
  console.log(galleryLength);
  if(galleryIndex <= 0 ) {
    $(".selected").removeClass('selected');
    $("li.thumbnail:last").addClass('selected');
    returnPosition();
    galleryIndex = galleryLength;
    fullMaker();
    console.log($("li.thumbnail:last"));
  } else if(galleryIndex <= galleryLength) {
    $(".selected").removeClass('selected').prev().addClass("selected");
    returnPosition();
    fullMaker();
  };

});

// carousel clickers 

var carouselCounter = 0;

$('.leftCarouselArrow a').on("click", function(e) {
  e.preventDefault();
  carouselCounter -= 25;
  $("ul.carousel").animate({ "left" : "-" + carouselCounter + "%"}, "slow");
  console.log("left", carouselCounter + "%");
  if(carouselCounter < 0 ) {
    carouselCounter = 0;
  }; 
});

$('.rightCarouselArrow a').on("click", function(e) {
  e.preventDefault();
  carouselCounter += 25;
  $("ul.carousel").animate({ "left" : "-" + carouselCounter + "%"}, "slow");
  console.log("left", carouselCounter + "%");
  if(carouselCounter > 125) {
    carouselCounter = 125;
  }; 
});








}); //end of document ready



