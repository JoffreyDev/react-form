import React from "react";
import "./style.scss";
import "./reset.css";

const App: React.FC = () => {
  const [name, setName] = React.useState<string>();
  const [email, setEmail] = React.useState<string>();
  const [number, setNumber] = React.useState<string>();
  const [birth, setBirth] = React.useState<string>();
  const [message, setMessage] = React.useState<string>();

  const [nameError, setNameError] = React.useState<string>();
  const [mailError, setMailError] = React.useState<string>();
  const [numberError, setNumberError] = React.useState<string>();
  const [messageError, setMessageError] = React.useState<string>();

  const [requestActive, setRequestActive] = React.useState<boolean>(false);
  const [response, setResponse] = React.useState<Object>();

  const handleName: any = (value: string) => {
    if (/[^\x00-\x7F]/gi.test(value)) {
      setNameError("Разрешены только латинские буквы");
    } else if (value.split(/\s+\b/).length !== 2) {
      setNameError("Тут должно быть 2 слова");
    } else if (
      value.split(/\s+\b/)[0].length < 3 ||
      value.split(/\s+\b/)[0].length > 30 ||
      value.split(/\s+\b/)[1].length > 30 ||
      value.split(/\s+\b/)[1].length < 3
    ) {
      setNameError("Каждое слово не может быть меньше 3 и больше 30 букв");
    } else if (value.trim().split(" ").length > 2) {
      setNameError("Между словами может быть только 1 пробел");
    } else setNameError("");

    setName(value.toUpperCase());
  };

  const handleMail: any = (value: string) => {
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
      setMailError("Некорректный адрес почты");
    } else setMailError("");

    setEmail(value);
  };

  const handlePhone: any = (value: string) => {
    if (
      !/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(
        value
      )
    ) {
      setNumberError("Неверный формат номера");
    } else setNumberError("");

    setNumber(value);
  };

  const handleMessage: any = (value: string) => {
    if (value.length > 300 || value.length < 10) {
      setMessageError(
        "Минимальная длина - 10 символов, максимальная - 300 символов"
      );
    } else setMessageError("");

    setMessage(value);
  };

  const sendForm: any = () => {
    if (
      !nameError &&
      !numberError &&
      !mailError &&
      !messageError &&
      birth &&
      name &&
      number &&
      email &&
      message
    ) {
      setRequestActive(true);
      setTimeout(() => {
        setRequestActive(false);
        setResponse({ type: "Success", message: "Все прошло успешно!" });
        setName("");
        setNumber("");
        setEmail("");
        setBirth("");
        setMessage("");
      }, 2000);
    } else {
      setRequestActive(true);
      setTimeout(() => {
        setRequestActive(false);
        setResponse({
          type: "Error",
          message: "Ошибка. Проверьте правильность введенных данных.",
        });
      }, 2000);
    }
  };

  return (
    <div className="container">
      <form noValidate className="form">
        <fieldset className="form-fieldset">
          <legend>Форма обратной связи</legend>
          <div className="form-input-container">
            <label htmlFor="name">Имя Фамилия:</label>
            <input
              value={name}
              onChange={(event) => handleName(event.target.value)}
              className="form-input"
              id="name"
              type="text"
              name="name"
            />
            <p
              className={
                nameError ? "form-input--error active" : "form-input--error"
              }
            >
              {nameError}
            </p>
          </div>
          <div className="form-input-container">
            <label htmlFor="email">E-mail :</label>
            <input
              value={email}
              onChange={(e) => handleMail(e.target.value)}
              className="form-input"
              id="email"
              type="text"
              name="email"
            />
            <p
              className={
                mailError ? "form-input--error active" : "form-input--error"
              }
            >
              {mailError}
            </p>
          </div>
          <div className="form-input-container">
            <label htmlFor="number">Номер телефона:</label>
            <input
              className="form-input"
              id="number"
              type="text"
              name="number"
              value={number}
              onChange={(e) => handlePhone(e.target.value)}
            />
            <p
              className={
                numberError ? "form-input--error active" : "form-input--error"
              }
            >
              {numberError}
            </p>
          </div>
          <div className="form-input-container">
            <label htmlFor="birth">Дата рождения:</label>
            <input
              value={birth}
              onChange={(e) => setBirth(e.target.value)}
              className="form-input"
              id="birth"
              type="date"
              name="birth"
            />
          </div>
          <div className="form-input-container">
            <label htmlFor="message">Сообщение:</label>
            <textarea
              className="form-input--area"
              id="message"
              name="message"
              value={message}
              onChange={(e) => handleMessage(e.target.value)}
            />
            <p
              className={
                messageError ? "form-input--error active" : "form-input--error"
              }
            >
              {messageError}
            </p>
          </div>
          <input
            className={
              requestActive
                ? "form-input--button disabled"
                : "form-input--button"
            }
            type="button"
            value="Отправить"
            onClick={sendForm}
            disabled={requestActive}
          />
          <p
            className={
              response ? "form-input--error active" : "form-input--error"
            }
            style={
              response?.type === "Error" ? { color: "red" } : { color: "green" }
            }
          >
            {response?.message}
          </p>
        </fieldset>
      </form>
    </div>
  );
};

export default App;
