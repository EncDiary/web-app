export const checkIsEditorConfigValid = (editor: any) => {
  return checkIsBoolean(editor.isMenubarDisplayed);
};

export const checkIsNoteActionsConfigValid = (noteActions: any) => {
  return (
    checkIsBoolean(noteActions.isEditable) &&
    checkIsBoolean(noteActions.isDeletable)
  );
};

export const checkNotesPerPageConfigValid = (notesNumberPerPage: any) => {
  return checkIsInteger(notesNumberPerPage);
};

const checkIsBoolean = (object: any) => {
  return object === undefined || typeof object === "boolean";
};

const checkIsInteger = (object: any) => {
  return object !== undefined && !isNaN(object) && Number.isInteger(object);
};
