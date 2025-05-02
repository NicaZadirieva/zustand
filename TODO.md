1. Найти и реализовать похожее useCoffeeStore(useShallow((s) => [s.coffeeList])). Необходим, чтобы убрать ненужный перерендеринг (оборвать связь со всем хранилищем)
2. Сохранение данных в localStorage. Сравнить hashStorage из zustand
3. Концепция слайсов и разделение на слайсы целого стора
4. Подключение devtools
5. Получение методов стора как функции. То есть, что-то похожее:
   export const getCoffeeList = (params?: GetCoffeeListReqParams) =>
   useCoffeeStore.getState().getCoffeeList(params);
6. Централизованный сброс состояний
