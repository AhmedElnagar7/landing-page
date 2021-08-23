/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const allSections = document.querySelectorAll("section");
const navUl = document.querySelector("ul");
const frag = document.createDocumentFragment(); // using frag for performance "less num of reflow & repaint"
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
// gallery function



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
// Scroll to anchor ID using scrollTO event
allSections.forEach((elm, index) => {
  const newLi = document.createElement("li"); //creat new li element
  let liName = elm.getAttribute('data-nav'); //get data-nave attribute for using it to edit innerTesxt for eash li
  newLi.innerText = liName; //get li his name
  newLi.classList.add("menu__link"); //add class for li
  // this function to use as listener with event & it make web scroll to the sellection section 
  function scrollFunc(event) { allSections[index].scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" }); };
  newLi.addEventListener("click", scrollFunc); //add event for eash li 
  frag.appendChild(newLi);//append li to frag
});
navUl.appendChild(frag);//append the frag that contain all li to navUl that contain ul 

// Add class 'active' to section when near top of viewport
//select my li and save it in myLi
const myLi = document.querySelectorAll("li");

const callback = function (entries) {
      if(entries[0].isIntersecting){

        // check if section has .active-sec and remove active class from old one , then add to the active one
        allSections.forEach((sec)=> {
          if (sec.classList.contains ("active-section")){
            sec.classList.remove("active-section");
          }
        });
        let activeSec = entries[0].target; 
        activeSec.classList.add("active-section"); 
        
        // check if li has .active-sec-li and remove active class from old one , then add to the active one
        myLi.forEach((link)=> {
          if (link.classList.contains ("active-section-li")){
            link.classList.remove("active-section-li");
          }
          if (link.innerText == activeSec.getAttribute("data-nav")){
            link.classList.add("active-section-li"); 
          }
        });

      };
  };

const sectionOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3
}

allSections.forEach((section) => {
  const sectionObserver = new IntersectionObserver(callback, sectionOptions);
  sectionObserver.observe(section);
});


/**
 * End Main Functions
 *
*/
