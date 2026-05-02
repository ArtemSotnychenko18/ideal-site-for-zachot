import React, { useState, useEffect, useRef } from 'react';
import { Heading } from '@chakra-ui/react';

// Набір символів, які будуть миготіти (цифри, букви, знаки)
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+=-<>?';

const ScrambledText = ({ text, ...props }) => {
  // displayText - це те, що ми бачимо на екрані прямо зараз
  const [displayText, setDisplayText] = useState(text);
  // intervalRef - це "пульт" від таймера, щоб ми могли його зупинити
  const intervalRef = useRef(null);

  // Головна функція ефекту
  const scramble = () => {
    let iteration = 0; // Лічильник відкритих букв

    // Якщо ефект вже йде - зупиняємо його перед новим запуском
    clearInterval(intervalRef.current);

    // Запускаємо таймер, який цокає кожні 50 мілісекунд
    intervalRef.current = setInterval(() => {
      setDisplayText((prevText) =>
        text
          .split("") // Розбиваємо текст на букви ["M", "Y", " ", "S"...]
          .map((char, index) => {
            // Якщо ми вже дійшли до цієї букви лічильником - показуємо оригінал
            if (index < iteration) {
              return text[index];
            }
            // Інакше - показуємо випадковий символ з набору CHARS
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("") // Збираємо назад у рядок
      );

      // Коли відкрили всі букви - зупиняємо таймер
      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
      }

      // Швидкість відкриття букв (можна погратися: 1/3 - повільніше, 1 - швидко)
      iteration += 1 / 2; 
    }, 50); // Швидкість миготіння символів
  };

  // Запускаємо ефект 1 раз при появі на екрані
  useEffect(() => {
    scramble();
    // Це "прибирання" за собою, якщо компонент зникне з екрана
    return () => clearInterval(intervalRef.current);
  }, []);

  // Функція для запуску при наведенні мишки
  const handleMouseOver = () => {
    scramble();
  };

  // Ми використовуємо той самий Chakra Heading, але додаємо логіку
  return (
    <Heading 
      as="h1" 
      onMouseOver={handleMouseOver} // Запуск при наведенні
      cursor="default" // Курсор не змінюється на "руку"
      {...props} // Передаємо всі стилі (розмір, жирність) які прийшли зверху
    >
      {displayText}
    </Heading>
  );
};

export default ScrambledText;