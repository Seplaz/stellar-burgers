import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  setOrderRequest,
  setOrderModalData,
  setOrderError,
  clearConstructor
} from '../../services/slices/constructor-slice';
import { orderBurgerApi } from '@api';
import { isAuthenticatedSelector } from '../../services/slices/auth-slice';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const { constructorItems, orderRequest, orderModalData } = useSelector(
    (state) => state.burgerConstructor
  );
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const navigate = useNavigate();

  const onOrderClick = async () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      dispatch(setOrderRequest(true));
      const ingredients = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((item) => item._id),
        constructorItems.bun._id
      ];

      const orderData = await orderBurgerApi(ingredients);
      dispatch(setOrderModalData(orderData.order));
      dispatch(clearConstructor());
    } catch (error) {
      dispatch(setOrderError('Не удалось создать заказ. Попробуйте еще раз.'));
    } finally {
      dispatch(setOrderRequest(false));
    }
  };

  const closeOrderModal = () => {
    dispatch(setOrderModalData(null));
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
