// Get the user's window width and height
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

// Check if the max-width is 760px
if (windowWidth <= 760) {
  // Change the text to an image
  const textElement = document.getElementById('home-page');
  const imageElement = document.createElement('img');
  imageElement.src = '../../../../assets/img/house.svg';
  textElement.parentNode.replaceChild(imageElement, textElement);
}
