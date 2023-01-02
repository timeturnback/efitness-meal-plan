import { useContext } from 'react';

import { SimpleInput } from '@/components/input';
import {
  FoodDetails,
  SearchFoods,
  SelectSuggestions,
} from '@/components/pages/foods';
import { Wrapper } from '@/components/pages/wrapper';
import { FoodsContext, FoodsProvider } from '@/context/foods-context';

const FoodsWrapper = () => {
  const {
    search,
    setSearch,
    setBLSearch,
    blsearch,
    fooddetails,
    itemfooddetails,
  } = useContext(FoodsContext);
  return (
    <Wrapper>
      <div className="mt-10">
        {fooddetails && (
          <FoodDetails
            datadoughnut={itemfooddetails.datadoughnut}
            data={itemfooddetails.data}
          />
        )}
        <SimpleInput
          value={search}
          onChangeText={(e) => setSearch(e)}
          maxwidth
          search
          onSubmitSeach={() => setBLSearch({ ...blsearch, click: true })}
        />
      </div>
      <SearchFoods />
      <SelectSuggestions />
    </Wrapper>
  );
};

const Foods = () => {
  return (
    <FoodsProvider>
      <FoodsWrapper />
    </FoodsProvider>
  );
};

export default Foods;
