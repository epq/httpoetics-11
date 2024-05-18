const signText = ["special deal: buy a coffee, get a free napkin", "huge sale: 2% off 2% milk don't miss out", "exclusive offer: rent an apartment, get a free keychain", "bargain alert: buy an avocado, get second one at only full price", "limited time: buy a sandwich, parking included for 10 minutes", "mega deal: free wifi with every mortgage consultation", "weekend special: purchase a tv and enjoy free air", "amazing offer: pay for two transit rides, get a map for free", "one-time offer: order a pizza and we'll cut it for free"]

const processedText = signText.map(function (text) {
  return text.toUpperCase();
});

const signDiv = document.querySelector('.signs');

processedText.forEach(function (text) {
  // Grammar who? Remove commas from the text
  text = text.replace(/,/g, ''); 

  // Create a div for each sign in the array
  const div = document.createElement('div');
  div.classList.add('sign');

  // If the text includes a colon, split the text into two parts
  if (text.includes(':')) {
    const splitText = text.split(':');
    splitText.forEach(function (part, index) {
      const signTextDiv = document.createElement('div');
      signTextDiv.classList.add('sign-text');

      // If it's the first part (before the colon), add the 'sign-prefix' class
      if (index === 0) {
        signTextDiv.classList.add('sign-prefix');
      }

      const words = part.trim().split(' '); // Split the part into words
      words.forEach(function (word, wordIndex) {
        const span = document.createElement('span'); // Create a span for each word

        // If it's the prefix, add a random number of "!"s before and after the word
        if (index === 0) {
          const randomExclamations = '!' .repeat(Math.floor(Math.random() * 8));
          word = randomExclamations + word + randomExclamations;
        }

        span.textContent = word;

        // Array of classes to randomly assign
        const classes = [
          {name: 'colours', value: ['white','orange', 'yellow']},
          {name: 'sizes', value: ['medium', 'big', 'bigger']},
          {name: 'animations', value: ['pulsating-text', 'spinning-y-axis']}
        ];

        // Only add the random class if it's not the sign-prefix
        if (index !== 0) {
          // Get a random colour and size from the array
          const randomColour = classes[0].value[Math.floor(Math.random() * classes[0].value.length)];
          const randomSize = classes[1].value[Math.floor(Math.random() * classes[1].value.length)];

          // Add the random colour and size to the span
          span.classList.add(randomColour, randomSize);

          // 20% chance of adding an animation
          if (Math.random() < 0.2) {
            const randomAnimation = classes[2].value[Math.floor(Math.random() * classes[2].value.length)];
            span.classList.add(randomAnimation);
          }
        }

        signTextDiv.appendChild(span);

        // Add a space after each word, except the last one
        if (wordIndex !== words.length - 1) {
          signTextDiv.appendChild(document.createTextNode(' '));
        }
      });

      div.appendChild(signTextDiv);
    });
  } else {
    div.textContent = text;
  }

  signDiv.appendChild(div);
});

