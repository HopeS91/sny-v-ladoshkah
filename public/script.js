"use strict";var dropdown=document.querySelectorAll(".dropdown"),burgerSpans=document.querySelectorAll("#burger span"),dropdownMenu=document.getElementById("drop-menu");function toggleBurger(e){burgerSpans[0].classList.toggle("span-one-active"),burgerSpans[2].classList.toggle("span-three-active"),setTimeout(function(){burgerSpans[1].classList.toggle("span-two-active")},200),e.target.closest("#burger")?showDropdown():hideDropdown()}function showDropdown(){dropdownMenu.style.display="block"}function hideDropdown(){dropdownMenu.style.display="none"}dropdown.forEach(function(e){return e.addEventListener("click",toggleBurger)});var anchorElements=document.querySelectorAll('[href^="#"]');function scrollToAnchor(e){e.preventDefault();var o=1,r=window.pageYOffset,i=this.href.replace(/[^#]*(.*)/,"$1"),s=document.querySelector(i).getBoundingClientRect().top,d=null;requestAnimationFrame(function e(n){null===d&&(d=n);var t=n-d;var l=null;l=s<0?Math.max(r-t/o,r+s):Math.min(r+t/o,r+s);window.scrollTo(0,l);l!==r+s?requestAnimationFrame(e):location.hash=i})}anchorElements.forEach(function(e){return e.addEventListener("click",scrollToAnchor)});var arrowUp=document.getElementById("arrow-up");function showHideArrowUp(){window.pageYOffset>window.innerHeight/3?arrowUp.style.display="inline-block":0===window.pageYOffset&&(arrowUp.style.display="none")}window.addEventListener("scroll",showHideArrowUp);var photoIcons=document.querySelectorAll(".photo-icon"),back=document.getElementById("back"),slides=document.querySelectorAll(".slide"),dots=document.querySelectorAll(".dot"),prevSlide=document.querySelector(".prev-slide"),nextSlide=document.querySelector(".next-slide"),closeIcon=document.getElementById("close"),mainSlide=null,start=null;function showFirstSlide(){back.style.display="block";var t=this.getAttribute("alt"),l=null;slides.forEach(function(e,n){l=e.getAttribute("alt"),e.style.display="none",t===l&&(e.style.display="block",start=mainSlide=n,currentSlide(mainSlide)),0===start?prevSlide.style.display="none":start===photoIcons.length-1?nextSlide.style.display="none":(prevSlide.style.display="block",nextSlide.style.display="block")})}function moveSlides(e){mainSlide+=e,prevSlide.style.display=mainSlide<1?"none":"block",mainSlide>slides.length-2?nextSlide.style.display="none":nextSlide.style.display="block",slides.forEach(function(e){return e.style.display="none"});for(var n=start;n<slides.length;n++)slides[mainSlide].style.display="block",currentSlide(mainSlide)}function currentSlide(){dots.forEach(function(e){return e.style.backgroundColor="#ccc"});for(var e=start;e<dots.length;e++)dots[mainSlide].style.backgroundColor="#c471a3"}function hideSlides(){start=mainSlide=null,back.style.display="none"}photoIcons.forEach(function(e){return e.addEventListener("click",showFirstSlide)}),closeIcon.addEventListener("click",hideSlides);