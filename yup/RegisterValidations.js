// validationSchemas.js
import * as Yup from "yup";

const RegisterValidations = Yup.object().shape({
  name: Yup.string().required("İsim zorunludur."),
  surname: Yup.string().required("Soyisim zorunludur."),
  email: Yup.string()
    .email("Geçerli bir email giriniz.")
    .required("Email zorunludur."),
  phoneNumber: Yup.string()
    .matches(/^\+?[0-9]{10}$/, "Geçerli telefon numarası giriniz. (10 haneli)")
    .required("Telefon numarası zorunludur."),
  password: Yup.string()
    .min(6, "Şifre en az 6 karakter olmalı.")
    .required("Şifre zorunludur."),
  passwordRepeat: Yup.string()
    .oneOf([Yup.ref("password")], "Şifreler eşleşmiyor.")
    .required("Şifre tekrarı zorunludur."),
  gender: Yup.string()
    .oneOf(
      ["Erkek", "Kadın", "Belirtmek İstemiyorum"],
      "Cinsiyet Erkek veya Kadın olmalı."
    )
    .required("Cinsiyet zorunludur."),
  birthDate: Yup.date()
    .max(new Date(), "Doğum tarihi gelecekte olamaz.")
    .required("Doğum tarihi zorunludur."),
  kvkkAccepted: Yup.boolean().oneOf([true], "KVKK metnini onaylamalısınız."),
  rizaAccepted: Yup.boolean().oneOf(
    [true],
    "Açık Rıza metnini onaylamalısınız."
  ),
});

export default RegisterValidations;
