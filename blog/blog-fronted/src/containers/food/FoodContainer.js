import React, { useEffect, useState } from 'react';
import Food from '../../components/food/Food';
import { useDispatch, useSelector } from 'react-redux';
import { searchFood } from '../../modules/food';

const FoodContainer = () => {
   const [keyword, setKeyword] = useState('');
   const dispatch = useDispatch();

   const { data } = useSelector((state) => state.food);
   const loading = useSelector((state) => state.loading['food/SEARCH_FOOD']);

   const onChange = (e) => {
      setKeyword(e.target.value);
   }

   const onSearch = () => {
      dispatch(searchFood(keyword));
      setKeyword('');
   }

   return (
      <Food keyword={keyword} onChange={onChange} onSearch={onSearch}
         data={data} loading={loading}
      ></Food>
   )
}

export default FoodContainer;