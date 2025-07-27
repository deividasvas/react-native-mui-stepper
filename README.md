# react-native-mui-stepper

Stepper-компоненты для React Native в стиле Material-UI (MUI)

## Установка

```sh
npm install react-native-mui-stepper
# или
bun add react-native-mui-stepper
```

## Использование

```jsx
import { Stepper, Step, StepLabel, StepConnector } from 'react-native-mui-stepper';

<Stepper activeStep={1}>
  <Step>
    <StepLabel>Шаг 1</StepLabel>
  </Step>
  <Step>
    <StepLabel>Шаг 2</StepLabel>
  </Step>
  <Step>
    <StepLabel>Шаг 3</StepLabel>
  </Step>
</Stepper>
```

## Кастомизация коннектора

```jsx
<Stepper
  activeStep={1}
  connector={({ completedPrev, completedNext }) => (
    <StepConnector
      style={{
        backgroundColor: completedPrev && completedNext ? '#1976d2' : '#ccc',
        height: 4,
        width: 40,
        marginLeft: -6,
        marginRight: -6,
      }}
    />
  )}
>
  {/* ... */}
</Stepper>
```

## Автоматическое и ручное управление состояниями
- По умолчанию completed/isActive/disabled вычисляются автоматически на основе activeStep.
- Можно вручную задать состояние для любого шага через пропсы:

```jsx
<Step completed>
  <StepLabel>Готово!</StepLabel>
</Step>
```

## API

### `<Stepper>`
- `activeStep: number` — индекс активного шага
- `orientation?: 'horizontal' | 'vertical'` — направление
- `connector?: ReactElement | (props) => ReactElement` — кастомный коннектор
- `children: ReactNode` — шаги

### `<Step>`
- `completed?: boolean` — вручную completed
- `disabled?: boolean` — вручную disabled
- `isActive?: boolean` — вручную активный
- `children: ReactNode` — содержимое шага

### `<StepLabel>`
- `children: ReactNode` — подпись или иконка

### `<StepConnector>`
- `style?: ViewStyle` — стили линии

---

MIT License 