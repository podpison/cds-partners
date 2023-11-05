import { RefObject, useEffect, useState } from 'react';
import './index.scss';
import { Button, Flex, Typography } from 'antd';
import cn from 'classnames';

const { Text } = Typography;

type Props = {
  map: {
    ref: RefObject<HTMLDivElement>;
    message: string;
    textClassName?: string;
  }[];
};

const Tutorial: React.FC<Props> = ({ map }) => {
  const [isActive, setIsActive] = useState(false);
  const [step, setStep] = useState(0);

  const currentItem = map[step];
  const element = currentItem?.ref?.current;
  const clientRect = element?.getBoundingClientRect();

  const handleActiveStatus = () => {
    setIsActive((prev) => !prev);
    isActive && handleNewStep();
  };
  const handleNewStep = () => {
    setStep((prev) => prev + 1);
  };
  const handlePrevStep = () => {
    setStep((prev) => prev - 1);
  };

  useEffect(() => {
    if (!isActive || !element) return;

    const classList = element.classList;
    classList.add('tutorial__target');

    return () => {
      classList.remove('tutorial__target');
    };
  }, [isActive, element]);

  if (!currentItem) {
    return <></>;
  }

  const isEnd = step === map.length - 1;
  const bottomRect = clientRect?.bottom || 0;
  const innerHeight = window.innerHeight;
  const isBottomHalf = innerHeight / 2 <= bottomRect;
  const pulseTop = (clientRect?.top || 0) + (clientRect?.height || 0) - 15;
  const contentTop = isBottomHalf
    ? innerHeight - bottomRect + 110
    : pulseTop + 45;

  return (
    <div className="tutorial">
      <button
        className={cn('pulse', isActive && 'pulse_hidden')}
        onClick={handleActiveStatus}
        title="Открыть диалог"
        style={{ top: pulseTop }}
      >
        <span className="pulse__dot" />
        <span className="pulse__bg" />
      </button>
      <div
        className={cn(
          'tutorial__inner',
          !isActive && 'tutorial__inner_disabled'
        )}
      >
        <div
          className="tutorial__bg"
          onClick={handleActiveStatus}
        />
        <div
          className="tutorial__content"
          style={{
            top: contentTop,
          }}
        >
          <span
            className={cn(
              'tutorial__rectangle',
              isBottomHalf
                ? 'tutorial__rectangle_bottom'
                : 'tutorial__rectangle_top'
            )}
          />
          <button
            title="закрыть"
            className="tutorial__close"
            onClick={handleActiveStatus}
            aria-label="Закрыть меню"
          >
            <img
              src="/close.svg"
              alt="Крестик"
            />
          </button>
          <Text className={cn('tutorial__text', currentItem?.textClassName)}>
            {currentItem.message}
          </Text>
          <Flex
            justify="end"
            style={{ marginTop: 10 }}
            gap={10}
          >
            {isEnd ? (
              <>
                <Button onClick={handlePrevStep}>Назад</Button>
                <Button
                  type="primary"
                  onClick={handleActiveStatus}
                >
                  Завершить
                </Button>
              </>
            ) : (
              <Button
                type="primary"
                onClick={handleNewStep}
              >
                Далее
              </Button>
            )}
          </Flex>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
