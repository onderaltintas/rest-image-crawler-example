/**
 * Creates an instance of Localization for english.
 * @class
 * @classdesc Holds strings of english localized strings.
 * Önder ALTINTAŞ 23.02.2016
 */
var module = module || null;
var Localization = 
{
  warning: "Warning",
  workspaceCannotBeSavedEmptyError: "Empty workspace cannot be saved.",
  userNameAlreadyExistsError: "This user name already exists.",
	userNotFoundError : "User not found.",
  playerNotFoundError : "Player not found.",
  noPermissionError : "You have no permision to do this.",
	wrongPasswordError : "Wrong password.",
  newUserPasswordRequiredError : "New user should have password.",
  passwordLengthError : "Password should have at least 6 characters.",
  passwordEmptyError : "Password cannot be empty.",
  nameEmptyError : "User name cannot be empty.",
  noWorkspaceError : "There is no workspace for this user.",
  noAccessTokenError : "You have no permission to access.",
  workspaceNotFoundError : "There is no workspace with given id for this user.",
  playerAlreadyExistError: "Player name is already registered.",
  someoneLoggedError: "For this user from another place or by another user, login happened.",
  valid : "valid",
  success : "Operation successful.",
  working : "Working."
}

if(module)
{
  module.exports = 
  {
    Localization : Localization
  };  
}