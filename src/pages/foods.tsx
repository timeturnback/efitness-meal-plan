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
  const { search, setSearch, fooddetails, itemfooddetails, setInputSubmit } =
    useContext(FoodsContext);

  return (
    <Wrapper title="Foods">
      <div className="mt-5">
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
          removetext={search.length > 0}
          onSubmitSeach={() => setInputSubmit(true)}
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
