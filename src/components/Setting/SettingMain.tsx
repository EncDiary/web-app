import { FC } from "react";
import ToggleSwitch from "../Generic/ToggleSwitch";
import Title from "../Generic/Title";
import { useCheckboxesState } from "../../hooks/useCheckboxesState";
import SettingSection from "./SettingSection";

const SettingMain: FC = () => {
  const [isEnabled, changeHandler] = useCheckboxesState({
    action_edit: false,
    action_delete: true,
  });

  return (
    <>
      <Title text="Основное" align="left" />
      <SettingSection>
        <Title text="Действия над записями" size="medium" align="left" />
        <ToggleSwitch
          text="Редактирование"
          isEnabled={isEnabled.action_edit}
          changeHandler={changeHandler}
          name="action_edit"
        />
        <ToggleSwitch
          text="Удаление"
          isEnabled={isEnabled.action_delete}
          changeHandler={changeHandler}
          name="action_delete"
        />
      </SettingSection>
    </>
  );
};

export default SettingMain;
