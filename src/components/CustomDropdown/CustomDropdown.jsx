import clsx from "clsx";
import cls from "./styles.module.scss";
import { useCustomDropdown } from "./useCustomDropdown";

export const CustomDropdown = ({
  options = [],
  firstDefault,
  placeholder,
  value,
  setValue = () => {},
  onChange = () => {},
}) => {

  const { isOpen, handleClose, handleToggle, innerValue, handleChange } = useCustomDropdown();

  return (
    <div className={clsx(cls.dropdown, { [cls.open]: isOpen } )} data-name="custom-dropdown">
      <div className={cls.header} onClick={handleToggle}>
        <span>
          {
          value?.label
            ? value.label
            : innerValue?.label
            ? innerValue.label
            : firstDefault
              ? options[0].label
              : placeholder
          }
        </span>
        <span className={cls.arrowIcon}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M9.45 3.45L6 6.9L2.55 3.45L1.5 4.5L6 9L10.5 4.5L9.45 3.45Z" fill="black"/>
          </svg>
        </span>
      </div>
      <ul className={cls.options}>
        {
          options.map((option, index) => (
            <li
              className={cls.option}
              key={option.value || index}
              onClick={() => {
                handleChange(option);
                setValue(option);
                handleClose();
                onChange(option);
              }}>
              <button className={cls.optionBtn}>{option.label}</button>
            </li>
          ))
        }
      </ul>
    </div>
  );
};
