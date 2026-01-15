/**
 * data.js
 * All content lives here so it’s easy to edit.
 * In the next steps we will fill:
 * - 5 home articles (title, image, body)
 * - 30 recipes (nutrition, time, diet, ingredients, steps, image)
 */

// Days are fixed (Europe audience; English labels)
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

// Home articles (5 total)
const HOME_ARTICLES = [
  {
    id: "a1",
    title: "Breakfast: small habit, big payoff",
    image: "assets/articles/article-1.jpg",
    body:
`If mornings feel rushed, breakfast often becomes the first thing to disappear. The problem is that skipping breakfast can leave you hungrier later, more likely to grab sugary snacks, and less steady in energy and focus.

The good news: a “healthy breakfast” doesn’t need to be fancy. A few reliable ingredients (like yogurt, oats, eggs, fruit, whole-grain bread, nuts) can cover most mornings.

Fast & Health makes it easy:
• Pick a quick recipe (≤ 20 minutes)
• Plan your week in seconds
• Get a shopping list so you’re never guessing

If you only change one thing, start here: choose 2–3 breakfasts you truly like and repeat them. Consistency beats perfection.`
  },
  {
    id: "a2",
    title: "The simplest formula: protein + fiber",
    image: "assets/articles/article-2.jpg",
    body:
`If you want a breakfast that keeps you full, aim for two building blocks: protein and fiber.

Protein helps you feel satisfied and supports muscle maintenance. Fiber slows digestion and keeps energy steadier. Together, they reduce the “snack crash” that happens after sweet pastries or sugary cereal.

Easy protein options:
• Greek yogurt or skyr
• Eggs
• Cottage cheese
• Beans (yes — even at breakfast)
• Smoked salmon

Easy fiber options:
• Oats or whole-grain bread
• Berries, apples, pears
• Chia/flax seeds
• Nuts
• Vegetables (tomatoes, spinach, peppers)

A quick example:
Yogurt + berries + nuts = protein + fiber + healthy fats in 2 minutes.`
  },
  {
    id: "a3",
    title: "Build a balanced plate in 60 seconds",
    image: "assets/articles/article-3.jpg",
    body:
`When you don’t want to think, use a simple “balanced plate” checklist:

1) A protein base
2) A colorful fruit or vegetable
3) A slow-carb (optional, depending on hunger)
4) A healthy fat (small amount)

Examples:
• Eggs + tomatoes + whole-grain toast + olive oil
• Oats + milk/yogurt + banana + peanut butter
• Cottage cheese + cucumber + rye bread + seeds

Why this helps:
Balanced meals tend to feel more satisfying and support steadier energy. And if you’re short on time, you can pick one item from each category and you’re done.

Fast tip:
Keep one “emergency breakfast” at home (oats + milk + fruit, or yogurt + granola + berries).`
  },
  {
    id: "a4",
    title: "Planning beats willpower (especially on busy weeks)",
    image: "assets/articles/article-4.jpg",
    body:
`Most unhealthy breakfasts aren’t a “knowledge” problem — they’re a planning problem.

When ingredients aren’t ready, the quickest option usually wins (and it’s often not the healthiest). A tiny weekly plan removes that friction.

Try this:
• Choose 5 breakfasts for Monday–Friday
• Repeat 1–2 favorites to keep shopping simple
• Add 1 flexible day (leftovers, fruit + yogurt, or toast + eggs)

Prep ideas that take under 10 minutes:
• Wash fruit once for 3–4 days
• Pre-portion oats, nuts, and seeds in small containers
• Boil eggs for 2–3 mornings
• Chop a few vegetables you like

This website is built around that reality: plan first, then let the shopping list do the work.`
  },
  {
    id: "a5",
    title: "Avoid the ‘healthy’ sugar traps",
    image: "assets/articles/article-5.jpg",
    body:
`Some breakfasts look healthy but act like dessert — they spike hunger quickly and make it harder to stay consistent.

Common traps:
• Sweet pastries (even “small” ones)
• Flavored yogurts with lots of added sugar
• Juice instead of whole fruit
• Granola-heavy bowls with little protein

You don’t need to ban anything. Just “upgrade” it:
• Choose plain yogurt, add fruit + a little honey if needed
• Mix granola with nuts/seeds and keep it to a small handful
• Swap juice for whole fruit (or blend smoothies with protein)
• Pair bread with protein (eggs, cottage cheese, tuna, or nut butter)

If you’re craving sweet:
Keep the sweetness, but anchor it with protein and fiber. That’s the difference.`
  }
];


const RECIPES = [
  // 1
  {
    id: "r1",
    title: "Greek Yogurt Berry Bowl",
    diet: "vegetarian",
    meatType: null,
    caloriesPerPortion: 320,
    minutes: 5,
    image: "assets/recipes/recipe-1.jpg",
    ingredients: ["1 cup Greek yogurt", "1 handful mixed berries", "1 tbsp nuts or seeds", "1 tsp honey (optional)"],
    steps: ["Add yogurt to a bowl.", "Top with berries and nuts/seeds.", "Add honey if you like and enjoy."],
    shopping: [
      { section: "Dairy", name: "Greek yogurt", qty: 1, unit: "cup" },
      { section: "Fruits", name: "Mixed berries", qty: 1, unit: "handful" },
      { section: "Pantry", name: "Nuts or seeds", qty: 1, unit: "tbsp" },
      { section: "Pantry", name: "Honey", qty: 1, unit: "tsp" }
    ]
  },

  // 2
  {
    id: "r2",
    title: "Overnight Oats (Apple-Cinnamon)",
    diet: "vegetarian",
    meatType: null,
    caloriesPerPortion: 380,
    minutes: 5,
    image: "assets/recipes/recipe-2.jpg",
    ingredients: ["1/2 cup oats", "1/2 cup milk", "1/2 apple (diced)", "1 tsp cinnamon", "1 tbsp yogurt (optional)"],
    steps: ["Mix oats and milk in a jar.", "Add apple and cinnamon.", "Chill overnight. Stir and eat in the morning."],
    shopping: [
      { section: "Grains", name: "Oats", qty: 0.5, unit: "cup" },
      { section: "Dairy", name: "Milk", qty: 0.5, unit: "cup" },
      { section: "Fruits", name: "Apple", qty: 0.5, unit: "piece" },
      { section: "Spices/Condiments", name: "Cinnamon", qty: 1, unit: "tsp" },
      { section: "Dairy", name: "Yogurt", qty: 1, unit: "tbsp" }
    ]
  },

  // 3
  {
    id: "r3",
    title: "Avocado Tomato Toast",
    diet: "vegetarian",
    meatType: null,
    caloriesPerPortion: 360,
    minutes: 8,
    image: "assets/recipes/recipe-3.jpg",
    ingredients: ["1–2 slices whole-grain bread", "1/2 avocado", "A few cherry tomatoes", "Salt & pepper", "Lemon (optional)"],
    steps: ["Toast bread.", "Mash avocado with salt/pepper.", "Top toast with avocado and tomatoes. Add lemon if you like."],
    shopping: [
      { section: "Bakery", name: "Whole-grain bread", qty: 2, unit: "slices" },
      { section: "Fruits", name: "Avocado", qty: 0.5, unit: "piece" },
      { section: "Vegetables", name: "Cherry tomatoes", qty: 1, unit: "handful" },
      { section: "Spices/Condiments", name: "Salt & pepper", qty: 1, unit: "pinch" },
      { section: "Fruits", name: "Lemon", qty: 0.25, unit: "piece" }
    ]
  },

  // 4
  {
    id: "r4",
    title: "Banana Peanut Butter Oat Bowl",
    diet: "vegetarian",
    meatType: null,
    caloriesPerPortion: 420,
    minutes: 10,
    image: "assets/recipes/recipe-4.jpg",
    ingredients: ["1/2 cup oats", "1 cup milk or water", "1 banana", "1 tbsp peanut butter", "Cinnamon (optional)"],
    steps: ["Cook oats with milk/water.", "Slice banana on top.", "Swirl in peanut butter. Add cinnamon if desired."],
    shopping: [
      { section: "Grains", name: "Oats", qty: 0.5, unit: "cup" },
      { section: "Dairy", name: "Milk", qty: 1, unit: "cup" },
      { section: "Fruits", name: "Banana", qty: 1, unit: "piece" },
      { section: "Pantry", name: "Peanut butter", qty: 1, unit: "tbsp" },
      { section: "Spices/Condiments", name: "Cinnamon", qty: 1, unit: "pinch" }
    ]
  },

  // 5
  {
    id: "r5",
    title: "Cottage Cheese Fruit Cup",
    diet: "vegetarian",
    meatType: null,
    caloriesPerPortion: 300,
    minutes: 5,
    image: "assets/recipes/recipe-5.jpg",
    ingredients: ["1 cup cottage cheese", "1 handful fruit (berries or peach)", "1 tbsp seeds (optional)"],
    steps: ["Add cottage cheese to a bowl.", "Top with fruit.", "Sprinkle seeds if you like."],
    shopping: [
      { section: "Dairy", name: "Cottage cheese", qty: 1, unit: "cup" },
      { section: "Fruits", name: "Fresh fruit", qty: 1, unit: "handful" },
      { section: "Pantry", name: "Seeds", qty: 1, unit: "tbsp" }
    ]
  },

  // 6
  {
    id: "r6",
    title: "Spinach & Cheese Omelette",
    diet: "vegetarian",
    meatType: null,
    caloriesPerPortion: 410,
    minutes: 12,
    image: "assets/recipes/recipe-6.jpg",
    ingredients: ["2 eggs", "1 handful spinach", "1 small handful grated cheese", "Salt & pepper"],
    steps: ["Beat eggs with salt/pepper.", "Cook spinach briefly.", "Add eggs, cook, add cheese, fold and serve."],
    shopping: [
      { section: "Dairy", name: "Eggs", qty: 2, unit: "pieces" },
      { section: "Vegetables", name: "Spinach", qty: 1, unit: "handful" },
      { section: "Dairy", name: "Cheese", qty: 1, unit: "handful" },
      { section: "Spices/Condiments", name: "Salt & pepper", qty: 1, unit: "pinch" }
    ]
  },

  // 7
  {
    id: "r7",
    title: "Tomato Basil Scrambled Eggs",
    diet: "vegetarian",
    meatType: null,
    caloriesPerPortion: 360,
    minutes: 10,
    image: "assets/recipes/recipe-7.jpg",
    ingredients: ["2 eggs", "1 tomato (chopped)", "Fresh basil (optional)", "1 tsp olive oil", "Salt & pepper"],
    steps: ["Warm oil in pan.", "Soften tomato briefly.", "Add eggs and scramble. Finish with basil."],
    shopping: [
      { section: "Dairy", name: "Eggs", qty: 2, unit: "pieces" },
      { section: "Vegetables", name: "Tomato", qty: 1, unit: "piece" },
      { section: "Spices/Condiments", name: "Basil", qty: 1, unit: "handful" },
      { section: "Pantry", name: "Olive oil", qty: 1, unit: "tsp" },
      { section: "Spices/Condiments", name: "Salt & pepper", qty: 1, unit: "pinch" }
    ]
  },

  // 8
  {
    id: "r8",
    title: "Chia Pudding (Berry)",
    diet: "vegetarian",
    meatType: null,
    caloriesPerPortion: 340,
    minutes: 5,
    image: "assets/recipes/recipe-8.jpg",
    ingredients: ["3 tbsp chia seeds", "1 cup milk", "1 tsp honey", "1 handful berries"],
    steps: ["Mix chia, milk, honey.", "Chill 2+ hours or overnight.", "Top with berries and serve."],
    shopping: [
      { section: "Pantry", name: "Chia seeds", qty: 3, unit: "tbsp" },
      { section: "Dairy", name: "Milk", qty: 1, unit: "cup" },
      { section: "Pantry", name: "Honey", qty: 1, unit: "tsp" },
      { section: "Fruits", name: "Berries", qty: 1, unit: "handful" }
    ]
  },

  // 9
  {
    id: "r9",
    title: "Warm Porridge with Pear & Nuts",
    diet: "vegetarian",
    meatType: null,
    caloriesPerPortion: 400,
    minutes: 12,
    image: "assets/recipes/recipe-9.jpg",
    ingredients: ["1/2 cup oats", "1 cup milk or water", "1/2 pear (sliced)", "1 tbsp nuts", "Cinnamon"],
    steps: ["Cook oats with milk/water.", "Top with pear and nuts.", "Dust with cinnamon."],
    shopping: [
      { section: "Grains", name: "Oats", qty: 0.5, unit: "cup" },
      { section: "Dairy", name: "Milk", qty: 1, unit: "cup" },
      { section: "Fruits", name: "Pear", qty: 0.5, unit: "piece" },
      { section: "Pantry", name: "Nuts", qty: 1, unit: "tbsp" },
      { section: "Spices/Condiments", name: "Cinnamon", qty: 1, unit: "pinch" }
    ]
  },

  // 10
  {
    id: "r10",
    title: "Muesli with Yogurt & Fruit",
    diet: "vegetarian",
    meatType: null,
    caloriesPerPortion: 420,
    minutes: 5,
    image: "assets/recipes/recipe-10.jpg",
    ingredients: ["1 cup plain yogurt", "1/2 cup muesli", "1 handful fruit", "1 tbsp nuts (optional)"],
    steps: ["Add yogurt to bowl.", "Stir in muesli.", "Top with fruit (and nuts if desired)."],
    shopping: [
      { section: "Dairy", name: "Plain yogurt", qty: 1, unit: "cup" },
      { section: "Grains", name: "Muesli", qty: 0.5, unit: "cup" },
      { section: "Fruits", name: "Fresh fruit", qty: 1, unit: "handful" },
      { section: "Pantry", name: "Nuts", qty: 1, unit: "tbsp" }
    ]
  },

  // 11
  {
    id: "r11",
    title: "Veggie Egg Muffins (Quick Batch)",
    diet: "vegetarian",
    meatType: null,
    caloriesPerPortion: 260,
    minutes: 18,
    image: "assets/recipes/recipe-11.jpg",
    ingredients: ["2 eggs", "1 handful chopped veggies (pepper/spinach)", "1 tbsp cheese", "Salt & pepper"],
    steps: ["Whisk eggs with seasoning.", "Mix in veggies and cheese.", "Bake in muffin cups ~12–15 min at 190°C."],
    shopping: [
      { section: "Dairy", name: "Eggs", qty: 2, unit: "pieces" },
      { section: "Vegetables", name: "Mixed veggies", qty: 1, unit: "handful" },
      { section: "Dairy", name: "Cheese", qty: 1, unit: "tbsp" },
      { section: "Spices/Condiments", name: "Salt & pepper", qty: 1, unit: "pinch" }
    ]
  },

  // 12
  {
    id: "r12",
    title: "Skyr with Honey & Walnuts",
    diet: "vegetarian",
    meatType: null,
    caloriesPerPortion: 310,
    minutes: 4,
    image: "assets/recipes/recipe-12.jpg",
    ingredients: ["1 cup skyr", "1 tsp honey", "1 tbsp walnuts", "Fruit (optional)"],
    steps: ["Spoon skyr into a bowl.", "Add honey and walnuts.", "Add fruit if you want extra volume."],
    shopping: [
      { section: "Dairy", name: "Skyr", qty: 1, unit: "cup" },
      { section: "Pantry", name: "Honey", qty: 1, unit: "tsp" },
      { section: "Pantry", name: "Walnuts", qty: 1, unit: "tbsp" },
      { section: "Fruits", name: "Fruit", qty: 1, unit: "handful" }
    ]
  },

  // 13 (Fish)
  {
    id: "r13",
    title: "Smoked Salmon Cream Cheese Toast",
    diet: "non-vegetarian",
    meatType: "fish",
    caloriesPerPortion: 430,
    minutes: 8,
    image: "assets/recipes/recipe-13.jpg",
    ingredients: ["2 slices whole-grain bread", "2 tbsp cream cheese", "2–3 slices smoked salmon", "Cucumber (optional)", "Lemon (optional)"],
    steps: ["Toast bread.", "Spread cream cheese.", "Top with salmon and cucumber. Add lemon if you like."],
    shopping: [
      { section: "Bakery", name: "Whole-grain bread", qty: 2, unit: "slices" },
      { section: "Dairy", name: "Cream cheese", qty: 2, unit: "tbsp" },
      { section: "Meat/Fish", name: "Smoked salmon", qty: 3, unit: "slices" },
      { section: "Vegetables", name: "Cucumber", qty: 0.25, unit: "piece" },
      { section: "Fruits", name: "Lemon", qty: 0.25, unit: "piece" }
    ]
  },

  // 14 (Chicken)
  {
    id: "r14",
    title: "Chicken & Avocado Breakfast Wrap",
    diet: "non-vegetarian",
    meatType: "chicken",
    caloriesPerPortion: 520,
    minutes: 12,
    image: "assets/recipes/recipe-14.jpg",
    ingredients: ["1 tortilla wrap", "A few slices cooked chicken", "1/2 avocado", "1 handful greens", "Yogurt sauce (optional)"],
    steps: ["Warm tortilla briefly.", "Layer chicken, avocado, greens.", "Roll tightly. Add yogurt sauce if desired."],
    shopping: [
      { section: "Bakery", name: "Tortilla wrap", qty: 1, unit: "piece" },
      { section: "Meat/Fish", name: "Cooked chicken", qty: 1, unit: "handful" },
      { section: "Fruits", name: "Avocado", qty: 0.5, unit: "piece" },
      { section: "Vegetables", name: "Greens", qty: 1, unit: "handful" },
      { section: "Dairy", name: "Yogurt", qty: 1, unit: "tbsp" }
    ]
  },

  // 15 (Beef)
  {
    id: "r15",
    title: "Beef & Egg Breakfast Sandwich",
    diet: "non-vegetarian",
    meatType: "beef",
    caloriesPerPortion: 560,
    minutes: 15,
    image: "assets/recipes/recipe-15.jpg",
    ingredients: ["1 whole-grain bun", "1 egg", "A few slices roast beef", "Tomato slices", "Mustard (optional)"],
    steps: ["Toast bun.", "Cook egg (fried or scrambled).", "Assemble with roast beef and tomato."],
    shopping: [
      { section: "Bakery", name: "Whole-grain bun", qty: 1, unit: "piece" },
      { section: "Dairy", name: "Egg", qty: 1, unit: "piece" },
      { section: "Meat/Fish", name: "Roast beef slices", qty: 1, unit: "handful" },
      { section: "Vegetables", name: "Tomato", qty: 0.5, unit: "piece" },
      { section: "Spices/Condiments", name: "Mustard", qty: 1, unit: "tsp" }
    ]
  },

  // 16 (Fish)
  {
    id: "r16",
    title: "Tuna & Egg Protein Bowl",
    diet: "non-vegetarian",
    meatType: "fish",
    caloriesPerPortion: 480,
    minutes: 10,
    image: "assets/recipes/recipe-16.jpg",
    ingredients: ["1 boiled egg", "1/2 can tuna", "1 handful tomatoes/cucumber", "1 tbsp yogurt or olive oil", "Salt & pepper"],
    steps: ["Add tuna and chopped veggies to a bowl.", "Add sliced boiled egg.", "Mix with yogurt or olive oil, season and eat."],
    shopping: [
      { section: "Dairy", name: "Egg", qty: 1, unit: "piece" },
      { section: "Meat/Fish", name: "Tuna (canned)", qty: 0.5, unit: "can" },
      { section: "Vegetables", name: "Mixed veggies", qty: 1, unit: "handful" },
      { section: "Dairy", name: "Yogurt", qty: 1, unit: "tbsp" },
      { section: "Spices/Condiments", name: "Salt & pepper", qty: 1, unit: "pinch" }
    ]
  },

  // 17 (Pork)
  {
    id: "r17",
    title: "Eggs with Turkey/Pork Ham & Tomatoes",
    diet: "non-vegetarian",
    meatType: "pork",
    caloriesPerPortion: 520,
    minutes: 12,
    image: "assets/recipes/recipe-17.jpg",
    ingredients: ["2 eggs", "A few slices ham", "1 tomato", "1 tsp olive oil", "Salt & pepper"],
    steps: ["Warm oil.", "Cook eggs as you like.", "Serve with ham and sliced tomato."],
    shopping: [
      { section: "Dairy", name: "Eggs", qty: 2, unit: "pieces" },
      { section: "Meat/Fish", name: "Ham slices", qty: 1, unit: "handful" },
      { section: "Vegetables", name: "Tomato", qty: 1, unit: "piece" },
      { section: "Pantry", name: "Olive oil", qty: 1, unit: "tsp" },
      { section: "Spices/Condiments", name: "Salt & pepper", qty: 1, unit: "pinch" }
    ]
  },

  // 18 (Lamb)
  {
    id: "r18",
    title: "Lamb Sausage & Egg Plate",
    diet: "non-vegetarian",
    meatType: "lamb",
    caloriesPerPortion: 610,
    minutes: 18,
    image: "assets/recipes/recipe-18.jpg",
    ingredients: ["1 small lamb sausage", "1 egg", "1 handful greens", "Cherry tomatoes", "Salt & pepper"],
    steps: ["Cook sausage in pan.", "Cook egg in same pan.", "Serve with greens and tomatoes."],
    shopping: [
      { section: "Meat/Fish", name: "Lamb sausage", qty: 1, unit: "piece" },
      { section: "Dairy", name: "Egg", qty: 1, unit: "piece" },
      { section: "Vegetables", name: "Greens", qty: 1, unit: "handful" },
      { section: "Vegetables", name: "Cherry tomatoes", qty: 1, unit: "handful" },
      { section: "Spices/Condiments", name: "Salt & pepper", qty: 1, unit: "pinch" }
    ]
  },

  // 19 (Vegetarian)
  {
    id: "r19",
    title: "Berry Smoothie (Protein-Style)",
    diet: "vegetarian",
    meatType: null,
    caloriesPerPortion: 390,
    minutes: 6,
    image: "assets/recipes/recipe-19.jpg",
    ingredients: ["1 cup milk", "1 cup berries", "1/2 banana", "2 tbsp yogurt", "1 tbsp oats (optional)"],
    steps: ["Add everything to blender.", "Blend until smooth.", "Taste and adjust thickness with milk."],
    shopping: [
      { section: "Dairy", name: "Milk", qty: 1, unit: "cup" },
      { section: "Fruits", name: "Berries", qty: 1, unit: "cup" },
      { section: "Fruits", name: "Banana", qty: 0.5, unit: "piece" },
      { section: "Dairy", name: "Yogurt", qty: 2, unit: "tbsp" },
      { section: "Grains", name: "Oats", qty: 1, unit: "tbsp" }
    ]
  },

  // 20 (Vegetarian)
  {
    id: "r20",
    title: "Caprese Breakfast Toast",
    diet: "vegetarian",
    meatType: null,
    caloriesPerPortion: 450,
    minutes: 10,
    image: "assets/recipes/recipe-20.jpg",
    ingredients: ["2 slices whole-grain bread", "Mozzarella slices", "Tomato slices", "Basil", "Olive oil"],
    steps: ["Toast bread.", "Top with mozzarella and tomato.", "Finish with basil + a drizzle of olive oil."],
    shopping: [
      { section: "Bakery", name: "Whole-grain bread", qty: 2, unit: "slices" },
      { section: "Dairy", name: "Mozzarella", qty: 1, unit: "handful" },
      { section: "Vegetables", name: "Tomato", qty: 1, unit: "piece" },
      { section: "Spices/Condiments", name: "Basil", qty: 1, unit: "handful" },
      { section: "Pantry", name: "Olive oil", qty: 1, unit: "tsp" }
    ]
  },

  // 21 (Fish)
  {
    id: "r21",
    title: "Sardines on Rye with Lemon",
    diet: "non-vegetarian",
    meatType: "fish",
    caloriesPerPortion: 520,
    minutes: 6,
    image: "assets/recipes/recipe-21.jpg",
    ingredients: ["2 slices rye bread", "1/2 can sardines", "Lemon wedge", "Pepper", "Cucumber (optional)"],
    steps: ["Toast rye lightly (optional).", "Top with sardines.", "Add lemon + pepper, cucumber if you like."],
    shopping: [
      { section: "Bakery", name: "Rye bread", qty: 2, unit: "slices" },
      { section: "Meat/Fish", name: "Sardines (canned)", qty: 0.5, unit: "can" },
      { section: "Fruits", name: "Lemon", qty: 0.25, unit: "piece" },
      { section: "Spices/Condiments", name: "Pepper", qty: 1, unit: "pinch" },
      { section: "Vegetables", name: "Cucumber", qty: 0.25, unit: "piece" }
    ]
  },

  // 22 (Chicken)
  {
    id: "r22",
    title: "Chicken & Veggie Egg Scramble",
    diet: "non-vegetarian",
    meatType: "chicken",
    caloriesPerPortion: 540,
    minutes: 15,
    image: "assets/recipes/recipe-22.jpg",
    ingredients: ["2 eggs", "1 handful cooked chicken", "1 handful mixed veggies", "Salt & pepper"],
    steps: ["Warm chicken and veggies in pan.", "Add beaten eggs.", "Scramble until just set."],
    shopping: [
      { section: "Dairy", name: "Eggs", qty: 2, unit: "pieces" },
      { section: "Meat/Fish", name: "Cooked chicken", qty: 1, unit: "handful" },
      { section: "Vegetables", name: "Mixed veggies", qty: 1, unit: "handful" },
      { section: "Spices/Condiments", name: "Salt & pepper", qty: 1, unit: "pinch" }
    ]
  },

  // 23 (Beef)
  {
    id: "r23",
    title: "Beef & Tomato Breakfast Wrap",
    diet: "non-vegetarian",
    meatType: "beef",
    caloriesPerPortion: 590,
    minutes: 15,
    image: "assets/recipes/recipe-23.jpg",
    ingredients: ["1 tortilla wrap", "A few slices cooked beef", "Tomato", "Greens", "1 tbsp yogurt sauce"],
    steps: ["Warm wrap.", "Add beef, tomato, greens.", "Add yogurt sauce and roll."],
    shopping: [
      { section: "Bakery", name: "Tortilla wrap", qty: 1, unit: "piece" },
      { section: "Meat/Fish", name: "Cooked beef", qty: 1, unit: "handful" },
      { section: "Vegetables", name: "Tomato", qty: 1, unit: "piece" },
      { section: "Vegetables", name: "Greens", qty: 1, unit: "handful" },
      { section: "Dairy", name: "Yogurt", qty: 1, unit: "tbsp" }
    ]
  },

  // 24 (Vegetarian)
  {
    id: "r24",
    title: "Hummus & Cucumber Toast",
    diet: "vegetarian",
    meatType: null,
    caloriesPerPortion: 420,
    minutes: 7,
    image: "assets/recipes/recipe-24.jpg",
    ingredients: ["2 slices whole-grain bread", "3 tbsp hummus", "Cucumber slices", "Pepper", "Olive oil (optional)"],
    steps: ["Toast bread.", "Spread hummus.", "Top with cucumber and pepper (olive oil optional)."],
    shopping: [
      { section: "Bakery", name: "Whole-grain bread", qty: 2, unit: "slices" },
      { section: "Pantry", name: "Hummus", qty: 3, unit: "tbsp" },
      { section: "Vegetables", name: "Cucumber", qty: 0.5, unit: "piece" },
      { section: "Spices/Condiments", name: "Pepper", qty: 1, unit: "pinch" },
      { section: "Pantry", name: "Olive oil", qty: 1, unit: "tsp" }
    ]
  },

  // 25 (Vegetarian)
  {
    id: "r25",
    title: "Quick Apple & Cheese Plate",
    diet: "vegetarian",
    meatType: null,
    caloriesPerPortion: 430,
    minutes: 5,
    image: "assets/recipes/recipe-25.jpg",
    ingredients: ["1 apple", "1 small handful cheese cubes", "1 tbsp nuts", "1 slice rye bread (optional)"],
    steps: ["Slice apple.", "Add cheese and nuts.", "Add bread if you want extra energy."],
    shopping: [
      { section: "Fruits", name: "Apple", qty: 1, unit: "piece" },
      { section: "Dairy", name: "Cheese", qty: 1, unit: "handful" },
      { section: "Pantry", name: "Nuts", qty: 1, unit: "tbsp" },
      { section: "Bakery", name: "Rye bread", qty: 1, unit: "slice" }
    ]
  },

  // 26 (Pork)
  {
    id: "r26",
    title: "Pork Ham & Egg Rice Bowl",
    diet: "non-vegetarian",
    meatType: "pork",
    caloriesPerPortion: 620,
    minutes: 18,
    image: "assets/recipes/recipe-26.jpg",
    ingredients: ["1 cup cooked rice (leftover)", "1 egg", "A few slices ham", "Spring onion (optional)", "Soy sauce (optional)"],
    steps: ["Warm rice in pan.", "Add ham.", "Top with egg (fried). Add spring onion/soy if desired."],
    shopping: [
      { section: "Pantry", name: "Cooked rice", qty: 1, unit: "cup" },
      { section: "Dairy", name: "Egg", qty: 1, unit: "piece" },
      { section: "Meat/Fish", name: "Ham slices", qty: 1, unit: "handful" },
      { section: "Vegetables", name: "Spring onion", qty: 1, unit: "piece" },
      { section: "Spices/Condiments", name: "Soy sauce", qty: 1, unit: "tsp" }
    ]
  },

  // 27 (Vegetarian)
  {
    id: "r27",
    title: "Ricotta Toast with Berries",
    diet: "vegetarian",
    meatType: null,
    caloriesPerPortion: 470,
    minutes: 7,
    image: "assets/recipes/recipe-27.jpg",
    ingredients: ["2 slices toast", "Ricotta", "Berries", "Honey (optional)", "Mint (optional)"],
    steps: ["Toast bread.", "Spread ricotta.", "Top with berries and a little honey."],
    shopping: [
      { section: "Bakery", name: "Bread", qty: 2, unit: "slices" },
      { section: "Dairy", name: "Ricotta", qty: 3, unit: "tbsp" },
      { section: "Fruits", name: "Berries", qty: 1, unit: "handful" },
      { section: "Pantry", name: "Honey", qty: 1, unit: "tsp" },
      { section: "Spices/Condiments", name: "Mint", qty: 1, unit: "pinch" }
    ]
  },

  // 28 (Fish)
  {
    id: "r28",
    title: "Egg + Smoked Salmon Mini Plate",
    diet: "non-vegetarian",
    meatType: "fish",
    caloriesPerPortion: 520,
    minutes: 12,
    image: "assets/recipes/recipe-28.jpg",
    ingredients: ["2 eggs", "2 slices smoked salmon", "1 handful greens", "Lemon (optional)"],
    steps: ["Cook eggs your way.", "Plate with salmon and greens.", "Add lemon if you like."],
    shopping: [
      { section: "Dairy", name: "Eggs", qty: 2, unit: "pieces" },
      { section: "Meat/Fish", name: "Smoked salmon", qty: 2, unit: "slices" },
      { section: "Vegetables", name: "Greens", qty: 1, unit: "handful" },
      { section: "Fruits", name: "Lemon", qty: 0.25, unit: "piece" }
    ]
  },

  // 29 (Vegetarian)
  {
    id: "r29",
    title: "Warm Oatmeal with Cocoa & Banana",
    diet: "vegetarian",
    meatType: null,
    caloriesPerPortion: 430,
    minutes: 10,
    image: "assets/recipes/recipe-29.jpg",
    ingredients: ["1/2 cup oats", "1 cup milk", "1 banana", "1 tsp cocoa", "1 tbsp nuts"],
    steps: ["Cook oats with milk.", "Stir in cocoa.", "Top with banana and nuts."],
    shopping: [
      { section: "Grains", name: "Oats", qty: 0.5, unit: "cup" },
      { section: "Dairy", name: "Milk", qty: 1, unit: "cup" },
      { section: "Fruits", name: "Banana", qty: 1, unit: "piece" },
      { section: "Pantry", name: "Cocoa powder", qty: 1, unit: "tsp" },
      { section: "Pantry", name: "Nuts", qty: 1, unit: "tbsp" }
    ]
  },

  // 30 (Vegetarian)
  {
    id: "r30",
    title: "Simple Breakfast Parfait",
    diet: "vegetarian",
    meatType: null,
    caloriesPerPortion: 410,
    minutes: 6,
    image: "assets/recipes/recipe-30.jpg",
    ingredients: ["1 cup yogurt", "1/2 cup granola (small handful)", "1 handful fruit", "1 tbsp seeds (optional)"],
    steps: ["Layer yogurt, fruit, and granola in a glass.", "Repeat once.", "Top with seeds if you like."],
    shopping: [
      { section: "Dairy", name: "Yogurt", qty: 1, unit: "cup" },
      { section: "Pantry", name: "Granola", qty: 0.5, unit: "cup" },
      { section: "Fruits", name: "Fruit", qty: 1, unit: "handful" },
      { section: "Pantry", name: "Seeds", qty: 1, unit: "tbsp" }
    ]
  }
];

