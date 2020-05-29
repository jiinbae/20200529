window.onload = function() {scrollFunction()};
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    var header = document.getElementById('header');

    if(document.documentElement.scrollTop > 70) {
        if(!header.classList.contains('navbar-fixed')) {
            header.classList.add('navbar-fixed');
            document.getElementsByTagName('body')[0].style.marginTop = '70px';
            header.style.display = 'none';
            setTimeout(function(){ /* fade 효과 */
                header.style.display = 'block';
            }, 40);
        }
    } else {
        if(header.classList.contains('navbar-fixed')) {
            header.classList.remove('navbar-fixed');
            document.getElementsByTagName('body')[0].style.marginTop = '0';
        }
    }
}

function menuToggle() {
    document.getElementById('menu').classList.toggle('show');
}

document.getElementById('toggleBtn').addEventListener('click', menuToggle);

/* image */
var imageSlideIndex = 1; /* 현재 노출되어야 하는 이미지 슬라이드 번호 */

showImageSlides(imageSlideIndex);

function imageSlideTimer() {
    plusImageSlides(1);
}

var imageTimer = setInterval(imageSlideTimer, 3000);

function plusImageSlides(n) {
    clearInterval(imageTimer);
    imageTimer = setInterval(imageSlideTimer, 3000);

    showImageSlides(imageSlideIndex += n);
}

function currentImageSlide(n) {
    clearInterval(imageTimer);
    imageTimer = setInterval(imageSlideTimer, 3000);

    showImageSlides(imageSlideIndex = n);
}

function showImageSlides(n) {
    var i;
    var slides = document.getElementsByClassName('image-slide');
    var dots = document.getElementsByClassName('dot');
    if(n > slides.length) {imageSlideIndex = 1}
    if(n <1) {imageSlideIndex = slides.length}
    for(i = 0; i < slides.length; i++){
        slides[i].style.display = 'none';
    }
    for(i = 0; i < dots.length; i++){
        dots[i].className = dots[i].className.replace(' active', '');
    } /* 대체되어 회색에서 흰 색으로 변하지 않게끔 */
    slides[imageSlideIndex-1].style.display = 'block';
    dots[imageSlideIndex-1].className += ' active';
}

document.getElementById('imagePrev').addEventListener('click', plusImageSlides.bind(null, -1)); /* 바로 안 넘겨주기 위해서 bind 처리해서 1로 넘겨주기 */
document.getElementById('imageNext').addEventListener('click', plusImageSlides.bind(null, 1));

document.getElementById('firstDot').addEventListener('click', currentImageSlide.bind(null, 1));
document.getElementById('secondDot').addEventListener('click', currentImageSlide.bind(null, 2));
document.getElementById('thirdDot').addEventListener('click', currentImageSlide.bind(null, 3));
document.getElementById('forthDot').addEventListener('click', currentImageSlide.bind(null, 4));

/* portfolio */
filterSelection('all');

function filterSelection(id) {
  var x, i;

  x = document.getElementsByClassName('listItem');
  for(i=0; i<x.length; i++){
    removeClass(x[i], 'active'); /* 모든 아이템이 비활성화 되었다가 */
  }
  addClass(document.getElementById(id), 'active'); /* 선택한 listItem만 활성화 됨 */

  x = document.getElementsByClassName('filterItem');
  if(id == 'all') id = '';
  for(i=0; i<x.length; i++){
    removeClass(x[i], 'show');
    if(x[i].className.indexOf(id) > -1)  /* id가 존재하거나 공백이라면 */
      addClass(x[i], 'show');
  }
}

function addClass(element, name) {
    if(element.className.indexOf(name) == -1) {
      element.className += " " + name;
    }
}

function removeClass(element, name) {
  var arr;
  arr = element.className.split(" ");

 while(arr.indexOf(name) > -1){ /* name class가 arr에 존재한다면 */
   arr.splice(arr.indexOf(name), 1);
 }
 element.className = arr.join(" ");
}

document.getElementById('all').addEventListener('click', filterSelection.bind(null, 'all'));
document.getElementById('uiux').addEventListener('click', filterSelection.bind(null, 'uiux'));
document.getElementById('java').addEventListener('click', filterSelection.bind(null, 'java'));
document.getElementById('db').addEventListener('click', filterSelection.bind(null, 'db'));

function viewPortfolio(event) {
  var polyNode = event.target;

  if(polyNode.tagName.toLowerCase() == 'i') { polyNode = polyNode.parentNode; }

  var overlayNode = polyNode;
  var imageNode = overlayNode.nextElementSibling;

  var itemNode = overlayNode.parentNode;
  var mainNode = itemNode.nextElementSibling;
  var subNode = mainNode.nextElementSibling;
  var textNode = subNode.nextElementSibling;

  document.getElementById('modalImage').src = imageNode.src;
  document.getElementById('modalMain').innerHTML = mainNode.innerHTML;
  document.getElementById('modalSub').innerHTML = subNode.innerHTML;
  document.getElementById('modalText').innerHTML = textNode.innerHTML;

  document.getElementById('portfolioModal').style.display = 'block';
}

document.getElementById('modalClose').addEventListener('click', function(){
  document.getElementById('portfolioModal').style.display = 'none';
});

var filterItems = document.getElementsByClassName('overlay');

for(var i=0;i<filterItems.length;i++){
  filterItems[i].addEventListener('click', viewPortfolio);
}

/* review */
var reviewSlideIndex = 0;

function reviewSlideTimer() {
  plusReviewSlides(1);
}

var reviewTimer = setInterval(reviewSlideTimer, 3000);

function plusReviewSlides(n) {
  clearInterval(reviewTimer);
  reviewTimer = setInterval(reviewSlideTimer, 3000);
  showReviewSlides(reviewSlideIndex += n);
}

function showReviewSlides(n) {
  var i;
  var review_slides = document.getElementsByClassName('review-slide');

  if (n > review_slides.length - 3) {
    reviewSlideIndex = 0;
  }

  if (n < 0) {
    reviewSlideIndex = review_slides.length - 3;
  }

  for (i = 0; i < review_slides.length; i++) {
    removeClass(review_slides[i], 'show');
    removeClass(review_slides[i], 'res-show');
    addClass(review_slides[i], 'hide');
  }
  
  removeClass(review_slides[reviewSlideIndex], 'hide');
  addClass(review_slides[reviewSlideIndex], 'res-show');
  removeClass(review_slides[reviewSlideIndex+1], 'hide');
  addClass(review_slides[reviewSlideIndex+1], 'show');
  removeClass(review_slides[reviewSlideIndex+2], 'hide');
  addClass(review_slides[reviewSlideIndex+2], 'show');
}

document.getElementById('reviewPrev').addEventListener('click', plusReviewSlides.bind(null,-1));
document.getElementById('reviewNext').addEventListener('click', plusReviewSlides.bind(null,1));

/* navbar2 */
function moveTo(id) {
    if(id == 'brand'){
      window.scrollTo(0, 0);
    } else {
      window.scrollTo(0, document.getElementById(id).offsetTop - 70);
    }
    document.getElementById('menu').classList.remove('show');
  }
  
  document.getElementById('navbarBrand').addEventListener('click', moveTo.bind(null,'brand'));
  document.getElementById('navbarAbout').addEventListener('click', moveTo.bind(null,'about'));
  document.getElementById('navbarService').addEventListener('click', moveTo.bind(null,'service'));
  document.getElementById('navbarPortfolio').addEventListener('click', moveTo.bind(null,'portfolio'));
  document.getElementById('navbarReview').addEventListener('click', moveTo.bind(null,'review'));