import { useContext } from 'react';
import styles from 'src/styles/input_range.module.scss';

import { SimpleInputRange } from '@/components/input';
import { MacroContext } from '@/context/macro-context';

export const SelectInputRange = () => {
  const {
    customcarb,
    macronutrient,
    tdee,
    customfat,
    customprotein,
    setCustomFat,
    setCustomCarb,
    setCustomProtein,
  } = useContext(MacroContext);
  return (
    <div className="flex flex-col rounded-2xl border-2 p-5 shadow-md">
      <div className="flex flex-col">
        <span>
          Carbs:{' '}
          <span className="font-medium drop-shadow-md">{customcarb}%</span>
        </span>
        <SimpleInputRange
          onChange={(e) => setCustomCarb(e)}
          value={customcarb}
          styleSlider={styles.slider_carb}
          styleColor={styles.slider_color_carb}
          disabled={macronutrient.value === 'custom' && +tdee.value > 500}
        />
      </div>
      <div className="flex flex-col">
        <span>
          Fat: <span className="font-medium drop-shadow-md">{customfat}%</span>
        </span>
        <SimpleInputRange
          onChange={(e) => setCustomFat(e)}
          value={customfat}
          styleSlider={styles.slider_fat}
          styleColor={styles.slider_color_fat}
          disabled={macronutrient.value === 'custom' && +tdee.value > 500}
        />
      </div>
      <div className="flex flex-col">
        <span>
          Protein:{' '}
          <span className="font-medium drop-shadow-md">{customprotein}%</span>
        </span>
        <SimpleInputRange
          onChange={(e) => setCustomProtein(e)}
          value={customprotein}
          styleSlider={styles.slider_protein}
          styleColor={styles.slider_color_protein}
          disabled={macronutrient.value === 'custom' && +tdee.value > 500}
        />
      </div>
    </div>
  );
};
