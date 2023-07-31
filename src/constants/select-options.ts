import type { StaticImageData } from 'next/image';
import { FiLogOut } from 'react-icons/fi';
import type { IconType } from 'react-icons/lib';
import { RiHistoryLine, RiUserLine } from 'react-icons/ri';

import { ImageCalculatorNow } from '../components/Images/calculator-now';
import { ImagesComposite } from '../components/Images/composite-images';
import { ImageNutritiousFoods } from '../components/Images/foods/nutritious-foods';
import { ImageFoodsSuggestions } from '../components/Images/foods/suggestions/index';
import { ImageFormulaEquation } from '../components/Images/formula-equation';

export interface SelectOptionsDataExercise {
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  id: string;
  name: string;
  target: string;
}

export interface SelectOptionDescribeAndSuggestFoods {
  value: string;
  description: string;
  foods: string;
  fruits: string;
}

export interface SelectOptionNutritionFoods {
  name: string;
  description: string;
  img: StaticImageData;
}

export interface SelectOptionObject {
  label: string;
  value: string;
}

export interface SelectOptionLink {
  label: string;
  to: string;
  value: string;
}

export interface SelectOptionValue {
  value: string;
}

export interface SelectOptionApiFoods {
  name: string;
  calories: number;
  serving_size_g: number;
  fat_total_g: number;
  fat_saturated_g: number;
  protein_g: number;
  sodium_mg: number;
  potassium_mg: number;
  cholesterol_mg: number;
  carbohydrates_total_g: number;
  fiber_g: number;
  sugar_g: number;
}

export interface InfoUsers {
  gender: string;
  image_gender: string;
  date_of_birth: string;
}

export interface SelectOptionImage {
  label: string;
  image: string;
  value: string;
  to: string;
}

export interface SelectOptionSuggest {
  label: string;
  image: string;
  value: string;
  listitem: SelectOptionValue[];
}

export interface SelectOptionDropdownMenu {
  label: string;
  value: string;
  to?: string;
  icon: IconType;
}

export interface SelectOptionPercentBar {
  low: number;
  value_low: string;
  good: number;
  value_good: string;
  fair: number;
  value_fair: string;
  poor: number;
  value_poor: string;
  high: number;
  value_high: string;
}

export interface SelectOptionFatClassification {
  label: string;
  male: string;
  female: string;
}

export interface SelectOptionRecipes {
  gender?: string;
  formula: string;
  image: string | StaticImageData;
}

export interface SelectOptionLoginNotice {
  image: string;
  title: string;
  content_1?: string;
  content_2?: string;
  button_close: boolean;
}

export const DROP_DOWN_OPTIONS_GENDER: SelectOptionObject[] = [
  {
    label: 'Male',
    value: 'male',
  },
  {
    label: 'Female',
    value: 'female',
  },
  {
    label: 'Nonbinary',
    value: 'nonbinary',
  },
];

export const DROP_DOWN_OPTIONS: SelectOptionObject[] = [
  {
    label: 'Little or no exercise',
    value: 'little or no exercise',
  },
  {
    label: 'Light exercise: 1-3 times/week',
    value: 'light exercise: 1-3 times/week',
  },
  {
    label: 'Moderate exercise: 3-5 times/week',
    value: 'moderate exercise: 3-5 times/week',
  },
  {
    label: 'Exercise a lot: 6-7 times/week',
    value: 'exercise a lot: 6-7 times/week',
  },
  {
    label: 'Heavy exercise: More than 7 times a week',
    value: 'heavy exercise: more than 7 times a week',
  },
];

export const GENDER_OPTIONS: SelectOptionObject[] = [
  {
    label: 'Male',
    value: 'male',
  },
  {
    label: 'Female',
    value: 'female',
  },
];

export const MUSCLE_EXERCISE_OPTIONS: SelectOptionObject[] = [
  {
    label: 'Search exercise name',
    value: 'search',
  },
  {
    label: 'Options exercise type',
    value: 'options',
  },
];

export const FORMULA_OPTIONS: SelectOptionObject[] = [
  {
    label: 'Mifflin-St Jeor',
    value: 'mifflin st jeor',
  },
  {
    label: 'Revised Harris-Benedict',
    value: 'revised harris benedict',
  },
  {
    label: 'Katch-McArdle',
    value: 'katch mcardle',
  },
];

export const MENS_PERCENT_BAR_OPTIONS: SelectOptionPercentBar[] = [
  {
    low: 50,
    value_low: '2 - 5',
    good: 80,
    value_good: '6 - 13',
    fair: 40,
    value_fair: '14 - 17',
    poor: 70,
    value_poor: '18 - 24',
    high: 100,
    value_high: '25',
  },
];

export const WOMENS_PERCENT_BAR_OPTIONS: SelectOptionPercentBar[] = [
  {
    low: 130,
    value_low: '10 - 13',
    good: 70,
    value_good: '14 - 20',
    fair: 40,
    value_fair: '21 - 24',
    poor: 70,
    value_poor: '25 - 31',
    high: 30,
    value_high: '32',
  },
];

export const FAT_CLASSIFICATION_OPTIONS: SelectOptionFatClassification[] = [
  {
    label: 'Description',
    female: 'Women',
    male: 'Men',
  },
  {
    label: 'Essential',
    female: '10 - 13',
    male: '2 - 5',
  },
  {
    label: 'Athletes',
    female: '14 - 20',
    male: '6 - 13',
  },
  {
    label: 'Fitness',
    female: '21 - 24',
    male: '14 - 17',
  },
  {
    label: 'Average',
    female: '25 - 31',
    male: '18 - 24',
  },
  {
    label: 'Obese',
    female: '32+',
    male: '25+',
  },
];

export const NUTRIENT_RATIO_OPTIONS: SelectOptionObject[] = [
  {
    label: 'Higher Carb (60:25:15)',
    value: 'hgiher carb',
  },
  {
    label: 'Moderate Carb (50:25:25)',
    value: 'moderate carb',
  },
  {
    label: 'Lower Carb (10:40:50)',
    value: 'lower carb',
  },
  {
    label: 'Custom',
    value: 'custom',
  },
];

export const CALORIE_RECIPE_MSJ_OPTIONS: SelectOptionRecipes[] = [
  {
    gender: 'Male',
    formula:
      'BMR = (10 x weight in kg) + (6,25 x height in cm) - (5 x age) + 5',
    image: ImageFormulaEquation.Male,
  },
  {
    gender: 'Female',
    formula:
      'BMR = (10 x weight in kg) + (6,25 x height in cm) - (5 x age) - 161',
    image: ImageFormulaEquation.Female,
  },
];

export const CALORIE_RECIPE_RHB_OPTIONS: SelectOptionRecipes[] = [
  {
    gender: 'Male',
    formula:
      'BMR = (13,397 x weight in kg) + (4,799 x height in cm) - (5,677 x age) + 88,362',
    image: ImageFormulaEquation.Male,
  },
  {
    gender: 'Female',
    formula:
      'BMR = (9,247 x weight in kg) + (3,098 x height in cm) - (4,330 x age) + 447,593',
    image: ImageFormulaEquation.Female,
  },
];

export const CALORIE_RECIPE_KM_OPTIONS: SelectOptionRecipes[] = [
  {
    formula: 'BMR = 370 + (21,6 x (weight in kg x (100 - body fat %) / 100))',
    image: ImageFormulaEquation.FatPercent,
  },
];

export const FAT_PERCENTAGE_OPTIONS: SelectOptionRecipes[] = [
  {
    gender: 'Male',
    formula:
      'BFP = ((495 / 1.0324 - 0.19077 * log10(waist in cm - neck in cm) + 0.15456 * log10(height in cm)) - 450)',
    image: ImageFormulaEquation.Male,
  },
  {
    gender: 'Female',
    formula:
      'BFP = ((495 / 1.29579 - 0.35004 * log10(waist in cm + hip in cm - neck in cm) + 0.22100 * log10(height in cm)) - 450)',
    image: ImageFormulaEquation.Female,
  },
];

export const HEADER_CALCULATORS_OPTIONS: SelectOptionLink[] = [
  {
    label: 'BMR Calculator',
    to: '/bmr-calculator',
    value: 'bmr calculator',
  },
  {
    label: 'Body Fat calculator',
    to: '/body-fat-calculator',
    value: 'body fat calculator',
  },
  {
    label: 'Calorie Calculator',
    to: '/calorie-calculator',
    value: 'calorie calculator',
  },
  {
    label: 'Macro Calculator',
    to: '/macro-calculator',
    value: 'macro calculator',
  },
];

export const DROPDOWN_MENU_PROFILE: SelectOptionDropdownMenu[] = [
  {
    label: 'Your Profile',
    value: 'your profile',
    icon: RiUserLine,
  },
  {
    label: 'Search History',
    value: 'search history',
    to: 'search-history',
    icon: RiHistoryLine,
  },
  {
    label: 'Sign Out',
    value: 'sign out',
    icon: FiLogOut,
  },
];

export const CALCULATE_NOW_OPTIONS: SelectOptionImage[] = [
  {
    label: 'Calculate the calories in the body',
    image: ImageCalculatorNow.Calorie.src,
    value: 'calorie',
    to: 'calorie-calculator',
  },
  {
    label: 'Calculate body fat percentage',
    image: ImageCalculatorNow.Fat.src,
    value: 'fat',
    to: 'body-fat-calculator',
  },
  {
    label: "Calculate the body's basal metabolic rate (BMR)",
    image: ImageCalculatorNow.Bmr.src,
    value: 'bmr',
    to: 'bmr-calculator',
  },
  {
    label: 'Calculate of macronutrients in the body',
    image: ImageCalculatorNow.Macro.src,
    value: 'macro',
    to: 'macro-calculator',
  },
];

export const SUGGEST_BEANS: SelectOptionValue[] = [
  {
    value: 'Black eye peas',
  },
  {
    value: 'Garbanzo beans',
  },
  {
    value: 'Navy beans',
  },
  {
    value: 'Pinto beans',
  },
  {
    value: 'Refried beans',
  },
  {
    value: 'White beans',
  },
];

export const SUGGEST_FRUITS: SelectOptionValue[] = [
  {
    value: 'Apple',
  },
  {
    value: 'Banana',
  },
  {
    value: 'Cantaloupe',
  },
  {
    value: 'Grapes',
  },
  {
    value: 'Orange',
  },
  {
    value: 'Pear',
  },
  {
    value: 'Pineapple',
  },
  {
    value: 'Strawberries',
  },
  {
    value: 'Watermelon ',
  },
];

export const SUGGEST_CREAL: SelectOptionValue[] = [
  {
    value: 'Barley',
  },
  {
    value: 'Buckwheat',
  },
  {
    value: 'Cornmeal',
  },
  {
    value: 'Cracker',
  },
  {
    value: 'Flaxseed',
  },
  {
    value: 'Quinoa',
  },
];

export const SUGGEST_MILK: SelectOptionValue[] = [
  {
    value: 'Pudding',
  },
  {
    value: 'Skim milk',
  },
  {
    value: 'Yogurt',
  },
  {
    value: 'Chocolate milk',
  },
  {
    value: 'Low fat milk',
  },
];

export const SUGGEST_VEGETABLES: SelectOptionValue[] = [
  {
    value: 'Carrot',
  },
  {
    value: 'Corn',
  },
  {
    value: 'Potato',
  },
  {
    value: 'Sweet Potato',
  },
  {
    value: 'salad',
  },
];

export const MAIN_SUGGESTIONS: SelectOptionSuggest[] = [
  {
    label: 'Beans',
    value: 'beans',
    image: ImageFoodsSuggestions.beans.src,
    listitem: SUGGEST_BEANS,
  },
  {
    label: 'Cereal',
    value: 'cereal',
    image: ImageFoodsSuggestions.cereal.src,
    listitem: SUGGEST_CREAL,
  },
  {
    label: 'Fruits',
    value: 'fruits',
    image: ImageFoodsSuggestions.fruits.src,
    listitem: SUGGEST_FRUITS,
  },
  {
    label: 'Milk',
    value: 'milk',
    image: ImageFoodsSuggestions.milk.src,
    listitem: SUGGEST_MILK,
  },
  {
    label: 'Vegetables',
    value: 'vegetables',
    image: ImageFoodsSuggestions.vegetables.src,
    listitem: SUGGEST_VEGETABLES,
  },
];

export const LOGIN_NOTICES = {
  wrong_password: {
    image: ImagesComposite.wrong.src,
    title: 'Wrong password',
    content_1:
      'You have entered the wrong password too many times temporarily, the account',
    content_2:
      'cannot be logged in. Please try logging in again in a few minutes.',
    button_close: true,
  },
  risk: {
    image: ImagesComposite.risk.src,
    title: 'Not verified',
    content_1: 'The email address',
    content_2:
      'is not verified. To continue logging in, please confirm your email address.',
    button_close: true,
  },
  success: {
    image: ImagesComposite.checkmark.src,
    title: 'Logged in successfully',
    button_close: false,
  },
  resendMail: {
    image: ImagesComposite.checkmark.src,
    title: 'Send successful email verification',
    content_1: 'Email account verification for',
    content_2:
      'has been sent back. Please visit the link in the mail to verify your account.',
    button_close: true,
  },
};

export const NUTRITIOUS_FOODS: SelectOptionNutritionFoods[] = [
  {
    name: 'Kiwi',
    description:
      "Kiwi is a nutrient-packed fruit bursting with health benefits. It is loaded with vitamin C, fiber, potassium, and vitamin K. The fruit's unique enzyme, actinidin, aids digestion. With its refreshing taste and versatility, kiwi is a delicious addition to a balanced diet that promotes overall well-being.",
    img: ImageNutritiousFoods.Kiwi,
  },
  {
    name: 'Blue Berry',
    description:
      'Blueberries are a good source of manganese and vitamins C and K1. They also provide small amounts of copper, as well as vitamins E and B6. Blueberries may have benefits for your heart, brain, and blood sugar.',
    img: ImageNutritiousFoods.BlueBerry,
  },
  {
    name: 'Green Beans',
    description:
      'Green beans are heart healthy. They contain no cholesterol. One cup of raw green beans has 2.7 g of fiber. Soluble fiber may help lower LDL or so-called bad cholesterol and total cholesterol levels. It may also support heart health by lowering blood pressure and reducing inflammation.',
    img: ImageNutritiousFoods.GreenBeans,
  },
  {
    name: 'Yogurt',
    description:
      'Yogurt is a nutrient-rich dairy product that offers a wide array of health benefits. Packed with essential nutrients, it is a great source of protein, calcium, and probiotics. Protein supports muscle health and helps in repairing tissues, while calcium is vital for strong bones and teeth. Probiotics promote a healthy gut and support digestion. With its creamy texture and tangy flavor, yogurt provides a delicious and wholesome option to incorporate into your daily diet for optimal nutrition.',
    img: ImageNutritiousFoods.Yogurt,
  },
  {
    name: 'Fresh Salad',
    description:
      "A vibrant medley of crisp vegetables, protein, and flavorful toppings. Bursting with essential vitamins, minerals, antioxidants, and dietary fiber, this customizable delight nourishes your body while tantalizing your taste buds. Whether you prefer a classic combination or your own creative twist, Fresh Salad is a refreshing and nutritious choice that promotes overall well-being and supports a balanced diet. Elevate your plate with this colorful masterpiece and savor the goodness of nature's bounty.",
    img: ImageNutritiousFoods.FreshSalad,
  },
  {
    name: 'Grilled Salmon',
    description:
      'Grilled Salmon is a delicious and nutritious choice. Packed with omega-3 fatty acids for heart health and high-quality protein for muscle growth, it offers a range of essential vitamins and minerals. Serve it with green vegetables and whole grains for a well-rounded meal. With its versatility and health benefits, grilled salmon is a must-try for both taste and nutrition.',
    img: ImageNutritiousFoods.GrilledSalmon,
  },
  {
    name: 'Pineapple',
    description:
      'Pineapple is a tropical fruit that is both delicious and packed with nutritional benefits. This sweet and tangy fruit is a rich source of vitamin C, manganese, and dietary fiber. Its natural enzymes, like bromelain, have anti-inflammatory properties and aid in digestion. Whether enjoyed fresh or incorporated into various dishes, pineapple is a tropical nutritional wonder that adds a burst of flavor and health to your diet.',
    img: ImageNutritiousFoods.Pineapple,
  },
  {
    name: 'Steamed Quinoa',
    description:
      'Steamed quinoa is a versatile and nutritious grain packed with protein, fiber, and essential vitamins and minerals. It provides all nine essential amino acids, promotes digestion, supports muscle function, and contributes to bone health. With its impressive nutritional profile, steamed quinoa is a wholesome addition to any meal, offering a satisfying and nourishing experience.',
    img: ImageNutritiousFoods.SteamedQuinoa,
  },
];

export const DESCRIBE_LEVEL_AND_SUGGEST_FOOD: SelectOptionDescribeAndSuggestFoods[] =
  [
    {
      value: 'essential',
      description:
        'With low body fat, you need to maintain a balanced diet and ensure an adequate supply of nutrients. Focus on consuming healthy unsaturated fats, whole grains, proteins, and natural foods.',
      foods:
        'Chicken, fish, eggs, chia seeds, oats, leafy greens like spinach and bok choy, non-fat milk, almond milk, avocado, fatty fish, and lemon.',
      fruits: 'Apple, pineapple, strawberries, blueberries, pomegranate.',
    },
    {
      value: 'athletes',
      description:
        'At this level, you can increase your calorie and healthy fat intake in your diet. Focus on consuming unsaturated fats, high-quality proteins, and fiber-rich foods.',
      foods:
        'Chicken, beef, fish, almonds, oats, leafy greens like spinach and kale, cruciferous vegetables such as broccoli and cauliflower, non-sugar milk, almond milk, avocado, coconut oil, and lemon.',
      fruits: 'Pineapple, strawberries, blueberries, and grapes.',
    },
    {
      value: 'fitness',
      description:
        'At this level, continue maintaining a balanced diet but may slightly reduce fat intake. Increase consumption of protein, fiber, and nutrient-rich foods.',
      foods:
        'Chicken, beef, fish, almonds, oats, leafy greens like spinach and kale, cruciferous vegetables such as broccoli and cauliflower, pumpkin, non-sugar milk, almond milk, coconut oil, olive oil, and lemon.',
      fruits: 'Apple, pineapple, strawberries, blueberries, and black grapes.',
    },
    {
      value: 'average',
      description:
        'At this level, focus on reducing unhealthy fats in your diet. Prioritize consumption of fiber, protein, and nutrient-rich foods while limiting excess calories.',
      foods:
        'Chicken, beef, fish, almonds, oats, leafy greens like spinach and kale, cruciferous vegetables such as broccoli and cauliflower, pumpkin, peanuts, non-sugar milk, almond milk, coconut oil, olive oil, and lemon.',
      fruits: 'Apple, pineapple, strawberries, blueberries, and black grapes.',
    },
    {
      value: 'obese',
      description:
        'At this level, focus on reducing unhealthy fats in your diet. Limit consumption of sugary foods, saturated fats, and starches. Increase your intake of fiber, protein, and nutrient-rich foods. Combine a proper diet with an appropriate exercise routine.',
      foods:
        'Chicken, beef, fish, almonds, oats, leafy greens like spinach and kale, cruciferous vegetables such as broccoli and cauliflower, pumpkin, peanuts, high-fiber foods, non-sugar milk, almond milk, coconut oil, olive oil, and lemon.',
      fruits: 'Apple, pineapple, strawberries, blueberries, and black grapes.',
    },
  ];

export const DISEASES = [
  {
    name: 'Cardiovascular diseases',
    description:
      'The risk of developing heart-related conditions such as coronary artery disease and high blood pressure significantly increases in obese individuals. Fat deposition within the blood vessels can cause blockages and impair blood circulation.',
  },
  {
    name: 'Diabetes',
    description:
      'Obesity is a major risk factor for type 2 diabetes. Elevated blood sugar levels due to insulin resistance can lead to metabolic dysfunction.',
  },
  {
    name: 'Liver diseases',
    description:
      'Obesity can result in conditions like fatty liver disease, liver inflammation, and liver failure. Fat accumulation within the liver can cause inflammation and impair its functioning.',
  },
  {
    name: 'Kidney diseases',
    description:
      "Overweight individuals have an increased risk of kidney diseases. The body's pressure on the kidneys can lead to inflammation and decreased kidney function.",
  },
  {
    name: 'Bone and joint disorders',
    description:
      'Excessive weight can put strain on the skeletal system and cause damage to joints. This can lead to conditions like arthritis, joint degeneration, and osteoporosis.',
  },
];

export const SUGGESTIONS = [
  {
    name: 'Food choices',
    description:
      'Increase consumption of fiber-rich foods such as vegetables, fruits, whole grains, and protein-rich foods like lean meats, fish, beans, and nuts.',
  },
  {
    name: 'Fruits',
    description:
      'Prioritize fruits with low sugar content and high fiber content such as kiwi, pineapple, watermelon, papaya, and berries like blueberries and strawberries.',
  },
  {
    name: 'Leafy greens',
    description:
      'Include a variety of leafy greens such as cabbage, spinach, kale, broccoli, and cilantro to provide essential fiber and nutrients.',
  },
  {
    name: 'Beverages',
    description:
      'Replace sugary drinks and carbonated beverages with filtered water, unsweetened green tea, or natural fruit juices.',
  },
  {
    name: 'Fat reduction',
    description:
      'Limit consumption of high-fat foods, fried and processed foods, and sweets. Opt for healthier cooking methods such as grilling, steaming, or boiling.',
  },
  {
    name: 'Portion control',
    description: 'Adjust portion sizes and monitor daily calorie intake.',
  },
];

// export const MUSCLE_EXERCISES_TYPE: SelectOptionObject[] = [
//   { label: 'Cardio', value: 'cardio' },
//   { label: 'Olympic Weightlifting', value: 'olympic_weightlifting' },
//   { label: 'Plyometrics', value: 'plyometrics' },
//   { label: 'Powerlifting', value: 'powerlifting' },
//   { label: 'Strength', value: 'strength' },
//   { label: 'Stretching', value: 'stretching' },
//   { label: 'Strongman', value: 'strongman' },
// ];

// export const MUSCLE_EXERCISES_MUSCLE_GROUP: SelectOptionObject[] = [
//   { label: 'Abdominals', value: 'abdominals' },
//   { label: 'Abductors', value: 'abductors' },
//   { label: 'Adductors', value: 'adductors' },
//   { label: 'Biceps', value: 'biceps' },
//   { label: 'Calves', value: 'calves' },
//   { label: 'Chest', value: 'chest' },
//   { label: 'Forearms', value: 'forearms' },
//   { label: 'Glutes', value: 'glutes' },
//   { label: 'Hamstrings', value: 'hamstrings' },
//   { label: 'Lats', value: 'lats' },
//   { label: 'Lower Back', value: 'lower_back' },
//   { label: 'Middle Back', value: 'middle_back' },
//   { label: 'Neck', value: 'neck' },
//   { label: 'Quadriceps', value: 'quadriceps' },
//   { label: 'Traps', value: 'traps' },
//   { label: 'Triceps', value: 'triceps' },
// ];

// export const MUSCLE_EXERCISES_DIFFICULTY: SelectOptionObject[] = [
//   { label: 'Beginner', value: 'beginner' },
//   { label: 'Intermediate', value: 'intermediate' },
//   { label: 'Expert', value: 'expert' },
// ];

export const MUSCLE_EXERCISES_EQUIPMENT: SelectOptionObject[] = [
  { label: 'Assisted', value: 'assisted' },
  { label: 'Band', value: 'band' },
  { label: 'Barbell', value: 'barbell' },
  { label: 'Body Weight', value: 'body weight' },
  { label: 'Bosu Ball', value: 'bosu ball' },
  { label: 'Cable', value: 'cable' },
  { label: 'Dumbbell', value: 'dumbbell' },
  { label: 'Elliptical Machine', value: 'elliptical machine' },
  { label: 'EZ Barbell', value: 'ez barbell' },
  { label: 'Hammer', value: 'hammer' },
  { label: 'Kettlebell', value: 'kettlebell' },
  { label: 'Leverage Machine', value: 'leverage machine' },
  { label: 'Medicine Ball', value: 'medicine ball' },
  { label: 'Olympic Barbell', value: 'olympic barbell' },
  { label: 'Resistance Band', value: 'resistance band' },
  { label: 'Roller', value: 'roller' },
  { label: 'Rope', value: 'rope' },
  { label: 'Skierg Machine', value: 'skierg machine' },
  { label: 'Sled Machine', value: 'sled machine' },
  { label: 'Smith Machine', value: 'smith machine' },
  { label: 'Stability Ball', value: 'stability ball' },
  { label: 'Stationary Bike', value: 'stationary bike' },
  { label: 'Stepmill Machine', value: 'stepmill machine' },
  { label: 'Tire', value: 'tire' },
  { label: 'Trap Bar', value: 'trap bar' },
  { label: 'Upper Body Ergometer', value: 'upper body ergometer' },
  { label: 'Weighted', value: 'weighted' },
  { label: 'Wheel Roller', value: 'wheel roller' },
];

export const MUSCLE_EXERCISES_TARGET: SelectOptionObject[] = [
  { label: 'Abductors', value: 'abductors' },
  { label: 'Abs', value: 'abs' },
  { label: 'Adductors', value: 'adductors' },
  { label: 'Biceps', value: 'biceps' },
  { label: 'Calves', value: 'calves' },
  { label: 'Cardiovascular System', value: 'cardiovascular system' },
  { label: 'Delts', value: 'delts' },
  { label: 'Forearms', value: 'forearms' },
  { label: 'Glutes', value: 'glutes' },
  { label: 'Hamstrings', value: 'hamstrings' },
  { label: 'Lats', value: 'lats' },
  { label: 'Levator Scapulae', value: 'levator scapulae' },
  { label: 'Pectorals', value: 'pectorals' },
  { label: 'Quads', value: 'quads' },
  { label: 'Serratus Anterior', value: 'serratus anterior' },
  { label: 'Spine', value: 'spine' },
  { label: 'Traps', value: 'traps' },
  { label: 'Triceps', value: 'triceps' },
  { label: 'Upper Back', value: 'upper back' },
];

export const MUSCLE_EXERCISES_BODYPARTS: SelectOptionObject[] = [
  { label: 'Back', value: 'back' },
  { label: 'Cardio', value: 'cardio' },
  { label: 'Chest', value: 'chest' },
  { label: 'Lower Arms', value: 'lower arms' },
  { label: 'Lower Legs', value: 'lower legs' },
  { label: 'Neck', value: 'neck' },
  { label: 'Shoulders', value: 'shoulders' },
  { label: 'Upper Arms', value: 'upper arms' },
  { label: 'Upper Legs', value: 'upper legs' },
  { label: 'Waist', value: 'waist' },
];

export const OPTIONS_RENDER: SelectOptionObject[] = [
  {
    label: 'BodyParts',
    value: 'bodyparts',
  },
  {
    label: 'Target Muscle',
    value: 'target',
  },
  {
    label: 'Equipment',
    value: 'equipment',
  },
];
