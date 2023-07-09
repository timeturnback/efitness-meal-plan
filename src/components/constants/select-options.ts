import type { StaticImageData } from 'next/image';
import { FiLogOut } from 'react-icons/fi';
import type { IconType } from 'react-icons/lib';
import { RiHistoryLine, RiUserLine } from 'react-icons/ri';

import { ImageCalculatorNow } from '../Images/calculator-now';
import { ImagesComposite } from '../Images/composite-images';
import { ImageNutritiousFoods } from '../Images/foods/nutritious-foods';
import { ImageFoodsSuggestions } from '../Images/foods/suggestions/index';
import { ImageFormulaEquation } from '../Images/formula-equation';

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
    value_fair: '12 - 24',
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
      'Kiwi has a reputation as a health food because of its high vitamin C content, but the fruit is also rich in other nutrients. These may help reduce blood pressure, boost wound healing, help maintain bowel health, and more.',
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
      'Yogurt is a great source of high-quality protein, offers various amounts of fat, and contains small amounts of lactose. Many brands are also high in added sugar and flavorings.',
    img: ImageNutritiousFoods.Yogurt,
  },
];
