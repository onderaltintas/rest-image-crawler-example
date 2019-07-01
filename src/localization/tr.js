/**
 * Creates an instance of Localization for turkish.
 * @class
 * @classdesc Holds strings of turkish localized strings.
 * Önder ALTINTAŞ 23.02.2016
 */
var module = module || null;
var Localization = 
{
  warning: "Uyarı",
  workspaceCannotBeSavedEmptyError: "Çalışma alanı boş olarak kaydedilemez.",
  userNameAlreadyExistsError: "Bu kullanıcı zaten var.",
	userNotFoundError : "Kullanıcı bulunamadı.",
  playerNotFoundError : "Oynatıcı bulunamadı.",
  noPermissionError : "Bunu yapmaya yetkiniz bulunmamaktadır.",
	wrongPasswordError : "Yanlış şifre.",
  newUserPasswordRequiredError : "Yeni kullanıcının şifresi olmalıdır",
  passwordLengthError : "Şifre en az 6 karakter olmalıdır.",
  passwordEmptyError : "Şifre boş bırakılamaz",
  nameEmptyError : "Kullanıcı ismi boş bırakılamaz.",
  noWorkspaceError : "Bu kullanıcı için herhangi bir çalışma alanı oluşturulmamış.",
  noAccessTokenError : "Erişim hakkınız yok.",
  workspaceNotFoundError : "Bu kullanıcı için verilen id ile çalışma alanı mevcut değil.",
  playerAlreadyExistError: "Oynatıcı ismi zaten kayıtlı",
  someoneLoggedError: "Bu kullanıcı için bir başka yerden ya da bir başka kişi tarafından giriş yapılmış.",
  valid : "geçerli",
  success : "İşlem başarıyla gerçekleştirildi.",
  working : "Çalışıyor."
}

if(module)
{
  module.exports = 
  {
    Localization : Localization
  };  
}

