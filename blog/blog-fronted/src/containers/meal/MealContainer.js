import React, { useEffect } from 'react';
import Meal from '../../components/meal/Meal';
import { useDispatch, useSelector } from 'react-redux';
import { getMeal } from '../../modules/meal';

const MealContainer = () => {
   const dispatch = useDispatch();
   const { data } = useSelector((state) => state.meal);
   const loading = useSelector((state) => state.loading['meal/GET_MEAL']);

   useEffect(() => {
      dispatch(getMeal());
   }, [])

   return (
      <Meal data={data} loading={loading}></Meal>
   )
}

export default MealContainer;