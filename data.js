/**
 * data.js — Fast & Health
 * Keep this file as pure data (no DOM work).
 *
 * Image paths (GitHub Pages friendly): no leading slash.
 * - Hero: assets/hero/hero.jpg
 * - Articles: assets/articles/article-1.jpg ... article-5.jpg
 * - Recipes: assets/recipes/recipe-1.jpg ... recipe-30.jpg
 */

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const HOME_ARTICLES = [
  {
    id: "a1",
    title: "Breakfast: small habit, big payoff",
    image: "assets/articles/article-1.jpg",
    body:
`Breakfast is like a gentle “start” button for your day. When you eat something balanced in the morning, you’re more likely to have steady energy and make better food choices later.

The goal isn’t a perfect breakfast — it’s a repeatable one. If you have 2–3 go-to options you enjoy, mornings get much easier.

• Pick a base (yogurt, oats, eggs, toast)
• Add color (fruit or veg)
• Add protein (yogurt, eggs, tuna, chicken)
• Add crunch (nuts, seeds, whole-grain)`,
  },
  {
    id: "a2",
    title: "The simplest formula: protein + fiber",
    image: "assets/articles/article-2.jpg",
    body:
`If you only remember one thing: combine protein and fiber. This combo helps you feel satisfied and supports more stable energy.

Protein examples: Greek yogurt, skyr, eggs, cottage cheese, tuna, chicken.
Fiber examples: oats, whole-grain bread, berries, apples, chia, nuts.

Try building “mix-and-match” breakfasts:
• Yogurt + berries + nuts
• Oats + fruit + seeds
• Eggs + toast + tomatoes
• Wrap + protein + veg`,
  },
  {
    id: "a3",
    title: "Build a balanced plate in 60 seconds",
    image: "assets/articles/article-3.jpg",
    body:
`A balanced breakfast doesn’t need a long recipe. Think of it like a small plate with 3 parts:

1) Protein (eggs, yogurt, cottage cheese, fish)
2) Fiber (oats, fruit, veg, whole-grain bread)
3) Healthy fats (nuts, seeds, avocado, olive oil)

When you hit these 3, you usually feel full longer — and you avoid that “hungry again in 1 hour” feeling.

• Keep staples ready (eggs, yogurt, oats, bread)
• Add quick toppings (tomatoes, berries, nuts, honey)`,
  },
  {
    id: "a4",
    title: "Planning beats willpower (especially on busy weeks)",
    image: "assets/articles/article-4.jpg",
    body:
`Most “bad breakfast” days happen because you’re rushed and unprepared, not because you don’t care about health.

A tiny plan makes mornings smoother:
• Choose 5–7 breakfasts for the week
• Buy ingredients once
• Prep 1–2 things ahead (overnight oats, boiled eggs, chopped fruit)

When breakfast is easy, you’re more consistent — and consistency matters more than perfection.`,
  },
  {
    id: "a5",
    title: "Smart sweet breakfasts (without the sugar crash)",
    image: "assets/articles/article-5.jpg",
    body:
`Sweet breakfasts can be healthy — the trick is to keep them balanced.

Instead of a sugary pastry alone, pair sweetness with protein and fiber:
• Yogurt + fruit + a little honey
• Oats + banana + nuts
• Chia pudding + berries

A small “sweet touch” (honey, cocoa, cinnamon) can make healthy breakfasts feel like a treat — without the crash.`,
  },
];

/**
 * Recipe shape used by app.js:
 * {
 *  id, title, diet, meatType, caloriesPerPortion, minutes, image,
 *  ingredients: string[],
 *  steps: string[],
 *  shopping: { section, name, unit, qty }[]   // qty is per portion
 * }
 *
 * Units are grocery-friendly (pieces, slices, cup, tbsp, handful, pinch).
 */
const RECIPES = [
  {
    id: "r1",
    title: "Greek Yogurt Berry Bowl",
    diet: "vegetarian",
    meatType: "",
    caloriesPerPortion: 320,
    minutes: 5,
    image: "assets/recipes/recipe-1.jpg",
    ingredients: ["Greek yogurt", "Mixed berries", "Granola", "Honey (optional)"],
    steps: ["Add yogurt to a bowl.", "Top with berries and granola.", "Add a small honey drizzle if you like."],
    shopping: [
      { section: "Dairy", name: "Greek yogurt", unit: "cup", qty: 1 },
      { section: "Fruits", name: "Mixed berries", unit: "handful", qty: 1 },
      { section: "Pantry", name: "Granola", unit: "handful", qty: 1 },
      { section: "Pantry", name: "Honey", unit: "tbsp", qty: 1 }
    ]
  },
  {
    id: "r2",
    title: "Overnight Oats (Apple-Cinnamon)",
    diet: "vegetarian",
    meatType: "",
    caloriesPerPortion: 380,
    minutes: 5,
    image: "assets/recipes/recipe-2.jpg",
    ingredients: ["Oats", "Milk (or yogurt)", "Apple", "Cinnamon", "Nuts (optional)"],
    steps: ["Mix oats and milk in a jar.", "Stir in cinnamon.", "Top with diced apple and nuts.", "Chill overnight."],
    shopping: [
      { section: "Grains", name: "Oats", unit: "cup", qty: 1 / 2 },
      { section: "Dairy", name: "Milk", unit: "cup", qty: 1 },
      { section: "Fruits", name: "Apple", unit: "piece", qty: 1 },
      { section: "Spices/Condiments", name: "Cinnamon", unit: "pinch", qty: 1 },
      { section: "Pantry", name: "Nuts", unit: "tbsp", qty: 2 }
    ]
  },
  {
    id: "r3",
    title: "Avocado Tomato Toast",
    diet: "vegetarian",
    meatType: "",
    caloriesPerPortion: 360,
    minutes: 8,
    image: "assets/recipes/recipe-3.jpg",
    ingredients: ["Whole-grain bread", "Avocado", "Cherry tomatoes", "Salt & pepper", "Lemon (optional)"],
    steps: ["Toast the bread.", "Mash avocado and spread on toast.", "Top with sliced tomatoes.", "Season and add lemon if desired."],
    shopping: [
      { section: "Bakery", name: "Whole-grain bread", unit: "slice", qty: 2 },
      { section: "Fruits", name: "Avocado", unit: "piece", qty: 1 },
      { section: "Vegetables", name: "Cherry tomatoes", unit: "handful", qty: 1 },
      { section: "Spices/Condiments", name: "Salt & pepper", unit: "pinch", qty: 1 }
    ]
  },
  {
    id: "r4",
    title: "Banana Peanut Butter Oat Bowl",
    diet: "vegetarian",
    meatType: "",
    caloriesPerPortion: 420,
    minutes: 10,
    image: "assets/recipes/recipe-4.jpg",
    ingredients: ["Oats", "Milk", "Banana", "Peanut butter", "Nuts (optional)"],
    steps: ["Cook oats with milk until creamy.", "Top with sliced banana.", "Add peanut butter and a few nuts."],
    shopping: [
      { section: "Grains", name: "Oats", unit: "cup", qty: 1 / 2 },
      { section: "Dairy", name: "Milk", unit: "cup", qty: 1 },
      { section: "Fruits", name: "Banana", unit: "piece", qty: 1 },
      { section: "Pantry", name: "Peanut butter", unit: "tbsp", qty: 1 },
      { section: "Pantry", name: "Nuts", unit: "tbsp", qty: 2 }
    ]
  },
  {
    id: "r5",
    title: "Cottage Cheese Fruit Cup",
    diet: "vegetarian",
    meatType: "",
    caloriesPerPortion: 300,
    minutes: 5,
    image: "assets/recipes/recipe-5.jpg",
    ingredients: ["Cottage cheese", "Fruit (berries or apple)", "Nuts (optional)"],
    steps: ["Spoon cottage cheese into a bowl.", "Add fruit on top.", "Finish with a few nuts if you like."],
    shopping: [
      { section: "Dairy", name: "Cottage cheese", unit: "cup", qty: 1 },
      { section: "Fruits", name: "Fruit", unit: "handful", qty: 1 },
      { section: "Pantry", name: "Nuts", unit: "tbsp", qty: 1 }
    ]
  },
  {
    id: "r6",
    title: "Spinach & Cheese Omelette",
    diet: "vegetarian",
    meatType: "",
    caloriesPerPortion: 360,
    minutes: 12,
    image: "assets/recipes/recipe-6.jpg",
    ingredients: ["Eggs", "Spinach", "Cheese", "Olive oil", "Salt & pepper"],
    steps: ["Beat eggs and season.", "Sauté spinach briefly.", "Pour eggs into pan, add spinach and cheese.", "Fold and cook until set."],
    shopping: [
      { section: "Dairy", name: "Eggs", unit: "piece", qty: 2 },
      { section: "Vegetables", name: "Spinach", unit: "handful", qty: 1 },
      { section: "Dairy", name: "Cheese", unit: "handful", qty: 1 },
      { section: "Pantry", name: "Olive oil", unit: "tbsp", qty: 1 }
    ]
  },
  {
    id: "r7",
    title: "Tomato Basil Scrambled Eggs",
    diet: "vegetarian",
    meatType: "",
    caloriesPerPortion: 320,
    minutes: 10,
    image: "assets/recipes/recipe-7.jpg",
    ingredients: ["Eggs", "Cherry tomatoes", "Fresh basil", "Butter (or oil)", "Salt & pepper"],
    steps: ["Whisk eggs with salt and pepper.", "Sauté tomatoes briefly.", "Scramble eggs gently.", "Finish with basil."],
    shopping: [
      { section: "Dairy", name: "Eggs", unit: "piece", qty: 2 },
      { section: "Vegetables", name: "Cherry tomatoes", unit: "handful", qty: 1 },
      { section: "Spices/Condiments", name: "Fresh basil", unit: "handful", qty: 1 },
      { section: "Dairy", name: "Butter", unit: "tbsp", qty: 1 }
    ]
  },
  {
    id: "r8",
    title: "Chia Pudding (Berry)",
    diet: "vegetarian",
    meatType: "",
    caloriesPerPortion: 330,
    minutes: 5,
    image: "assets/recipes/recipe-8.jpg",
    ingredients: ["Chia seeds", "Milk", "Berries", "Honey (optional)"],
    steps: ["Mix chia seeds with milk.", "Chill at least 2 hours (or overnight).", "Top with berries and honey."],
    shopping: [
      { section: "Pantry", name: "Chia seeds", unit: "tbsp", qty: 2 },
      { section: "Dairy", name: "Milk", unit: "cup", qty: 1 },
      { section: "Fruits", name: "Berries", unit: "handful", qty: 1 },
      { section: "Pantry", name: "Honey", unit: "tbsp", qty: 1 }
    ]
  },
  {
    id: "r9",
    title: "Warm Porridge with Pear & Nuts",
    diet: "vegetarian",
    meatType: "",
    caloriesPerPortion: 400,
    minutes: 12,
    image: "assets/recipes/recipe-9.jpg",
    ingredients: ["Oats", "Milk", "Pear", "Nuts", "Cinnamon"],
    steps: ["Cook oats with milk.", "Slice pear and add on top.", "Sprinkle nuts and cinnamon."],
    shopping: [
      { section: "Grains", name: "Oats", unit: "cup", qty: 1 / 2 },
      { section: "Dairy", name: "Milk", unit: "cup", qty: 1 },
      { section: "Fruits", name: "Pear", unit: "piece", qty: 1 },
      { section: "Pantry", name: "Nuts", unit: "tbsp", qty: 2 },
      { section: "Spices/Condiments", name: "Cinnamon", unit: "pinch", qty: 1 }
    ]
  },
  {
    id: "r10",
    title: "Muesli with Yogurt & Fruit",
    diet: "vegetarian",
    meatType: "",
    caloriesPerPortion: 360,
    minutes: 5,
    image: "assets/recipes/recipe-10.jpg",
    ingredients: ["Muesli", "Yogurt", "Fruit", "Nuts (optional)"],
    steps: ["Add yogurt to a bowl.", "Top with muesli and fruit.", "Add nuts if desired."],
    shopping: [
      { section: "Grains", name: "Muesli", unit: "cup", qty: 1 / 2 },
      { section: "Dairy", name: "Yogurt", unit: "cup", qty: 1 },
      { section: "Fruits", name: "Fruit", unit: "handful", qty: 1 },
      { section: "Pantry", name: "Nuts", unit: "tbsp", qty: 1 }
    ]
  },
  {
    id: "r11",
    title: "Veggie Egg Muffins (Quick Batch)",
    diet: "vegetarian",
    meatType: "",
    caloriesPerPortion: 280,
    minutes: 18,
    image: "assets/recipes/recipe-11.jpg",
    ingredients: ["Eggs", "Bell pepper", "Spinach", "Cheese", "Salt & pepper"],
    steps: ["Beat eggs and season.", "Mix in chopped veg and cheese.", "Bake in muffin tray ~15 minutes."],
    shopping: [
      { section: "Dairy", name: "Eggs", unit: "piece", qty: 2 },
      { section: "Vegetables", name: "Bell pepper", unit: "piece", qty: 1 / 2 },
      { section: "Vegetables", name: "Spinach", unit: "handful", qty: 1 },
      { section: "Dairy", name: "Cheese", unit: "handful", qty: 1 }
    ]
  },
  {
    id: "r12",
    title: "Skyr with Honey & Walnuts",
    diet: "vegetarian",
    meatType: "",
    caloriesPerPortion: 310,
    minutes: 3,
    image: "assets/recipes/recipe-12.jpg",
    ingredients: ["Skyr", "Honey", "Walnuts"],
    steps: ["Spoon skyr into a bowl.", "Add walnuts.", "Drizzle honey lightly."],
    shopping: [
      { section: "Dairy", name: "Skyr", unit: "cup", qty: 1 },
      { section: "Pantry", name: "Walnuts", unit: "tbsp", qty: 2 },
      { section: "Pantry", name: "Honey", unit: "tbsp", qty: 1 }
    ]
  },
  {
    id: "r13",
    title: "Smoked Salmon Cream Cheese Toast",
    diet: "non-vegetarian",
    meatType: "fish",
    caloriesPerPortion: 420,
    minutes: 8,
    image: "assets/recipes/recipe-13.jpg",
    ingredients: ["Rye bread", "Cream cheese", "Smoked salmon", "Lemon", "Dill (optional)"],
    steps: ["Toast bread lightly.", "Spread cream cheese.", "Top with salmon and lemon.", "Add dill if you like."],
    shopping: [
      { section: "Bakery", name: "Rye bread", unit: "slice", qty: 2 },
      { section: "Dairy", name: "Cream cheese", unit: "tbsp", qty: 2 },
      { section: "Meat/Fish", name: "Smoked salmon", unit: "handful", qty: 1 },
      { section: "Fruits", name: "Lemon", unit: "piece", qty: 1 / 2 }
    ]
  },
  {
    id: "r14",
    title: "Chicken & Avocado Breakfast Wrap",
    diet: "non-vegetarian",
    meatType: "chicken",
    caloriesPerPortion: 480,
    minutes: 15,
    image: "assets/recipes/recipe-14.jpg",
    ingredients: ["Tortilla wrap", "Cooked chicken", "Avocado", "Tomato", "Yogurt sauce (optional)"],
    steps: ["Warm tortilla.", "Add chicken, avocado, tomato.", "Roll tight. Slice and serve."],
    shopping: [
      { section: "Bakery", name: "Tortilla wrap", unit: "piece", qty: 1 },
      { section: "Meat/Fish", name: "Cooked chicken", unit: "handful", qty: 1 },
      { section: "Fruits", name: "Avocado", unit: "piece", qty: 1 / 2 },
      { section: "Vegetables", name: "Tomato", unit: "piece", qty: 1 }
    ]
  },
  {
    id: "r15",
    title: "Beef & Egg Breakfast Sandwich",
    diet: "non-vegetarian",
    meatType: "beef",
    caloriesPerPortion: 520,
    minutes: 18,
    image: "assets/recipes/recipe-15.jpg",
    ingredients: ["Bread roll", "Beef slices", "Egg", "Leafy greens", "Mustard (optional)"],
    steps: ["Cook egg to your liking.", "Warm beef slices.", "Assemble sandwich with greens.", "Add mustard if desired."],
    shopping: [
      { section: "Bakery", name: "Bread roll", unit: "piece", qty: 1 },
      { section: "Meat/Fish", name: "Beef slices", unit: "handful", qty: 1 },
      { section: "Dairy", name: "Egg", unit: "piece", qty: 1 },
      { section: "Vegetables", name: "Leafy greens", unit: "handful", qty: 1 }
    ]
  },
  {
    id: "r16",
    title: "Tuna & Egg Protein Bowl",
    diet: "non-vegetarian",
    meatType: "fish",
    caloriesPerPortion: 430,
    minutes: 12,
    image: "assets/recipes/recipe-16.jpg",
    ingredients: ["Tuna (canned)", "Egg", "Cucumber", "Cherry tomatoes", "Olive oil"],
    steps: ["Boil egg (or use pre-boiled).", "Mix tuna with a bit of olive oil.", "Add veg and egg on top."],
    shopping: [
      { section: "Meat/Fish", name: "Tuna", unit: "can", qty: 1 },
      { section: "Dairy", name: "Egg", unit: "piece", qty: 1 },
      { section: "Vegetables", name: "Cucumber", unit: "piece", qty: 1 / 2 },
      { section: "Vegetables", name: "Cherry tomatoes", unit: "handful", qty: 1 },
      { section: "Pantry", name: "Olive oil", unit: "tbsp", qty: 1 }
    ]
  },
  {
    id: "r17",
    title: "Eggs with Turkey/Pork Ham & Tomatoes",
    diet: "non-vegetarian",
    meatType: "pork",
    caloriesPerPortion: 470,
    minutes: 12,
    image: "assets/recipes/recipe-17.jpg",
    ingredients: ["Eggs", "Ham slices", "Tomatoes", "Olive oil", "Salt & pepper"],
    steps: ["Sear ham briefly.", "Cook eggs (scramble or fried).", "Serve with tomatoes and seasoning."],
    shopping: [
      { section: "Dairy", name: "Eggs", unit: "piece", qty: 2 },
      { section: "Meat/Fish", name: "Ham slices", unit: "handful", qty: 1 },
      { section: "Vegetables", name: "Tomatoes", unit: "piece", qty: 1 },
      { section: "Pantry", name: "Olive oil", unit: "tbsp", qty: 1 }
    ]
  },
  {
    id: "r18",
    title: "Lamb Sausage & Egg Plate",
    diet: "non-vegetarian",
    meatType: "lamb",
    caloriesPerPortion: 560,
    minutes: 18,
    image: "assets/recipes/recipe-18.jpg",
    ingredients: ["Lamb sausage", "Eggs", "Tomatoes", "Greens"],
    steps: ["Cook sausage until browned.", "Cook eggs.", "Serve with tomatoes and greens."],
    shopping: [
      { section: "Meat/Fish", name: "Lamb sausage", unit: "piece", qty: 2 },
      { section: "Dairy", name: "Eggs", unit: "piece", qty: 2 },
      { section: "Vegetables", name: "Tomatoes", unit: "piece", qty: 1 },
      { section: "Vegetables", name: "Greens", unit: "handful", qty: 1 }
    ]
  },
  {
    id: "r19",
    title: "Berry Smoothie (Protein-Style)",
    diet: "vegetarian",
    meatType: "",
    caloriesPerPortion: 380,
    minutes: 6,
    image: "assets/recipes/recipe-19.jpg",
    ingredients: ["Greek yogurt", "Berries", "Milk", "Chia seeds (optional)"],
    steps: ["Blend yogurt, berries, and milk until smooth.", "Add chia seeds if desired.", "Serve cold."],
    shopping: [
      { section: "Dairy", name: "Greek yogurt", unit: "cup", qty: 1 },
      { section: "Fruits", name: "Berries", unit: "handful", qty: 2 },
      { section: "Dairy", name: "Milk", unit: "cup", qty: 1 / 2 },
      { section: "Pantry", name: "Chia seeds", unit: "tbsp", qty: 1 }
    ]
  },
  {
    id: "r20",
    title: "Caprese Breakfast Toast",
    diet: "vegetarian",
    meatType: "",
    caloriesPerPortion: 390,
    minutes: 10,
    image: "assets/recipes/recipe-20.jpg",
    ingredients: ["Whole-grain bread", "Mozzarella", "Tomatoes", "Basil", "Olive oil"],
    steps: ["Toast bread.", "Top with mozzarella and tomatoes.", "Add basil and olive oil."],
    shopping: [
      { section: "Bakery", name: "Whole-grain bread", unit: "slice", qty: 2 },
      { section: "Dairy", name: "Mozzarella", unit: "handful", qty: 1 },
      { section: "Vegetables", name: "Tomatoes", unit: "piece", qty: 1 },
      { section: "Spices/Condiments", name: "Basil", unit: "handful", qty: 1 },
      { section: "Pantry", name: "Olive oil", unit: "tbsp", qty: 1 }
    ]
  },
  {
    id: "r21",
    title: "Sardines on Rye with Lemon",
    diet: "non-vegetarian",
    meatType: "fish",
    caloriesPerPortion: 440,
    minutes: 8,
    image: "assets/recipes/recipe-21.jpg",
    ingredients: ["Rye bread", "Sardines", "Lemon", "Cucumber (optional)", "Pepper"],
    steps: ["Toast rye lightly.", "Top with sardines.", "Finish with lemon and pepper.", "Add cucumber if you like."],
    shopping: [
      { section: "Bakery", name: "Rye bread", unit: "slice", qty: 2 },
      { section: "Meat/Fish", name: "Sardines", unit: "can", qty: 1 },
      { section: "Fruits", name: "Lemon", unit: "piece", qty: 1 / 2 },
      { section: "Vegetables", name: "Cucumber", unit: "piece", qty: 1 / 2 }
    ]
  },
  {
    id: "r22",
    title: "Chicken & Veggie Egg Scramble",
    diet: "non-vegetarian",
    meatType: "chicken",
    caloriesPerPortion: 480,
    minutes: 15,
    image: "assets/recipes/recipe-22.jpg",
    ingredients: ["Eggs", "Cooked chicken", "Bell pepper", "Spinach", "Olive oil"],
    steps: ["Sauté veg briefly.", "Add chicken to warm through.", "Scramble eggs into the pan until set."],
    shopping: [
      { section: "Dairy", name: "Eggs", unit: "piece", qty: 2 },
      { section: "Meat/Fish", name: "Cooked chicken", unit: "handful", qty: 1 },
      { section: "Vegetables", name: "Bell pepper", unit: "piece", qty: 1 / 2 },
      { section: "Vegetables", name: "Spinach", unit: "handful", qty: 1 },
      { section: "Pantry", name: "Olive oil", unit: "tbsp", qty: 1 }
    ]
  },
  {
    id: "r23",
    title: "Beef & Tomato Breakfast Wrap",
    diet: "non-vegetarian",
    meatType: "beef",
    caloriesPerPortion: 520,
    minutes: 15,
    image: "assets/recipes/recipe-23.jpg",
    ingredients: ["Tortilla wrap", "Beef slices", "Tomato", "Leafy greens", "Yogurt sauce (optional)"],
    steps: ["Warm tortilla.", "Add beef, tomato, greens.", "Roll tight and slice."],
    shopping: [
      { section: "Bakery", name: "Tortilla wrap", unit: "piece", qty: 1 },
      { section: "Meat/Fish", name: "Beef slices", unit: "handful", qty: 1 },
      { section: "Vegetables", name: "Tomato", unit: "piece", qty: 1 },
      { section: "Vegetables", name: "Leafy greens", unit: "handful", qty: 1 }
    ]
  },
  {
    id: "r24",
    title: "Hummus & Cucumber Toast",
    diet: "vegetarian",
    meatType: "",
    caloriesPerPortion: 360,
    minutes: 8,
    image: "assets/recipes/recipe-24.jpg",
    ingredients: ["Whole-grain bread", "Hummus", "Cucumber", "Olive oil", "Pepper"],
    steps: ["Toast bread.", "Spread hummus.", "Top with cucumber slices.", "Finish with olive oil and pepper."],
    shopping: [
      { section: "Bakery", name: "Whole-grain bread", unit: "slice", qty: 2 },
      { section: "Pantry", name: "Hummus", unit: "tbsp", qty: 3 },
      { section: "Vegetables", name: "Cucumber", unit: "piece", qty: 1 / 2 },
      { section: "Pantry", name: "Olive oil", unit: "tbsp", qty: 1 }
    ]
  },
  {
    id: "r25",
    title: "Quick Apple & Cheese Plate",
    diet: "vegetarian",
    meatType: "",
    caloriesPerPortion: 340,
    minutes: 5,
    image: "assets/recipes/recipe-25.jpg",
    ingredients: ["Apple", "Cheese", "Nuts (optional)"],
    steps: ["Slice apple.", "Add cheese alongside.", "Add a few nuts if desired."],
    shopping: [
      { section: "Fruits", name: "Apple", unit: "piece", qty: 1 },
      { section: "Dairy", name: "Cheese", unit: "handful", qty: 1 },
      { section: "Pantry", name: "Nuts", unit: "tbsp", qty: 1 }
    ]
  },
  {
    id: "r26",
    title: "Pork Ham & Egg Rice Bowl",
    diet: "non-vegetarian",
    meatType: "pork",
    caloriesPerPortion: 540,
    minutes: 18,
    image: "assets/recipes/recipe-26.jpg",
    ingredients: ["Cooked rice", "Pork ham", "Eggs", "Spring onion (optional)", "Soy sauce (optional)"],
    steps: ["Warm rice.", "Sear ham pieces briefly.", "Cook eggs (scramble or fried).", "Assemble bowl and add spring onion."],
    shopping: [
      { section: "Grains", name: "Cooked rice", unit: "cup", qty: 1 },
      { section: "Meat/Fish", name: "Pork ham", unit: "handful", qty: 1 },
      { section: "Dairy", name: "Eggs", unit: "piece", qty: 2 },
      { section: "Vegetables", name: "Spring onion", unit: "handful", qty: 1 },
      { section: "Pantry", name: "Soy sauce", unit: "tbsp", qty: 1 }
    ]
  },
  {
    id: "r27",
    title: "Ricotta Toast with Berries",
    diet: "vegetarian",
    meatType: "",
    caloriesPerPortion: 420,
    minutes: 8,
    image: "assets/recipes/recipe-27.jpg",
    ingredients: ["Whole-grain bread", "Ricotta", "Berries", "Honey", "Nuts (optional)"],
    steps: ["Toast bread.", "Spread ricotta.", "Top with berries.", "Add honey and nuts if desired."],
    shopping: [
      { section: "Bakery", name: "Whole-grain bread", unit: "slice", qty: 2 },
      { section: "Dairy", name: "Ricotta", unit: "tbsp", qty: 3 },
      { section: "Fruits", name: "Berries", unit: "handful", qty: 1 },
      { section: "Pantry", name: "Honey", unit: "tbsp", qty: 1 },
      { section: "Pantry", name: "Nuts", unit: "tbsp", qty: 1 }
    ]
  },
  {
    id: "r28",
    title: "Egg + Smoked Salmon Mini Plate",
    diet: "non-vegetarian",
    meatType: "fish",
    caloriesPerPortion: 460,
    minutes: 12,
    image: "assets/recipes/recipe-28.jpg",
    ingredients: ["Eggs", "Smoked salmon", "Cucumber", "Avocado (optional)", "Lemon"],
    steps: ["Boil eggs (or use pre-boiled).", "Arrange salmon, cucumber, and eggs on a plate.", "Finish with lemon."],
    shopping: [
      { section: "Dairy", name: "Eggs", unit: "piece", qty: 2 },
      { section: "Meat/Fish", name: "Smoked salmon", unit: "handful", qty: 1 },
      { section: "Vegetables", name: "Cucumber", unit: "piece", qty: 1 / 2 },
      { section: "Fruits", name: "Lemon", unit: "piece", qty: 1 / 2 },
      { section: "Fruits", name: "Avocado", unit: "piece", qty: 1 / 2 }
    ]
  },
  {
    id: "r29",
    title: "Warm Oatmeal with Cocoa & Banana",
    diet: "vegetarian",
    meatType: "",
    caloriesPerPortion: 430,
    minutes: 12,
    image: "assets/recipes/recipe-29.jpg",
    ingredients: ["Oats", "Milk", "Cocoa", "Banana", "Nuts (optional)"],
    steps: ["Cook oats with milk.", "Stir in cocoa.", "Top with banana and nuts."],
    shopping: [
      { section: "Grains", name: "Oats", unit: "cup", qty: 1 / 2 },
      { section: "Dairy", name: "Milk", unit: "cup", qty: 1 },
      { section: "Pantry", name: "Cocoa", unit: "tbsp", qty: 1 },
      { section: "Fruits", name: "Banana", unit: "piece", qty: 1 },
      { section: "Pantry", name: "Nuts", unit: "tbsp", qty: 1 }
    ]
  },
  {
    id: "r30",
    title: "Simple Breakfast Parfait",
    diet: "vegetarian",
    meatType: "",
    caloriesPerPortion: 360,
    minutes: 5,
    image: "assets/recipes/recipe-30.jpg",
    ingredients: ["Yogurt", "Granola", "Berries", "Chia seeds (optional)"],
    steps: ["Layer yogurt and granola in a glass.", "Top with berries.", "Add chia seeds if desired."],
    shopping: [
      { section: "Dairy", name: "Yogurt", unit: "cup", qty: 1 },
      { section: "Pantry", name: "Granola", unit: "handful", qty: 1 },
      { section: "Fruits", name: "Berries", unit: "handful", qty: 1 },
      { section: "Pantry", name: "Chia seeds", unit: "tbsp", qty: 1 }
    ]
  }
];
