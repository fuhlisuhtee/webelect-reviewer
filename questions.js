window.quizQuestions = {
  web: {
    identification: [
      {
        category: "HTML5: Semantic Web Structure",
        question:
          "Give one example of a basic accessibility principle and explain it in one sentence.",
        answers: [
          "Keyboard Accessibility",
          "Clear Content Structure",
          "Meaningful Links",
          "Alternative Text",
          "Proper Headings",
          "Accessible Forms",
          "Text Readability and Contrast",
        ],
        requireOneSentence: true,
        minimumWords: 5,
        hint: "Name one accessibility principle and explain it in exactly one sentence.",
      },
      {
        category: "GROUP 5: PHP Fundamentals for Laravel",
        question: "What is the output of this PHP code?",
        image: "webdev-8.png",
        imageAlt: "PHP code adds 5 and 3, then multiplies the result by 2.",
        answers: ["Very Good"],
        hint: "The output shown for this question is Very Good.",
      },
      {
        category: "GROUP 5: PHP Fundamentals for Laravel",
        question: "What is the output of this PHP code?",
        image: "webdev-9.png",
        imageAlt: "PHP code checks whether a grade of 85 is at least 90 or at least 80.",
        answers: ["16"],
        hint: "The output shown for this question is 16.",
      },
      {
        category: "GROUP 5: PHP Fundamentals for Laravel",
        question: "What is the output of this PHP code?",
        image: "webdev-10.png",
        imageAlt: "PHP code stores grades 85, 90, and 88 in an array and echoes the third grade.",
        answers: ["88"],
        hint: "PHP array indexes start at 0, so index 2 refers to the third grade.",
      },
    ],
    multiple: [
      {
        category: "HTML5: Semantic Web Structure",
        question: "What is the primary tool used by websites to collect data and input from visitors?",
        choices: ["HTML Lists", "HTML Tables", "HTML Forms", "HTML Input"],
        answer: "HTML Forms",
        hint: "Visitors enter and submit information through these.",
      },
      {
        category: "HTML5: Semantic Web Structure",
        question: "Which HTML element is used to define the dominant content of a webpage?",
        choices: ["<article>", "<section>", "<main>", "<aside>"],
        answer: "<main>",
        hint: "This element represents the page's primary content.",
      },
      {
        category: "HTML5: Semantic Web Structure",
        question: "Which is the correct basic syntax for creating a hyperlink in HTML?",
        choices: [
          '<link href="url">link text</link>',
          '<a src="url">link text</a>',
          '<a href="url">link text</a>',
          '<href="url">link text</href>',
        ],
        answer: '<a href="url">link text</a>',
        hint: "A hyperlink uses an anchor element with an href attribute.",
      },
      {
        category: "HTML5: Semantic Web Structure",
        question: "Which is the correct basic syntax for inserting an image in HTML?",
        choices: [
          '<img href="url" alt="text"></img>',
          '<img src="url" alt="text">',
          '<picture src="url">text</picture>',
          '<image src="url" alt="text">',
        ],
        answer: '<img src="url" alt="text">',
        hint: "The img element uses src for the image URL and alt for its text alternative.",
      },
      {
        category: "HTML5: Semantic Web Structure",
        question: "Which is the correct basic syntax for creating a text input field in an HTML form?",
        choices: [
          '<form type="text">name</form>',
          '<input type="text" name="name">',
          '<input text="name">',
          '<text input="name">',
        ],
        answer: '<input type="text" name="name">',
        hint: "An input's type attribute identifies it as a text field.",
      },
      {
        category: "GROUP 9: CSS3 and Responsive Design",
        question: "In CSS specificity, which order correctly ranks from highest to lowest priority?",
        choices: [
          "Inline style > ID selector > Class selector > Element selector",
          "Element selector > Class selector > ID selector > Inline style",
          "ID selector > Inline style > Element selector > Class selector",
          "Class selector > ID selector > Inline style > Element selector",
        ],
        answer: "Inline style > ID selector > Class selector > Element selector",
        hint: "Inline styles have the highest specificity here; element selectors have the lowest.",
      },
      {
        category: "GROUP 9: CSS3 and Responsive Design",
        question:
          "Given p{color:blue;} .highlight{color:green;} #note{color:orange;} and <p id=\"note\" class=\"highlight\">Hello!</p> — what color does the text show?",
        choices: [
          "Blue, because it's the element selector",
          "Green, because .highlight is more specific than p",
          "Orange, because an ID selector is more specific than a class or element selector",
          "It alternates between all three colors",
        ],
        answer:
          "Orange, because an ID selector is more specific than a class or element selector",
        hint: "An ID selector outranks both a class and an element selector.",
      },
      {
        category: "GROUP 9: CSS3 and Responsive Design",
        question: "What is the correct order of layers in the CSS Box Model, from innermost to outermost?",
        choices: [
          "Margin → Border → Padding → Content",
          "Content → Padding → Border → Margin",
          "Padding → Content → Margin → Border",
          "Border → Content → Padding → Margin",
        ],
        answer: "Content → Padding → Border → Margin",
        hint: "Starting at the center, the layers are content, padding, border, and margin.",
      },
      {
        category: "GROUP 9: CSS3 and Responsive Design",
        question: "Why do most developers set box-sizing: border-box globally?",
        choices: [
          "It removes the need for margins entirely",
          "It makes padding and border count inside the declared width, keeping layouts predictable",
          "It automatically makes a layout responsive",
          "It disables the cascade for that element",
        ],
        answer: "It makes padding and border count inside the declared width, keeping layouts predictable",
        hint: "With border-box, the declared width includes the content, padding, and border.",
      },
      {
        category: "GROUP 9: CSS3 and Responsive Design",
        question: "Flexbox is best described as:",
        choices: [
          "A two-dimensional layout system for rows and columns together",
          "A one-dimensional layout system for a single row or column",
          "A CSS framework like Bootstrap",
          "A way to write media queries",
        ],
        answer: "A one-dimensional layout system for a single row or column",
        hint: "Flexbox lays items out along one axis at a time.",
      },
      {
        category: "GROUP 9: CSS3 and Responsive Design",
        question: "Which flex-direction value stacks flex items vertically?",
        choices: ["row", "column", "wrap", "stretch", "space-between"],
        answer: "column",
        hint: "This value makes the main axis vertical.",
      },
      {
        category: "GROUP 9: CSS3 and Responsive Design",
        question: "Compared to Flexbox, CSS Grid is best suited for:",
        choices: [
          "Centering a single button",
          "Whole page layouts and two-dimensional designs like photo galleries or dashboards",
          "Writing media queries",
          "Setting box-sizing rules",
        ],
        answer: "Whole page layouts and two-dimensional designs like photo galleries or dashboards",
        hint: "Grid is designed for two-dimensional row-and-column layouts.",
      },
      {
        category: "GROUP 9: CSS3 and Responsive Design",
        question: 'What does "mobile-first" design mean in the context of media queries?',
        choices: [
          "Writing styles for desktop first, then overriding them for smaller screens",
          "Writing base styles for small screens first, then adding rules for bigger screens using min-width",
          "Only designing for phones and ignoring tablets/desktops",
          "Using max-width queries exclusively",
        ],
        answer:
          "Writing base styles for small screens first, then adding rules for bigger screens using min-width",
        hint: "Start with small-screen styles, then add min-width breakpoints for larger screens.",
      },
      {
        category: "GROUP 9: CSS3 and Responsive Design",
        question: "How does Tailwind CSS differ from Bootstrap 5 according to the comparison slide?",
        choices: [
          "Tailwind provides ready-made components like navbars and modals, while Bootstrap uses utility classes",
          "Tailwind is utility-first (classes like flex, p-4, bg-blue-500) you combine yourself, while Bootstrap gives ready-made components",
          "They are functionally identical frameworks",
          "Bootstrap is only for React/Vue/Laravel projects",
          "Tailwind requires no CSS classes at all",
        ],
        answer:
          "Tailwind is utility-first (classes like flex, p-4, bg-blue-500) you combine yourself, while Bootstrap gives ready-made components",
        hint: "Tailwind is utility-first; Bootstrap includes ready-made components.",
      },
      {
        category: "GROUP 9: CSS3 and Responsive Design",
        question: "According to the slides, can Flexbox and CSS Grid be used together?",
        choices: [
          "No, a page must use only one or the other",
          "Yes — use Grid for the overall page layout, and Flexbox inside individual grid cells",
          "Yes, but only inside media queries",
          "No, Flexbox is deprecated in favor of Grid",
        ],
        answer:
          "Yes — use Grid for the overall page layout, and Flexbox inside individual grid cells",
        hint: "Grid and Flexbox complement each other and can be nested.",
      },
      {
        category: "GROUP 5: PHP Fundamentals for Laravel",
        question: "Which symbol must be placed at the beginning of every variable name in PHP?",
        choices: ["@", "#", "$", "&"],
        answer: "$",
        hint: "PHP variable names begin with the dollar sign.",
      },
      {
        category: "GROUP 5: PHP Fundamentals for Laravel",
        question: "Which PHP variable is used to retrieve data sent using the GET method?",
        choices: ["$_FORM", "$_SESSION", "$_GET", "$_POST"],
        answer: "$_GET",
        hint: "It is the superglobal named for the HTTP method.",
      },
      {
        category: "GROUP 5: PHP Fundamentals for Laravel",
        question:
          'A form uses method="GET" and has an input with name="search". If the user enters laptop, which URL most likely represents the submitted data?',
        choices: [
          "website.com/search.php#search=laptop",
          "website.com/search.php/laptop?method=GET",
          "website.com/search.php/laptop",
          "website.com/search.php?search=laptop",
        ],
        answer: "website.com/search.php?search=laptop",
        hint: "GET form values are sent in the URL's query string.",
      },
      {
        category: "GROUP 5: PHP Fundamentals for Laravel",
        question: "What is an unexpected problem that occurs while a PHP script is running?",
        choices: ["Exception", "Input handling", "Classes", "Syntax Error"],
        answer: "Exception",
        hint: "This is a runtime problem that can be thrown and handled.",
      },
      {
        category: "GROUP 5: PHP Fundamentals for Laravel",
        question: "Which PHP superglobal is used to access form data submitted using the POST method?",
        choices: ["$_GET", "$_POST", "$_SESSION", "$_FORM"],
        answer: "$_POST",
        hint: "This superglobal accesses data sent in the body of a POST request.",
      },
      {
        category: "GROUP 5: PHP Fundamentals for Laravel",
        question: "Which is a blueprint of code designed to define properties and methods?",
        choices: ["PHP Class", "PHP Room", "PHP Objects", "PHP Functions"],
        answer: "PHP Class",
        hint: "Objects are created from this blueprint.",
      },
      {
        category: "GROUP 5: PHP Fundamentals for Laravel",
        question: "What helps make code structured, organized, and easier to autoload?",
        choices: ["Namespaces", "Library", "Connection", "Storage"],
        answer: "Namespaces",
        hint: "They organize names and help avoid naming conflicts in PHP.",
      },
    ],
  },
  ml: {
    identification: [],
    multiple: [
      {
        category: "DATASETS AND MACHINE LEARNING WORKFLOW",
        question:
          "It is a large group of files or information that does not follow a predefined data model, schema, or organized table format.",
        choices: ["Unstructured data", "Semi-struchtured data", "Unstructured deta", "Semi-structured data"],
        answer: "Unstructured data",
        hint: "This kind of data does not have a predefined schema or organized tabular structure.",
      },
      {
        category: "DATASETS AND MACHINE LEARNING WORKFLOW",
        question: 'What does "API" stand for?',
        choices: [
          "Ang Pasko I...sumapit",
          "Application Porgramming Interface",
          "Application Programming Interface",
          "Application Progranning Interface",
        ],
        answer: "Application Programming Interface",
        hint: "API stands for Application Programming Interface.",
      },
      {
        category: "DATASETS AND MACHINE LEARNING WORKFLOW",
        question:
          "Extreme data points that deviate significantly from the rest of the distribution and distort a model's loss function or training weights.",
        choices: ["Outliers", "Typographical errors", "Inconsistent formats", "Incorrect values"],
        answer: "Outliers",
        hint: "These unusually distant data points can skew a model.",
      },
      {
        category: "DATASETS AND MACHINE LEARNING WORKFLOW",
        question:
          'In "Remove Records", delete rows/columns with null values is best when missing data is minimal or how much?',
        choices: ["<.3%", "<.5%", "<3%", "<5%"],
        answer: "<5%",
        hint: "This rule of thumb removes records when the missing data is below five percent.",
      },
      {
        category: "DATASETS AND MACHINE LEARNING WORKFLOW",
        question: "What is the best example of categorical data?",
        choices: ["Stock prices", "Gender", "Daily sales", "Age"],
        answer: "Gender",
        hint: "Categorical data represents groups or labels rather than measured amounts.",
      },
      {
        category: "DATASETS AND MACHINE LEARNING WORKFLOW",
        question:
          "Collections of information grouped by a topic that are freely available for anyone to use, analyze, and share.",
        choices: ["Primary Data", "Secondary Data", "Public datasets", "Databases"],
        answer: "Public datasets",
        hint: "These datasets are openly available for public use.",
      },
      {
        category: "DATASETS AND MACHINE LEARNING WORKFLOW",
        question:
          "It is the initial step in data analysis where we examine the data to understand what it contains, discover patterns, and identify possible problems.",
        choices: ["Data Explanation", "Data Gathering", "Data Exploration", "Data Analysis"],
        answer: "Data Exploration",
        hint: "This initial step explores the contents, patterns, and possible issues in data.",
      },
      {
        category: "DATASETS AND MACHINE LEARNING WORKFLOW",
        question: 'What does "EDA" stand for?',
        choices: [
          "Exam Daw AAAAAAAAAAAAA",
          "Electronic Design Automation",
          "Event-Driven Architecture",
          "Exploratory Data Analysis",
        ],
        answer: "Exploratory Data Analysis",
        hint: "EDA is the process of exploring and understanding a dataset.",
      },
      {
        category: "DATASETS AND MACHINE LEARNING WORKFLOW",
        question:
          "Learns or uses a model of the environment’s dynamics to plan actions ahead of time.",
        choices: ["Model-Based RL", "One-Hot Encoding", "Label Encoding", "Model-Free RL"],
        answer: "Model-Based RL",
        hint: "This reinforcement-learning approach uses an environment model to plan.",
      },
      {
        category: "DATASETS AND MACHINE LEARNING WORKFLOW",
        question: "Groups similar data points together based on their relationships.",
        choices: ["Examples", "Targets", "Features", "Clustering"],
        answer: "Clustering",
        hint: "This technique groups similar data points together.",
      },
      {
        category: "GROUP 5: IMAGE CLASSIFICATION",
        question: "What is an epoch?",
        choices: [
          "A sample of data to be fed to a model",
          "A framework",
          "One complete pass through the training dataset",
          "One weight update after processing one batch.",
        ],
        answer: "One complete pass through the training dataset",
        hint: "An epoch is one full pass over all the training examples.",
      },
      {
        category: "GROUP 5: IMAGE CLASSIFICATION",
        question: "What is validation?",
        choices: [
          "How well the model does on a separate set of images it has never seen during weight updates.",
          "How well the model does on the images it's learning from.",
          "Overfitting",
          "Underfitting",
        ],
        answer:
          "How well the model does on a separate set of images it has never seen during weight updates.",
        hint: "Validation evaluates model performance on a separate set not used for weight updates.",
      },
      {
        category: "GROUP 5: IMAGE CLASSIFICATION",
        question:
          "A type of image classification that can be more than 2 categories, but only ONE label per image.",
        choices: ["Binary", "Multi-class", "Multi-lable", "Multi-label"],
        answer: "Multi-class",
        hint: "Each image is assigned one label from multiple possible classes.",
      },
      {
        category: "GROUP 5: IMAGE CLASSIFICATION",
        question: "It is the general family of models used for images.",
        choices: ["CNN", "CBC", "CCC", "COM"],
        answer: "CNN",
        hint: "This convolutional model family is widely used for image tasks.",
      },
      {
        category: "GROUP 5: IMAGE CLASSIFICATION",
        question: "What is the main role of an API Endpoint in machine learning deployment?",
        choices: [
          "To train the model to predict faster and better using GPUs",
          "To convert images into raw CSV files",
          "To provide a specific web address that receives input and returns the model’s prediction",
          "To automatically annotate and clean image inputs from the users",
        ],
        answer:
          "To provide a specific web address that receives input and returns the model’s prediction",
        hint: "An endpoint accepts a request and returns the deployed model's prediction.",
      },
      {
        category: "GROUP 5: IMAGE CLASSIFICATION",
        question:
          "A deployed ML application is tested with 67 users sending prediction requests all at the same time, this is an example of?",
        choices: ["Unit Testing", "Load Testing", "User Acceptance Testing (UAT)", "Model Training"],
        answer: "Load Testing",
        hint: "This test checks how the application handles many simultaneous requests.",
      },
      {
        category: "GROUP 5: IMAGE CLASSIFICATION",
        question:
          "What is the key difference between data preprocessing and data augmentation?",
        choices: [
          "Preprocessing happens after training; augmentation happens before training",
          "They are the same process — the terms are used interchangeably",
          "Preprocessing standardizes existing images; augmentation creates new variations of images to expand the training set",
          "Preprocessing is only used for object detection; augmentation is only used for classification",
        ],
        answer:
          "Preprocessing standardizes existing images; augmentation creates new variations of images to expand the training set",
        hint: "Preprocessing prepares existing images; augmentation creates varied training examples.",
      },
      {
        category: "GROUP 5: IMAGE CLASSIFICATION",
        question:
          "How does labeling speed generally compare between manual labeling and semi-automated labeling?",
        choices: [
          "Manual labeling scales linearly with dataset size since every label is hand-drawn; semi-automated labeling is generally faster since humans only review/correct model-generated draft labels",
          "Semi-automated labeling is only faster for text data, not images",
          "Both approaches take the same amount of time, since a human must always draw the final label regardless of method",
          "Manual labeling is always faster because there's no model inference step involved",
        ],
        answer:
          "Manual labeling scales linearly with dataset size since every label is hand-drawn; semi-automated labeling is generally faster since humans only review/correct model-generated draft labels",
        hint: "Draft labels from a model can reduce how much annotation people must do by hand.",
      },
      {
        category: "GROUP 5: IMAGE CLASSIFICATION",
        question: "When should you use recall?",
        choices: [
          "When the dataset is perfectly balanced and classes are equal",
          "When false negatives are important to avoid",
          "When false positives are more harmful than false negatives",
          "When you want to calculate the total overall accuracy of all predictions",
        ],
        answer: "When false negatives are important to avoid",
        hint: "Recall is especially useful when missing positive cases is costly.",
      },
      {
        category: "GROUP 5: IMAGE CLASSIFICATION",
        question:
          "You are evaluating an image classification model on an imbalanced dataset. The model gets a Precision of 0.80 and a Recall of 0.60. Which of the following is the correct F1-score?",
        choices: ["0.68", "68%", "68.5%", "68.6%"],
        answer: "68.6%",
        hint: "F1 = 2 × (precision × recall) ÷ (precision + recall) = 2 × 0.8 × 0.6 ÷ 1.4 ≈ 0.686.",
      },
      {
        category: "GROUP 3: AUDIO CLASSIFICATION",
        question:
          "The __________ is first captured by the computer, either as a recording or a live stream, and then it is divided into brief segments of a few seconds each.",
        choices: ["Linear Classifier", "Audio Waves", "Audio Datasets"],
        answer: "Audio Waves",
        hint: "A captured sound signal is divided into short segments for processing.",
      },
      {
        category: "GROUP 3: AUDIO CLASSIFICATION",
        question:
          "A kind of deep learning model created to automatically examine and identify patterns in visual data, like a spectrogram.",
        choices: [
          "Convolutional Neural Network Architecture",
          "Flattening & Dense Layers",
          "Annotation Paradigms",
        ],
        answer: "Convolutional Neural Network Architecture",
        hint: "CNNs learn local patterns in image-like inputs such as spectrograms.",
      },
      {
        category: "GROUP 3: AUDIO CLASSIFICATION",
        question:
          "This is how many times the AI looks at your data. If the model is struggling to learn, raise this figure.",
        choices: ["Spectograms", "Audio Features", "Epochs"],
        answer: "Epochs",
        hint: "An epoch is one pass through the training data.",
      },
      {
        category: "GROUP 3: AUDIO CLASSIFICATION",
        question: "In music analysis, ___________ is frequently represented.",
        choices: ["Tempo", "Voice", "Harmonic Content"],
        answer: "Harmonic Content",
        hint: "This represents the frequency components that make up musical tones.",
      },
      {
        category: "GROUP 3: AUDIO CLASSIFICATION",
        question: "Refers to a compilation of audio recordings featuring spoken words and phrases.",
        choices: ["Speech Datasets", "Music Datasets", "Sound Isolation"],
        answer: "Speech Datasets",
        hint: "These datasets contain recordings of spoken language.",
      },
      {
        category: "GROUP 3: AUDIO CLASSIFICATION",
        question: "Which is NOT a Python library that can be used for audio classification?",
        choices: ["TensorFlow", "Keras", "Pandas"],
        answer: "Pandas",
        hint: "This library is primarily for tabular data analysis, not audio classification.",
      },
      {
        category: "GROUP 3: AUDIO CLASSIFICATION",
        question:
          "The first thing they do is turn the sound into a picture called a __________, which looks like a colorful heatmap showing which frequencies are loud or quiet at each moment.",
        choices: ["Spectre", "Feature Maps", "Spectrogram"],
        answer: "Spectrogram",
        hint: "A spectrogram visualizes frequency strength over time.",
      },
      {
        category: "GROUP 3: AUDIO CLASSIFICATION",
        question:
          "The speed at which the signal changes sign; helpful for differentiating between different kinds of sounds, such as music and speech.",
        choices: ["Audio datasets", "Zero-Crossing Rate", "MFCCS"],
        answer: "Zero-Crossing Rate",
        hint: "This feature counts how quickly a signal crosses its zero-amplitude axis.",
      },
      {
        category: "GROUP 3: AUDIO CLASSIFICATION",
        question: "Which step in the CNN Architecture finds local patterns in the input data?",
        choices: ["Flattening & Dense Layers", "Relu function", "Convolutional Layer"],
        answer: "Convolutional Layer",
        hint: "Filters in this layer detect local features and patterns.",
      },
      {
        category: "GROUP 3: AUDIO CLASSIFICATION",
        question:
          "Is the process of teaching an artificial intelligence (AI) or machine learning system to understand, classify, or generate audio data.",
        choices: ["Model training", "Feature Extraction", "Valence"],
        answer: "Model training",
        hint: "Training teaches a model to recognize or generate patterns in audio.",
      },
    ],
  },
};
